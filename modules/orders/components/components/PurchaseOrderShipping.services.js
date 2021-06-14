import moment from 'moment'
import * as Yup from 'yup'
// Services
import { getSafe } from '../../../../utils/functions'
import { errorMessages, dateValidation } from '../../../../constants/yupValidation'
import { getLocaleDateFormat, getStringISODate } from '../../../../components/date-format'
// Constants
import { FREIGHT_TYPES } from '../../constants'

export const submitHandler = async (values, actions, props, state) => {
    const { closePopup, order, orderId, shippingQuotes } = props

    try {
    let formValues = {
        pickupRemarks: values.pickupRemarks.trim(),
        deliveryRemarks: values.deliveryRemarks.trim(),
        shipperRefNo: values.shipperRefNo.trim(),
        freightType: values.freightType
    }

    values.freightType === FREIGHT_TYPES.ECHO
        ? (formValues.quoteId = (order.cfWeightExceeded ||
        !getSafe(() => shippingQuotes.rates[state.selectedShippingQuote].quoteId, '')
            ? values.shipmentQuoteId
            : getSafe(() => shippingQuotes.rates[state.selectedShippingQuote].quoteId, '')
        ).trim())
        : null,
        await props.purchaseShipmentOrder(orderId, formValues)
    props.getPurchaseOrder(orderId)
    closePopup()
    } catch (e) {
    console.error(e)
    } finally {
    actions.setSubmitting(false)
    }
}

export const requestManualShippingQuote = async (props) => {
    const { order } = props

    try {
    await props.getManualShippingQuote(order.id, {
        destinationCountryId: order.shippingAddressCountryReference.id,
        destinationZIP: order.shippingAddressZip
    })
    } catch {
    } finally {
    }
}

export const getInitialFormValues = (props) => {
    const { order } = props

    let initialValues = {
    pickupDate: getSafe(() => order.shipDate, ''),
    shipmentQuoteId: '',
    pickupRemarks: '',
    deliveryRemarks: '',
    shipperRefNo: '',
    freightType: FREIGHT_TYPES.ECHO
    }

    if (initialValues.pickupDate && moment(initialValues.pickupDate).isAfter(moment()))
    initialValues.pickupDate = moment(initialValues.pickupDate).format(getLocaleDateFormat())
    else initialValues.pickupDate = moment().format(getLocaleDateFormat())

    return initialValues
}

export const validationSchema = () =>
    Yup.lazy(values => {
    return Yup.object().shape({
        pickupDate: dateValidation(false).concat(
        Yup.string().test(
            'min-date',
            errorMessages.mustBeInFuture,
            val => moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -1
        )
        )
    })
})
