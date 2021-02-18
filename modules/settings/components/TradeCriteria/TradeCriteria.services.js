import * as Yup from 'yup'
//Services
import { getSafe, removeEmpty } from '../../../../utils/functions'

/**
 * @category Settings - Trade Criteria
 * @method
 * @return {Object<string, any>} Initial object for form.
 */
export const getInitialFormValues = () => {
  const initialValues = {
    daysBeyondTerm: '',
    aggregateInsurance: '',
    creditRisk: '',
    violations: '',
    socialPresence: ''
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
    daysBeyondTerm: Yup.string(),
    aggregateInsurance: Yup.string(),
    creditRisk: Yup.string(),
    violations: Yup.string(),
    socialPresence: Yup.string()
  })

/**
 * Submit form..
 * @category Settings - Trade Criteria
 * @method
 * @param {Object<string, any>} values Values of form.
 * @param {{setSubmitting: (isSubmitting: boolean) => void,
 * postTradeCriteria: (requestData: Object<string, any>) => void,
 * }} helperFunctions
 */
export const submitHandler = async (values, { setSubmitting, postTradeCriteria }) => {
  try {
    await postTradeCriteria(values)
  } catch (err) {
    console.error(err)
  } finally {
    setSubmitting(false)
  }
}
