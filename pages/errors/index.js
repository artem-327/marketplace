import React, { Component } from 'react'
import securePage from '~/hocs/securePage'
import Layout from 'components/Layout'
import { injectIntl } from 'react-intl'
import Errors from '~/modules/errors'

class ErrorPage extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <Layout title={formatMessage({ id: 'global.errorCapital', defaultMessage: 'ERROR' })}>
        <Errors />
      </Layout>
    )
  }
}

export default securePage(injectIntl(ErrorPage))
