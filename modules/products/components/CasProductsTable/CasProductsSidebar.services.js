import * as Yup from 'yup'
// Services
import { errorMessages } from '../../../../constants/yupValidation'
import { removeEmpty } from '../../../../utils/functions'

// Constants
import { INIT_VALUES } from './CasProductsSidebarContent/CasProductsSidebarContent.constants'

/**
 * Validation of form.
 * @category Products - Add/Edit CAS Product
 * @method
 */
export const formValidation = () =>
  Yup.object().shape({
    casNumber: Yup.string().required(errorMessages.requiredMessage),
    casIndexName: Yup.string().required(errorMessages.requiredMessage)
  })

/**
 * @category Products - Add/Edit CAS Product
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
 * @category Products - Add/Edit CAS Product
 * @method
 * @param {Object<string, any>} values Values of form.
 * @param {Object<any>} props Input props (popupValues, updateCasProductRequest, postNewCasProductRequest, datagrid).
 * @param {number} id
 */
export const submitHandler = async (values, { setSubmitting }, props) => {
  const { popupValues, updateCasProductRequest, postNewCasProductRequest, datagrid } = props
  try {
    let payload = { ...values }

    if (!payload.cfChemicalOfInterest) {
      [
        'dhsSecurityIssueReleaseToxic', 'dhsReleaseMinimumConcentration',
        'dhsSecurityIssueReleaseFlammables', 'dhsReleaseScreeningThresholdQuantities',
        'dhsSecurityIssueReleaseExplosives', 'dhsTheftMinimumConcentration',
        'dhsSecurityIssueTheftCWCWP', 'dhsTheftScreeningThresholdQuantities',
        'dhsSecurityIssueTheftWME', 'dhsSabotageMinimumConcentrationPercent',
        'dhsSecurityIssueTheftEXPIEDP', 'dhsSabotageScreeningThresholdQuantities',
        'dhsSecurityIssueSabotageContamination'
      ]
        .forEach(el => {
          if (popupValues && popupValues[el]) {
            payload[el] = popupValues[el]
          } else {
            delete payload[el]
          }
        })
    }

    if (!payload.caprop65) {
      ['caprop65DateListed', 'caprop65ListingMechanism', 'caprop65NSRLorMADL', 'caprop65TypeofToxicity']
        .forEach(el => {
          if (popupValues && popupValues[el]) {
            payload[el] = popupValues[el]
          } else {
            delete payload[el]
          }
        })
    }

    if (!payload.reach) {
      ['reachExposureScenario', 'reachSumi']
        .forEach(el => {
          if (popupValues && popupValues[el]) {
            payload[el] = popupValues[el]
          } else {
            delete payload[el]
          }
        })
    }

    delete payload.propertiesFilter
    delete payload.cfChemicalOfInterest
    removeEmpty(payload)

    if (popupValues) {
      const { value } = await updateCasProductRequest(popupValues.id, payload)
      datagrid.loadData()
      // datagrid.updateRow(popupValues.id, () => value)
    } else {
      await postNewCasProductRequest(payload)
      datagrid.loadData()
    }
    props.closeAddPopup()
  } catch (e) {
    console.error(e)
  } finally {
    setSubmitting(false)
  }
}