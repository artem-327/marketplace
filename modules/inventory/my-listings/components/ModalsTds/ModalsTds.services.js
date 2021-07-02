import * as val from 'yup'
// Services
import { getSafe } from '../../../../../utils/functions'
// Constants
import { errorMessages } from '../../../../../constants/yupValidation'

/**
 * @param {object} props - { values, setValues, setFieldTouched, closeTdsModal }
 * @param {string} template - Stringified JSON - Array of objects {property, specifications, testMethods}
 */
export const applyTdsTemplate = async (props, template) => {
  const { values, setValues, setFieldTouched, closeTdsModal } = props

  const tdsFields = JSON.parse(template)
  setValues({
    ...values,
    edit: {
      ...values.edit,
      tdsFields: tdsFields.map(row => ({
        property: getSafe(() => row.property, ''),
        specifications: getSafe(() => row.specifications, ''),
        testMethods: getSafe(() => row.testMethods, '')
      }))
    }
  })
  setFieldTouched('edit.tdsFields[0].property', true, false)
  closeTdsModal()
}

/**
 * @param {object} props - {tdsFields, saveTdsAsTemplate, closeTdsModal}
 * @param {string} templateName
 */
export const saveTdsTemplateAs = async (props, templateName) => {
  let tdsFields = []
  if (getSafe(() => props.tdsFields.length, '')) {
    props.tdsFields.forEach(item => {
      if (getSafe(() => item.property, '')) tdsFields.push(item)
    })
  }
  await props.saveTdsAsTemplate(templateName, JSON.stringify(tdsFields))
  props.closeTdsModal()
}

/**
 * @return {object} - Yup validation scheme
 */
export const validationScheme = val.lazy(values => {
  return val.object().shape({
    templateName: val.string().required(errorMessages.requiredMessage)
  })
})