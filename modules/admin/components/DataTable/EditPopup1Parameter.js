import { Component } from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeEditPopup, putEditedDataRequest } from '../../actions'
import { Form, Input, Button } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'

import { FormattedMessage } from 'react-intl'
import { Required } from '~/components/constants/layout'
import ErrorFocus from '~/components/error-focus'

const formValidation = Yup.object().shape({
  val0: Yup.string().trim().min(1, 'Too short').required('Required')
})

class EditPopup1Parameter extends Component {
  render() {
    const { closeEditPopup, config, popupValues, putEditedDataRequest } = this.props

    const { id, editable = true } = popupValues

    const initialFormValues = {
      val0: popupValues[config.edit[0].name]
    }

    return (
      <Modal closeIcon onClose={() => closeEditPopup()} open centered={false}>
        <Modal.Header>
          <FormattedMessage id='global.edit' defaultMessage='Edit' /> {config.addEditText}
        </Modal.Header>
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
              } catch (e) {
                console.error(e)
              } finally {
                setSubmitting(false)
              }
            }}>
            <FormGroup widths='equal' data-test={`admin_edit_${config.formattedMessageName}_inp`}>
              <Input
                type={config.edit[0].type}
                label={
                  <>
                    {config.edit[0].title}
                    <Required />
                  </>
                }
                name='val0'
              />
            </FormGroup>

            <div style={{ textAlign: 'right' }}>
              <Button.Reset data-test={`admin_edit_${config.formattedMessageName}_cancel_btn`}>
                <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                  {text => text}
                </FormattedMessage>
              </Button.Reset>
              <Button.Submit disabled={!editable} data-test={`admin_edit_${config.formattedMessageName}_save_btn`}>
                <FormattedMessage id='global.save' defaultMessage='Save'>
                  {text => text}
                </FormattedMessage>
              </Button.Submit>
            </div>
            <ErrorFocus />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closeEditPopup,
  putEditedDataRequest
}

const mapStateToProps = (state, { currentTab }) => {
  let cfg = state.admin.config[currentTab]
  return {
    config: cfg,
    popupValues: state.admin.popupValues
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPopup1Parameter)
