import * as Yup from 'yup'
import debounce from 'lodash/debounce'
import { errorMessages } from "../../../../constants/yupValidation"

/**
 * Search handler in Link Company Generic Product
 * @category Operations / Company Generic Products
 * @method
 */
export const handleSearchChange = debounce((searchQuery, props) => {
  props.searchCompanyGenericProduct(searchQuery)
}, 250)

/**
 * Form validation schema
 * @category Operations / Company Generic Products
 * @method
 */
export const validationSchema = () => {
  return Yup.object().shape({
    companyGenericProduct: Yup.string().required(errorMessages.requiredMessage)
  })
}

/**
 * Submit function.
 * @category Operations / Company Generic Products
 * @method
 * @param {object} values Formik object - values
 * @param {object} actions Formik object - actions
 * @param {object} props object with all props (actions, init data, ...)
 */
export const handleSubmit = async (values, actions, props) => {
    const { markRequestAsProcessed, datagrid, popupValues } = props
    try {
      const { value } = await markRequestAsProcessed(popupValues.id, values.companyGenericProduct)
      datagrid.updateRow(popupValues.id, () => value)
      props.onClose()
    } catch (e) {
      console.error(e)
    } finally {
      actions.setSubmitting(false)
    }
}