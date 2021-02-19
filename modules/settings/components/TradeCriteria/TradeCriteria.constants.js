/**
 * Options for Dropdown Days Beyond
 * @category Settings - Trade Criteria
 * @constant
 *
 */
export const DAYS_BEYOND = [
  {
    key: 'Net 15',
    text: 'Net 15',
    value: 'Net 15'
  },
  {
    key: 'Net 30',
    text: 'Net 30',
    value: 'Net 30'
  },
  {
    key: 'Net 45',
    text: 'Net 45',
    value: 'Net 45'
  },
  {
    key: 'Net 90',
    text: 'Net 90',
    value: 'Net 90'
  },
  {
    key: 'Net 120',
    text: 'Net 120',
    value: 'Net 120'
  }
]

/**
 * Options for Dropdown Aggregate Insurance
 * @category Settings - Trade Criteria
 * @constant
 *
 */
export const AGGREGATE_INSURANCE = [
  {
    key: '1,000,000 - 2,500,000',
    text: '1,000,000 - 2,500,000',
    value: '1,000,000 - 2,500,000'
  },
  {
    key: '2,500 001 - 5,000 000',
    text: '2,500 001 - 5,000 000',
    value: '2,500 001 - 5,000 000'
  },
  {
    key: '5,000 001 - 7,500,000',
    text: '5,000 001 - 7,500,000',
    value: '5,000 001 - 7,500,000'
  },
  {
    key: '7,500,001 - 10,000,000',
    text: '7,500,001 - 10,000,000',
    value: '7,500,001 - 10,000,000'
  },
  {
    key: '10,000,000 +',
    text: '10,000,000 +',
    value: '10,000,000 +'
  }
]

/**
 * Options for Dropdown Credit Risk
 * @category Settings - Trade Criteria
 * @constant
 *
 */
export const CREDIT_RISK = [
  {
    key: '0-20',
    text: '0-20 (Very High Risk)',
    value: '0-20'
  },
  {
    key: '20 - 40',
    text: '20 - 40 (High Risk)',
    value: '20 - 40'
  },
  {
    key: '40 - 60',
    text: '40 - 60 (Moderate Risk)',
    value: '40 - 60'
  },
  {
    key: '60 - 80',
    text: '60 - 80 (Low Risk)',
    value: '60 - 80'
  },
  {
    key: '80 - 100',
    text: '80 - 100 (Very Low Risk)',
    value: '80 - 100'
  }
]

/**
 * Options for Dropdown Violations
 * @category Settings - Trade Criteria
 * @constant
 *
 */
export const VIOLATIONS = [
  {
    key: '0 - 1',
    text: '0 - 1',
    value: '0 - 1'
  },
  {
    key: '2',
    text: '2',
    value: '2'
  },
  {
    key: '3',
    text: '3',
    value: '3'
  },
  {
    key: '4',
    text: '4',
    value: '4'
  },
  {
    key: '5 +',
    text: '5 +',
    value: '5 +'
  }
]

/**
 * Options for Dropdown Social Presence
 * @category Settings - Trade Criteria
 * @constant
 *
 */
export const SOCIAL_PRESENCE = [
  {
    key: 'None',
    text: 'None',
    value: 'None'
  },
  {
    key: 'Website Only',
    text: 'Website Only',
    value: 'Website Only'
  },
  {
    key: 'Website + 1 Social',
    text: 'Website + 1 Social',
    value: 'Website + 1 Social'
  },
  {
    key: 'Website + 2 Socials',
    text: 'Website + 2 Socials',
    value: 'Website + 2 Socials'
  },
  {
    key: 'Website + 3 Socials',
    text: 'Website + 3 Socials',
    value: 'Website + 3 Socials'
  }
]

/**
 * Dropdowns and all attributes
 * @category Settings - Trade Criteria
 * @constant
 *
 */
export const DROPDOWNS = [
  {
    idTitle: 'settings.tradeCriteria.daysBeyond.titleLabel',
    textTitle: 'Days Beyond Term',
    idSubTitle: 'settings.tradeCriteria.daysBeyond.subLabel',
    textSubTitle: 'What Days Beyond Term (DBT) are you comfortable with your customers/partners having?',
    name: 'daysBeyondTerm',
    options: DAYS_BEYOND,
    idPlaceholder: 'settings.tradeCriteria.selectPaymentTerms',
    textPlaceholder: 'Select your Payment Terms',
    dataTest: 'settings_trade_criteria_days_beyond_drpdn'
  },
  {
    idTitle: 'settings.tradeCriteria.aggregateInsurance.titleLabel',
    textTitle: 'Aggregate Insurance',
    idSubTitle: 'settings.tradeCriteria.aggregateInsurance.subLabel',
    textSubTitle: 'What total amount of Insurance Coverage do you prefer your customers/partners carry?',
    name: 'aggregateInsurance',
    options: AGGREGATE_INSURANCE,
    idPlaceholder: 'settings.tradeCriteria.aggregateInsurance.placeholder',
    textPlaceholder: 'Select Aggregate Insurance',
    dataTest: 'settings_trade_criteria_aggregate_insurance_drpdn'
  },
  {
    idTitle: 'settings.tradeCriteria.creditRisk.titleLabel',
    textTitle: 'Credit Risk',
    idSubTitle: 'settings.tradeCriteria.creditRisk.subLabel',
    textSubTitle: 'What credit profile is your company comfortable doing business with?',
    name: 'creditRisk',
    options: CREDIT_RISK,
    idPlaceholder: 'settings.tradeCriteria.creditRisk.placeholder',
    textPlaceholder: 'Select Credit Risk',
    dataTest: 'settings_trade_criteria_credit_risk_drpdn'
  },
  {
    idTitle: 'settings.tradeCriteria.violations.titleLabel',
    textTitle: 'Violations',
    idSubTitle: 'settings.tradeCriteria.violations.subLabel',
    textSubTitle:
      'How many public violations (including lawsuits, liens, bankruptcy filings) is your company comfortable with in a customer/partner?',
    name: 'violations',
    options: VIOLATIONS,
    idPlaceholder: 'settings.tradeCriteria.violations.placeholder',
    textPlaceholder: 'Select Presence Violations',
    dataTest: 'settings_trade_criteria_violations_drpdn'
  },
  {
    idTitle: 'settings.tradeCriteria.socialPresence.titleLabel',
    textTitle: 'Social Presence',
    idSubTitle: 'settings.tradeCriteria.socialPresence.subLabel',
    textSubTitle:
      'Websites and social media is often an indicator of a companies integrity. How many social accounts do you  prefer your customers/partners have?',
    name: 'socialPresence',
    options: SOCIAL_PRESENCE,
    idPlaceholder: 'settings.tradeCriteria.socialPresence.placeholder',
    textPlaceholder: 'Select Social Presence',
    dataTest: 'settings_trade_criteria_social_presence_drpdn'
  }
]
