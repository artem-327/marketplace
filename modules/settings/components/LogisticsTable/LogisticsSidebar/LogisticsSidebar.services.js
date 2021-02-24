//Components
import * as Yup from 'yup'
import { errorMessages, passwordValidationAnyChar } from '~/constants/yupValidation'
//Services
import { getSafe } from '../../../../../utils/functions'
//Constants
import { initialValues } from './LogisticsSidebar.constants'
const { requiredMessage } = errorMessages

/**
 * Get Formik initial values
 *
 * @param {object} sidebarValues - Data for loaded Logistics item.
 * @return {object} The object with data for Formik component.
 */
export const getInitialValues = sidebarValues => {
  return sidebarValues
    ? {
        providerIdentifier: JSON.stringify(sidebarValues.provider.identifier),
        providerIdentifierName: `${sidebarValues.provider.name} (${sidebarValues.provider.identifierValue})`,
        username:
          sidebarValues.accountInfos && sidebarValues.accountInfos.length ? sidebarValues.accountInfos[0].username : '',
        password: '',
        apiKey:
          sidebarValues.accountInfos && sidebarValues.accountInfos.length ? sidebarValues.accountInfos[0].apiKey : ''
      }
    : initialValues
}

/**
 * Get Formik validation scheme
 *
 * @param {object} sidebarValues - Data for loaded Logistics item.
 * @return {object} Validation scheme for Formik component.
 */
export const getValidationSchema = sidebarValues => {
  if (sidebarValues) {
    return Yup.object().shape({
      username: Yup.string(requiredMessage).required(requiredMessage),
      password: passwordValidationAnyChar()
    })
  } else {
    return Yup.object().shape({
      providerIdentifier: Yup.string(requiredMessage).required(requiredMessage),
      username: Yup.string(requiredMessage).required(requiredMessage),
      password: passwordValidationAnyChar()
    })
  }
}

/**
 * Submit form
 *
 * @param {object} values - Formik input data
 * @param {object} sidebarValues - Data for loaded Logistics item
 * @param {object} actions - Necessary functions to submitForm {updateLogisticsAccount, createLogisticsAccount, getLogisticsAccounts, setSubmitting, closeSidebar, chatWidgetVerticalMoved}
 */
export const submitForm = async (values, sidebarValues, actions) => {
  const {
    updateLogisticsAccount,
    createLogisticsAccount,
    getLogisticsAccounts,
    setSubmitting,
    closeSidebar,
    chatWidgetVerticalMoved
  } = actions
  const apiKey = values.apiKey ? { apiKey: values.apiKey } : null

  const payload = {
    providerIdentifier: getSafe(() => sidebarValues.provider.identifierType, '')
      ? {
          type: sidebarValues.provider.identifierType,
          value: sidebarValues.provider.identifierValue
        }
      : JSON.parse(values.providerIdentifier),
    username: values.username,
    password: values.password,
    ...apiKey
  }

  try {
    if (sidebarValues) {
      await updateLogisticsAccount(sidebarValues.id, payload)
    } else {
      await createLogisticsAccount(payload)
      getLogisticsAccounts()
    }
  } catch {
  } finally {
    setSubmitting(false)
    closeSidebar()
    await chatWidgetVerticalMoved(false)
  }
}
