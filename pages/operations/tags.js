import { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import OperationsPage from '~/modules/operations'
import { injectIntl } from 'react-intl'

class Index extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props
    return (
      <Layout title={formatMessage({ id: 'title.companies.tags', defaultMessage: 'Tags' })}>
        <OperationsPage currentTab={'tags'} />
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))
