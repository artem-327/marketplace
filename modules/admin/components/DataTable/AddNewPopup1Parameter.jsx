import { Modal, FormGroup } from 'semantic-ui-react'
import { Form, Input, Button } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
// Components
import ErrorFocus from '../../../../components/error-focus'
// Styles
import { Required } from '../../../../components/constants/layout'

const initialFormValues = {
  val0: ''
}

const formValidation = Yup.object().shape({
  val0: Yup.string().trim().min(1, 'Too short').required('Required')
})

const AddNewPopup1Parameter = props => {
  const { closeAddPopup, config, postNewRequest } = props

  return (
    <Modal closeIcon onClose={() => closeAddPopup()} open centered={false}>
      <Modal.Header>
        <FormattedMessage id='global.add' defaultMessage='Add' /> {config.addEditText}
      </Modal.Header>
      <Modal.Content>
        <Form
          initialValues={initialFormValues}
          validationSchema={formValidation}
          onReset={closeAddPopup}
          onSubmit={async (values, { setSubmitting }) => {
            let data = {
              [config.edit[0].name]: values.val0.trim()
            }

            try {
              await postNewRequest(config, data)
              if (config.globalReload) props[config.globalReload]()
            } catch (e) {
              console.error(e)
            } finally {
              setSubmitting(false)
            }
          }}>
          <FormGroup widths='equal' data-test={`admin_add_${config.formattedMessageName}_inp`}>
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
            <Button.Reset data-test={`admin_add_${config.formattedMessageName}_cancel_btn`}>
              <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
            </Button.Reset>
            <Button.Submit data-test={`admin_add_${config.formattedMessageName}_save_btn`}>
              <FormattedMessage id='global.save' defaultMessage='Save' />
            </Button.Submit>
          </div>
          <ErrorFocus />
        </Form>
      </Modal.Content>
    </Modal>
  )
}

AddNewPopup1Parameter.propTypes = {
  closeAddPopup: PropTypes.func,
  postNewRequest: PropTypes.func,
  config: PropTypes.object
}

AddNewPopup1Parameter.defaultValues = {
  closeAddPopup: () => {},
  postNewRequest: () => {},
  config: {}
}

export default AddNewPopup1Parameter
