import * as Yup from 'yup'
import { errorMessages, phoneValidation } from '../../../../constants/yupValidation'
import { currencyId } from '../../../../constants/index'
import { getSafe, removeEmpty, uniqueArrayByKey } from '../../../../utils/functions'
import { debounce } from 'lodash'
import { GridColumn, Checkbox, FormField } from 'semantic-ui-react'
import { Field as FormikField } from 'formik'

/**
 * Validates values from form.
 * @category Companies/Users
 * @method
 * @param {object} props object with popupValues and module actions
 */
export const userFormValidation = (props) =>
  Yup.lazy(values => {
    const { adminRoles } = props
    const requiredCompany = !values.roles.some(role => adminRoles.some(d => role === d.id))

    return Yup.object().shape({
      lastName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
      email: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
      additionalBranches: Yup.array(),
      jobTitle: Yup.string().trim().min(3, errorMessages.minLength(3)),
      phone: phoneValidation(10),
      ...(requiredCompany && {
        company: Yup.number().required(errorMessages.requiredMessage)
      }),
      ...(requiredCompany && {
        homeBranch: Yup.number().required(errorMessages.requiredMessage)
      }),
      roles: Yup.array().min(1, errorMessages.minOneRole)
    })
  })

/**
 * Gets home's branches for dropdown options.
 * @category Companies/Users
 * @method
 * @param {{id: number, deliveryAddress: {cfName: string}}[]} branches
 * @return {{key: number, value: number, text: string}[]} Array objects for dropdown options.
 */
const getHomeBranchesOptions = branches =>
  branches.map(b => ({ key: b.id, value: b.id, text: b.deliveryAddress.cfName }))

/**
 * Gets branches where warehouse === false for dropdown options.
 * @category Companies/Users
 * @method
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
 * Process/set input form data.
 * @category Companies/Users
 * @method
 * @param {object} props object with popupValues and module actions
 * @param {object} state object with state / set state Hook functions
 * @return {none}
 */
export const switchUser = async (props, state) => {
  const { popupValues } = props
  const [comp, user] = await Promise.all([
    popupValues.company ? props.initSearchCompany(popupValues.company.id) : { value: [] },
    props.getUser(popupValues.id)
  ])
  let selectedSellMarketSegmentsOptions = []
  let selectedBuyMarketSegmentsOptions = []

  if (getSafe(() => user.value.sellMarketSegments.length, [])) {
    selectedSellMarketSegmentsOptions = user.value.sellMarketSegments.map(d => {
      return {
        key: d.id,
        text: d.name,
        value: d.id
      }
    })
  }

  if (getSafe(() => user.value.buyMarketSegments.length, [])) {
    selectedBuyMarketSegmentsOptions = user.value.buyMarketSegments.map(d => {
      return {
        key: d.id,
        text: d.name,
        value: d.id
      }
    })
  }

  if (popupValues.company) {
    const company = comp.value
    let branches = uniqueArrayByKey(
      (user.value.homeBranch ? getHomeBranchesOptions([user.value.homeBranch]) : []).concat(
        user.value.additionalBranches ? getBranchesOptions(user.value.additionalBranches) : [],
        company && company.branches ? getBranchesOptions(company.branches) : []
      ),
      'key'
    )
    state.setBranches(branches)
    state.setSelectedCompany(company ? [company] : [])
    state.setSelectedSellMarketSegmentsOptions(selectedSellMarketSegmentsOptions)
    state.setSelectedBuyMarketSegmentsOptions(selectedBuyMarketSegmentsOptions)
    state.setPopupValues({
      ...popupValues,
      homeBranch: user.value.homeBranch,
      additionalBranches: user.value.additionalBranches,
      sellMarketSegments: getSafe(() => user.value.sellMarketSegments, []),
      buyMarketSegments: getSafe(() => user.value.buyMarketSegments, [])
    })
  } else {
    state.setBranches([])
    state.setSelectedCompany([])
    state.setSelectedSellMarketSegmentsOptions(selectedSellMarketSegmentsOptions)
    state.setSelectedBuyMarketSegmentsOptions(selectedBuyMarketSegmentsOptions)
    state.setPopupValues({
      ...popupValues,
      homeBranch: user.value.homeBranch,
      additionalBranches: user.value.additionalBranches,
      sellMarketSegments: getSafe(() => user.value.sellMarketSegments, []),
      buyMarketSegments: getSafe(() => user.value.buyMarketSegments, [])
    })
  }
}

/**
 * Submit function.
 * @category Companies/Users
 * @method
 * @param {object} values Formik object - values
 * @param {object} actions Formik object - actions
 * @param {object} props object with all props (actions, init data, ...)
 * @param {object} state object with state / set state Hook functions
 * @return {none}
 */
export const submitUser = async (values, actions, props, state) => {
  const { submitUserEdit, postNewUserRequest, closePopup, datagrid } = props
  const { popupValues } = state

  const { firstName, lastName } = values
  let username = lastName
  if (firstName && firstName!=='') {
    username = firstName + ' ' + lastName
  }
  const data = {
    additionalBranches: values.additionalBranches,
    email: values.email,
    homeBranch: values.homeBranch,
    jobTitle: values.jobTitle,
    name: username,
    phone: values.phone,
    preferredCurrency: currencyId,
    roles: values.roles
    /*Commented by https://pm.artio.net/issues/34033#note-14 */
    //sellMarketSegments: values.sellMarketSegments,
    //buyMarketSegments: values.buyMarketSegments
  }

  removeEmpty(data)

  try {
    if (popupValues) {
      const { value } = await submitUserEdit(popupValues.id, data)
      datagrid.updateRow(popupValues.id, () => value)
    } else {
      await postNewUserRequest(data)
      datagrid.loadData()
    }
    closePopup()
  } catch {}
  actions.setSubmitting(false)
}

/**
 * Gets popup or initial values for form.
 * @category Companies/Users
 * @method
 * @param {object} popupValues
 * @return {TInitialValues} Object fields for form.
 */
export const getInitialFormValues = popupValues => {
  let firstName = "";
  let lastName = "";
  if (popupValues) {
    let { name } = popupValues;
    name = name.replace(/\s\s+/g, ' ');
    name = name.split(" ");
    firstName = name[0];
    lastName = name[1];
    if (name.length===1) {  
      lastName = name[0];
      firstName = ""
    }
  }
  return popupValues
    ? {
      additionalBranches: popupValues.additionalBranches.map(d => d.id),
      email: popupValues.email,
      homeBranch: popupValues.homeBranch ? popupValues.homeBranch.id : '',
      jobTitle: popupValues.jobTitle,
      company: popupValues.company ? popupValues.company.id : '',
      name: popupValues.name,
      firstName,
      lastName,
      phone: popupValues.phone,
      preferredCurrency: currencyId,
      roles: popupValues.roles.map(d => d.id),
      sellMarketSegments: getSafe(() => popupValues.sellMarketSegments, []).map(d => d.id),
      buyMarketSegments: getSafe(() => popupValues.buyMarketSegments, []).map(d => d.id)
    } : {
      name: '',
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
      sellMarketSegments: []
    }
}

/**
 * Handles Buy Market Segment dropdown search change.
 * @category Companies/Users
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
 * @category Companies/Users
 * @method
 * @param {object} object with 'searchQuery' value
 * @param {object} props object with all props (actions, init data, ...)
 * @return {array} Array objects for dropdown options.
 */
export const handleBuyMarketSegmentsSearchChange = debounce((_, { searchQuery }, props) => {
  props.searchBuyMarketSegments(searchQuery)
}, 250)

/**
 * Handles Sell Market Segment dropdown change.
 * @category Companies/Users
 * @method
 * @param {number} value
 * @param {{value: number}[]} options
 * @param {object} state object with state / set state Hook functions
 * @return {array} Array objects for dropdown options.
 */
export const handleSellMarketSegmentsChange = (value, options, state) => {
  const newOptions = options.filter(el => value.some(v => el.value === v))
  state.setSelectedSellMarketSegmentsOptions(newOptions)
}

/**
 * Handles Buy Market Segment dropdown change.
 * @category Companies/Users
 * @method
 * @param {number} value
 * @param {{value: number}[]} options
 * @param {object} state object with state / set state Hook functions
 * @return {array} Array objects for dropdown options.
 */
export const handleBuyMarketSegmentsChange = (value, options, state) => {
  const newOptions = options.filter(el => value.some(v => el.value === v))
  state.setSelectedBuyMarketSegmentsOptions(newOptions)
}

/**
 * Returns Checkboxes section generated from the input parameters.
 * @category Companies/Users
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
          data-test='admin_users_popup_FormikField_change'
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
 * Handles Company name dropdown search change.
 * @category Companies/Users
 * @method
 * @param {string} text with search company name value
 * @param {object} props object with all props (actions, init data, ...)
 * @return {array} Array objects for dropdown options.
 */
export const searchCompanies = debounce((text, props) => {
  if (text && text.length > 1) {
    props.searchCompany(text, 5)
  }
}, 250)



