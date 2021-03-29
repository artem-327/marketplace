import * as Yup from 'yup'
//Services
import { addressValidationSchema, errorMessages, phoneValidation, validateTime } from '../../../../../../constants/yupValidation'
import { getSafe } from '../../../../../../utils/functions'
import { removeEmpty } from '../../../../../../utils/functions'

const minLength = errorMessages.minLength(3)
/**
 * Validation of form.
 * @category Settings - Location - Branches
 * @method
 */
export const formValidation = () =>
  Yup.object().shape({
    name: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
    billToAddress: Yup.object().shape({
      address: addressValidationSchema(),
      addressName: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
      contactName: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
      contactPhone: phoneValidation(10).required(errorMessages.requiredMessage),
      contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
      /*readyTime: validateTime(),
      closeTime: validateTime()*/
    }),
    warehouseAddresses: Yup.array().of(
      Yup.object().shape({
        addressName: Yup.string()
          .trim()
          .min(2, errorMessages.minLength(1))
          .required(errorMessages.requiredMessage),
        address: addressValidationSchema(),
        contactName: Yup.string()
          .trim()
          .min(2, errorMessages.minLength(1))
          .required(errorMessages.requiredMessage),
        contactPhone: phoneValidation(10).required(errorMessages.requiredMessage),
        contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage)
      })
    )
  })

/**
 * @category Settings - Location - Branches
 * @param {Object<string, any>} sidebarValues All values for form.
 * @return {Object<string, any>} Initial object for form.
 */
export const getInitialFormValues = sidebarValues => {
  const provinceId = getSafe(() => sidebarValues.billToAddress.address.province.id, '')
  const countryId = getSafe(() => sidebarValues.billToAddress.address.country.id, null)
  const hasProvinces = getSafe(() => sidebarValues.billToAddress.address.country.hasProvinces, false)
  const zip = getSafe(() => sidebarValues.billToAddress.address.zip.zip, '').replace(' ', '')

  const initialValues = {
    billToAddress: {
      address: {
        streetAddress: getSafe(() => sidebarValues.billToAddress.address.streetAddress, ''),
        city: getSafe(() => sidebarValues.billToAddress.address.city, ''),
        province: provinceId,
        country: countryId ? JSON.stringify({ countryId, hasProvinces }) : '',
        zip
      },
      addressName: getSafe(() => sidebarValues.billToAddress.addressName, ''),
      callAhead: getSafe(() => sidebarValues.billToAddress.callAhead, false),
      closeTime: getSafe(() => sidebarValues.billToAddress.closeTime, ''),
      contactEmail: getSafe(() => sidebarValues.billToAddress.contactEmail, ''),
      contactName: getSafe(() => sidebarValues.billToAddress.contactName, ''),
      contactPhone: getSafe(() => sidebarValues.billToAddress.contactPhone, ''),
      deliveryNotes: getSafe(() => sidebarValues.billToAddress.deliveryNotes, ''),
      forkLift: getSafe(() => sidebarValues.billToAddress.forkLift, false),
      liftGate: getSafe(() => sidebarValues.billToAddress.liftGate, false),
      readyTime: getSafe(() => sidebarValues.billToAddress.readyTime, ''),
    },
    name: getSafe(() => sidebarValues.name, '')
  }
  return initialValues
}

/**
 * Submit form and add or edit warehouse.
 * @category Settings - Locations - Branches
 * @method
 * @param {Object<string, any>} values Values of form.
 * @param {{setSubmitting: (isSubmitting: boolean) => void,
 * putEditWarehouse: (requestData: Object<string, any>, id: number) => void,
 * postNewWarehouseRequest: (isCreate: boolean, requestData: Object<string, any>) => void}} helperFunctions
 * @param {number} id
 */
export const submitHandler = async (values, { setSubmitting }, props) => {
  const { sidebarValues, updateCustomer, addCustomer, datagrid } = props
  let customerData = {
    ...values,
    billToAddress: {
      ...values.billToAddress,
      address: {
        ...values.billToAddress.address,
        country: getSafe(() => JSON.parse(values.billToAddress.address.country).countryId, null)
      }
    },
    warehouseAddresses: values.warehouseAddresses.length ? values.warehouseAddresses.map(warAddr => ({
      ...warAddr,
      address: {
        ...warAddr.address,
        country: getSafe(() => JSON.parse(warAddr.address.country).countryId, null)
      }
    })) : null
  }
  removeEmpty(customerData)

  try {
    if (sidebarValues) {
      const {value} = await updateCustomer(sidebarValues.id, customerData)
      datagrid.updateRow(sidebarValues.id, () => value)
      props.chatWidgetVerticalMoved(false)
      props.closeSidebar()

    } else {
      const {value} = await addCustomer(customerData)
      datagrid.loadData()
      props.chatWidgetVerticalMoved(false)
      props.closeSidebar()
    }
  } catch (e) {
    console.error(e)
  } finally {
    setSubmitting(false)
  }
}