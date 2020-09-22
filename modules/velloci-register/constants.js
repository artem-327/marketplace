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
    attachments: [],
    documentType: ''
  },
  ownerInformation: {
    isBeneficialOwner: false,
    isNotBeneficialOwner: false,
    isOtherBeneficialOwner: false,
    isNotOtherBeneficialOwner: false
  },
  verifyPersonalInformation: [verifyPersonalInformation],
  termsAndConditions: {
    electronicComunications: false,
    privacyPolicy: false,
    depositAccountAgreement: false,
    trueComplete: false
  }
}

export const verifyPersonalInformationTest = {
  firstName: 'Honza',
  lastName: 'Novák',
  middleName: '',
  email: 'sdfgdsfgv@yds.ch',
  phoneNumber: '+12345678901',
  dateOfBirth: '01. 01. 1980',
  address: {
    streetAddress: '627 Sugar Run Rd',
    city: 'Altoona 3',
    country: '{"countryId":1,"hasProvinces":true}',
    zip: '16601',
    province: 10
  },
  businessRole: 'controlling_officer',
  businessTitle: 'Test Business Title',
  socialSecurityNumber: '12345678912',
  businessOwnershipPercentage: 56
}

export const initialValuesTest = {
  controlPerson: {
    isControlPerson: true,
    legalBusinessName: 'Jan Novak',
    entityType: 'corporation',
    industryType: 111,
    isEin: true,
    isSsn: false,
    ein: '123456789',
    ssn: '',
    isEstablishedUs: true,
    tinNumber: '1234564864',
    naicsCode: 721
  },
  businessInfo: {
    phoneNumber: '+12345678901',
    email: 'sdfg@sdfu.cv',
    url: 'https://www.aaaa.cz',
    address: {
      streetAddress: '627 Sugar Run Rd',
      city: 'Altoona 3',
      country: '{"countryId":1,"hasProvinces":true}',
      zip: '16601',
      province: 10
    },
    dba: 'Jak mak'
  },
  companyFormationDocument: {
    attachments: [],
    documentType: 'articles_of_incorporation'
  },
  ownerInformation: {
    isBeneficialOwner: true,
    isNotBeneficialOwner: false,
    isOtherBeneficialOwner: false,
    isNotOtherBeneficialOwner: false
  },
  verifyPersonalInformation: [verifyPersonalInformationTest],
  termsAndConditions: {
    electronicComunications: true,
    privacyPolicy: true,
    depositAccountAgreement: true,
    trueComplete: true
  }
}
