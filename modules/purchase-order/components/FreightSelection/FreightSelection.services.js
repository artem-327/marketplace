import moment from 'moment'
import { getStringISODate } from '../../../../components/date-format'

export const handleManualShipment = async (onSubmit, values, props) => {
  const { requestManualShipment, shippingAddress } = props
  const { date } = values

  if (shippingAddress) {
    let payload = shippingAddress.warehouse
      ? { shippingWarehouseId: shippingAddress.id }
      : { shippingDeliveryAddressId: shippingAddress.id }

    if (date) {
      let dateTime = moment(getStringISODate(date))
      const current = moment()
      dateTime
        .add(current.hour(), 'hours')
        .add(current.minute() + 1, 'minutes')
        .add(current.second(), 'seconds')
      payload['preferredDeliveryDate'] = encodeURIComponent(dateTime.format())
    }

    try {
      await requestManualShipment(payload)
      onSubmit()
    } catch (e) {
      console.error(e)
    }
  }
}