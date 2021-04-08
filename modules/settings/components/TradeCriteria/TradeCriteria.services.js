import * as Yup from 'yup'
//Services
import { errorMessages } from '../../../../constants/yupValidation'
//Constants
import { DROPDOWNS } from './TradeCriteria.constants'

/**
 * @category Settings - Trade Criteria
 * @method
 * @param {object} criteria
 * @param {object} criteriaOptions
 * @return {Object<string, any>} Initial object for form.
 */
export const getInitialFormValues = (criteria, criteriaOptions) => {
  let initialValues = {}
  //converts values of criteria to keys of criteriaOptions based on values between criteria and criteriaOptions[key]
  Object.entries(criteria)?.forEach(([k, val]) => {
    let [key, value] = Object.entries(criteriaOptions[k]).find(([key, value]) => value === val)
    initialValues[k] = key
  })
  return initialValues
}

/**
 * Validation of form.
 * @category Settings - Trade Criteria
 * @method
 */
export const formValidation = () =>
  Yup.object().shape({
    aggregate_insurance: Yup.string().required(errorMessages.requiredMessage),
    days_beyond: Yup.string().required(errorMessages.requiredMessage),
    credit_risk: Yup.string().required(errorMessages.requiredMessage),
    violations: Yup.string().required(errorMessages.requiredMessage),
    social_presence: Yup.string().required(errorMessages.requiredMessage)
  })

/**
 * Get all atributes for dropdowns.
 * @category Settings - Trade Criteria
 * @method
 * @param {{criteria: object, criteriaOptions: object, messages: Array}} tradeCriteria
 * @return {{}[]}
 */
export const getDropdowns = tradeCriteria => {
  if (!tradeCriteria?.criteria || !tradeCriteria?.criteriaOptions) return
  let dropdowns = []

  Object.entries(tradeCriteria.criteria)?.forEach(([k, val]) => {
    //Gets key from criteriaOptions[k] which is value for dropdown and for request body PUT /api/tradepass/my-criteria
    let [key, value] = Object.entries(tradeCriteria.criteriaOptions[k]).find(([key, value]) => value === val)

    if (DROPDOWNS[k]) {
      dropdowns.push({
        ...DROPDOWNS[k],
        id: k,
        value: key,
        options: Object.entries(tradeCriteria.criteriaOptions[k]).map(([keyOption, v]) => ({
          key: keyOption,
          text: v,
          value: keyOption
        }))
      })
    }
  })

  return dropdowns
}
