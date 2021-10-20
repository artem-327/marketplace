import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import Layout from '../../components/Layout'
import securePage from '../../hocs/securePage'
import { AllPosts } from '../../modules/wanted-board/all-posts'
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
      <Layout title={formatMessage({ id: 'title.wantedBoardAllPosts', defaultMessage: 'All posts' })}>
        {process?.env?.NODE_ENV === 'production'
          ? (null)
          : (<AllPosts />)
        }
      </Layout>
    )
  }
}

export default securePage(connect(() => {}, { displayErrorForbidden })(injectIntl(WantedBoardPage)))
