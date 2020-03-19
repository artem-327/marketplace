import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import { MyRequestedItems } from '~/modules/wanted-board/my-requested-items'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'

class MyRequestedItemsPage extends Component {
  render() {
    const {
      type,
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.myRequestedItems', defaultMessage: 'My Requested Items' })}>
        <MyRequestedItems activeIndex={1} type={type}/>
      </Layout>
    )
  }
}

export default securePage(connect(
  store => ({
    type: store.wantedBoard.myRequestedItemsType
  }),
  null
)(injectIntl(MyRequestedItemsPage)))