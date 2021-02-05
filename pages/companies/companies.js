import { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import Companies from '~/modules/companies'
import { injectIntl } from 'react-intl'

class Index extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props
    return (
      <Layout title={formatMessage({ id: 'title.companies.companies', defaultMessage: 'Companies' })}>
        <Companies currentTab={'companies'} />
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))
