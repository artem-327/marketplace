import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import Layout from '../../components/Layout'
import securePage from '../../hocs/securePage'
import { MyPosts } from '../../modules/wanted-board/my-posts'
import { injectIntl } from 'react-intl'

class WantedBoardPage extends Component {
  componentDidMount() {
    if (process?.env?.NODE_ENV === 'production') this.props.displayErrorForbidden()
  }

  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.wantedBoardMyPosts', defaultMessage: 'My posts' })}>
        {process?.env?.NODE_ENV === 'production'
          ? (null)
          : (<MyPosts />)
        }
      </Layout>
    )
  }
}

export default securePage(connect(() => {}, { displayErrorForbidden })(injectIntl(WantedBoardPage)))
