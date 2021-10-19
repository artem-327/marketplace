import * as Yup from 'yup'
import { cloneDeep } from 'lodash'

// Constants
import { INITIAL_FORM_VALUES } from './AddEditCompanySidebar.constants'

// Services
import { getSafe, deepSearch, removeEmpty } from '../../../../utils/functions'
import { errorMessages } from '../../../../constants/yupValidation'
import {
  addressValidationSchema,
  phoneValidation,
  websiteValidationNotRequired
} from '../../../../constants/yupValidation'

/**
 * Gets popup or initial values for form.
 * @category Companies/Companies
 * @method
 * @param {object} values
 * @return {object} Object fields for form.
 */
export const getInitialFormValues = values => {
  return {
    ...INITIAL_FORM_VALUES,
    ...(values !== null && { ...values }),
    naicsCode: values?.naicsCategory?.naicsId
  }
}

/**
 * Validates values from form.
 * @category Companies/Companies
 * @method
 * @param {none}
 */
export const formValidationNew = () =>
  Yup.lazy(values => {
    let mailingBranchRequired = getSafe(() => values.mailingBranch.deliveryAddress, false)
      ? deepSearch(values.mailingBranch.deliveryAddress, val => val !== '')
      : ''

    let minLength = errorMessages.minLength(2)

    let validation = Yup.object().shape({
      name: Yup.string().trim().min(2, minLength).required(minLength),
      tinType: Yup.string().required(errorMessages.requiredMessage),
      tin: Yup.string()
        .trim()
        .matches(/^\d{9}$/, errorMessages.exactLength(9))
        .required(errorMessages.requiredMessage),
      website: websiteValidationNotRequired(),
      phone: phoneValidation(10),

      mailingBranch: Yup.lazy(() => {
        if (mailingBranchRequired)
          return Yup.object().shape({
            deliveryAddress: Yup.object().shape({
              addressName: Yup.string().trim().min(2, minLength).required(errorMessages.requiredMessage),
              contactEmail: Yup.string()
                .trim()
                .email(errorMessages.invalidEmail)
                .required(errorMessages.invalidEmail),
              contactName: Yup.string().trim().min(2, minLength).required(minLength),
              contactPhone: phoneValidation(10),
              address: addressValidationSchema()
            })
          })
        return Yup.object().shape({
          deliveryAddress: Yup.object().shape({
            contactPhone: phoneValidation(10)
          })
        })
      }),

      primaryBranch: Yup.object().shape({
        deliveryAddress: Yup.object().shape({
          addressName: Yup.string().trim().min(2, minLength).required(errorMessages.requiredMessage),
          contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.invalidEmail),
          contactName: Yup.string().trim().min(2, minLength).required(minLength),
          contactPhone: phoneValidation(10).concat(Yup.string().required(errorMessages.requiredMessage)),
          address: addressValidationSchema()
        })
      }),
      primaryUser: Yup.lazy(() => {
        // if (primaryUserRequired)
        return Yup.object().shape({
          email: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.invalidEmail),
          name: Yup.string().trim().min(2, minLength).required(minLength),
          phone: phoneValidation(10)
        })
        // return Yup.mixed().notRequired()
      })
    })

    return validation
  })

/**
 * Handles Accordion Expand/collapse change.
 * @category Companies/Companies
 * @method
 * @param {object} object with 'name' value
 * @param {object} state object with state / set state Hook functions
 * @return {none}
 */
export const handleAccordionChange = (e, { name }, state) => {
  let { accordionActive, setAccordionActive } = state
  setAccordionActive({
    ...accordionActive,
    [name]: !accordionActive[name]
  })
}

/**
 * Handles added logo action
 * @category Companies/Companies
 * @method
 * @param {object} logo file
 * @param {object} isNew boolean value
 * @param {object} state object with state / set state Hook functions
 * @return {none}
 */
export const selectLogo = (logo, isNew = true, state) => {
  state.setCompanyLogo(logo)
  state.setShouldUpdateLogo(isNew)
}

/**
 * Handles removing logo action
 * @category Companies/Companies
 * @method
 * @param {object} state object with state / set state Hook functions
 * @return {none}
 */
export const removeLogo = state => {
  state.setCompanyLogo(null)
  state.setShouldUpdateLogo(true)
}

/**
 * Submit function.
 * @category Companies/Companies
 * @method
 * @param {object} values Formik object - values
 * @param {object} actions Formik object - actions
 * @param {object} state object with state / set state Hook functions
 * @param {object} props object with all props (actions, init data, ...)
 * @return {none}
 */
export const submitCompany = async (values, actions, state, props) => {
  const {
    closePopup,
    popupValues,
    updateCompany,
    createCompany,
    postCompanyLogo,
    deleteCompanyLogo,
    datagrid
  } = props

  try {
    if (popupValues) {
      let associations = []
      if (getSafe(() => values.associations[0].id, false)) {
        associations = values.associations.map(assoc => assoc.id)
      } else {
        associations = getSafe(() => values.associations, [])
      }
      let newValues = {
        associations,
        businessType: getSafe(() => values.businessType.id, null),
        cin: getSafe(() => values.cin, ''),
        dba: getSafe(() => values.dba, ''),
        dunsNumber: getSafe(() => values.dunsNumber, ''),
        naicsCode: values?.naicsCode,
        enabled: getSafe(() => values.enabled, false),
        industryType: getSafe(() => values.industryType, ''),
        name: getSafe(() => values.name, ''),
        phone: getSafe(() => values.phone, ''),
        purchaseHazmatEligible: getSafe(() => values.purchaseHazmatEligible, false),
        socialFacebook: getSafe(() => values.socialFacebook, ''),
        socialInstagram: getSafe(() => values.socialInstagram, ''),
        socialLinkedin: getSafe(() => values.socialLinkedin, ''),
        socialTwitter: getSafe(() => values.socialTwitter, ''),
        tagline: getSafe(() => values.tagline, ''),
        tin: getSafe(() => values.tin, ''),
        tinType: getSafe(() => values.tinType, ''),
        website: getSafe(() => values.website, '')
      }
      if (values.type) newValues['type'] = values.type
      removeEmpty(newValues)

      const {value} = await updateCompany(popupValues.id, newValues)
      if (state.shouldUpdateLogo) {
        if (state.companyLogo) await postCompanyLogo(value.id, state.companyLogo)
        else await deleteCompanyLogo(popupValues.id)
      }
      datagrid.updateRow(value.id, () => ({ ...value, hasLogo: !!state.companyLogo }))
      actions.setSubmitting(false)
      closePopup()
    } else {
      let branches = ['primaryBranch', 'mailingBranch']

      if (values.businessType) values.businessType = values.businessType.id

      let payload = cloneDeep(values)
      payload.primaryUser.email = payload.primaryUser.email.trim()
      payload.primaryBranch.deliveryAddress.contactEmail = payload.primaryBranch.deliveryAddress.contactEmail.trim()

      branches.forEach(branch => {
        let country = getSafe(() => JSON.parse(payload[branch].deliveryAddress.address.country).countryId)
        if (country) payload[branch].deliveryAddress.address.country = country
      })

      if (
        !getSafe(() => values.primaryBranch.deliveryAddress, '') ||
        !deepSearch(
          getSafe(() => values.mailingBranch.deliveryAddress, ''),
          val => val !== ''
        )
      ) {
        delete payload['mailingBranch']
      } else {
        if (payload.mailingBranch.deliveryAddress.contactEmail !== '')
          payload.mailingBranch.deliveryAddress.contactEmail = payload.mailingBranch.deliveryAddress.contactEmail.trim()
      }

      if (!payload.type) delete payload.type
      delete payload.enabled
      if (!payload.businessType) delete payload.businessType
      removeEmpty(payload)
      if (state.companyLogo) {
        let reader = new FileReader()
        reader.onload = async function () {
          const {value} = await createCompany(payload)
          await postCompanyLogo(value.id, state.companyLogo)
          datagrid.loadData()
          actions.setSubmitting(false)
          closePopup()
        }
        reader.readAsBinaryString(state.companyLogo)
      } else {
        await createCompany(payload)
        datagrid.loadData()
        actions.setSubmitting(false)
        closePopup()
      }
    }
  } catch (err) {
    actions.setSubmitting(false)
    console.error(err)
  }
}