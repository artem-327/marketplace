import * as Yup from 'yup'
//Services
import { errorMessages } from '../../../../constants/yupValidation'
//Constants
import { DROPDOWNS } from './TradeCriteria.constants'

/**
 * @category Settings - Trade Criteria
 * @method
 * @return {Object<string, any>} Initial object for form.
 */
export const getInitialFormValues = dropdowns => {
  const initialValues = {
    COMPANY_TP_CRITERIA_DAY_BEYOND_TERM: '',
    COMPANY_TP_CRITERIA_AGGREGATE_INSURANCE: '',
    COMPANY_TP_CRITERIA_CREDIT_RISK: '',
    COMPANY_TP_CRITERIA_VIOLATIONS: '',
    COMPANY_TP_CRITERIA_SOCIAL_PRESENCE: ''
  }
  if (dropdowns?.length) {
    dropdowns.forEach(d => {
      initialValues[d?.name] = d?.value
    })
  }

  return initialValues
}

/**
 * Validation of form.
 * @category Settings - Trade Criteria
 * @method
 */
export const formValidation = () =>
  Yup.object().shape({
    COMPANY_TP_CRITERIA_DAY_BEYOND_TERM: Yup.string().required(errorMessages.requiredMessage),
    COMPANY_TP_CRITERIA_AGGREGATE_INSURANCE: Yup.string().required(errorMessages.requiredMessage),
    COMPANY_TP_CRITERIA_CREDIT_RISK: Yup.string().required(errorMessages.requiredMessage),
    COMPANY_TP_CRITERIA_VIOLATIONS: Yup.string().required(errorMessages.requiredMessage),
    COMPANY_TP_CRITERIA_SOCIAL_PRESENCE: Yup.string().required(errorMessages.requiredMessage)
  })

/**
 * Get all atributes for dropdowns.
 * @category Settings - Trade Criteria
 * @method
 * @param {{code: object, possibleValues: object, id: number, value: string}[]} settings
 * @return {{}[]}
 */
export const getDropdowns = settings => {
  if (!settings?.length) return
  let dropdowns = []
  settings.forEach(s => {
    if (DROPDOWNS[s.code] && s?.possibleValues?.length) {
      dropdowns.push({
        ...DROPDOWNS[s.code],
        id: s?.id,
        value: s?.value === 'EMPTY_SETTING' ? '' : s?.value,
        options: s?.possibleValues.map(v => ({
          key: v?.value,
          text: v?.displayName,
          value: v?.value
        }))
      })
    }
  })
  return dropdowns
}
