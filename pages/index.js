import React, {Component} from 'react'
import securePage from '../hocs/securePage'
import Router from 'next/router'

class Index extends Component {
  componentDidMount() {
    Router.push('/inventory/my')
  }
  render() { return null }
}

export default securePage(Index)