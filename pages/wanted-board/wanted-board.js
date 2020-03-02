import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import { WantedBoard } from '~/modules/wanted-board/wanted-board'
import { injectIntl } from 'react-intl'

class WantedBoardPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.wantedBoard', defaultMessage: 'Wanted Board' })}>
        <WantedBoard activeIndex={0} />
      </Layout>
    )
  }
}

export default securePage(injectIntl(WantedBoardPage))