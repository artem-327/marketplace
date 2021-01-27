import { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import { VellociRegister } from '~/modules/velloci-register'
import { withRouter } from 'next/router'

class Index extends Component {
  render() {
    const { router } = this.props

    return (
      <Layout title='Velloci Register'>
        <VellociRegister companyId={router.query.companyId} />
      </Layout>
    )
  }
}

export default withRouter(securePage(Index))
