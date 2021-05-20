export const titleIds = [
  'velloci.companyVerification',
  'velloci.businessInfo',
  'velloci.controlPerson',
  'velloci.companyFormationDocument',
  'velloci.ownerInformation',
  'velloci.verifyPersonalInformation',
  'velloci.termsAndConditions'
]

export const titleForms = [
  'termsAndConditions',
  'businessInfo',
  'controlPerson',
  'companyFormationDocument',
  'ownerInformation',
  'verifyPersonalInformation',
  'termsAndConditions'
]

export const subtitleIds = ['', 'velloci.businessInfo.subtitle', '', 'velloci.ownerInformation.subtitle', '', '']

export const setupIndicatorSteps = [
  { type: 'heading', text: 'onboarding.setup.indicator.business.verification' },
  { type: 'step', text: 'onboarding.setup.indicator.agreements.and.terms', step: 0 },
  { type: 'step', text: 'onboarding.setup.indicator.business.information', step: 1, end: true },
  { type: 'heading', text: 'onboarding.setup.indicator.ownership.verification' },
  { type: 'step', text: 'onboarding.setup.indicator.control.person', step: 2 },
  { type: 'step', text: 'onboarding.setup.indicator.beneficial.owners', step: 3, end: true },
  { type: 'heading', text: 'onboarding.setup.indicator.business.profiling' },
  { type: 'step', text: 'onboarding.setup.indicator.marketing.material', step: 4 },
  { type: 'step', text: 'onboarding.setup.indicator.certificate.of.insurance', step: 5 },
  { type: 'step', text: 'onboarding.setup.indicator.risk.tolerance', step: 6 },
  { type: 'step', text: 'onboarding.setup.indicator.resale.certificates', step: 7 },
  { type: 'step', text: 'onboarding.setup.indicator.ownership.certifications', step: 8, end: true }
]

export const setupIndicatorPages = [
  {
    heading: 'onboarding.setup.indicator.business.verification',
    steps: [
      'onboarding.setup.indicator.agreements.and.terms',
      'onboarding.setup.indicator.ein.documents',
      'onboarding.setup.indicator.articles.of.incorporation',
      'onboarding.setup.indicator.business.information',
      'onboarding.setup.indicator.industry.type'
    ]
  },
  {
    heading: 'onboarding.setup.indicator.ownership.verification',
    steps: [
      'onboarding.setup.indicator.control.person',
      'onboarding.setup.indicator.beneficial.owners'
    ]
  },
  {
    heading: 'onboarding.setup.indicator.business.profiling',
    steps: [
      'onboarding.setup.indicator.marketing.material',
      'onboarding.setup.indicator.certificate.of.insurance',
      'onboarding.setup.indicator.risk.tolerance',
      'onboarding.setup.indicator.resale.certificates',
      'onboarding.setup.indicator.ownership.certifications'
    ]
  }
]

export const setupPages = [
  { title: 'velloci.setupIndicator.bussinesVerification', content: 'velloci.setupIndicator.mainSections', heading: 'onboarding.agreements.and.terms' },
  { title: 'velloci.setupIndicator.bussinesVerificationKYB', content: 'velloci.setupIndicator.enity', heading: 'onboarding.ein.documents' },
  { title: 'velloci.setupIndicator.bussinesVerificationKYB', content: 'velloci.setupIndicator.moreBeneficialOwners', heading: 'onboarding.articles.of.incorporation' },
  { title: 'velloci.setupIndicator.bussinesVerificationKYB', content: 'velloci.setupIndicator.enity', heading: 'onboarding.business.information' },
  { title: 'velloci.setupIndicator.bussinesVerificationKYB', content: 'velloci.setupIndicator.enity', heading: 'onboarding.industry.type' },
  { title: 'velloci.setupIndicator.personalIdentify', content: 'velloci.setupIndicator.individualOwners', heading: 'onboarding.industry.type' },
  { title: 'velloci.setupIndicator.personalIdentify', content: 'velloci.setupIndicator.individualOwners', heading: 'hello world' }
]

export const companyTypeOptions = [
  { text: 'Producer - Specialty Chemicals', value: 'Producer - Specialty Chemicals', key: 'Specialty Chemicals' },
  { text: 'Producer - Downstream Diversified', value: 'Producer - Downstream Diversified', key: 'Downstream Diversified' },
  { text: 'Producer - Upstream Commodity', value: 'Producer - Upstream Commodity', key: 'Upstream Commodity' },
  { text: 'Distributor', value: 'Distributor', key: 'Distributor' },
  { text: 'CommodityTrading', value: 'CommodityTrading', key: 'CommodityTrading' },
  { text: 'Consultant', value: 'Consultant', key: 'Consultant' },
  { text: 'Toll Blending & Compounding', value: 'Toll Blending & Compounding', key: 'Toll Blending & Compounding' },
  { text: 'Contract Manufacturing', value: 'Contract Manufacturing', key: 'Contract Manufacturing' },
  { text: 'End User - Manufacturing', value: 'End User - Manufacturing', key: 'End User - Manufacturing' },
  { text: 'End User - Finished Goods', value: 'End User - Finished Goods', key: 'End User - Finished Goods' }
];

export const marketOptions = [
  { text: 'Adhesives, Sealants', value: 'Adhesives, Sealants', key: 'Adhesives, Sealants' },
  { text: 'Agriculture & Feed', value: 'Agriculture & Feed', key: 'Agriculture & Feed' },
  { text: 'Automative & Transportation', value: 'Automative & Transportation', key: 'Automative & Transportation' },
  { text: 'Aerospace', value: 'Aerospace', key: 'Aerospace' },
  { text: 'Building & Construction', value: 'Building & Construction', key: 'Building & Construction' },
  { text: 'Food & Nutrition', value: 'Food & Nutrition', key: 'Food & Nutrition' },
  { text: 'Healthcare & Pharma', value: 'Healthcare & Pharma', key: 'Healthcare & Pharma' },
  { text: 'Home & Personal Care', value: 'Home & Personal Care', key: 'Home & Personal Care' },
  { text: 'Household, Institutional & Industrial Cleaning', value: 'Household, Institutional & Industrial Cleaning', key: 'Household, Institutional & Industrial Cleaning' },
  { text: 'Industrial Lubricants', value: 'Industrial Lubricants', key: 'Industrial Lubricants' },
  { text: 'Metalworking Fluids', value: 'Metalworking Fluids', key: 'Metalworking Fluids' },
  { text: 'Paints, Inks, Coatings', value: 'Paints, Inks, Coatings', key: 'Paints, Inks, Coatings' },
  { text: 'Petrochemicals', value: 'Petrochemicals', key: 'Petrochemicals' },
  { text: 'Chemical IntermediatesChemical Intermediates', value: 'Chemical Intermediates', key: 'Chemical Intermediates' },
  { text: 'Plastics, Elastomers', value: 'Plastics, Elastomers', key: 'Plastics, Elastomers' },
  { text: 'Printing & Packaging', value: 'Printing & Packaging', key: 'Printing & Packaging' },
  { text: 'Pigments, Dyes', value: 'Pigments, Dyes', key: 'Pigments, Dyes' },
  { text: 'Inorganic Oil, Gas, & MiningCommodities', value: 'Inorganic Commodities', key: 'Inorganic Commodities' },
  { text: 'Oil, Gas, & Mining', value: 'Oil, Gas, & Mining', key: 'Oil, Gas, & Mining' },
  { text: 'Bio-based Chemicals', value: 'Bio-based Chemicals', key: 'Bio-based Chemicals' },
];

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
  businessOwnershipPercentage: 0
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
    isEin: true,
    isSsn: false,
    ein: '',
    ssn: '',
    isEstablishedUs: true,
    tinNumber: '',
    naicsCode: ''
  },
  controlPerson: {
    isControlPerson: false
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
