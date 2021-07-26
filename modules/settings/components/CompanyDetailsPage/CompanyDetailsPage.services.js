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
    email: getSafe(() => values.primaryUser.email, ''),
    phone: getSafe(() => values.primaryUser.phone, ''),
    naicsCode: values?.naicsCategory?.naicsId,
    companyPhone: getSafe(() => values.phone, '')
  }
}

export const handleSubmit = async (values, { setSubmitting }, props, state) => {
  console.log('@@@MarketingMaterials - handleSubmit values', values)
  const { postCompanyLogo, deleteCompanyLogo, getIdentity, company, updateCompanyDetails } = props
  const { companyLogo, shouldUpdateLogo } = state

  try {
    let newCompanyObj = { ...values, phone: values.companyPhone }
    // Company request object
    let requestBodyCompany = getCompanyRequestObject(company, newCompanyObj)

    // Primary User endpoint data
    const userData = company.primaryUser
    let requestBodyUser = {
      additionalBranches: getSafe(() => userData.additionalBranches, []).map(el => el.id),
      buyMarketSegments: getSafe(() => userData.buyMarketSegments, []).map(el => el.id),
      email: values.email,
      homeBranch: getSafe(() => userData.homeBranch.id, null),
      jobTitle: getSafe(() => userData.jobTitle, null),
      name: getSafe(() => userData.name, null),
      phone: values.phone,
      preferredCurrency: getSafe(() => userData.preferredCurrency.id, null),
      regulatoryDeaListAuthorized: getSafe(() => userData.regulatoryDeaListAuthorized, false),
      regulatoryDeaListSignedDate: getSafe(() => userData.regulatoryDeaListSignedDate, null),
      regulatoryDhsCoiAuthorized: getSafe(() => userData.regulatoryDhsCoiAuthorized, false),
      regulatoryDhsCoiSignedDate: getSafe(() => userData.regulatoryDhsCoiSignedDate, null),
      regulatoryHazmatAuthorized: getSafe(() => userData.regulatoryHazmatAuthorized, false),
      roles: getSafe(() => userData.roles, []).map(el => el.id),
      sellMarketSegments: getSafe(() => userData.sellMarketSegments, []).map(el => el.id)
    }
    removeEmpty(requestBodyUser)

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
      branch: requestBodyBranch,
      user: requestBodyUser
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
