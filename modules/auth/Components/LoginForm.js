import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import pt from 'prop-types'
import { Segment, Form, Image, Button, Message } from 'semantic-ui-react'
import Logo from '~/assets/images/login/logo_echo.png'

export default class LoginForm extends Component {
  
  state = {
    usernameError: false,
    passwordError: false
  }

  handleSubmit = async (e) => {
    const {target, target: { username, password }} = e
    const {login} = this.props

    e.preventDefault()
    
    let inputsState = {
      passwordError: target["password"].value.length < 3,
      usernameError: target["username"].value.length < 3
    }
    // console.log(inputsState)
    if (!inputsState.passwordError && !inputsState.usernameError) login(username.value, password.value)
    else this.setState(inputsState)
  }

  render() {
    const { isLoading, message } = this.props
    const { usernameError, passwordError} = this.state
    
    return (
      <Segment loading={isLoading} raised padded="very" style={{ width: 400, margin: 'auto' }}>

        <Segment basic textAlign="center">
          <Image src={Logo} style={{ width: '40%', margin: 'auto' }} />
        </Segment>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field error={usernameError}>
            <label>Username</label>
            <input placeholder='Username' name="username" />
          </Form.Field>
          <Form.Field error={passwordError}>
            <label>Password</label>
            <input placeholder='Password' type="password" name="password" />
          </Form.Field>
          <Button type='submit' primary fluid size="large">Log in</Button>
        </Form>

        <Message error content={message} hidden={!message} />
      </Segment>
    )
  }
}