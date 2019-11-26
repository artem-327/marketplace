import React, { Component } from 'react'
import { Input, FormField, Button, Icon } from 'semantic-ui-react'

import { FormattedMessage } from 'react-intl'

import styled from 'styled-components'
import { string, object, node, oneOf, func } from 'prop-types'

const HiddenInput = styled(Input)`
  width: 0px !important;
  > input {
    display: none;
    width: 0px;
  }
`

const ErrorLabel = styled.label`
  color: ${props => (props.error ? '#9F3A38' : 'rgba(0, 0, 0, 0.87)')} !important;
`

export default class FileInput extends Component {
  render() {
    const { name, errors, errorMessage, setFieldValue, fileName } = this.props

    return (
      <FormField
        // error={errors[name]}
        name={name}>
        <ErrorLabel error={errors[name]}>
          <FormattedMessage id='global.document' defaultMessage='Document' />
        </ErrorLabel>
        <Button icon as='label'>
          <FormattedMessage id='global.upload' defaultMessage='Upload'>
            {text => text}
          </FormattedMessage>
          {/* <Icon name='plus' /> */}
          <HiddenInput
            name={name}
            error={errors.file}
            type='file'
            onChange={e => setFieldValue('file', e.currentTarget.files[0])}
          />
        </Button>
        {errors[name] && <span className='sui-error-message'>{errorMessage}</span>}
        {fileName && <span>{fileName}</span>}
      </FormField>
    )
  }
}

FileInput.propTypes = {
  name: string,
  errors: object,
  errorMessage: oneOf([node, string]),
  setFieldValue: func.isRequired,
  fileName: string
}

FileInput.defaultProps = {
  name: 'file',
  errors: {},
  fileName: ''
}
