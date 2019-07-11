import React, {Component} from 'react'
import {LoginForm} from '~/modules/auth'
import styled from 'styled-components'
import Layout from '~/components/LayoutUnauthorized'
// import '~/styles/login.scss'

const Container = styled.div`
  padding: 60px 0;
`
class Login extends Component {

  render() {
    return (
      <Layout>
        <Container>
          <style jsx global>{`body {background: #f2f2f2;}`}</style>
          <LoginForm />
        </Container>
      </Layout>
    )
  }
}

export default Login