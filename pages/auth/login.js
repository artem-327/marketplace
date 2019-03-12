import React, {Component} from 'react'
import LoginForm from '~/modules/login/Form'
import defaultPage from '~/hocs/defaultPage'
import Router, {withRouter} from 'next/router'
import {setToken} from '~/utils/auth'
import styled from 'styled-components'

const Container = styled.div`
  padding: 60px 0;
`
class Login extends Component {

  handleSuccess = async (token) => {
    setToken(token)
    
    Router.push('/dashboard')
  }

  render() {
    return (
      <Container>
        <LoginForm onSuccess={this.handleSuccess} />
      </Container>
    )
  }
}

export default withRouter(defaultPage(Login))