import moment from 'moment'
import * as Yup from 'yup'
import { debounce } from 'lodash'
// Services
import { getLocaleDateFormat, getStringISODate } from '../../../../components/date-format'
import { errorMessages, dateValidation } from '../../../../constants/yupValidation'
import { getSafe } from '../../../../utils/functions'
// Constants
import { FREIGHT_TYPES } from '../../constants'


export const submitHandler = async (values, actions, props, state) => {
    const { closePopup, order, orderId, shippingQuotes } = props

    let formValues = {
    pickupRemarks: values.pickupRemarks.trim(),
    deliveryRemarks: values.deliveryRemarks.trim(),
    shipperRefNo: values.shipperRefNo.trim(),
    freightType: values.freightType
    }

    try {
    values.freightType === FREIGHT_TYPES.ECHO
        ? (formValues.quoteId = (order.cfWeightExceeded ||
        !getSafe(() => shippingQuotes.rates[state.selectedShippingQuote].quoteId, '')
            ? values.shipmentQuoteId
            : getSafe(() => shippingQuotes.rates[state.selectedShippingQuote].quoteId, '')
        ).trim())
        : null,
        await props.returnShipmentOrder(orderId, formValues)
    props.getSaleOrder(orderId)
    closePopup()
    } catch (e) {
    console.error(e.response)
    } finally {
    actions.setSubmitting(false)
    }
}

export const onDateChange = debounce(async (event, { name, value }, errors, props, state, setState) => {
    if (!value || errors.pickupDate) return

    let pickupDate = moment(getStringISODate(value)) // Value is date only (it means time = 00:00:00)
    if (pickupDate.isBefore(moment().add(1, 'minutes'))) {
    // if current date (today) is selected the pickupDate (datetime) is in past
    pickupDate = moment().add(1, 'minutes') // BE needs to have pickupDate always in future
    }
    pickupDate = pickupDate.format()

    if (!props.order.cfWeightExceeded) {
    try {
        await props.getReturnShipmentRates(props.order.id, pickupDate)
    } catch {
    } finally {
    }
    setState({ ...state, selectedShippingQuote: 0 })
    }
}, 250)

export const requestManualShippingQuote = async (props) => {
    const { order } = props

    try {
    //orderId, countryId, zip
    await props.getManualShippingQuote(order.id, {
        destinationCountryId: order.returnAddressCountryReference.id,
        destinationZIP: order.returnAddressZip
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

