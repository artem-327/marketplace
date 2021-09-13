import { Component } from 'react'
import Layout from '../../components/Layout'
import securePage from '../../hocs/securePage'
import { AllPosts } from '../../modules/wanted-board/all-posts'
import { injectIntl } from 'react-intl'

class WantedBoardPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.wantedBoardAllPosts', defaultMessage: 'All posts' })}>
        <AllPosts />
      </Layout>
    )
  }
}

export default securePage(injectIntl(WantedBoardPage))
