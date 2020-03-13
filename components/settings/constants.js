import { Input, TextArea, Dropdown, Checkbox } from 'formik-semantic-ui-fixed-validation'

import * as Yup from 'yup'

import { errorMessages } from '~/constants/yupValidation'
import { getSafe } from '~/utils/functions'

export const roles = {
  admin: 'admin',
  company: 'company',
  user: 'user'
}

const supportedValidation = {
  min: (chain, value, dataType) =>
    chain.concat(
      chain.min(value, dataType === 'STRING' ? errorMessages.minLength(value) : errorMessages.minimum(value))
    ),
  max: (chain, value, dataType) =>
    chain.concat(
      chain.max(value, dataType === 'STRING' ? errorMessages.maxLength(value) : errorMessages.maximum(value))
    ),
  required: (chain, value) =>
    value ? chain.concat(chain.required(errorMessages.requiredMessage)) : chain.concat(chain.nullable())
}

const numberAllowEmptyString = Yup.number(errorMessages.mustBeNumber)
  .transform(value => (isNaN(value) ? undefined : value))
  .typeError(errorMessages.mustBeNumber)

export const dataTypes = {
  STRING: Yup.string(errorMessages.invalidString),
  INTEGER: numberAllowEmptyString,
  NUMBER: numberAllowEmptyString,
  FLOAT: numberAllowEmptyString,
  LARGE_TEXT: Yup.string(errorMessages.invalidString),
  TEXT: Yup.string(errorMessages.invalidString)
}

const defaultDataType = 'STRING'

export const getRole = accessRights => {
  if (accessRights.isAdmin) return roles.admin
  if (accessRights.isCompanyAdmin) return roles.company

  return roles.user
}

export const typeToComponent = (type, options = {}) => {
  switch (type) {
    case 'INTEGER':
      return (
        <Input
          {...getSafe(() => options.props, {})}
          fieldProps={{ className: 'price-input' }}
          inputProps={{
            step: 1,
            ...getSafe(() => options.inputProps, {})
          }}
        />
      )
    case 'FLOAT':
      return (
        <Input
          {...getSafe(() => options.props, {})}
          fieldProps={{ className: 'price-input' }}
          inputProps={{
            step: 0.001,
            ...getSafe(() => options.inputProps, {})
          }}
        />
      )
    case 'LARGE_TEXT':
      return (
        <TextArea
          {...getSafe(() => options.props, {})}
          inputProps={{
            ...getSafe(() => options.inputProps, {}),
            type: 'text'
          }}
        />
      )
    case 'TEXT':
      return (
        <Input
          {...getSafe(() => options.props, {})}
          inputProps={{
            type: 'text',
            ...getSafe(() => options.inputProps, {})
          }}
        />
      )
    case 'DROPDOWN':
      return (
        <Dropdown
          {...getSafe(() => options.props, {})}
          inputProps={{
            ...getSafe(() => options.inputProps, {})
          }}
        />
      )

    case 'BOOL': {
      return (
        <Checkbox
          {...getSafe(() => options.props, {})}
          inputProps={{
            toggle: true,
            fitted: true,
            ...getSafe(() => options.inputProps, {})
          }}
        />
      )
    }
    default:
      return (
        <Input
          {...getSafe(() => options.props, {})}
          inputProps={{
            type: 'text',
            ...getSafe(() => options.inputProps, {})
          }}
        />
      )
  }
}

export const toYupSchema = (validation, type) => {
  const defaultOptions = {
    type: { value: type ? type : defaultDataType },
    required: { value: false }
  }

  let options = {
    ...defaultOptions,
    ...validation
  }

  let chain = dataTypes[options.type.value]

  Object.keys(supportedValidation).forEach(key => {
    if (options[key]) chain = supportedValidation[key](chain, options[key].value, options.type.value)
  })

  return chain
}
