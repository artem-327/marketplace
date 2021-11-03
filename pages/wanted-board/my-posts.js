import { Component } from 'react'
import Layout from '../../components/Layout'
import securePage from '../../hocs/securePage'
import { MyPosts } from '../../modules/wanted-board/my-posts'
import { injectIntl } from 'react-intl'

class WantedBoardPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.wantedBoardMyPosts', defaultMessage: 'My posts' })}>
        <MyPosts />
      </Layout>
    )
  }
}

export default securePage(injectIntl(WantedBoardPage))