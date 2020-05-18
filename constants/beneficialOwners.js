import { deepSearch } from '~/utils/functions'
import { getStringISODate } from '~/components/date-format'

export const USA = JSON.stringify({ countryId: 1, hasProvinces: true })

export const maxBeneficialOwners = 4

export const beneficialOwner = {
  address: {
    streetAddress: '',
    city: '',
    country: USA,
    zip: '',
    province: ''
  },
  dateOfBirth: '',
  firstName: '',
  lastName: '',
  ssn: ''
}

export const ownersToPayload = beneficialOwners => {
  let payload = []
  beneficialOwners.forEach((owner, i) => {
    // If we find any value that is empty it means all values are empty, due to validation
    // so we dont care about such beneficialOwner...
    if (!deepSearch(owner, (val, key) => val === '' && key !== 'country')) {
      payload.push({
        ...owner,
        ...owner.address,
        country: JSON.parse(owner.address.country).countryId,
        dateOfBirth: owner.dateOfBirth ? getStringISODate(owner.dateOfBirth).split('T')[0] : ''
        // zip: JSON.parse(owner.address.zip).zip
      })
      delete payload[i].address
    }
  })

  delete payload.address
  return payload
}
