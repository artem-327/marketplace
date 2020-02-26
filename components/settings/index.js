import React, { Component } from 'react'
import { bool, oneOf } from 'prop-types'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Form, Modal, Button, Popup, Segment, Header, Icon, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import { Checkbox } from 'formik-semantic-ui-fixed-validation'

import * as Yup from 'yup'

import { getSafe } from '~/utils/functions'
import { typeToComponent, toYupSchema } from './constants'

import { triggerSystemSettingsModal } from '~/modules/settings/actions'
import { FormattedMessage, injectIntl } from 'react-intl'

import styled from 'styled-components'
import api from '~/modules/settings/api'

const FixyWrapper = styled.div`
  position: relative;
  transform: translateY(0);
  padding: 2.5em 1.5em 1.5em;
`

const ButtonsWrapper = styled(Grid)`
  position: fixed;
  bottom: 20px;
  left: 1em;
  width: calc(100% - 2em);
  margin: 0 !important;
  background: transparent;
`

// PopupTriggerWrapper is necessary when button is disabled - trigger didn't work
const PopupTriggerWrapper = styled.div`
  display: inline-block;
`

const FormSpaced = styled(Form)`
  padding-top: 31px !important;
`

const StyledSegment = styled(Segment)`
  margin-bottom: 45px !important;
`

const BottomMargedRow = styled(GridRow)`
  margin-bottom: 10px !important;
`

const IconContainer = styled.div`
  padding-right: 0.5em !important;
`

const CustomPaddedColumn = styled(GridColumn)`
  padding-right: 7px !important;
`

class Settings extends Component {
  state = {
    role: null,
    systemSettings: [],
    validationSchema: null,
    loading: false,
    clickedButton: null,
    fetching: true
  }

  async componentDidMount() {
    let { role } = this.props
    let settings = await api.getSettings(role)
    let { systemSettings, validationSchema } = this.parseData(settings)

    this.setState({
      fetching: false,
      systemSettings,
      validationSchema
    })
  }

  parseData = systemSettings => {
    let validationSchema = {}
    let { role } = this.props

    systemSettings.forEach(group => {
      let tmp = {}
      group.settings.forEach(el => {
        if (el.frontendConfig) {
          let parsed = JSON.parse(el.frontendConfig)
          if (getSafe(() => parsed.validation, false)) {
            tmp[el.name] = Yup.object().shape({
              value: Yup.object().shape({ visible: toYupSchema(parsed.validation, el.type) })
            })
          }
        }
      })
      if (Object.keys(tmp).length > 0) validationSchema[group.code] = Yup.object().shape(tmp)
    })

    return { validationSchema: Yup.object({ [role]: Yup.object().shape(validationSchema) }), systemSettings }
  }

  handleSubmit = async ({ values }) => {
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
          if (!el.edit && role !== 'admin') payload.settings.push({ id: el.id, value: 'EMPTY_SETTING' })
          else if (el.value.visible !== null)
            payload.settings.push({ id: el.id, value: el.type === 'BOOL' ? el.value.actual : el.value.visible })
        }
      })
    })

    try {
      settings = await api.updateSettings(role, payload)

      let { systemSettings } = this.parseData(settings)

      this.setState({ systemSettings })
      this.resetForm(this.parseInitialValues(systemSettings))

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
    systemSettings.forEach(el => {
      initialValues[role][el.code] = {}

      el.settings.forEach(setting => {
        initialValues[role][el.code][setting.code] = {
          id: setting.id,
          original: setting.original,
          value: {
            actual: setting.type === 'BOOL' ? setting.value == 'true' : setting.value,
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
      triggerSystemSettingsModal,
      intl: { formatMessage },
      role
    } = this.props
    let { loading, systemSettings } = this.state
    let initialValues = this.parseInitialValues(systemSettings)

    let getMarkup = () => (
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={this.state.validationSchema}
        render={formikProps => {
          let { values, resetForm } = formikProps
          this.resetForm = resetForm
          let allDisabled = systemSettings.every(group => group.settings.every(val => !val.changeable))
          return (
            <FormSpaced>
              {systemSettings.map(group => {
                return (
                  <>
                    <Header size='medium' as='h2'>
                      {group.name}
                    </Header>
                    <StyledSegment>
                      <>
                        {group.settings.map(el => {
                          return (
                            <>
                              <Grid>
                                <BottomMargedRow>
                                  <GridColumn width={10}>
                                    <Header as='h3'>
                                      <>
                                        {el.name}
                                        <Popup
                                          trigger={<Icon color='blue' name='info circle' />}
                                          content={el.description}
                                        />
                                      </>
                                    </Header>
                                  </GridColumn>

                                  <CustomPaddedColumn width={5} floated='right' textAlign='right'>
                                    {this.props.role !== 'admin' && (
                                      <>
                                        <Checkbox
                                          inputProps={{
                                            disabled: !el.changeable,
                                            onChange: e => e.stopPropagation(),
                                            onClick: e => e.stopPropagation()
                                          }}
                                          label={formatMessage({ id: 'global.override', defaultMessage: 'Override' })}
                                          name={`${role}.${group.code}.${el.code}.edit`}
                                        />
                                      </>
                                    )}
                                  </CustomPaddedColumn>
                                  <Popup
                                    trigger={
                                      <IconContainer>
                                        <Icon color='blue' name='info circle' />
                                      </IconContainer>
                                    }
                                    content={formatMessage({
                                      id: `global.${el.changeable ? 'checkToOverride' : 'canNotOverride'}`,
                                      defaultMessage: el.changeable
                                        ? 'Check this option if you wish to override this setting.'
                                        : 'This setting cannot be overridden at this level.'
                                    })}
                                  />
                                </BottomMargedRow>
                              </Grid>

                              {React.cloneElement(
                                typeToComponent(el.type, {
                                  props: getSafe(() => JSON.parse(el.frontendConfig).props),
                                  inputProps: {
                                    disabled:
                                      !el.changeable ||
                                      (getSafe(() => !values[role][group.name][el.name].edit, false) &&
                                        !(role === 'admin')),
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
                    </StyledSegment>
                  </>
                )
              })}
              <ButtonsWrapper>
                <Grid.Column textAlign='right'>
                  <Popup
                    position='left center'
                    trigger={
                      <PopupTriggerWrapper>
                        <Button
                          loading={loading}
                          onClick={async () => {
                            formikProps.resetForm(values)

                            let errors = await formikProps.validateForm()
                            let errorFields = Object.keys(getSafe(() => errors[role], {}))

                            if (errorFields.length > 0) {
                              errorFields.forEach(group => {
                                group.forEach(field =>
                                  formikProps.setFieldTouched(`${role}.${group.code}.${field}.value.visible`)
                                )
                              })
                            } else {
                              this.setState(
                                { clickedButton: true },
                                () => !allDisabled && this.handleSubmit(formikProps)
                              )
                            }
                          }}
                          primary
                          disabled={allDisabled}>
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

        <FixyWrapper>
          <Modal.Content scrolling>{getMarkup()}</Modal.Content>
        </FixyWrapper>
      </Modal>
    )
  }
}

Settings.propTypes = {
  asModal: bool,
  role: oneOf(['user', 'admin', 'company']).isRequired
}

Settings.defaultProps = {
  asModal: true
}

export default connect(
  ({ auth, settings }) => ({
    open: settings.systemSettingsModalOpen,
    accessLevel: {
      isAdmin: getSafe(() => auth.identity.isAdmin, null),
      isCompanyAdmin: getSafe(() => auth.identity.isCompanyAdmin, null)
    }
  }),
  { triggerSystemSettingsModal }
)(injectIntl(Settings))
