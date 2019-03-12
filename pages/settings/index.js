
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'

class Index extends Component {

  render() {
    return (
      <Layout title="Dashboard">
        <h1>Settings</h1>
      </Layout>
    )
  }
}

export default connect()(securePage(Index))