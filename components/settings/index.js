import React, { Component } from 'react'
import { number, bool, oneOf } from 'prop-types'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { FormGroup, Form, Modal, Button, Popup } from 'semantic-ui-react'
import { Input } from 'formik-semantic-ui'
import { withToastManager } from 'react-toast-notifications'


import { getSafe, generateToastMarkup } from '~/utils/functions'
// import { getRole } from './constants'
// import { getSettings, updateSettings } from '~/modules/settings/actions'
import { triggerSystemSettingsModal } from '~/modules/settings/actions'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import api from '~/modules/settings/api'

const RightAlignedDiv = styled.div`
  text-align: right !important;
`


class Settings extends Component {

  state = {
    role: null,
    systemSettings: [],
    loading: true
  }

  async componentDidMount() {
    let { role } = this.props

    let systemSettings = await api.getSettings(role)
    this.setState({ loading: false, systemSettings })
  }

  wrapToGroup = (children, i) => (
    <FormGroup widths='equal'>
      {children.map((el) => <Input inputProps={{ fluid: true, disabled: !el.changeable }} label={el.name} name={el.name} key={el.id} />)}
    </FormGroup>
  )

  handleSubmit = async (values, { setSubmitting }) => {
    const { toastManager, triggerSystemSettingsModal } = this.props
    let { systemSettings } = this.state
    this.setState({ loading: true })
    let payload = {
      settings: []
    }

    Object.keys(values)
      .forEach(key => {
        let value = systemSettings.find((el) => el.name === key)
        if (value.changeable) payload.settings.push({ id: value.id, value: values[key] })
      })

    try {
      await api.updateSettings(this.props.role, payload)

      toastManager.add(generateToastMarkup(
        <FormattedMessage id='notifications.systemSettingsUpdated.header' defaultMessage='System settings updated' />,
        <FormattedMessage id='notifications.systemSettingsUpdated.content' defaultMessage='System settings successfully updated' />
      ), { appearance: 'success' })

      triggerSystemSettingsModal(false)

    } catch (e) { console.error(e) }
    finally {
      setSubmitting(false)
      this.setState({ loading: false })
    }
  }

  getButtons = allDisabled => (
    <RightAlignedDiv>
      {this.props.asModal && <Button basic onClick={(e) => {
        e.stopPropagation()
        this.props.triggerSystemSettingsModal(false)
      }}>
        <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{text => text}</FormattedMessage>
      </Button>}
      <Popup trigger={
        <Button loading={this.props.sysSettingsUpdating} onClick={() => !allDisabled && this.submit()} primary disabled={allDisabled}>
          <FormattedMessage id='global.save' defaultMessage='Save'>{text => text}</FormattedMessage>
        </Button>
      } disabled={!allDisabled}
        content={<FormattedMessage id='settings.system.allDisabled' default='There is nothing to save as none of the values can be changed.' />}
      />
    </RightAlignedDiv>
  )

  render() {
    let { inputsInGroup, open, asModal } = this.props
    let { systemSettings, loading } = this.state
    let initialValues = {}

    systemSettings.forEach(el => initialValues[el.name] = el.value)

    let markup = [], copy = systemSettings.slice(), allDisabled = systemSettings.every((val) => !val.changeable)

    for (let i = 0; i < Math.floor(systemSettings.length / inputsInGroup); i++) {
      markup.push(this.wrapToGroup(copy.splice(0, inputsInGroup), i))
    }

    // Push remaining elements
    if (systemSettings.length % inputsInGroup !== 0) {
      markup.push(this.wrapToGroup(copy, systemSettings.length))
    }

    let getMarkup = (children = null) => (
      <Formik
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
        enableReinitialize
        render={({ submitForm }) => {
          this.submit = submitForm

          return (
            <Form loading={loading}>
              {markup.map((el) => el)}
              {children}
            </Form>
          )
        }}
      />
    )

    if (!asModal) {
      return (
        getMarkup(this.getButtons(allDisabled))
      )
    }


    return (
      <Modal open={open} size='small' center={false}>
        <Modal.Header><FormattedMessage id='settings.systemSettings' defaultMessage='System Settings' /></Modal.Header>

        <Modal.Content>
          {getMarkup()}
        </Modal.Content>

        <Modal.Actions>
          {this.getButtons(allDisabled)}
        </Modal.Actions>
      </Modal>
    )
  }
}


Settings.propTypes = {
  inputsInGroup: number,
  asModal: bool,
  role: oneOf(['user', 'admin', 'company']).isRequired
}

Settings.defaultProps = {
  inputsInGroup: 2,
  asModal: true
}


export default connect(
  ({ auth, settings }) => ({
    // systemSettings: settings.systemSettings,
    // settingsLoading: settings.systemSettingsLoading,
    open: settings.systemSettingsModalOpen,
    // sysSettingsUpdating: settings.sysSettingsUpdating,
    accessLevel: {
      isAdmin: getSafe(() => auth.identity.isAdmin, null),
      isCompanyAdmin: getSafe(() => auth.identity.isCompanyAdmin, null)
    }
  }),
  { triggerSystemSettingsModal })(withToastManager(Settings))