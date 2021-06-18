import { getSafe, removeEmpty } from '../../../../utils/functions'
import * as Yup from 'yup'
import { errorMessages } from '../../../../constants/yupValidation'

/**
 * Submit form - add or edit Carrier.
 * @category Admin Settings - Add/Edit Carrier
 * @method
 * @param {Object} values Object form values.
 * @param {Object} actions Object Formik actions (setSubmitting).
 * @param {Object} props Object module input props (closePopup, popupValues, postNewCarrier, updateCarrier, datagrid).
 * @return {none}
 */
export const submitForm = async (values, actions, props) => {
  const { closePopup, popupValues, postNewCarrier, updateCarrier, datagrid } = props
  const { setSubmitting } = actions
  let payload = { ...values }
  removeEmpty(payload)

  try {
    if (popupValues) {
      delete payload.code
      const { value } = await updateCarrier(popupValues.id, payload)
      datagrid.updateRow(value.id, () => value)
    } else {
      await postNewCarrier(payload)
      datagrid.loadData()
    }

    closePopup()
  } catch (e) {
    console.error(e)
  } finally {
    setSubmitting(false)
  }
}

/**
 * Get initial values for form.
 * @category Admin Settings - Add/Edit Carrier
 * @method
 * @param {Object} popupValues Object values for form.
 * @return {Object} Initialized object with values for form.
 */
export const getInitValues = popupValues => {
  return ({
    code: getSafe(() => popupValues.code, ''),
    blindShipmentSupport: getSafe(() => popupValues.blindShipmentSupport, false),
    priceMarkup: getSafe(() => popupValues.priceMarkup, '')
  })
}

/**
 * Validation of form.
 * @category Admin Settings - Add/Edit Carrier
 * @method
 */
export const getValidationSchema = () => {
  return Yup.object().shape({
    code: Yup.string().trim().required(errorMessages.requiredMessage),
    priceMarkup: Yup.number()
      .typeError(errorMessages.mustBeNumber)
      .positive(errorMessages.positive)
  })
}