import { Modal, FormGroup } from 'semantic-ui-react'
import { Form, Input, Button } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
// Components
import ErrorFocus from '../../../../components/error-focus'
// Styles
import { Required } from '../../../../components/constants/layout'

const formValidation = Yup.object().shape({
  val0: Yup.string().trim().min(1, 'Too short').required('Required')
})

const EditPopup1Parameter = props => {
  const { closeEditPopup, config, popupValues, putEditedDataRequest } = props

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
              if (config.globalReload) props[config.globalReload]()
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
              <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
            </Button.Reset>
            <Button.Submit disabled={!editable} data-test={`admin_edit_${config.formattedMessageName}_save_btn`}>
              <FormattedMessage id='global.save' defaultMessage='Save' />
            </Button.Submit>
          </div>
          <ErrorFocus />
        </Form>
      </Modal.Content>
    </Modal>
  )
}

EditPopup1Parameter.propTypes = {
  config: PropTypes.object,
  popupValues: PropTypes.object,
  closeEditPopup: PropTypes.func,
  putEditedDataRequest: PropTypes.func,
  getProductForms: PropTypes.func,
  getProductConditions: PropTypes.func,
  getProductGrades: PropTypes.func,
  getPackagingTypes: PropTypes.func
}

EditPopup1Parameter.defaultValues = {
  config: {},
  popupValues: null,
  closeEditPopup: () => {},
  putEditedDataRequest: () => {},
  getProductForms: () => {},
  getProductConditions: () => {},
  getProductGrades: () => {},
  getPackagingTypes: () => {}
}

export default EditPopup1Parameter
