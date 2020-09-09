import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import { Listings } from '~/modules/wanted-board/listings'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'

class WantedBoardPage extends Component {
  render() {
    const {
      type,
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.wantedBoardListings', defaultMessage: 'Listings' })}>
        <Listings type={type}/>
      </Layout>
    )
  }
}

export default securePage(connect(
  store => ({
    type: store.wantedBoard.wantedBoardType
  }),
  null
)(injectIntl(WantedBoardPage)))