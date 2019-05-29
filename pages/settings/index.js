
import React, { Component } from 'react'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import SettingsPage from '~/src/pages/settings'
import {withRouter, Router} from 'next/router'

class Index extends Component {

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps', nextProps)
  }

  componentDidMount(){
    console.log('componentDidMount')
  }

  componentWillUnmount(){
    console.log('componentWillUnmount')
  }

  render() {

    return (
      <Layout title="Settings">
        <SettingsPage type={this.props.router.query.type} />
      </Layout>
    )
  }
}

export default withRouter(securePage(Index))