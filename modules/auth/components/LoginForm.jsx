import { useState, useEffect } from 'react'
import { withRouter } from 'next/router'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import moment from 'moment/moment'
import Cookies from 'universal-cookie'
//Components
import { LogoWrapper, LoginContainer, LoginSegment, InstructionsDiv, LoginHeader, StyledMessage, LogoImage, LogoIcon, LoginField, ToggleLabel, VersionWrapper } from '../../password/constants/layout'
import AuthenticationSelectPopup from './AuthenticationSelectPopup'
import AuthenticationEnterPopup from './AuthenticationEnterPopup'
//Images
import Logo from '../../../assets/images/login/logo-bluepallet.svg'
import Icon from '../../../assets/images/login/icon-bluepallet.svg'
//Styles
import { StyledForm, LoginButton, AutoColumn } from '../styles'
//Constants
import { validationLoginFormScheme, resetLoginFormScheme, initLoginFormValues } from '../constants'

const cookies = new Cookies()

const LoginForm = props => {
  const [usernameError, setUsernameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [resetPassword, setResetPassword] = useState(false)
  const [twoFactorAuthLastSent, setTwoFactorAuthLastSent] = useState(null)
  const [twoFactorAuthtime, setTwoFactorAuthTime] = useState(Date.now())
  let twoFactorAuthTimeoutSecs

  const { isLoading, message, version, intl, router, identity, twoFactorAuthSession } = props
  const { formatMessage } = intl

  useEffect(() => {
    const { loginInit, getVersion } = props

    loginInit()
    getVersion()
    // To rerender every 1 second (to update timeout in seconds in Send button)
    twoFactorAuthTimeoutSecs = setInterval(() => setTwoFactorAuthTime(Date.now()), 1000)

    let cookiesValue = cookies.get('twoFactorAuthLastSent')
    if (cookiesValue) {
      setTwoFactorAuthLastSent(Number(cookiesValue))
    }

    return () => {
      clearInterval(twoFactorAuthTimeoutSecs)
      cookies.remove('twoFactorAuthLastSent', { path: '/' })
    }
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
            initialValues={initLoginFormValues}
            validateOnChange={true}
            validationSchema={resetPassword ? resetLoginFormScheme : validationLoginFormScheme}
            onSubmit={async (values, actions) => {
              const { username, password } = values
              const { login, resetPasswordRequest } = props
              actions.setSubmitting(false)

              let inputsState = {
                passwordError: resetPassword ? false : password.length < 3,
                usernameError: username.length < 3
              }

              try {
                if (!inputsState.passwordError && !inputsState.usernameError) {
                  if (resetPassword) {
                    await resetPasswordRequest(username)
                  }
                  else {
                    await login(username.trim(), password)

                  }
                } else {
                  setUsernameError(inputsState.usernameError)
                  setPasswordError(inputsState.passwordError)
                }
              } catch {
                // design for Bad Credentials
                actions.setFieldError('username', ' ')
                actions.setFieldError('password', ' ')
              }
            }}>
            {({ values, errors, setFieldValue, validateForm, validate, submitForm, setSubmitting }) => {
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
                  {twoFactorAuthSession?.options && (
                    <AuthenticationSelectPopup
                      loading={isLoading}
                      options={twoFactorAuthSession.options}
                      message={message}
                      description={(
                        <FormattedMessage
                          id='auth.weDontRecognizeDevice'
                          defaultMessage='We don’t recognize this device. For your safety, select which device you would like a verification code to be sent.'
                        />
                      )}
                      onAccept={async value => {
                        try {
                          await props.login(
                            values.username.trim(),
                            values.password,
                            twoFactorAuthSession.session,
                            value
                          )
                          setTwoFactorAuthLastSent(Date.now())
                          cookies.set('twoFactorAuthLastSent', Date.now(),{ path: '/' })
                        } catch (e) {
                          console.error(e)
                        }
                      }}
                      timeoutSeconds={
                        twoFactorAuthLastSent ? 30 - moment().diff(twoFactorAuthLastSent, 'seconds') : 0
                      }
                    />
                  )}
                  {twoFactorAuthSession && !twoFactorAuthSession.options && (
                    <AuthenticationEnterPopup
                      loading={isLoading}
                      message={message}
                      description={(
                        <FormattedMessage
                          id='auth.pleaseEnterSixDigits'
                          defaultMessage='Please Enter the six-digit code sent to your email.'
                        />
                      )}
                      onAccept={async value => {
                        try {
                          await props.login(
                            values.username.trim(),
                            values.password,
                            twoFactorAuthSession.session,
                            null,
                            value
                          )
                        } catch (e) {
                          console.error(e)
                        }
                      }}
                    />
                  )}
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

LoginForm.propTypes = {
  isLoading: PropTypes.bool,
  message: PropTypes.string,
  version: PropTypes.string,
  intl: PropTypes.object,
  router: PropTypes.any,
  identity: PropTypes.object,
  loginInit: PropTypes.func,
  getVersion: PropTypes.func,
  login: PropTypes.func,
  resetPasswordRequest: PropTypes.func
}

LoginForm.defaultProps = {
  isLoading: false,
  message: '',
  version: '',
  intl: {},
  router: null,
  identity: {},
  loginInit: () => {},
  getVersion: () => {},
  login: () => {},
  resetPasswordRequest: () => {}
}

export default withRouter(injectIntl(LoginForm))
