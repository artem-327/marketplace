import React, { Component } from 'react'
import ErrorComponent from '~/components/error'

export default class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render() {
    <ErrorComponent statusCode={this.props.statusCode} />
  }
}

