import { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import { Listings } from '~/modules/wanted-board/listings'
import { injectIntl } from 'react-intl'

class WantedBoardPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.wantedBoardListings', defaultMessage: 'Listings' })}>
        <Listings />
      </Layout>
    )
  }
}

export default securePage(injectIntl(WantedBoardPage))
