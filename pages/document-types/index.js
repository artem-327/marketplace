import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import DocumentTypes from '~/modules/document-types'

import { injectIntl } from 'react-intl'

class Index extends Component {
  componentDidMount() {
    if (!this.props.auth?.identity?.isAdmin) this.props.displayErrorForbidden()
  }

  render() {
    const {
      intl: { formatMessage },
      auth
    } = this.props
    return (
      <Layout
        title={formatMessage({
          id: 'documentTypes.title',
          defaultMessage: 'Document Types'
        })}>
        {!auth?.identity?.isAdmin
          ? (null)
          : (<DocumentTypes />)
        }
      </Layout>
    )
  }
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(Index)))
