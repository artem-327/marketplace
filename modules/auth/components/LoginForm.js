import { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import { Segment, Image, Button, Grid, GridRow, GridColumn, Header } from 'semantic-ui-react'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import * as val from 'yup'
import { errorMessages } from '../../../constants/yupValidation'
import { LogoWrapper, LoginContainer, LoginSegment, InstructionsDiv, LoginHeader, StyledMessage, LogoImage, LogoIcon, LoginField, ToggleLabel, VersionWrapper } from '../../password/constants/layout'

import Logo from '../../../assets/images/login/logo-bluepallet.svg'
import Icon from '../../../assets/images/login/icon-bluepallet.svg'

const StyledForm = styled(Form)`
  margin-bottom: 15px;
`

const LoginButton = styled(Button)`
  margin-top: 40px !important;
`

const AutoColumn = styled(GridColumn)`
  width: auto !important;
  white-space: nowrap;

  &.right.aligned {
    margin-left: auto !important;
  }
`

const validationScheme = val.object().shape({
  username: val.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
  password: val
    .string()
    .min(3, errorMessages.minLength(3))
    .required(errorMessages.requiredMessage)
    .test('trailing-spaces', errorMessages.trailingSpaces, val => val && val.trim() === val)
})

const resetScheme = val.object().shape({
  username: val.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage)
})

const initialValues = {
  username: '',
  password: ''
}

const LoginForm = props => {
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [resetPassword, setResetPassword] = useState(false)

  const { isLoading, message, version, intl, router, identity } = props
  const { formatMessage } = intl

  useEffect(() => {
    const { loginInit, getVersion } = props

    loginInit()
    getVersion()
  }, [])

  const toggleResetPassword = () => {
    setResetPassword(!resetPassword)
  }

  return (
    <>
      <LogoWrapper>
        <LogoImage src={Logo} />
      </LogoWrapper>
      <LoginContainer>
        <LoginSegment loading={isLoading} raised padded='very'>
          <LoginHeader as='h1'>
            <LogoIcon src={Icon} />
            <FormattedMessage id='login.loginPage' defaultMessage='Login Page' />
          </LoginHeader>

          {message ? (
            <StyledMessage error content={message} />
          ) : (
            router.query.auto && <StyledMessage info content={'You have been automatically logged out.'} />
          )}

          <StyledForm
            initialValues={initialValues}
            validateOnChange={true}
            validationSchema={resetPassword ? resetScheme : validationScheme}
            onSubmit={async (values, actions) => {
              const { username, password } = values
              const { login, resetPasswordRequest } = props

              let inputsState = {
                passwordError: resetPassword ? false : password.length < 3,
                usernameError: username.length < 3
              }

              try {
                if (!inputsState.passwordError && !inputsState.usernameError) {
                  if (resetPassword) await resetPasswordRequest(username)
                  else await login(username.trim(), password)
                } else {
                  setUsernameError(inputsState.usernameError)
                  setPasswordError(inputsState.passwordError)
                  actions.setSubmitting(false)
                }
              } catch {
                // design for Bad Credentials
                actions.setFieldError('username', ' ')
                actions.setFieldError('password', ' ')
                actions.setSubmitting(false)
              }
            }}>
            {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => {
              return (
                <>
                  <InstructionsDiv>
                    {resetPassword && <FormattedMessage id='auth.resetPasswordInstructions' />}
                  </InstructionsDiv>

                  <LoginField error={usernameError} data-test='login_username_inp'>
                    <label>
                      <FormattedMessage id='auth.username' defaultMessage='Username' />
                    </label>
                    <Input
                      name='username'
                      inputProps={{ placeholder: formatMessage({ id: 'auth.username', defaultMessage: 'Password' }) }}
                    />
                  </LoginField>
                  {!resetPassword && (
                    <LoginField error={passwordError} data-test='login_password_inp'>
                      <label>
                        <FormattedMessage id='auth.password' defaultMessage='Password' />
                      </label>
                      <Input
                        name='password'
                        inputProps={{
                          placeholder: formatMessage({ id: 'auth.password', defaultMessage: 'Password' }),
                          type: 'password'
                        }}
                      />
                    </LoginField>
                  )}
                  <ToggleLabel onClick={toggleResetPassword} data-test='login_reset_toggle_btn'>
                    {resetPassword ? (
                      <FormattedMessage id='auth.cancelPasswordReset' defaultMessage='Password Reset Cancel'>
                        {text => text}
                      </FormattedMessage>
                    ) : (
                      <FormattedMessage id='auth.resetMyPassword' defaultMessage='Password Reset'>
                        {text => text}
                      </FormattedMessage>
                    )}
                  </ToggleLabel>
                  <LoginButton type='submit' primary fluid size='large' data-test='login_submit_btn' disabled={values.username === '' || (!resetPassword && values.password === '')}>
                    {resetPassword ? (
                      <FormattedMessage id='auth.resetPassword' defaultMessage='Reset Password'>
                        {text => text}
                      </FormattedMessage>
                    ) : (
                      <FormattedMessage id='auth.login' defaultMessage='Log in'>
                        {text => text}
                      </FormattedMessage>
                    )}
                  </LoginButton>
                </>
              )
            }}
          </StyledForm>

          <VersionWrapper>{version && `v${version}`}</VersionWrapper>
        </LoginSegment>
      </LoginContainer>
    </>
  )
}

export default withRouter(injectIntl(LoginForm))
