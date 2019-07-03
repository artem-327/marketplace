import React, { Component } from 'react'
import Router from 'next/router'
import { Segment, Form, Image, Button, Message, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'

import Logo from '~/assets/images/login/logo_echo.png'

const LoginSegment = styled(Segment)`
  width: 400px;
  margin: auto !important;
`
const LogoImage = styled(Image)`
  width: 40%;
  margin: auto;
`

const StyledForm = styled(Form)`
  margin-bottom: 15px;
`

const ToggleLabel = styled.label`
  color: #4183C4;
  cursor: pointer;
`

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

  handleSubmit = async (e) => {
    const { target, target: { username, password } } = e
    const { login, resetPasswordRequest } = this.props

    e.preventDefault()

    let inputsState = {
      passwordError: this.state.resetPassword ? false : target['password'].value.length < 3,
      usernameError: target['username'].value.length < 3
    }

    if (!inputsState.passwordError && !inputsState.usernameError) {
      if (this.state.resetPassword) resetPasswordRequest(username.value)
      else login(username.value, password.value)
    }
    else this.setState(inputsState)
  }


  toggleResetPassword = () => {
    this.setState((s) => ({
      resetPassword: !s.resetPassword
    }))
  }

  render() {
    const { isLoading, message, version, intl } = this.props
    const { usernameError, passwordError } = this.state
    const { formatMessage } = intl

    return (
      <LoginSegment loading={isLoading} raised padded='very'>
        <Segment basic textAlign='center'>
          <LogoImage src={Logo} />
        </Segment>

        <StyledForm onSubmit={this.handleSubmit}>
          <Form.Field error={usernameError}>
            <label><FormattedMessage id='auth.username' defaultMessage='Username' /></label>
            <input placeholder={formatMessage({ id: 'auth.username', defaultMessage: 'Password' })} name='username' />
          </Form.Field>
          {
            !this.state.resetPassword &&
            <Form.Field error={passwordError}>
              <label><FormattedMessage id='auth.password' defaultMessage='Password' /></label>
              <input placeholder={formatMessage({ id: 'auth.password', defaultMessage: 'Password' })} type='password' name='password' />
            </Form.Field>
          }
          <Button type='submit' primary fluid size='large'>
            {this.state.resetPassword
              ? <FormattedMessage id='auth.resetPassword' defaultMessage='Reset Password' />
              : <FormattedMessage id='auth.login' defaultMessage='Log in' />}
          </Button>
        </StyledForm>

        <Message error content={message} hidden={!message} />
        <Grid>
          <GridRow>
            <GridColumn computer={12}>
              <ToggleLabel onClick={this.toggleResetPassword}>
                {this.state.resetPassword
                  ? <FormattedMessage id='auth.cancelPasswordReset' />
                  : <FormattedMessage id='auth.resetMyPassword' defaultMessage='Reset my Password' />
                }

              </ToggleLabel>
            </GridColumn>

            <GridColumn computer={4} textAlign='right'>
              {version}
            </GridColumn>
          </GridRow>

          {this.state.resetPassword &&
            <GridRow>
              <GridColumn>
                <FormattedMessage id='auth.resetPasswordInstructions' />
              </GridColumn>
            </GridRow>
          }
        </Grid>

      </LoginSegment>
    )
  }
}

export default injectIntl(LoginForm)