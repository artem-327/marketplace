//Services
import { removeEmpty } from '../../../../utils/functions'

/**
 * Submit form - update BOL values
 * @category Orders - BOL edit
 * @method
 * @param {Object} values Values of form.
 * @param {Object} {{setSubmitting: (isSubmitting: boolean) => void}} Formik actions,
 * @param {Object} props Input props
 */
export const SubmitBOL = async (values, { setSubmitting }, props) => {
  const { orderId, isOrderBuyType, onSave } = props
  const type = isOrderBuyType ? 'BUY' : 'SELL'

  let body = {
    pickupContactName: values.pickupContactName,
    pickupPhoneNo: values.pickupPhoneNo,
    pickupFaxNo: values.pickupFaxNo,
    pickupStopNotes: values.pickupStopNotes,
    destinationContactName: values.destinationContactName,
    destinationPhoneNo: values.destinationPhoneNo,
    destinationFaxNo: values.destinationFaxNo,
    destinationStopNotes: values.destinationStopNotes,
    consigneeInstructionsDeliveryNo: values.consigneeInstructionsDeliveryNo,
    consigneeInstructionsLocType: values.consigneeInstructionsLocType,
    consigneeInstructionsSpecialServices: values.consigneeInstructionsSpecialServices,
    shipperInstructionsPickupNo: values.shipperInstructionsPickupNo,
    shipperInstructionsLocType: values.shipperInstructionsLocType,
    shipperInstructionsSpecialServices: values.shipperInstructionsSpecialServices,

    ...(isOrderBuyType
        ? {
          destinationContactName: values.contactName,
          destinationPhoneNo: values.phoneNumber,
          destinationFaxNo: values.faxNumber,
          destinationStopNotes: values.stopNotes,
          consigneeInstructionsDeliveryNo: values.pickupDeliveryNo,
          consigneeInstructionsLocType: values.locType,
          consigneeInstructionsSpecialServices: values.specialServices
        }
        : {
          pickupContactName: values.contactName,
          pickupPhoneNo: values.phoneNumber,
          pickupFaxNo: values.faxNumber,
          pickupStopNotes: values.stopNotes,
          shipperInstructionsPickupNo: values.pickupDeliveryNo,
          shipperInstructionsLocType: values.locType,
          shipperInstructionsSpecialServices: values.specialServices
        }
    ),
    referenceInformation: values.referenceInformation,
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