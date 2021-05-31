import React, { cloneElement, Component } from 'react'
import { bool, oneOf } from 'prop-types'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import {
  Form,
  Modal,
  Button,
  Popup,
  Segment,
  Header,
  Icon,
  Grid,
  GridRow,
  GridColumn,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import { Checkbox } from 'formik-semantic-ui-fixed-validation'

import * as Yup from 'yup'

import { getSafe } from '../../utils/functions'
import { typeToComponent, toYupSchema } from './constants'

import { triggerSystemSettingsModal, getCurrentUser } from '../../modules/settings/actions'
import { FormattedMessage, injectIntl } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'

import styled from 'styled-components'
import api from '../../modules/settings/api'
import { getIdentity } from '../../modules/auth/actions'
import securePage from '../../hocs/securePage'

const FixyWrapper = styled.div`
  position: relative;
  transform: translateY(0);
  padding: 2.5em 1.5em 1.5em;
  overflow: auto;
`

const ButtonsWrapper = styled(Grid)`
  position: sticky !important;
  bottom: 0;
  left: 0;
  z-index: 5;
  overflow: hidden;
  ${props => (props.isUserSettings ? '' : 'width: calc(100% + 84px);')}
  ${props => (props.isUserSettings ? '' : 'margin: 0 0 0 -42px !important;')}
  ${props => (props.isUserSettings ? '' : 'padding: 0 42px !important;')}
  border-top: 1px solid #dee2e6;

  background: #fff;

  .scrollable > & {
    flex-grow: 0;
    flex-shrink: 0;
    position: static;
    width: 100%;
    margin: 0 !important;
    background: transparent;

    > .column {
      padding-right: 0 !important;
    }
  }
`

// PopupTriggerWrapper is necessary when button is disabled - trigger didn't work
const PopupTriggerWrapper = styled.div`
  display: inline-block;
`

const FormSpaced = styled(Form)`
  &.scrollable {
    display: flex !important;
    flex-flow: column;
    max-height: calc(80vh - 114px);
    min-height: 200px;
    padding-bottom: 0 !important;
  }
`

const StyledHeader = styled(Header)`
  &:first-child,
  .dimmer:first-child + & {
    margin-top: 0 !important;
  }
`

const StyledSegment = styled(Segment)`
  margin-bottom: 45px !important;

  .scrollable > & {
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    min-height: 112px;
    margin-bottom: 15px !important;
  }
`

const BottomMargedRow = styled(GridRow)``

const IconContainer = styled.div`
  padding-right: 0.5em !important;
`

const CustomPaddedColumn = styled(GridColumn)`
  padding-right: 7px !important;
`

const CustomGridColumn = styled(GridColumn)`
  padding-bottom: 2px !important;
`
const PScroll = styled(PerfectScrollbar)`
  .ps__rail-x,
  .ps__rail-y {
    display: none;
  }

  .scrollable & {
    flex-flow: 0;
    flex-grow: 0;
    position: relative;
    overflow: hidden;
    max-height: 100%;
    margin-right: -1em;
    padding-right: 2em;

    .ps__rail-x,
    .ps__rail-y {
      display: block;
    }

    .ps__rail-y {
      position: absolute;
      left: auto !important;
      right: 0 !important;
      width: 10px;

      .ps__thumb-y {
        position: absolute;
        width: 6px;
        margin: 0 2px;
        border-radius: 3px;
        background: #ccc;
      }
    }
  }
`
/**
 * @category Settings - Settings
 * @component
 */
class Settings extends Component {
  state = {
    role: null,
    systemSettings: [],
    validationSchema: null,
    loading: true,
    clickedButton: null,
    fetching: true
  }

  async componentDidMount() {
    if (!this.props.asModal) {
      let {role} = this.props
      let settings = await api.getSettings(role)
      let settingsWithoutTradepass = settings?.filter(s => s.code !== 'TRADEPASS_CRITERIA')
      let {systemSettings, validationSchema} = this.parseData(settingsWithoutTradepass)

      this.setState({
        fetching: false,
        systemSettings,
        validationSchema,
        loading: false
      })
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.open && this.props.open) {
      let { role } = this.props
      let settings = await api.getSettings(role)
      let settingsWithoutTradepass = settings?.filter(s => s.code !== 'TRADEPASS_CRITERIA')
      let { systemSettings, validationSchema } = this.parseData(settingsWithoutTradepass)

      this.setState({
        fetching: false,
        systemSettings,
        validationSchema,
        loading: false
      })
    }
  }

  parseData = systemSettings => {
    let validationSchema = {}
    let { role } = this.props

    systemSettings &&
      systemSettings.length &&
      systemSettings.forEach(group => {
        let tmp = {}
        group.settings.forEach(el => {
          if (el.frontendConfig) {
            let parsed = JSON.parse(el.frontendConfig)
            if (getSafe(() => parsed.validation, false)) {
              tmp[el.code] = Yup.object().shape({
                value: Yup.object().shape({ visible: toYupSchema(parsed.validation, el.type) })
              })
            }
          }
        })
        if (Object.keys(tmp).length > 0) validationSchema[group.code] = Yup.object().shape(tmp)
      })

    return { validationSchema: Yup.object({ [role]: Yup.object().shape(validationSchema) }), systemSettings }
  }

  handleSubmit = async values => {
    // Original = false => value is inherited from above; no value is set at current level
    // Globally, if !edit && !original then secretly send EMPTY_SETTING to BE
    // Original = true => Value was set at current level or contains EMPTY_SETTING
    // Original = true && value === 'EMPTY_SETTING' => No value is set on current level nor inherrited = send nothing
    // Original = true && value !== 'EMPTY_SETTING' => User has value set at current level
    let settings

    const { triggerSystemSettingsModal, role } = this.props
    this.setState({ loading: true })
    let payload = {
      settings: []
    }
    Object.keys(values[role]).forEach(group => {
      Object.keys(values[role][group]).forEach(key => {
        let el = values[role][group][key]
        if (el.changeable) {
          if (
            (!el.edit && role !== 'admin') ||
            (el.value.actual === 'EMPTY_SETTING' && el.value.visible.trim() === '')
          ) {
            payload.settings.push({ id: el.id, value: 'EMPTY_SETTING' })
          } else if (el.value.visible !== null) {
            payload.settings.push({
              id: el.id,
              value: el.type === 'BOOL' ? el.value.actual.toString().toUpperCase() : el.value.visible
            })
          }
        }
      })
    })

    try {
      settings = await api.updateSettings(role, payload)
      await this.props.getCurrentUser()
      let { systemSettings } = this.parseData(settings.settingGroups)

      this.setState({ systemSettings })
      this.resetForm(this.parseInitialValues(systemSettings))
      this.props.getIdentity()
      triggerSystemSettingsModal(false)
    } catch (e) {
      console.error(e)
    } finally {
      this.setState({ loading: false })
    }
  }

  parseInitialValues = systemSettings => {
    const { role } = this.props
    let initialValues = { [role]: {} }
    systemSettings &&
      systemSettings.length &&
      systemSettings.forEach(el => {
        initialValues[role][el.code] = {}

        el.settings.forEach(setting => {
          initialValues[role][el.code][setting.code] = {
            id: setting.id,
            original: setting.original,
            value: {
              actual: setting.type === 'BOOL' ? setting.value.toLowerCase() === 'true' : setting.value,
              visible: setting.value === 'EMPTY_SETTING' ? '' : setting.value ? setting.value : ''
            },
            type: setting.type,
            changeable: setting.changeable,
            edit: setting.changeable && setting.original && setting.value !== 'EMPTY_SETTING'
          }
        })
      })

    return initialValues
  }

  render() {
    let {
      open,
      asModal,
      scrolling,
      triggerSystemSettingsModal,
      intl: { formatMessage },
      role,
      isCompanyAdmin,
      isUserAdmin
    } = this.props
    let { loading, systemSettings } = this.state
    let initialValues = this.parseInitialValues(systemSettings)

    let getMarkup = () => (
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={this.state.validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          this.handleSubmit(values)
        }}
        render={formikProps => {
          let { values, resetForm, isSubmitting } = formikProps
          this.resetForm = resetForm
          let allDisabled =
            systemSettings &&
            systemSettings.length &&
            systemSettings.every(group => group.settings.every(val => !val.changeable))
          return (
            <FormSpaced className={asModal ? 'scrollable' : ''}>
              <Dimmer inverted active={loading}>
                <Loader />
              </Dimmer>
              <FixyWrapper>
                {systemSettings && systemSettings.length
                  ? systemSettings.map(group => {
                    return (
                      <>
                        <StyledHeader as='h2' className='ui medium header'>
                          {group.name}
                        </StyledHeader>
                        <StyledSegment>
                          <PScroll>
                            <>
                              {group.settings.map(el => {
                                return (
                                  <>
                                    <Grid>
                                      <BottomMargedRow>
                                        <CustomGridColumn width={10}>
                                          <Header as='h3'>
                                            <>
                                              {el.name}
                                              <Popup
                                                trigger={<Icon color='blue' name='info circle' />}
                                                content={el.description}
                                              />
                                            </>
                                          </Header>
                                        </CustomGridColumn>

                                        <CustomPaddedColumn width={5} floated='right' textAlign='right'>
                                          {this.props.role !== 'admin' && (
                                            <>
                                              <Checkbox
                                                inputProps={{
                                                  disabled: !el.changeable && !isUserAdmin && !isCompanyAdmin,
                                                  onChange: e => e.stopPropagation(),
                                                  onClick: e => e.stopPropagation()
                                                }}
                                                label={formatMessage({
                                                  id: 'global.override',
                                                  defaultMessage: 'Override'
                                                })}
                                                name={`${role}.${group.code}.${el.code}.edit`}
                                              />
                                            </>
                                          )}
                                        </CustomPaddedColumn>
                                      </BottomMargedRow>
                                    </Grid>

                                    {cloneElement(
                                      typeToComponent(el.type, {
                                        props: {
                                          ...getSafe(() => JSON.parse(el.frontendConfig).props),
                                          options: getSafe(() => el.possibleValues, []).map((opt, i) => ({
                                            key: i,
                                            value: opt.value,
                                            text: opt.displayName
                                          }))
                                        },
                                        inputProps: {
                                          disabled:
                                            !el.changeable ||
                                            (getSafe(() => !values[role][group.code][el.code].edit, false) &&
                                              role !== 'admin'),
                                          ...getSafe(() => JSON.parse(el.frontendConfig).inputProps, {})
                                        }
                                      }),
                                      {
                                        name: `${role}.${group.code}.${el.code}.value.${
                                          el.type === 'BOOL' ? 'actual' : 'visible'
                                        }`
                                      }
                                    )}
                                  </>
                                )
                              })}
                            </>
                          </PScroll>
                        </StyledSegment>
                      </>
                    )
                  })
                : null}
              </FixyWrapper>
              <ButtonsWrapper isUserSettings={this.props.isUserSettings}>
                <Grid.Column textAlign='right'>
                  <Popup
                    position='left center'
                    trigger={
                      <PopupTriggerWrapper>
                        <Button
                          loading={loading || isSubmitting}
                          onClick={async () => {
                            this.setState({ clickedButton: true }, () => !allDisabled && formikProps.handleSubmit())
                            formikProps.resetForm(values)
                          }}
                          primary
                          type='button'
                          disabled={allDisabled || isSubmitting}>
                          <FormattedMessage id='global.save' defaultMessage='Save'>
                            {text => text}
                          </FormattedMessage>
                        </Button>
                      </PopupTriggerWrapper>
                    }
                    disabled={!allDisabled}
                    content={
                      <FormattedMessage
                        id='settings.system.allDisabled'
                        default='There is nothing to save as none of the values can be changed.'
                      />
                    }
                  />
                  {asModal ? (
                    <Button
                      basic
                      onClick={e => {
                        e.stopPropagation()
                        this.props.triggerSystemSettingsModal(false)
                      }}>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                  ) : null}
                </Grid.Column>
              </ButtonsWrapper>
            </FormSpaced>
          )
        }}
      />
    )

    if (!asModal) {
      return getMarkup()
    }

    return (
      <Modal
        open={open}
        size='small'
        closeIcon
        onClose={e => {
          e.stopPropagation()
          triggerSystemSettingsModal(false)
        }}
        center={false}>
        <Modal.Header>
          <FormattedMessage id='settings.systemSettings' defaultMessage='System Settings' />
        </Modal.Header>

        <Modal.Content scrolling={scrolling}>{getMarkup()}</Modal.Content>
      </Modal>
    )
  }
}

Settings.propTypes = {
  asModal: bool,
  scrolling: bool,
  /** This props completes urls GET and PATCH also. */
  role: oneOf(['user', 'admin', 'company', 'comapny-user']).isRequired,
  isUserSettings: bool,
  isUserAdmin: bool,
  isCompanyAdmin: bool
}

Settings.defaultProps = {
  asModal: true,
  scrolling: true,
  isUserSettings: false,
  isUserAdmin: false,
  isCompanyAdmin: false
}

export default connect(
  ({ auth, settings }) => ({
    open: settings.systemSettingsModalOpen,
    accessLevel: {
      isAdmin: getSafe(() => auth.identity.isAdmin, null),
      isCompanyAdmin: getSafe(() => auth.identity.isCompanyAdmin, null)
    }
  }),
  { triggerSystemSettingsModal, getCurrentUser, getIdentity }
)(injectIntl(Settings))
