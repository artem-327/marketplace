import { generateToastMarkup, getSafe, getFloatOrNull, getIntOrNull } from '~/utils/functions'
import { freightClassValidation } from '~/constants/yupValidation'
import { Header } from 'semantic-ui-react'
import { debounce } from 'lodash'
import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'

export const onHazmatPopup = async (item, setNmfcNumberInitOptions, setUnNumberInitOptions, setOpenModal) => {
  let option,
    nmfcNumbers = []

  option = getSafe(() => item.cfNmfcNumber, null)
  if (option) nmfcNumbers.push(option)
  option = getSafe(() => item.productOffer.companyProduct.nmfcNumber, null)
  if (nmfcNumbers && option && nmfcNumbers[0].id !== option.id) nmfcNumbers.push(option)

  let unNumbers = []
  option = getSafe(() => item.cfUnNumber, null)
  if (option) unNumbers.push(option)
  option = getSafe(() => item.productOffer.companyProduct.companyGenericProduct.cfUnNumber, null)
  if (unNumbers && option && unNumbers[0].id !== option.id) unNumbers.push(option)

  nmfcNumbers = nmfcNumbers.map(d => {
    return {
      key: d.id,
      text: d.code,
      value: d.id,
      content: <Header content={d.code} subheader={d.description} style={{ fontSize: '1em' }} />
    }
  })

  unNumbers = unNumbers.map(d => {
    return {
      key: d.id,
      text: d.unNumberCode,
      value: d.id,
      content: <Header content={d.unNumberCode} subheader={d.description} style={{ fontSize: '1em' }} />
    }
  })

  setNmfcNumberInitOptions(nmfcNumbers)
  setUnNumberInitOptions(unNumbers)
  setOpenModal(true)
}


export const getInitValues = item => {
  let {
    productOffer: { companyProduct }
  } = item

  return {
    unNumber: getSafe(
      () => item.cfUnNumber.id,
      getSafe(() => companyProduct.companyGenericProduct.cfUnNumber.id, null)
    ),
    packagingGroup: getSafe(
      () => item.cfPackagingGroup.id,
      getSafe(() => companyProduct.companyGenericProduct.cfPackagingGroup.id, null)
    ),
    hazardClass: getSafe(
      () => item.cfHazardClass.id,
      getSafe(() => companyProduct.companyGenericProduct.cfHazardClass.id, null)
    ),
    freightClass: getSafe(
      () => item.cfFreightClass,
      getSafe(() => companyProduct.freightClass, '')
    ),
    nmfcNumber: getSafe(
      () => item.cfNmfcNumber.id,
      getSafe(() => companyProduct.nmfcNumber.id, null)
    ),
    stackable: getSafe(() => item.stackable, companyProduct.stackable || false)
  }
}

export const validationSchema = Yup.object().shape({
  freightClass: freightClassValidation()
})

export const handleUnNumberChange = debounce((_, { searchQuery }, props) => {
  props.getUnNumbersByString(searchQuery)
}, 250)

export const handleSearchNmfcNumberChange = debounce((searchQuery, props) => {
  props.getNmfcNumbersByString(searchQuery)
}, 250)

export const handleSubmit = async (
  values, { setSubmitting }, props, setEdittingHazmatInfo, setLoadCartRequired, setOpenModal
) => {
  const {
    item,
    intl: { formatMessage },
    updateHazmatInfo,
    toastManager,
    getCart
  } = props

  try {
    setEdittingHazmatInfo(false)
    await updateHazmatInfo(item.id, {
      unNumber: getIntOrNull(values.unNumber),
      packagingGroup: getIntOrNull(values.packagingGroup),
      hazardClass: getIntOrNull(values.hazardClass),
      freightClass: getFloatOrNull(values.freightClass),
      nmfcNumber: getIntOrNull(values.nmfcNumber),
      stackable: values.stackable
    })
    getCart()
    toastManager.add(
      generateToastMarkup(
        <FormattedMessage
          id='notifications.hazardInfoUpdated.header'
          defaultMessage={`Hazardous informations for ${item.productOffer.tradeName} updated`}
          values={{ name: item.productOffer.tradeName }}
        />,
        <FormattedMessage
          id='notifications.hazardInfoUpdated.content'
          defaultMessage='Hazardous informations successfully updated'
        />
      ),
      { appearance: 'success' }
    )
    setOpenModal(false)
  } catch (e) {
    console.error(e)
  } finally {
    setSubmitting(false)
  }
}