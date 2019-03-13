import React, {Component} from 'react'
import {connect} from 'react-redux'
import Layout from 'components/Layout'
import securePage from '../hocs/securePage'
import Router from 'next/router'

class Index extends Component {
  componentDidMount() {
    Router.push('/dashboard')
  }
  render() { return null }
}

export default connect()(securePage(Index))