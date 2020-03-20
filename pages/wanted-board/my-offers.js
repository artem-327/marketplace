import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import { MyOffers } from '~/modules/wanted-board/my-offers'
import { injectIntl } from 'react-intl'

class MyOffersPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.myOffers', defaultMessage: 'My Offers' })}>
        <MyOffers activeIndex={2} />
      </Layout>
    )
  }
}

export default securePage(injectIntl(MyOffersPage))