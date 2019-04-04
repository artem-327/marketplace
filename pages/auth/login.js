import React, {Component} from 'react'
import {LoginForm} from '~/modules/auth'
import defaultPage from '~/hocs/defaultPage'
import styled from 'styled-components'
import Layout from '~/components/LayoutUnauthorized'

const Container = styled.div`
  padding: 60px 0;
`
class Login extends Component {

  static bodyClassName = 'login'

  render() {
    return (
      <Layout>
        <Container>
          <LoginForm />
        </Container>
      </Layout>
    )
  }
}

export default defaultPage(Login)