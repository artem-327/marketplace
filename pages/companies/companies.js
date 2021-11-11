import { Component } from 'react'
import { connect } from 'react-redux'
import { displayErrorForbidden } from '../../modules/errors/actions'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import Companies from '~/modules/companies'
import { injectIntl } from 'react-intl'

class Index extends Component {
  componentDidMount() {
    if (!(this.props.auth?.identity?.isAdmin || this.props.auth?.identity?.isBusinessDevelopmentRepresentative))
      this.props.displayErrorForbidden()
  }

  render() {
    const {
      intl: { formatMessage },
      auth
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'title.companies.companies', defaultMessage: 'Companies' })}>
        {!(auth?.identity?.isAdmin || auth?.identity?.isBusinessDevelopmentRepresentative)
          ? (null)
          : (<Companies currentTab={'companies'} />)
        }
      </Layout>
    )
  }
}

export default securePage(connect(store => ({ auth: store.auth }), { displayErrorForbidden })(injectIntl(Index)))