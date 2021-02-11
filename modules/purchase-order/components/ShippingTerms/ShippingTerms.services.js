// Services
import { getSafe } from '~/utils/functions'

/**
 * @param {object} props - {hasLogo, useCompanyLogo, getCompanyLogo, companyId}
 * @return none
 */
const getFullAddress = address => {
  let fullAddress = ''
  if (getSafe(() => address.streetAddress, false)) {
    fullAddress = address.streetAddress
  }
  if (getSafe(() => address.city, false)) {
    fullAddress ? (fullAddress += `, ${address.city}`) : (fullAddress = address.city)
  }
  if (getSafe(() => address.province.abbreviation, false)) {
    fullAddress
      ? (fullAddress += `, ${address.province.abbreviation}`)
      : (fullAddress = address.province.abbreviation)
  }
  if (getSafe(() => address.country.code, false)) {
    fullAddress ? (fullAddress += `, ${address.country.code}`) : (fullAddress = i.address.country.code)
  }

  return fullAddress
}


/**
 * @param {object} props - {hasLogo, useCompanyLogo, getCompanyLogo, companyId}
 * @return none
 */
export const getAddressOptions = (addresses, searchValue) => {
  return addresses.map(val => {

    const address = val.warehouse
      ? getSafe(() => val.deliveryAddress.address, '')
      : getSafe(() => val.address, '')

    const name = val.warehouse
      ? !val.deliveryAddress.addressName
        ? getSafe(() => val.deliveryAddress.cfName, '')
        : getSafe(() => val.deliveryAddress.addressName, '')
      : !val.addressName
        ? getSafe(() => val.cfName, '')
        : getSafe(() => val.addressName, '')

    return ({
      id: val.id,
      name,
      description: getFullAddress(address),
      fullAddress: val.warehouse ? val.deliveryAddress : val,
      warehouse: val.warehouse
    })}
  )
}
