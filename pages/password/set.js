import React, {Component} from 'react'
import styled from 'styled-components'

import Layout from '~/components/LayoutUnauthorized'
import {Password} from '~/modules/password'

const Container = styled.div`
  padding: 60px 0;
`

export default class Login extends Component {
  render() {
    return (
      <Layout>
        <Container>
          <style jsx global>{`
            body {
              background: #f2f2f2;
            }
          `}</style>
          <Password forgottenPassword={false} />
        </Container>
      </Layout>
    )
  }
}
