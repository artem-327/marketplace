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
  return {
    ...INIT_VALUES,

    //...sidebarValues,
    propertiesFilter: 'all'
  }
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

  //removeEmpty(requestData)
  try {

    console.log('!!!!!!!!!! submitHandler props', props)
    console.log('!!!!!!!!!! submitHandler values', values)

    let payload = values.slice()

    delete payload.propertiesFilter
    removeEmpty(payload)



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