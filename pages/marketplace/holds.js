import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import Holds from '~/modules/marketplace/holds'
import { injectIntl } from 'react-intl'

class HoldsPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'hold.holds', defaultMessage: 'Holds' })}>
        <Holds />
      </Layout>
    )
  }
}

export default securePage(injectIntl(HoldsPage))
