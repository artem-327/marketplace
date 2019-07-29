import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeEditPopup, putEditedDataRequest } from '../../actions'
import { Form, Input, Button } from 'formik-semantic-ui'
import * as Yup from 'yup'

import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup } from '~/utils/functions'

import { FormattedMessage } from 'react-intl'

const formValidation = Yup.object().shape({
  val0: Yup.string().trim().min(1, 'Too short').required('Required'),
})

class EditPopup1Parameter extends React.Component {

  render() {
    const {
      closeEditPopup,
      currentTab,
      config,
      popupValues,
      putEditedDataRequest,
      toastManager
    } = this.props

    const { id } = popupValues;

    const initialFormValues = {
      val0: popupValues[config.edit[0].name],
    }

    return (
      <Modal open centered={false}>
        <Modal.Header><FormattedMessage id='global.edit' defaultMessage='Edit'/> {config.addEditText}</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closeEditPopup}
            onSubmit={async (values, { setSubmitting }) => {
              let data = {
                [config.edit[0].name]: values.val0.trim()
              }

              try {
                await putEditedDataRequest(config, id, data)

                let formattedMsgId = `notifications.${config.formattedMessageName}Updated`

                toastManager.add(generateToastMarkup(
                  <FormattedMessage id={`${formattedMsgId}.header`} />,
                  <FormattedMessage id={`${formattedMsgId}.content`} values={{ name: values.val0 }} />
                ), { appearance: 'success' })
              }
              catch (e) { console.error(e) }
              finally { setSubmitting(false) }
            }}>

            <FormGroup widths='equal'>
              <Input type={config.edit[0].type} label={config.edit[0].title} name='val0' />
            </FormGroup>

            <div style={{ textAlign: 'right' }}>
              <Button.Reset data-test={`admin_edit_${config.formattedMessageName}_cancel`}><FormattedMessage id='global.cancel' defaultMessage='Cancel' /></Button.Reset>
              <Button.Submit data-test={`admin_edit_${config.formattedMessageName}_save`}><FormattedMessage id='global.save' defaultMessage='Save' /></Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closeEditPopup,
  putEditedDataRequest
};

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab];
  return {
    config: cfg,
    currentTab: state.admin.currentTab,
    popupValues: state.admin.popupValues
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditPopup1Parameter))
