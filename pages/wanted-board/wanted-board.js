import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import { WantedBoard } from '~/modules/wanted-board/wanted-board'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'

class WantedBoardPage extends Component {
  render() {
    const {
      type,
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.wantedBoard', defaultMessage: 'Wanted Board' })}>
        <WantedBoard activeIndex={0} type={type}/>
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