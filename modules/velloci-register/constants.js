export const titleIds = [
  'onboarding.legal.agreements',
  'onboarding.setup.indicator.business.information',
  'velloci.controlPerson',
  'onboarding.beneficial.ownership',
  'velloci.ownerInformation',
  'onboarding.setup.indicator.marketing.material',
  'onboarding.setup.indicator.certificate.of.insurance.coi',
  'onboarding.setup.indicator.risk.tolerance',
  'onboarding.setup.indicator.ownership.certifications.title'
]

export const titleForms = [
  'termsAndConditions',
  'businessInfo',
  'controlPerson',
  'ownerInformation',
  'verifyPersonalInformation',
  'marketingMaterial',
  'certificateOfInsurance',
  'riskTolerance',
  'ownershipCertifications'
]

export const subtitleIds = ['', 'velloci.businessInfo.subtitle', '', 'velloci.ownerInformation.subtitle', '', '']

export const setupIndicatorSteps = [
  { type: 'heading', text: 'onboarding.setup.indicator.business.verification' },
  { type: 'step', text: 'onboarding.setup.indicator.agreements.and.terms', step: 0 },
  { type: 'step', text: 'onboarding.setup.indicator.business.information', step: 1, tail: true },
  { type: 'heading', text: 'onboarding.setup.indicator.ownership.verification' },
  { type: 'step', text: 'onboarding.setup.indicator.control.person', step: 2 },
  { type: 'step', text: 'onboarding.setup.indicator.beneficial.owners', step: 3, tail: true },
  { type: 'step', text: 'onboarding.setup.indicator.register.owners', step: 4, tail: true, hidden: true },
  { type: 'heading', text: 'onboarding.setup.indicator.business.profiling' },
  { type: 'step', text: 'onboarding.setup.indicator.marketing.material', step: 5 },
  { type: 'step', text: 'onboarding.setup.indicator.certificate.of.insurance', step: 6 },
  { type: 'step', text: 'onboarding.setup.indicator.risk.tolerance', step: 7 },
  { type: 'step', text: 'onboarding.setup.indicator.ownership.certifications', step: 8, tail: true }
]

export const setupIndicatorStepMobile = [
  {
      group: 0,
      range: [0, 1],
      steps: [
          { type: 'heading', text: 'onboarding.setup.indicator.business.verification' },
          { type: 'step', text: 'onboarding.setup.indicator.agreements.and.terms', step: 0, active: 0 },
          { type: 'step', text: 'onboarding.setup.indicator.business.information', step: 1, active: 1 }
      ],
  },
  {
      group: 1,
      range: [2, 3, 4],
      steps: [
          { type: 'heading', text: 'onboarding.setup.indicator.ownership.verification' },
          { type: 'step', text: 'onboarding.setup.indicator.control.person', step: 0, active: 2 },
          { type: 'step', text: 'onboarding.setup.indicator.beneficial.owners', step: 1, active: 3 },
          { type: 'step', text: 'onboarding.setup.indicator.register.owners', step: 1, hidden: true, active: 4 }
      ]
  },
  {
      group: 2,
      range: [5, 6, 7, 8, 9],
      steps: [
          { type: 'heading', text: 'onboarding.setup.indicator.business.profiling' },
          { type: 'step', text: 'onboarding.setup.indicator.marketing.material', step: 0, active: 5 },
          { type: 'step', text: 'onboarding.setup.indicator.certificate.of.insurance', step: 1, active: 6 },
          { type: 'step', text: 'onboarding.setup.indicator.risk.tolerance', step: 2, active: 7 },
          { type: 'step', text: 'onboarding.setup.indicator.ownership.certifications', step: 3, active: 8 }
      ]
  }
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
    dba: '',
    legalBusinessName: '',
    entityType: '',
    industryType: '',
    markets: [],
    companyType: '',
    isEin: true,
    isSsn: false,
    ein: '',
    ssn: '',
    isEstablishedUs: true,
    tinNumber: '',
    naicsCode: ''
  },
  certificateOfInsurance: {
    file: [],
    documentId: ''
  },
  controlPerson: {
    email: '',
    dateOfBirth: '',
    isControlPerson: false,
    businessTitle: '',
    socialSecurityNumber: '',
    firstName: '',
    lastName: '',
    isBeneficialOwner: false,
    isNotBeneficialOwner: false
  },
  ownerInformation: {
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
