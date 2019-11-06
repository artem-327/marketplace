import React, { Component } from 'react'
import { bool, oneOf } from 'prop-types'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Form, Modal, Button, Popup, Segment, Header, Icon } from 'semantic-ui-react'
import { Checkbox } from 'formik-semantic-ui-fixed-validation'

import { withToastManager } from 'react-toast-notifications'
import * as Yup from 'yup'

import { getSafe, generateToastMarkup } from '~/utils/functions'
import { typeToComponent, toYupSchema } from './constants'

import { triggerSystemSettingsModal } from '~/modules/settings/actions'
import { FormattedMessage, injectIntl } from 'react-intl'

import styled from 'styled-components'
import api from '~/modules/settings/api'

const RightAlignedDiv = styled.div`
  text-align: right !important;
`

const StyledSegment = styled(Segment)`
  margin-bottom: 45px !important;
`

class Settings extends Component {

  state = {
    role: null,
    systemSettings: [],
    validationSchema: null,
    loading: {},
    clickedButton: null,
    fetching: true
  }

  async componentDidMount() {
    let { role } = this.props
    let validationSchema = {}
    let systemSettings = await api.getSettings(role)

    systemSettings.forEach(group => {
      let tmp = {}
      group.settings.forEach(el => {
        if (el.frontendConfig) {
          let parsed = JSON.parse(el.frontendConfig)
          if (getSafe(() => parsed.validation, false)) {
            tmp[el.name] = Yup.object().shape({ value: toYupSchema(parsed.validation) })
          }
        }
      })
      if (Object.keys(tmp).length > 0) validationSchema[group.name] = Yup.object().shape(tmp)
    })

    this.setState({ fetching: false, systemSettings, validationSchema: Yup.object().shape(validationSchema) })

  }


  handleSubmit = async ({ values }) => {
    // Original = false => value is inherited from above; no value is set at current level
    // Globally, if !edit && !original then secretly send EMPTY_SETTING to BE
    // Original = true => Value was set at current level or contains EMPTY_SETTING
    // Original = true && value === 'EMPTY_SETTING' => No value is set on current level nor inherrited = send nothing
    // Original = true && value !== 'EMPTY_SETTING' => User has value set at current level


    const { toastManager, triggerSystemSettingsModal, role } = this.props
    this.setState({ loading: { [this.state.clickedButton]: true } })


    let payload = {
      settings: []
    }


    let group = values[role][this.state.clickedButton]

    Object.keys(group)
      .forEach(key => {
        let el = group[key]
        if (el.changeable) {
          if (!el.edit) payload.settings.push({ id: el.id, value: 'EMPTY_SETTING' })
          else payload.settings.push({ id: el.id, value: el.value })
        }
      })

    try {
      await api.updateSettings(role, payload)

      toastManager.add(generateToastMarkup(
        <FormattedMessage id='notifications.systemSettingsUpdated.header' defaultMessage='System settings updated' />,
        <FormattedMessage id='notifications.systemSettingsUpdated.content' defaultMessage='System settings successfully updated' />
      ), { appearance: 'success' })

      triggerSystemSettingsModal(false)

    } catch (e) { console.error(e) }
    finally {
      this.setState({ loading: { [this.state.clickedButton]: false } })
    }
  }

  render() {
    let { open, asModal, triggerSystemSettingsModal, intl: { formatMessage }, role } = this.props
    let { loading, systemSettings } = this.state

    let initialValues = { [role]: {} }


    systemSettings.forEach(el => {
      initialValues[role][el.name] = {}

      el.settings.forEach((setting) => {
        initialValues[role][el.name][setting.name] = {
          id: setting.id,
          original: setting.original,
          value: setting.value,
          changeable: setting.changeable,
          edit: setting.changeable && setting.original && setting.value !== 'EMPTY_SETTING'
        }
      })
    })

    let getMarkup = () => (
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={this.state.validationSchema}
        render={(formikProps) => {
          let { values } = formikProps
          return (
            <Form>
              {systemSettings.map((group) => {
                let allDisabled = group.settings.every((val) => !val.changeable)
                return (
                  <>
                    <Header size='medium' as='h2'>{group.name}</Header>
                    <StyledSegment>
                      <>
                        {group.settings.map((el) => {
                          return (
                            <>
                              <Header as='h3'><>{el.name}
                                <Popup
                                  trigger={<Icon color='blue' name='info circle' />}
                                  content={el.description}
                                />
                              </></Header>
                              {React.cloneElement(typeToComponent(el.type, {
                                props: getSafe(() => el.frontendConfig.props),
                                inputProps: {
                                  disabled: !el.changeable || getSafe(() => !values[role][group.name][el.name].edit, false),
                                  ...getSafe(() => el.frontendConfig.inputProps, {})
                                }
                              }), {
                                name: `${role}.${group.name}.${el.name}.value`
                              })}
                              {this.props.role !== 'admin' && <Checkbox
                                inputProps={{
                                  onChange: (e) => e.stopPropagation(),
                                  onClick: (e) => e.stopPropagation()
                                }}
                                label={formatMessage({ id: 'global.edit', defaultMessage: 'Edit' })}
                                name={`${role}.${group.name}.${el.name}.edit`} />}
                            </>
                          )
                        })}
                        <RightAlignedDiv>
                          <Popup trigger={
                            <Button loading={loading[group.name]} onClick={async () => {
                              formikProps.resetForm(values)

                              let errors = await formikProps.validateForm()
                              let errorFields = Object.keys(getSafe(() => errors[role][group.name], {}))

                              if (errorFields.length > 0) {
                                errorFields.forEach(field => formikProps.setFieldTouched(`${role}${group.name}.${field}.value`))
                              } else {
                                this.setState({ clickedButton: group.name }, () => !allDisabled && this.handleSubmit(formikProps))
                              }
                            }} primary disabled={allDisabled}>
                              <FormattedMessage id='global.save' defaultMessage='Save'>{text => text}</FormattedMessage>
                            </Button>
                          } disabled={!allDisabled}
                            content={<FormattedMessage id='settings.system.allDisabled' default='There is nothing to save as none of the values can be changed.' />}
                          />
                        </RightAlignedDiv>
                      </>
                    </StyledSegment>
                  </>
                )
              })}
            </Form>
          )
        }}
      />
    )



    if (!asModal) {
      return (
        getMarkup()
      )
    }


    return (
      <Modal open={open} size='small' closeIcon onClose={(e) => {
        e.stopPropagation()
        triggerSystemSettingsModal(false)
      }} center={false}>
        <Modal.Header><FormattedMessage id='settings.systemSettings' defaultMessage='System Settings' /></Modal.Header>

        <Modal.Content scrolling>
          {getMarkup()}
        </Modal.Content>

        <Modal.Actions>
          <Button basic onClick={(e) => {
            e.stopPropagation()
            this.props.triggerSystemSettingsModal(false)
          }}>
            <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{text => text}</FormattedMessage>
          </Button>
        </Modal.Actions>
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
  { triggerSystemSettingsModal })(injectIntl(withToastManager(Settings)))