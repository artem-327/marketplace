import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import defaultPage from './defaultPage'

const securePageHoc = Page => class SecurePage extends React.Component {
  static getInitialProps (ctx) {
    return Page.getInitialProps && Page.getInitialProps(ctx)
  }
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
  }

  componentDidMount() {
    if (!this.props.isAuthenticated) Router.push('/auth/logout')
  }
  
  render () {
    if (!this.props.isAuthenticated) {
      return null
    }
    return <Page {...this.props} />
  }
}

export default Page => defaultPage(securePageHoc(Page))