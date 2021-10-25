import { getSafe } from '~/utils/functions'

export const getInitValues = item => {
  let {
    productOffer: { companyProduct }
  } = item

  const unNumber = getSafe(
    () => item.cfUnNumber,
    getSafe(() => companyProduct.companyGenericProduct.cfUnNumber, null)
  )
  const packagingGroup = getSafe(
    () => item.cfPackagingGroup,
      getSafe(() => companyProduct.companyGenericProduct.cfPackagingGroup, null)
  )
  const hazardClass = getSafe(
    () => item.cfHazardClass,
    getSafe(() => companyProduct.companyGenericProduct.cfHazardClass, null)
  )
  const freightClass = getSafe(
    () => item.cfFreightClass,
    getSafe(() => companyProduct.freightClass, null)
  )
  const nmfcNumber = getSafe(
    () => item.cfNmfcNumber,
    getSafe(() => companyProduct.nmfcNumber, null)
  )

  return {
    unNumber: unNumber ? `${unNumber.unNumberCode} - ${unNumber.description}` : '',
    packagingGroup: packagingGroup ? `${packagingGroup.groupCode} - ${packagingGroup.description}` : '',
    hazardClass: hazardClass ? `${hazardClass.classCode} - ${hazardClass.description}` : '',
    freightClass: freightClass ? freightClass : '',
    nmfcNumber: nmfcNumber ? `${nmfcNumber.code} - ${nmfcNumber.description}` : '',
    stackable: getSafe(() => item.stackable, companyProduct.stackable || false)
  }
}