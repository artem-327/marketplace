
import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import { DwollaRegister } from '~/modules/dwolla-register'
import { withRouter } from 'next/router'

class Index extends Component {

  render() {
    const { router } = this.props

    return (
      <Layout title='Dwolla Register'>
        <DwollaRegister companyId={router.query.companyId} />
      </Layout>
    )
  }
}

export default withRouter(securePage(Index))