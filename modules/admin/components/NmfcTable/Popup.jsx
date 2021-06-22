import { Modal, FormGroup, Button } from 'semantic-ui-react'
import { Form as Formik, Input } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
// Components
import ErrorFocus from '../../../../components/error-focus'
// Services
import { nmfcValidation } from '../../../../constants/yupValidation'
// Styles
import { CustomForm } from '../../styles'
import { Required } from '../../../../components/constants/layout'

const Popup = props => {
  let submitForm

  const getInitialValues = () => {
    const { popupValues } = props
    if (popupValues) return popupValues

    return {
      code: '',
      description: ''
    }
  }

  const validationSchema = () =>
    Yup.lazy(values => {
      return Yup.object().shape({
        code: nmfcValidation()
      })
    })

  const {
    closeAddPopup,
    popupValues,
    intl: { formatMessage },
    config,
    addNmfcNumber,
    editNmfcNumber
  } = props

  let type = popupValues ? { id: 'edit', defaultMessage: 'Edit' } : { id: 'add', defaultMessage: 'Add' }

  return (
    <Modal open onClose={() => closeAddPopup()}>
      <Modal.Header>
        {formatMessage({ id: `global.${type.id}`, defaultMessage: type.defaultMessage })} {config.addEditText}
      </Modal.Header>
      <Modal.Content>
        <Formik
          validateOnChange={true}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              if (popupValues) {
                await editNmfcNumber({ ...values, id: popupValues.id })
              } else {
                await addNmfcNumber(values)
              }
              closeAddPopup()
            } catch (err) {}
            setSubmitting(false)
          }}
          validationSchema={validationSchema()}
          initialValues={getInitialValues()}
          render={props => {
            submitForm = props.submitForm
            return (
              <CustomForm autoComplete='off'>
                <FormGroup widths='equal'>
                  <Input
                    name='code'
                    label={
                      <>
                        {formatMessage({ id: 'global.code', defaultMessage: '!Code' })}
                        <Required />
                      </>
                    }
                  />
                </FormGroup>

                <FormGroup widths='equal'>
                  <Input
                    name='description'
                    label={formatMessage({ id: 'global.description', defaultMessage: '!Description' })}
                  />
                  <ErrorFocus />
                </FormGroup>
              </CustomForm>
            )
          }}
        />
      </Modal.Content>

      <Modal.Actions>
        <Button type='button' onClick={() => closeAddPopup()}>
          {formatMessage({ id: 'global.cancel', defaultMessage: '!Cancel' })}
        </Button>
        <Button primary onClick={() => submitForm()}>
          {formatMessage({ id: `global.${type.id}`, defaultMessage: type.defaultMessage })}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

Popup.propTypes = {
  addNmfcNumber: PropTypes.func,
  editNmfcNumber: PropTypes.func,
  closeAddPopup: PropTypes.func,
  popupValues: PropTypes.object,
  config: PropTypes.object,
  intl: PropTypes.object
}

Popup.defaultValues = {
  addNmfcNumber: () => {},
  editNmfcNumber: () => {},
  closeAddPopup: () => {},
  popupValues: null,
  config: {},
  intl: {}
}

export default Popup
