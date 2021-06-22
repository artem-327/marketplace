import { Modal, FormGroup } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
// Components
import ErrorFocus from '../../../../components/error-focus'
// Services
import { errorMessages } from '../../../../constants/yupValidation'
// Styles
import { Required } from '../../../../components/constants/layout'

const formValidation = Yup.object().shape({
  val0: Yup.string().trim().required(errorMessages.minLength(1)),
  val1: Yup.string().trim().required(errorMessages.minLength(1)),
  val2: Yup.number().required(errorMessages.requiredMessage),
  val3: Yup.number()
    .typeError(errorMessages.mustBeNumber)
    .positive(errorMessages.positive)
    .required(errorMessages.requiredMessage)
})

const EditUnitOfMeasurePopup = props => {

  const { closeEditPopup, config, popupValues, putEditedDataRequest, measureOptions } = props

  const { id } = popupValues

  const initialFormValues = {
    val0: popupValues[config.edit[0].name],
    val1: popupValues[config.edit[1].name],
    val2: popupValues.measureTypeId,
    val3: popupValues[config.edit[3].name]
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
              [config.edit[0].name]: values.val0.trim(),
              [config.edit[1].name]: values.val1.trim(),
              [config.edit[2].name]: values.val2,
              [config.edit[3].name]: Number(values.val3)
            }
            await putEditedDataRequest(config, id, data)
            setSubmitting(false)
          }}>
          <FormGroup widths='equal' data-test='admin_edit_unit_measure_name_inp'>
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
          <FormGroup widths='equal' data-test='admin_edit_unit_measure_nameAbb_inp'>
            <Input
              type={config.edit[1].type}
              label={
                <>
                  {config.edit[1].title}
                  <Required />
                </>
              }
              name='val1'
            />
          </FormGroup>
          <FormGroup widths='equal'>
            <Dropdown
              label={
                <>
                  {config.edit[2].title}
                  <Required />
                </>
              }
              options={measureOptions}
              name='val2'
              inputProps={{ 'data-test': 'admin_edit_unit_measure_type_drpdn' }}
            />
          </FormGroup>
          <FormGroup widths='equal' data-test='admin_edit_unit_measure_ratioToBaseSiUnit_inp'>
            <Input
              type={config.edit[3].type}
              label={
                <>
                  {config.edit[3].title}
                  <Required />
                </>
              }
              name='val3'
            />
          </FormGroup>

          <div style={{ textAlign: 'right' }}>
            <Button.Reset data-test='admin_edit_unit_measure_cancel_btn'>
              <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
            </Button.Reset>
            <Button.Submit data-test='admin_edit_unit_measure_save_btn'>
              <FormattedMessage id='global.save' defaultMessage='Save' />
            </Button.Submit>
          </div>
          <ErrorFocus />
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default EditUnitOfMeasurePopup
