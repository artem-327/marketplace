import { Component } from 'react'
import { LoginForm } from '~/modules/auth'
import styled from 'styled-components'
import Layout from '~/components/LayoutUnauthorized'
// import '~/styles/login.scss'

const Container = styled.div`
  display: flex;
  flex-flow: column;
  height: 100vh;
  padding: 0;
`
class Login extends Component {
  render() {
    return (
      <Layout>
        <Container>
          <style jsx global>{`
            body {
              background: #f2f2f2;
            }
          `}</style>
          <LoginForm />
        </Container>
      </Layout>
    )
  }
}

export default Login
