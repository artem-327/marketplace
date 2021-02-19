import * as Yup from 'yup'
//Services
import { getSafe, removeEmpty } from '../../../../utils/functions'
import { errorMessages } from '../../../../constants/yupValidation'

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
    daysBeyondTerm: Yup.string().required(errorMessages.requiredMessage),
    aggregateInsurance: Yup.string().required(errorMessages.requiredMessage),
    creditRisk: Yup.string().required(errorMessages.requiredMessage),
    violations: Yup.string().required(errorMessages.requiredMessage),
    socialPresence: Yup.string().required(errorMessages.requiredMessage)
  })
