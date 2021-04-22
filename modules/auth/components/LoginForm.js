import { Component } from 'react'
import { withRouter } from 'next/router'
import { Segment, Image, Button, Grid, GridRow, GridColumn, Header } from 'semantic-ui-react'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { getSafe } from '~/utils/functions'
import * as val from 'yup'
import { errorMessages } from '~/constants/yupValidation'
import { LogoWrapper, LoginContainer, LoginSegment, InstructionsDiv, LoginHeader, StyledMessage, LogoImage, LogoIcon, LoginField, StyledInput, ToggleLabel, VersionWrapper } from '../../password/constants/layout'

import Logo from '~/assets/images/login/logo-bluepallet.svg'
import Icon from '~/assets/images/login/icon-bluepallet.svg'

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

class LoginForm extends Component {
  state = {
    usernameError: false,
    passwordError: false,
    resetPassword: false
  }

  componentDidMount() {
    const { loginInit, getVersion } = this.props

    loginInit()
    getVersion()
  }

  toggleResetPassword = () => {
    this.setState(s => ({
      resetPassword: !s.resetPassword
    }))
  }

  render() {
    const { isLoading, message, version, intl, router, identity } = this.props
    const { usernameError, passwordError } = this.state
    const { formatMessage } = intl

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
              validationSchema={this.state.resetPassword ? resetScheme : validationScheme}
              onSubmit={async (values, actions) => {
                const { username, password } = values
                const { login, resetPasswordRequest } = this.props

                let inputsState = {
                  passwordError: this.state.resetPassword ? false : password.length < 3,
                  usernameError: username.length < 3
                }

                try {
                  if (!inputsState.passwordError && !inputsState.usernameError) {
                    if (this.state.resetPassword) await resetPasswordRequest(username)
                    else await login(username.trim(), password)
                  } else {
                    this.setState(inputsState)
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
                      {this.state.resetPassword && <FormattedMessage id='auth.resetPasswordInstructions' />}
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
                    {!this.state.resetPassword && (
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
                    <ToggleLabel onClick={this.toggleResetPassword} data-test='login_reset_toggle_btn'>
                      {this.state.resetPassword ? (
                        <FormattedMessage id='auth.cancelPasswordReset' defaultMessage='Password Reset Cancel'>
                          {text => text}
                        </FormattedMessage>
                      ) : (
                        <FormattedMessage id='auth.resetMyPassword' defaultMessage='Password Reset'>
                          {text => text}
                        </FormattedMessage>
                      )}
                    </ToggleLabel>
                    <LoginButton type='submit' primary fluid size='large' data-test='login_submit_btn' disabled={values.username === '' || (!this.state.resetPassword && values.password === '')}>
                      {this.state.resetPassword ? (
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
}

export default withRouter(injectIntl(LoginForm))
