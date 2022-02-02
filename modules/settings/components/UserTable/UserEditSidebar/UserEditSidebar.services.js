import * as Yup from 'yup'
import { debounce } from 'lodash'
import { GridColumn, Checkbox, FormField } from 'semantic-ui-react'
import { Field as FormikField } from 'formik'
import { isEmpty } from 'lodash'
//Services
import { getSafe, removeEmpty } from '../../../../../utils/functions'
import { errorMessages, phoneValidation } from '../../../../../constants/yupValidation'
//Constants
import { currencyId } from '../../../../../constants/index'
import {
  USER_DAILY_PURCHASE_LIMIT_ID,
  USER_MONTHLY_PURCHASE_LIMIT_ID,
  USER_ORDER_PURCHASE_LIMIT_ID
} from './UserEditSidebar.constants'
//Types
import { TInitialValues } from './UserEditSidebar.types'

/**
 * Validates values from form.
 * @category Settings - Users
 * @method
 */
export const userFormValidation = () =>
  Yup.lazy(values => {
    return Yup.object().shape({
      firstName: Yup.string().trim().min(2, errorMessages.minLength(2)).required(errorMessages.requiredMessage),
      lastName: Yup.string().trim().min(2, errorMessages.minLength(2)).required(errorMessages.requiredMessage),
      email: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
      additionalBranches: Yup.array(),
      jobTitle: Yup.string().trim().min(3, errorMessages.minLength(3)),
      phone: phoneValidation(10),
      homeBranch: Yup.number().required(errorMessages.requiredMessage),
      roles: Yup.array().min(1, errorMessages.minOneRole),
      dailyPurchaseLimit: Yup.number()
        .positive(errorMessages.positive)
        .typeError(errorMessages.mustBeNumber)
        .nullable(),
      orderPurchaseLimit: Yup.number()
        .positive(errorMessages.positive)
        .typeError(errorMessages.mustBeNumber)
        .nullable(),
      monthlyPurchaseLimit: Yup.number()
        .positive(errorMessages.positive)
        .typeError(errorMessages.mustBeNumber)
        .nullable()
    })
  })

/**
 * Gets home's branches for dropdown options.
 * @category Settings - Users
 * @method
 * @param {{id: number, deliveryAddress: {cfName: string}}[]} branches
 * @return {{key: number, value: number, text: string}[]} Array objects for dropdown options.
 */
export const getHomeBranchesOptions = branches =>
  branches.map(b => ({ key: b.id, value: b.id, text: b.deliveryAddress.cfName }))

/**
 * Gets branches where warehouse === false for dropdown options.
 * @category Settings - Users
 * @method
 * @param {{id: number, deliveryAddress: {cfName: string}, warehouse: boolean}[]} branches
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
 * @category Settings - Users
 * @method
 * @param {object} sidebarValues
 * @return {TInitialValues} Object fields for form.
 */
export const getInitialFormValues = sidebarValues => {
  let firstName = "";
  let lastName = "";
  if (sidebarValues?.name) {
    let { name } = sidebarValues;
    name = name.replace(/\s\s+/g, ' ');
    name = name.trim();
    name = name.split(" ");
    firstName = name[0];
    lastName = "";
    if (name.length === 1) {
      lastName = name[0];
      firstName = ""
    } else {
      for (let i = 1; i < name.length; i++) {
        lastName = lastName + " " + name[i]
      }
    }
    lastName = lastName.replace(/\s\s+/g, ' ');
    lastName = lastName.trim();
  }

  return !isEmpty(sidebarValues)
    ? {
      additionalBranches: sidebarValues?.additionalBranches?.map(d => d?.id) || [],
      email: sidebarValues?.email,
      homeBranch: sidebarValues?.homeBranch ? sidebarValues?.homeBranch?.id : '',
      jobTitle: sidebarValues?.jobTitle,
      firstName,
      lastName,
      phone: sidebarValues?.phone,
      preferredCurrency: currencyId,
      roles: sidebarValues?.roles?.map(d => d?.id) || [],
      sellMarketSegments: getSafe(() => sidebarValues?.sellMarketSegments, [])?.map(d => d?.id),
      buyMarketSegments: getSafe(() => sidebarValues?.buyMarketSegments, [])?.map(d => d?.id),
      regulatoryDeaListAuthorized: sidebarValues?.regulatoryDeaListAuthorized,
      regulatoryDeaListSignAskedDate: sidebarValues?.regulatoryDeaListSignAskedDate,
      regulatoryDhsCoiAuthorized: sidebarValues?.regulatoryDhsCoiAuthorized,
      regulatoryDhsCoiSignAskedDate: sidebarValues?.regulatoryDhsCoiSignAskedDate,
      regulatoryHazmatAuthorized: sidebarValues?.regulatoryHazmatAuthorized,
      dailyPurchaseLimit: !isNaN(parseFloat(sidebarValues?.dailyPurchaseLimit?.value))
        ? parseFloat(sidebarValues?.dailyPurchaseLimit?.value)
        : '',
      orderPurchaseLimit: !isNaN(parseFloat(sidebarValues?.orderPurchaseLimit?.value))
        ? parseFloat(sidebarValues?.orderPurchaseLimit?.value)
        : '',
      monthlyPurchaseLimit: !isNaN(parseFloat(sidebarValues?.monthlyPurchaseLimit?.value))
        ? parseFloat(sidebarValues?.monthlyPurchaseLimit?.value)
        : ''
      }
    : {
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      homeBranch: '',
      preferredCurrency: currencyId,
      additionalBranches: [],
      jobTitle: '',
      phone: '',
      roles: [],
      buyMarketSegments: [],
      sellMarketSegments: [],
      regulatoryDeaListAuthorized: false,
      regulatoryDeaListSignAskedDate: null,
      regulatoryDhsCoiAuthorized: false,
      regulatoryDhsCoiSignAskedDate: null,
      regulatoryHazmatAuthorized: false,
      dailyPurchaseLimit: '',
      orderPurchaseLimit: '',
      monthlyPurchaseLimit: ''
    }
}

/**
 * Handles Sell Market Segment dropdown change.
 * @category Settings - Users
 * @method
 * @param {array} value
 * @param {{value: number}[]} options
 * @return {array} Array objects for dropdown options.
 */
export const handleSellMarketSegmentsChange = (value, options) => options.filter(el => value.some(v => el.value === v))

/**
 * Handles Buy Market Segment dropdown change.
 * @category Settings - Users
 * @method
 * @param {array} value
 * @param {{value: number}[]} options
 * @param {object} state object with state / set state Hook functions
 * @return {void}
 */
export const handleBuyMarketSegmentsChange = (value, options, state) => {
  const newOptions = options.filter(el => value.some(v => el.value === v))
  state.setSelectedBuyMarketSegmentsOptions(newOptions)
}

/**
 * Returns Checkboxes section generated from the input parameters.
 * @category Settings - Users
 * @method
 * @param {array} data Array of all roles
 * @param {object} values Formik object - values
 * @param {string} groupName Name of group in 'values'
 * @param {object} error Formik object - errors
 * @return {object} Checkboxes section to render.
 */
export const generateCheckboxes = (data, values, groupName = null, error) => {
  if (!data) return []
  let group = null

  if (groupName) group = `${groupName}.`

  let columnLeft = []
  let columnRight = []

  const getCheckbox = (el, i) => {
    let name = el.name.replace(/ /g, '').replace(/\//g, '').replace(/-/g, '')
    let path = `${group}${name}`

    return (
      <FormField key={i} error={!!error}>
        <FormikField
          onChange={(e, data) => {
            let { setFieldValue, setFieldTouched } = data.form
            let newArray = values[groupName].slice()
            if (data.checked) {
              newArray.push(el.id)
            } else {
              newArray = newArray.filter(d => d !== el.id)
            }
            setFieldValue(groupName, newArray)
            setFieldTouched(groupName, true, true)
          }}
          component={Checkbox}
          checked={!!values[groupName] && values[groupName].includes(el.id)}
          name={path}
          label={el.name.charAt(0).toUpperCase() + el.name.slice(1)}
          data-test='settings_users_popup_FormikField_change'
        />
      </FormField>
    )
  }

  let i = 0
  for (; i < data.length / 2; i++) {
    columnLeft.push(getCheckbox(data[i], i))
  }

  for (; i < data.length; i++) {
    columnRight.push(getCheckbox(data[i], i))
  }

  return (
    <>
      <GridColumn width={8}>{columnLeft}</GridColumn>
      <GridColumn width={8}>{columnRight}</GridColumn>
    </>
  )
}

/**
 * Process/set input form data.
 * @category Settings - Users
 * @method
 * @param {object} sidebarValues
 * @param {object} state object with state / set state Hook functions
 * @return {void}
 */
export const switchUser = async (sidebarValues, state) => {
  let selectedSellMarketSegmentsOptions = []
  let selectedBuyMarketSegmentsOptions = []

  if (getSafe(() => sidebarValues.sellMarketSegments.length, [])) {
    selectedSellMarketSegmentsOptions = sidebarValues.sellMarketSegments.map(d => {
      return {
        key: d.id,
        text: d.name,
        value: d.id
      }
    })
  }

  if (getSafe(() => sidebarValues.buyMarketSegments.length, [])) {
    selectedBuyMarketSegmentsOptions = sidebarValues.buyMarketSegments.map(d => {
      return {
        key: d.id,
        text: d.name,
        value: d.id
      }
    })
  }

  state.setSelectedSellMarketSegmentsOptions(selectedSellMarketSegmentsOptions)
  state.setSelectedBuyMarketSegmentsOptions(selectedBuyMarketSegmentsOptions)
  state.setSidebarValues({
    ...sidebarValues,
    homeBranch: sidebarValues.homeBranch,
    additionalBranches: sidebarValues.additionalBranches,
    sellMarketSegments: getSafe(() => sidebarValues.sellMarketSegments, []),
    buyMarketSegments: getSafe(() => sidebarValues.buyMarketSegments, [])
  })
}

/**
 * Submit function.
 * @category Settings - Users
 * @method
 * @param {object} values Formik object - values
 * @param {object} actions Formik object - actions
 * @param {object} props object with all props (actions, init data, ...)
 * @param {object} sidebarValues object with state / set state Hook functions
 */
export const submitUser = async (values, actions, props, sidebarValues) => {
  let { firstName, lastName } = values
  firstName = firstName.replace(/\s\s+/g, ' ')
  firstName = firstName.trim()
  lastName = lastName.replace(/\s\s+/g, ' ')
  lastName = lastName.trim()

  let username = lastName
  if (firstName && firstName !== '') {
    username = firstName + ' ' + lastName
  }
  const {
    handlerSubmitUserEditPopup,
    postNewUserRequest,
    closeSidebar,
    datagrid,
    currentUserId,
    getIdentity,
    openGlobalAddForm,
    userSettings
  } = props

  let sendSuccess = false

  const data = {
    additionalBranches: values?.additionalBranches,
    email: values?.email,
    homeBranch: values?.homeBranch,
    jobTitle: values?.jobTitle,
    name: username,
    phone: values?.phone,
    preferredCurrency: currencyId,
    roles: values?.roles,
    regulatoryDeaListAuthorized: values?.regulatoryDeaListAuthorized,
    regulatoryDhsCoiAuthorized: values?.regulatoryDhsCoiAuthorized,
    regulatoryHazmatAuthorized: values?.regulatoryHazmatAuthorized
  }

  let settingsData = { settings: [] }

  if (values?.dailyPurchaseLimit?.toString().trim() !== userSettings?.dailyPurchaseLimit?.value) {
    settingsData.settings.push({
      id: userSettings?.dailyPurchaseLimit?.id || USER_DAILY_PURCHASE_LIMIT_ID,
      value: values?.dailyPurchaseLimit?.toString() || 'EMPTY_SETTING'
    })
  }
  if (values?.monthlyPurchaseLimit?.toString().trim() !== userSettings?.monthlyPurchaseLimit?.value) {
    settingsData.settings.push({
      id: userSettings?.monthlyPurchaseLimit?.id || USER_MONTHLY_PURCHASE_LIMIT_ID,
      value: values?.monthlyPurchaseLimit?.toString() || 'EMPTY_SETTING'
    })
  }
  if (values?.orderPurchaseLimit?.toString().trim() !== userSettings?.orderPurchaseLimit?.value) {
    settingsData.settings.push({
      id: userSettings?.orderPurchaseLimit?.id || USER_ORDER_PURCHASE_LIMIT_ID,
      value: values?.orderPurchaseLimit?.toString() || 'EMPTY_SETTING'
    })
  }

  removeEmpty(data)

  try {
    if (sidebarValues) {
      await handlerSubmitUserEditPopup(sidebarValues.id, data, settingsData, !!settingsData.settings.length)
      // !openGlobalAddForm && datagrid.updateRow(sidebarValues.id, () => value)
      !openGlobalAddForm && datagrid.loadData()
      sendSuccess = true
      if (currentUserId === sidebarValues.id) getIdentity()
    } else {
      await postNewUserRequest(data, settingsData, !!settingsData.settings.length)
      !openGlobalAddForm && datagrid.loadData()
      sendSuccess = true
    }
    if (openGlobalAddForm) {
      openGlobalAddForm('')
    } else {
      closeSidebar()
    }
  } catch (err) {
    console.error(err)
  }
  actions.setSubmitting(false)
  return sendSuccess
}

/**
 * Handles Buy Market Segment dropdown search change.
 * @category Settings - Users
 * @method
 * @param {object} object with 'searchQuery' value
 * @param {object} props object with all props (actions, init data, ...)
 * @return {array} Array objects for dropdown options.
 */
export const handleSellMarketSegmentsSearchChange = debounce((_, { searchQuery }, props) => {
  props.searchSellMarketSegments(searchQuery)
}, 250)

/**
 * Handles Buy Market Segment dropdown search change.
 * @category Settings - Users
 * @method
 * @param {object} object with 'searchQuery' value
 * @param {object} props object with all props (actions, init data, ...)
 * @return {array} Array objects for dropdown options.
 */
export const handleBuyMarketSegmentsSearchChange = debounce((_, { searchQuery }, props) => {
  props.searchBuyMarketSegments(searchQuery)
}, 250)
