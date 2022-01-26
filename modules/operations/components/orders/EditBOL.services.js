import moment from 'moment'
import * as Yup from 'yup'

// Services
import { getSafe, removeEmpty } from '../../../../utils/functions'
import { getLocaleDateFormat, getStringISODate } from '../../../../components/date-format'
import { errorMessages, dateValidation } from '../../../../constants/yupValidation'

/**
 * Get validation schema for form.
 * @category Orders - BOL edit
 * @method
 */
export const validationSchema = () =>
  Yup.lazy(values => {
    return Yup.object().shape({
      pickupDate: dateValidation(false).concat(
        Yup.string().test(
          'min-date',
          errorMessages.mustBeInFuture,
          val => moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -1
        )
      ),
      items: Yup.array().of(
        Yup.object().shape({
          packagingQty: Yup.string()
            .test('v', errorMessages.mustBeNumber, function(v) {
              return v === null || v === '' || !isNaN(v)
            })
            .test('v', errorMessages.positive, function(v) {
              return v === null || v === '' || isNaN(v) || Number(v) > 0
            })
            .test('v', errorMessages.integer, function(v) {
              return v === null || v === '' || isNaN(v) || Number(v) % 1 === 0
            }),
          handlingUnitQty: Yup.string()
            //.integer(errorMessages.integer)
            .test('v', errorMessages.mustBeNumber, function(v) {
              return v === null || v === '' || !isNaN(v)
            })
            .test('v', errorMessages.positive, function(v) {
              return v === null || v === '' || isNaN(v) || Number(v) > 0
            })
            .test('v', errorMessages.integer, function(v) {
              return v === null || v === '' || isNaN(v) || Number(v) % 1 === 0
            }),
          weight: Yup.string()
            .test('v', errorMessages.mustBeNumber, function(v) {
              return v === null || v === '' || !isNaN(v)
            })
            .test('v', errorMessages.positive, function(v) {
              return v === null || v === '' || isNaN(v) || Number(v) > 0
            })
        })
      )
    })
  })

/**
 * Get initial values for form.
 * @category Orders - BOL edit
 * @method
 */
export const getInitialValues = bol => {
  return {
    billTo: {
      address: {
        city: bol?.billToCity || '',
        country: bol?.billToCountry || '',
        province: bol?.billToState || '',
        streetAddress: bol?.billToStreet || '',
        zip: bol?.billToZip || '',
      }
    },
    billToName: bol?.billToName || '',
    bluepalletPoNo: bol?.bluepalletPoNo || '',
    carrierAccountNo: bol?.carrierAccountNo || '',
    carrierName: bol?.carrierName || '',
    carrierProNo: bol?.carrierProNo || '',
    consigneeInstructionsDeliveryNo: bol?.consigneeInstructionsDeliveryNo || '',
    consigneeInstructionsLocType: bol?.consigneeInstructionsLocType || '',
    consigneeInstructionsSpecialServices: bol?.consigneeInstructionsSpecialServices || '',
    customerBolNo: bol?.customerBolNo || '',
    destinationAddress: {
      address: {
        city: bol?.destinationAddressCity || '',
        country: bol?.destinationAddressCountry || '',
        province: bol?.destinationAddressState || '',
        streetAddress: bol?.destinationAddressStreet || '',
        zip: bol?.destinationAddressZip || '',
      }
    },
    destinationContactName: bol?.destinationContactName || '',
    destinationFaxNo: bol?.destinationFaxNo || '',
    destinationName: bol?.destinationName || '',
    destinationPhoneNo: bol?.destinationPhoneNo || '',
    destinationReleaseNo: bol?.destinationReleaseNo || '',
    destinationStopNotes: bol?.destinationStopNotes || '',
    destinationTerminalPhoneNo: bol?.destinationTerminalPhoneNo || '',
    estTransitDays: bol?.estTransitDays || '',
    freightChargeTerms: bol?.freightChargeTerms || '',
    items: bol?.items
      ? bol.items.map(item => ({
        commodityDescription: item.commodityDescription || '',
        handlingUnitQty: item.handlingUnitQty || '',
        handlingUnitType: item.handlingUnitType || '',
        hazardClass: item.hazardClass || '',
        hazardous: item.hazardous || '',
        nmfcNo: item.nmfcNo || '',
        od: item.od || '',
        packagingQty: item.packagingQty || '',
        packagingType: item.packagingType || '',
        weight: item.weight || ''
      }))
      : [],
    palletCount: bol?.palletCount || '',
    palletHeight: bol?.palletHeight || '',
    palletLength: bol?.palletLength || '',
    palletType: bol?.palletType || '',
    palletWidth: bol?.palletWidth || '',
    pickupAddress: {
      address: {
        city: bol?.pickupAddressCity || '',
        country: bol?.pickupAddressCountry || '',
        province: bol?.pickupAddressState || '',
        streetAddress: bol?.pickupAddressStreet || '',
        zip: bol?.pickupAddressZip || ''
      }
    },
    pickupContactName: bol?.pickupContactName || '',
    pickupDate: bol?.pickupDate ? moment(bol.pickupDate).format(getLocaleDateFormat()) : '',
    pickupFaxNo: bol?.pickupFaxNo || '',
    pickupName: bol?.pickupName || '',
    pickupPhoneNo: bol?.pickupPhoneNo || '',
    pickupReleaseNo: bol?.pickupReleaseNo || '',
    pickupStopNotes: bol?.pickupStopNotes || '',
    pickupTerminalPhoneNo: bol?.pickupTerminalPhoneNo || '',
    quoteId: bol?.quoteId || '',
    referenceInformation: bol?.referenceInformation || '',
    sealNo: bol?.sealNo || '',
    shipperInstructionsLocType: bol?.shipperInstructionsLocType || '',
    shipperInstructionsPickupNo: bol?.shipperInstructionsPickupNo || '',
    shipperInstructionsSpecialServices: bol?.shipperInstructionsSpecialServices || '',
    shipperRefNo: bol?.shipperRefNo || '',
    skidSpot: bol?.skidSpot || '',
    specialInstructions: bol?.specialInstructions || '',
    stackable: bol?.stackable || '',
    trailerNo: bol?.trailerNo || ''
  }
}

const getBody = values => ({
  billToCity: values.billTo.address.city,
  billToCountry: values.billTo.address.country,
  billToState: values.billTo.address.province,
  billToStreet: values.billTo.address.streetAddress,
  billToZip: values.billTo.address.zip,

  billToName: values.billToName,
  bluepalletPoNo: values.bluepalletPoNo,
  carrierAccountNo: values.carrierAccountNo,
  carrierName: values.carrierName,
  carrierProNo: values.carrierProNo,
  consigneeInstructionsDeliveryNo: values.consigneeInstructionsDeliveryNo,
  consigneeInstructionsLocType: values.consigneeInstructionsLocType,
  consigneeInstructionsSpecialServices: values.consigneeInstructionsSpecialServices,
  customerBolNo: values.customerBolNo,

  destinationAddressCity: values.destinationAddress.address.city,
  destinationAddressCountry: values.destinationAddress.address.country,
  destinationAddressState: values.destinationAddress.address.province,
  destinationAddressStreet: values.destinationAddress.address.streetAddress,
  destinationAddressZip: values.destinationAddress.address.zip,

  destinationContactName: values.destinationContactName,
  destinationFaxNo: values.destinationFaxNo,
  destinationName: values.destinationName,
  destinationPhoneNo: values.destinationPhoneNo,
  destinationReleaseNo: values.destinationReleaseNo,
  destinationStopNotes: values.destinationStopNotes,
  destinationTerminalPhoneNo: values.destinationTerminalPhoneNo,
  estTransitDays: values.estTransitDays,
  freightChargeTerms: values.freightChargeTerms,
  items: values.items ? values.items.map(item => ({
    commodityDescription: item.commodityDescription,
    handlingUnitQty: item.handlingUnitQty,
    handlingUnitType: item.handlingUnitType,
    hazardClass: item.hazardClass,
    hazardous: item.hazardous,
    nmfcNo: item.nmfcNo,
    od: item.od,
    packagingQty: item.packagingQty,
    packagingType: item.packagingType,
    weight: item.weight
  })) : null,
  palletCount: values.palletCount,
  palletHeight: values.palletHeight,
  palletLength: values.palletLength,
  palletType: values.palletType,
  palletWidth: values.palletWidth,

  pickupAddressCity: values.pickupAddress.address.city,
  pickupAddressCountry: values.pickupAddress.address.country,
  pickupAddressState: values.pickupAddress.address.province,
  pickupAddressStreet: values.pickupAddress.address.streetAddress,
  pickupAddressZip: values.pickupAddress.address.zip,

  pickupContactName: values.pickupContactName,
  pickupDate: values.pickupDate ? moment(getStringISODate(values.pickupDate)).format() : '',
  pickupFaxNo: values.pickupFaxNo,
  pickupName: values.pickupName,
  pickupPhoneNo: values.pickupPhoneNo,
  pickupReleaseNo: values.pickupReleaseNo,
  pickupStopNotes: values.pickupStopNotes,
  pickupTerminalPhoneNo: values.pickupTerminalPhoneNo,
  quoteId: values.quoteId,
  referenceInformation: values.referenceInformation,
  sealNo: values.sealNo,
  shipperInstructionsLocType: values.shipperInstructionsLocType,
  shipperInstructionsPickupNo: values.shipperInstructionsPickupNo,
  shipperInstructionsSpecialServices: values.shipperInstructionsSpecialServices,
  shipperRefNo: values.shipperRefNo,
  skidSpot: values.skidSpot,
  specialInstructions: values.specialInstructions,
  stackable: values.stackable,
  trailerNo: values.trailerNo
})

/**
 * Submit form - update BOL values
 * @category Orders - BOL edit
 * @method
 * @param {Object<string, any>} values Values of form.
 * @param {Object} actions Formik actions,
 * @param {Object} props Input props
 * @param {string} type Type of BOL (buyBillOfLading, sellBillOfLading, carrierBillOfLading)
 */
export const SubmitHandler = async (values, actions, props, type) => {
  const { order, updateOrderBol, getOrderById } = props
  const typeSubmit = type === 'buyBillOfLading' ? 'BUY' : (type === 'sellBillOfLading' ? 'SELL' : 'CARRIER')

  let body = getBody(values)
  removeEmpty(body)

  try {
    await updateOrderBol(order.id, typeSubmit, body)
    getOrderById(order.id)
    actions.setTouched({})
  } catch (e) {
    console.error(e.response)
  } finally {
    actions.setSubmitting(false)
  }
}

/**
 * Submit form - submit Carrier BOL values
 * @category Orders - BOL edit
 * @method
 * @param {Object<string, any>} values Values of form.
 * @param {Object} actions Formik actions,
 * @param {Object} props Input props
 */
export const SubmitCarrierHandler = async (values, actions, props) => {
  const { order, submitCarrierBol, getOrderById } = props

  let body = getBody(values)
  removeEmpty(body)

  try {
    await submitCarrierBol(order.id, body)
    getOrderById(order.id)
  } catch (e) {
    console.error(e.response)
  } finally {
    actions.setSubmitting(false)
  }
}
