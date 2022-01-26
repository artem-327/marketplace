import * as Yup from 'yup'
//Services
import { removeEmpty } from '../../../../utils/functions'
import { errorMessages, phoneValidation } from '../../../../constants/yupValidation'

/**
 * Validation of form.
 * @category Orders - BOL edit
 * @method
 */
export const formValidation = () =>
  Yup.lazy(values => {
    return Yup.object().shape({
      phoneNumber: phoneValidation(10),
      faxNumber: phoneValidation(10),
    })
  })

/**
 * Submit form - update BOL values
 * @category Orders - BOL edit
 * @method
 * @param {Object<string, any>} values Values of form.
 * @param {Object} {{setSubmitting: (isSubmitting: boolean) => void}} Formik actions,
 * @param {Object} props Input props
 */
export const SubmitBOL = async (values, { setSubmitting }, props) => {
  const { orderId, isOrderBuyType, onSave } = props
  const type = isOrderBuyType ? 'BUY' : 'SELL'

  let body = {
    ...(isOrderBuyType
        ? {
          destinationContactName: values.contactName,
          destinationPhoneNo: values.phoneNumber,
          destinationFaxNo: values.faxNumber,
          destinationStopNotes: values.stopNotes
        }
        : {
          pickupContactName: values.contactName,
          pickupPhoneNo: values.phoneNumber,
          pickupFaxNo: values.faxNumber,
          pickupStopNotes: values.stopNotes
        }
    ),
    referenceInformation: values.referenceInformation,
    /* Specified in design but not accepted by Patch endpoint, DT-2515
    shipperInstructionsSpecialServices: values.shipperInstructions,
    consigneeInstructionsSpecialServices: values.consigneeInstructions,
    */
    specialInstructions: values.specialInstructions
  }
  removeEmpty(body)

  try {
    await props.updateOrderBol(orderId, type, body)
    onSave()
  } catch (e) {
    console.error(e)
  } finally {
    setSubmitting(false)
  }
}