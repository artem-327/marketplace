import { getSafe } from '~/utils/functions'
import { errorMessages } from '~/constants/yupValidation'
import * as val from 'yup'

/**
 * @param {{id: number, deliveryAddress: {cfName: string}}[]} Array of adress objects from my Company.
 */
export const applyTemplate = async (props, template) => {
  const { values, setValues, setFieldTouched, closeTdsModal } = props

  const tdsFields = JSON.parse(template)
  setValues({
    ...values,
    edit: {
      ...values.edit,
      tdsFields: tdsFields
    }
  })
  setFieldTouched('edit.tdsFields[0].property', true, false)
  closeTdsModal()
}

export const saveForm = async (props, values, origTdsFields) => {
  let tdsFields = []
  if (getSafe(() => origTdsFields.length, '')) {
    origTdsFields.forEach((item, index) => {
      if (getSafe(() => item.property, '')) tdsFields.push(item)
    })
  }
  await props.saveTdsAsTemplate(values.templateName, JSON.stringify(tdsFields))
  props.closeTdsModal()
}

export const validationScheme = val.lazy(values => {
  return val.object().shape({
    templateName: val.string().required(errorMessages.requiredMessage)
  })
})