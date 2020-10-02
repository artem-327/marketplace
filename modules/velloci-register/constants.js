export const titleIds = [
  'velloci.controlPerson',
  'velloci.businessInfo',
  'velloci.companyFormationDocument',
  'velloci.ownerInformation',
  'velloci.verifyPersonalInformation',
  'velloci.termsAndConditions'
]

export const titleForms = [
  'controlPerson',
  'businessInfo',
  'companyFormationDocument',
  'ownerInformation',
  'verifyPersonalInformation',
  'termsAndConditions'
]

export const subtitleIds = ['', 'velloci.businessInfo.subtitle', '', 'velloci.ownerInformation.subtitle', '', '']

export const setupPages = [
  { title: 'velloci.setupIndicator.bussinesVerification', content: 'velloci.setupIndicator.enity' },
  { title: 'velloci.setupIndicator.bussinesVerification', content: 'velloci.setupIndicator.moreBeneficialOwners' },
  { title: 'velloci.setupIndicator.bussinesVerification', content: 'velloci.setupIndicator.enity' },
  { title: 'velloci.setupIndicator.bussinesVerification', content: 'velloci.setupIndicator.enity' },
  { title: 'velloci.setupIndicator.personalIdentify', content: 'velloci.setupIndicator.individualOwners' },
  { title: 'velloci.setupIndicator.personalIdentify', content: 'velloci.setupIndicator.individualOwners' }
]

export const verifyPersonalInformation = {
  firstName: '',
  lastName: '',
  middleName: '',
  email: '',
  phoneNumber: '',
  dateOfBirth: '',
  address: {
    streetAddress: '',
    city: '',
    country: '{"countryId":1,"hasProvinces":true}',
    zip: '',
    province: ''
  },
  businessRole: '',
  businessTitle: '',
  socialSecurityNumber: '',
  businessOwnershipPercentage: ''
}

export const initialValues = {
  controlPerson: {
    isControlPerson: false,
    legalBusinessName: '',
    entityType: '',
    industryType: '',
    isEin: true,
    isSsn: false,
    ein: '',
    ssn: '',
    isEstablishedUs: true,
    tinNumber: '',
    naicsCode: ''
  },
  businessInfo: {
    phoneNumber: '',
    email: '',
    url: '',
    address: {
      streetAddress: '',
      city: '',
      country: '{"countryId":1,"hasProvinces":true}',
      zip: '',
      province: ''
    },
    dba: ''
  },
  companyFormationDocument: {
    attachments: []
  },
  ownerInformation: {
    isBeneficialOwner: false,
    isNotBeneficialOwner: true,
    isOtherBeneficialOwner: false,
    isNotOtherBeneficialOwner: true
  },
  verifyPersonalInformation: [verifyPersonalInformation],
  termsAndConditions: {
    electronicComunications: false,
    privacyPolicy: false,
    depositAccountAgreement: false,
    trueComplete: false
  }
}
