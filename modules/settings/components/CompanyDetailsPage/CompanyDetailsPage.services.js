// Constants
import { getSafe, removeEmpty } from '~/utils/functions'
import { INITIAL_VALUES } from '../../../company-form/components/CompanyDetails.constants'
//Services
import { getCompanyRequestObject } from '../../../../services'

export const getInitialFormValues = values => {
  const provinceId = getSafe(() => values.primaryBranch.deliveryAddress.address.province.id, '')
  const countryId = getSafe(() => values.primaryBranch.deliveryAddress.address.country.id, null)
  const hasProvinces = getSafe(() => values.primaryBranch.deliveryAddress.address.country.hasProvinces, false)
  const zip = getSafe(() => values.primaryBranch.deliveryAddress.address.zip.zip, '')

  console.log('!!!!!!!!!! getInitialFormValues values', values)

  return {
    ...INITIAL_VALUES,
    ...values,
    associations: getSafe(() => values.associations, []).map(el => el.id),
    businessType: getSafe(() => values.businessType.id, ''),
    address: {
      streetAddress: getSafe(() => values.primaryBranch.deliveryAddress.address.streetAddress, ''),
      city: getSafe(() => values.primaryBranch.deliveryAddress.address.city, ''),
      province: provinceId,
      country: countryId ? JSON.stringify({ countryId, hasProvinces }) : '',
      zip
    },
    naicsCode: values?.naicsCategory?.naicsId,
  }
}

export const handleSubmit = async (values, { setSubmitting }, props, state) => {
  const { postCompanyLogo, deleteCompanyLogo, getIdentity, company, updateCompanyDetails } = props
  const { companyLogo, shouldUpdateLogo } = state

  try {
    let requestBodyCompany = getCompanyRequestObject(company, values)

    // Primary Branch endpoint data
    const branchData = company.primaryBranch
    let requestBodyBranch = {
      deaListReceiveFlag: getSafe(() => branchData.deaListReceive, false),
      epaReceiveFlag: getSafe(() => branchData.epaReceive, false),
      taxExemptReceiveFlag: getSafe(() => branchData.taxExemptReceive, false),
      taxId: getSafe(() => branchData.taxId, null),
      warehouse: getSafe(() => branchData.warehouse, false),
      deliveryAddress: {
        addressName: getSafe(() => branchData.deliveryAddress.addressName, null),
        callAhead: getSafe(() => branchData.deliveryAddress.callAhead, false),
        closeTime: getSafe(() => branchData.deliveryAddress.closeTime, null),
        contactEmail: getSafe(() => branchData.deliveryAddress.contactEmail, null),
        contactName: getSafe(() => branchData.deliveryAddress.contactName, null),
        contactPhone: getSafe(() => branchData.deliveryAddress.contactPhone, null),
        deliveryNotes: getSafe(() => branchData.deliveryAddress.deliveryNotes, null),
        forkLift: getSafe(() => branchData.deliveryAddress.forkLift, false),
        liftGate: getSafe(() => branchData.deliveryAddress.liftGate, false),
        readyTime: getSafe(() => branchData.deliveryAddress.readyTime, null),
        address: {
          city: values.address.city,
          country: JSON.parse(values.address.country).countryId,
          province: values.address.province,
          streetAddress: values.address.streetAddress,
          zip: values.address.zip
        }
      }
    }
    removeEmpty(requestBodyBranch)

    await updateCompanyDetails(values.id, {
      company: requestBodyCompany,
      branch: requestBodyBranch
    })

    if (shouldUpdateLogo) {
      if (companyLogo) {
        await postCompanyLogo(values.id, companyLogo)
      } else {
        await deleteCompanyLogo(values.id)
      }
    }
  } catch (err) {
    console.error(err)
  } finally {
    setSubmitting(false)
  }
}
