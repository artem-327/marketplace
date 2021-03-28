import { generateToastMarkup } from '~/utils/functions'

export const handleManualShipment = async (setIsOpenConfirmPopup, props) => {
  let {
    requestManualShipment,
    shippingAddress
  } = props

  if (shippingAddress) {
    const payload = shippingAddress.warehouse
      ? { shippingWarehouseId: shippingAddress.id }
      : { shippingDeliveryAddressId: shippingAddress.id }

    try {
      await requestManualShipment(payload)
      setIsOpenConfirmPopup(true)
    } catch (e) {
      console.error(e)
    }
  }
}