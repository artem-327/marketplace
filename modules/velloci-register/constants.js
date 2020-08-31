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

export const initialValues = {
  controlPerson: {
    isControlPerson: false,
    legalBusinessName: '',
    kindBusiness: '',
    industryType: '',
    isEin: true,
    isSsn: false,
    ein: '',
    ssn: '',
    isEstablishedUs: true
  },
  businessInfo: {
    phoneNumber: '',
    emailAddress: '',
    url: '',
    address: {
      streetAddress: '',
      city: '',
      country: '',
      zip: '',
      province: ''
    },
    dbaName: ''
  },
  companyFormationDocument: {
    attachments: []
  },
  ownerInformation: {
    isBeneficialOwner: false,
    isNotBeneficialOwner: false,
    isOtherBeneficialOwner: false,
    isNotOtherBeneficialOwner: false
  },
  verifyPersonalInformation: {
    firstName: '',
    lastName: '',
    middleName: '',
    emailAddress: '',
    phoneNumber: '',
    dateOfBirth: '',
    address: {
      streetAddress: '',
      city: '',
      country: '',
      zip: '',
      province: ''
    },
    businessRole: '',
    socialSecurityNumber: '',
    businessOwnershipPercentage: ''
  },
  termsAndConditions: {
    electronicComunications: false,
    privacyPolicy: false,
    depositAccountAgreement: false,
    trueComplete: false
  }
}
