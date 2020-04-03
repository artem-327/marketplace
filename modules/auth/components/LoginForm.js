import React, { Component } from 'react'
import { withRouter } from 'next/router'
import { Segment, Image, Button, Message, Grid, GridRow, GridColumn, Header } from 'semantic-ui-react'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import ConfirmationPage from '~/modules/auth/components/ConfirmationPage'
import { getSafe } from '~/utils/functions'
import * as val from 'yup'
import { errorMessages } from '~/constants/yupValidation'

import Logo from '~/assets/images/login/logo-login.png'

const LoginSegment = styled(Segment)`
  position: relative;
  width: 400px;
  margin: 100px auto 0 !important;
  border: 0 none !important;
  padding: 40px !important;
  box-shadow: 0 0 0 3000px #1b3454 !important;
`

const LogoWrapper = styled(Segment)`
  position: absolute !important;
  top: -125px;
  left: 26px;
  right: 26px;
  width: 348px;
  max-width: 348px;
  margin: 0 !important;
  border: 0 none !important;
  padding: 0 !important;
  background: transparent !important;
  box-shadow: 0 0 0 0 transparent !important;
`

const LogoImage = styled(Image)`
  width: 100%;
  height: auto;
`

const StyledForm = styled(Form)`
  margin-bottom: 15px;
`

const ToggleLabel = styled.label`
  color: #4183c4;
  cursor: pointer;
`

const InstructionsDiv = styled.div`
  margin-bottom: 15px;
  text-align: justify;
  font-size: 0.9rem;
`

const LoginHeader = styled.div`
  position: relative;
  margin: -31px 0 1.8571429rem -40px;
  padding: 0 0 4px 40px;
  text-decoration: none !important;
  font-size: 1.7857143em;
  font-weight: 400;
  line-height: 2.44;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 103px;
    height: 4px;
    background: #1b3454;
  }
`

const LoginField = styled(Form.Field)`
  margin-bottom: 1rem !important;
`

const LoginButton = styled(Button)`
  margin-top: 40px !important;
`

const validationScheme = val.object().shape({
  username: val
    .string()
    .trim()
    .email(errorMessages.invalidEmail)
    .required(errorMessages.requiredMessage),
  password: val
    .string()
    .min(3, errorMessages.minLength(3))
    .required(errorMessages.requiredMessage)
    .test('trailing-spaces', errorMessages.trailingSpaces, val => val && val.trim() === val)
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
        {getSafe(() => identity.company.reviewRequested, false) && getSafe(() => identity.isCompanyAdmin, false) ? (
          <>
            <ConfirmationPage />
          </>
        ) : (
          <LoginSegment loading={isLoading} raised padded='very'>
            <LogoWrapper>
              <LogoImage src={Logo} />
            </LogoWrapper>

            <LoginHeader as='h1'>
              <FormattedMessage id='login.welcomeBack' defaultMessage='Welcome back!' />
            </LoginHeader>

            <StyledForm
              initialValues={initialValues}
              validateOnChange={true}
              validationSchema={validationScheme}
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
                    <LoginButton type='submit' primary fluid size='large' data-test='login_submit_btn'>
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

            {message ? (
              <Message error content={message} />
            ) : (
              router.query.auto && <Message info content={'You have been automatically logged out.'} />
            )}

            <Grid>
              <GridRow>
                <GridColumn computer={8}>
                  <ToggleLabel onClick={this.toggleResetPassword} data-test='login_reset_toggle_btn'>
                    {this.state.resetPassword ? (
                      <FormattedMessage id='auth.cancelPasswordReset' defaultMessage='Cancel Password Reset'>
                        {text => text}
                      </FormattedMessage>
                    ) : (
                      <FormattedMessage id='auth.resetMyPassword' defaultMessage='Password Reset'>
                        {text => text}
                      </FormattedMessage>
                    )}
                  </ToggleLabel>
                </GridColumn>

                <GridColumn computer={8} textAlign='right'>
                  {version && `v${version}`}
                </GridColumn>
              </GridRow>
            </Grid>
          </LoginSegment>
        )}
      </>
    )
  }
}

export default withRouter(injectIntl(LoginForm))
