import React, { Component } from 'react'
import {Form as RForm, Control as RControl} from 'react-redux-form'
import { FormattedMessage, injectIntl } from 'react-intl'
import pt from 'prop-types'
import { Segment, Form, Image, Button, Message } from 'semantic-ui-react'
import Logo from '~/assets/images/login/logo_echo.png'

export default class LoginForm extends Component {
  static propTypes = {
    onSuccess: pt.func.isRequired
  }
  state = {
    loading: false,
    message: null
  }

  handleSubmit = async ({ target: { username, password } }) => {
    const {login} = this.props

    login(username.value, password.value)
    
    this.setState({ loading: true, message: null })
    
    try {
      const auth = await login(username.value, password.value)  
      this.props.onSuccess(auth.access_token)
    } catch(error) {
      this.setState({
        message: error.error_description || 'Something went wrong',
        loading: false
      })
    }
  }

  render() {
    const { loading, message } = this.state
    
    return (
      <Segment loading={loading} raised padded="very" style={{ width: 400, margin: 'auto' }}>

        <Segment basic textAlign="center">
          <Image src={Logo} style={{ width: '40%', margin: 'auto' }} />
        </Segment>

        <Form onSubmit={this.handleSubmit} as={RForm}>
          <Form.Field>
            <label>Username</label>
            <input placeholder='Username' name="username" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input placeholder='Password' type="password" name="password" />
          </Form.Field>
          <Button type='submit' primary fluid size="large">Login</Button>
        </Form>

        <Message error content={message} hidden={!message} />
      </Segment>
    )
  }
}