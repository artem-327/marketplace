import { Component } from 'react'
//Components
import Layout from '~/components/LayoutUnauthorized'
import { default as RegisterBeneficialOwner } from '~/modules/velloci-register/components/RegisterBeneficialOwnerContainer'
export default class RegisterBeneficialOwnerPage extends Component {
  render() {
    return (
      <Layout title='Register Beneficial Owner'>
        <RegisterBeneficialOwner />
      </Layout>
    )
  }
}
