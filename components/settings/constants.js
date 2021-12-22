import { Input, TextArea, Dropdown, Checkbox } from 'formik-semantic-ui-fixed-validation'
import get from 'lodash/get'
import * as Yup from 'yup'
import { errorMessages, validateTime } from '../../constants/yupValidation'
import { getSafe } from '../../utils/functions'
import UploadAttachment from '../../modules/inventory/components/upload/UploadAttachment'

import { DivLogoWrapper, ImageSearchStyled } from './settings.styles'

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

const numberAllowEmptyString = Yup.number()
  .test('numbers', errorMessages.mustBeNumber, value => (!value || !isNaN(value)))
  .transform(value => (isNaN(value) ? null : value))
  .typeError(errorMessages.mustBeNumber)

const integerAllowEmptyString = Yup.number()
  .test('numbers', errorMessages.mustBeNumber, value => !value || /^[0-9]*$/.test(value))
  .transform(value => (isNaN(value) ? null : value))
  .nullable()
  .integer(errorMessages.integer)
  .typeError(errorMessages.mustBeNumber)

export const dataTypes = {
  STRING: Yup.string(errorMessages.invalidString).trim().max(255, errorMessages.maxLength(255)),
  INTEGER: integerAllowEmptyString,
  NUMBER: numberAllowEmptyString,
  FLOAT: numberAllowEmptyString,
  LARGE_TEXT: Yup.string(errorMessages.invalidString).trim().max(5000, errorMessages.maxLength(5000)),
  TEXT: Yup.string(errorMessages.invalidString).trim().max(255, errorMessages.maxLength(255)),
  TIME: validateTime(),
  BASE64_FILE: Yup.string(errorMessages.invalidString)
}

const defaultDataType = 'STRING'

export const getRole = accessRights => {
  if (accessRights.isAdmin) return roles.admin
  if (accessRights.isCompanyAdmin) return roles.company

  return roles.user
}

export const typeToComponent = (type, options = {}, formikProps, componentName, props) => {
  const { intl: { formatMessage } } = props
  const inputProps = getSafe(() => options.inputProps, {})
  switch (type) {
    case 'NUMBER':
      return (
        <Input
          {...getSafe(() => options.props, {})}
          fieldProps={{ className: 'price-input' }}
          inputProps={{
            type: 'number',
            step: 1,
            placeholder: formatMessage({ id: 'settings.system.enterValue', defaultMessage: 'Enter value' }),
            ...inputProps
          }}
        />
      )
    case 'INTEGER':
      return (
        <Input
          {...getSafe(() => options.props, {})}
          fieldProps={{ className: 'price-input' }}
          inputProps={{
            type: 'number',
            step: 1,
            placeholder: formatMessage({ id: 'settings.system.enterValue', defaultMessage: 'Enter value' }),
            ...inputProps
          }}
        />
      )
    case 'FLOAT':
      return (
        <Input
          {...getSafe(() => options.props, {})}
          fieldProps={{ className: 'price-input' }}
          inputProps={{
            type: 'number',
            step: 0.001,
            placeholder: formatMessage({ id: 'settings.system.enterValue', defaultMessage: 'Enter value' }),
            ...inputProps
          }}
        />
      )
    case 'LARGE_TEXT':
      return (
        <TextArea
          {...getSafe(() => options.props, {})}
          inputProps={{
            placeholder: formatMessage({ id: 'settings.system.enterValue', defaultMessage: 'Enter value' }),
            ...inputProps,
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
            placeholder: formatMessage({ id: 'settings.system.enterValue', defaultMessage: 'Enter value' }),
            ...inputProps
          }}
        />
      )
    case 'DROPDOWN':
      return (
        <Dropdown
          {...getSafe(() => options.props, {})}
          inputProps={{
            placeholder: formatMessage({ id: 'settings.system.selectValue', defaultMessage: 'Select value' }),
            ...inputProps
          }}
        />
      )
    case 'ENUM':
      return (
        <Dropdown
          {...getSafe(() => options.props, {})}
          inputProps={{
            placeholder: formatMessage({ id: 'settings.system.selectValue', defaultMessage: 'Select value' }),
            ...inputProps
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
            ...inputProps
          }}
        />
      )
    }
    case 'TIME':
      return (
        <Input
          {...getSafe(() => options.props, {})}
          inputProps={{
            type: 'text',
            placeholder: formatMessage({ id: 'settings.system.enterTime', defaultMessage: 'Enter time' }),
            ...inputProps
          }}
        />
      )
    case 'BASE64_FILE': {
      const { values, setFieldValue } = formikProps
      const picture = get(values, componentName, '')

      return (
        <UploadAttachment
          {...getSafe(() => options.props, {})}
          {...getSafe(() => options.inputProps, {})}
          acceptFiles='image/jpeg, image/png, image/gif, image/svg'
          name={componentName}
          filesLimit={1}
          fileMaxSize={2}
          attachments={(picture && picture !== 'EMPTY_SETTING')
            ? [{
              id: componentName,
              name: formatMessage({id: 'profile.avatarPicture', defaultMessage: 'Avatar Picture'})
            }]
            : []
          }
          onChange={file => {
            try {
              const reader = new FileReader()
              reader.readAsDataURL(file[0])
              reader.onloadend = function () {
                const base64String = reader.result
                // without additional data: Attributes.
                const newBase64Pic = base64String.substr(base64String.indexOf(', ') + 1)
                setFieldValue(componentName, newBase64Pic)
              }
            } catch (e) {
              console.error(e)
            }
          }}
          removeAttachment={() => setFieldValue(componentName, 'EMPTY_SETTING')}
          emptyContent={<DivLogoWrapper><ImageSearchStyled /></DivLogoWrapper>}
          uploadedContent={
            <div>
              {(picture && picture !== 'EMPTY_SETTING') && (
                <img src={picture}/>
              )}
            </div>
          }

        />
      )
    }
    default:
      return (
        <Input
          {...getSafe(() => options.props, {})}
          inputProps={{
            type: 'text',
            placeholder: formatMessage({ id: 'settings.system.enterValue', defaultMessage: 'Enter value' }),
            ...inputProps
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
