import * as Yup from 'yup'
// Services
import { errorMessages } from '../../../../constants/yupValidation'
import { getSafe } from '../../../../utils/functions'
import { removeEmpty } from '../../../../utils/functions'

// Constants
import { INIT_VALUES } from './CasProductsSidebarContent/CasProductsSidebarContent.constants'

/**
 * Validation of form.
 * @category Settings - Location - Branches
 * @method
 */
export const formValidation = () =>
  Yup.object().shape({
    casNumber: Yup.string().required(errorMessages.requiredMessage),
    casIndexName: Yup.string().required(errorMessages.requiredMessage)
  })

/**
 * @category Settings - Location - Branches
 * @param {Object<string, any>} sidebarValues All values for form.
 * @return {Object<string, any>} Initial object for form.
 */
export const getInitialFormValues = sidebarValues => {
  let initValues = { ...INIT_VALUES, propertiesFilter: 'all' }
  const initValuesKeys = Object.keys(INIT_VALUES)

  if (sidebarValues) {
    Object.entries(sidebarValues).forEach(([key, val]) => {
      if (initValuesKeys.some(k => k === key)) {
        if (typeof val === 'string' || typeof val === 'boolean') {
          initValues[key] = val
        } else if (Array.isArray(val)) {
          initValues[key] = val.map(arr => arr.id)
        }
      }
    })
  }
  return (initValues)
}

/**
 * Submit form and add or edit warehouse.
 * @category Settings - Locations - Branches
 * @method
 * @param {Object<string, any>} values Values of form.
 * @param {{setSubmitting: (isSubmitting: boolean) => void,
 * putEditWarehouse: (requestData: Object<string, any>, id: number) => void,
 * postNewWarehouseRequest: (isCreate: boolean, requestData: Object<string, any>) => void}} helperFunctions
 * @param {number} id
 */
export const submitHandler = async (values, { setSubmitting }, props) => {
  const { popupValues, updateCasProductRequest, postNewCasProductRequest, datagrid } = props

  try {

    console.log('!!!!!!!!!! submitHandler props', props)
    console.log('!!!!!!!!!! submitHandler values', values)

    let payload = { ...values }

    delete payload.propertiesFilter
    removeEmpty(payload)

    console.log('!!!!!!!!!! submitHandler payload', payload)


    if (popupValues) {
      //const { value } = await updateCasProductRequest(popupValues.id, payload)
      //datagrid.updateRow(row.id, () => value)
    } else {
      //await postNewCasProductRequest(payload)
      //datagrid.loadData()
    }
    props.chatWidgetVerticalMoved(false)
    //props.closeAddPopup()
  } catch (e) {
    console.error(e)
  } finally {
    setSubmitting(false)
  }
}