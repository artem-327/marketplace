import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import { MyRequestedItems } from '~/modules/wanted-board/my-requested-items'
import { injectIntl } from 'react-intl'

class MyRequestedItemsPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.myRequestedItems', defaultMessage: 'My Requested Items' })}>
        <MyRequestedItems activeIndex={1} />
      </Layout>
    )
  }
}

export default securePage(injectIntl(MyRequestedItemsPage))