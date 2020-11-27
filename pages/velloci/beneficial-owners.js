import React, { Component } from 'react'
import styled from 'styled-components'

import Layout from '~/components/LayoutUnauthorized'
import {
  default as RegisterBeneficialOwner
} from '~/modules/velloci-register/components/RegisterBeneficialOwnerContainer'

const Container = styled.div`
  padding: 60px 0;
`

export default class RegisterBeneficialOwnerPage extends Component {
  render() {
    return (
      <Layout title='Register Beneficial Owner'>
        <RegisterBeneficialOwner />
      </Layout>
    )
  }
}