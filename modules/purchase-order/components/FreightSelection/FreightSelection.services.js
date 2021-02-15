import { generateToastMarkup } from '~/utils/functions'

export const handleManualShipment = async props => {
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
    } catch (e) {
      console.error(e)
    }
  }
}