import * as Yup from 'yup'
import { errorMessages, phoneValidation } from '~/constants/yupValidation'
//Services
import { getSafe } from '~/utils/functions'
//Constants
import { currencyId } from '~/constants/index'

/**
 * Validates values from form.
 */
export const userFormValidation = () =>
  Yup.lazy(values => {
    return Yup.object().shape({
      name: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
      email: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
      additionalBranches: Yup.array(),
      jobTitle: Yup.string().trim().min(3, errorMessages.minLength(3)),
      phone: phoneValidation(10),
      homeBranch: Yup.number().required(errorMessages.requiredMessage),
      roles: Yup.array().min(1, errorMessages.minOneRole)
    })
  })

/**
 * Gets home's branches for dropdown options.
 *
 * @param {{id: number, deliveryAddress: {cfName: string}}[]} branches
 * @return {{key: number, value: number, text: string}[]} Array objects for dropdown options.
 */
export const getHomeBranchesOptions = branches =>
  branches.map(b => ({ key: b.id, value: b.id, text: b.deliveryAddress.cfName }))

/**
 * Gets branches where warehouse === false for dropdown options.
 *
 * @param {{id: number, deliveryAddress: {cfName: string}}[]} branches
 * @return {{key: number, value: number, text: string}[]} Array objects for dropdown options.
 */
export const getBranchesOptions = branches => {
  let result = []
  branches.forEach(
    b => b.warehouse === false && result.push({ key: b.id, value: b.id, text: b.deliveryAddress.cfName })
  )
  return result
}

/**
 * Gets sidebar or initial values for form.
 *
 * @param {object} sidebarValues
 * @return {{
 * name: string,
 * email: string,
 * company: string,
 * homeBranch: string,
 * preferredCurrency: number,
 * additionalBranches: array,
 * jobTitle: string,
 * phone: string,
 * roles: array,
 * buyMarketSegments: array,
 * sellMarketSegments: array}} Object fields for form.
 */
export const getInitialFormValues = sidebarValues => {
  return sidebarValues
    ? {
        additionalBranches: sidebarValues.additionalBranches.map(d => d.id),
        email: sidebarValues.email,
        homeBranch: sidebarValues.homeBranch ? sidebarValues.homeBranch.id : '',
        jobTitle: sidebarValues.jobTitle,
        name: sidebarValues.name,
        phone: sidebarValues.phone,
        preferredCurrency: currencyId,
        roles: sidebarValues.roles.map(d => d.id),
        sellMarketSegments: getSafe(() => sidebarValues.sellMarketSegments, []).map(d => d.id),
        buyMarketSegments: getSafe(() => sidebarValues.buyMarketSegments, []).map(d => d.id)
      }
    : {
        name: '',
        email: '',
        company: '',
        homeBranch: '',
        preferredCurrency: currencyId,
        additionalBranches: [],
        jobTitle: '',
        phone: '',
        roles: [],
        buyMarketSegments: [],
        sellMarketSegments: []
      }
}

/**
 * Handles Sell Market Segment dropdown change.
 *
 * @param {number} value
 * @param {{value: number}[]} options
 * @return {array} Array objects for dropdown options.
 */
export const handleSellMarketSegmentsChange = (value, options) => options.filter(el => value.some(v => el.value === v))
