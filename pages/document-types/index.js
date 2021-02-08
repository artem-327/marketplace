import { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import DocumentTypes from '~/modules/document-types'

import { injectIntl } from 'react-intl'

class Index extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props
    return (
      <Layout
        title={formatMessage({
          id: 'documentTypes.title',
          defaultMessage: 'Document Types'
        })}>
        <DocumentTypes />
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))
