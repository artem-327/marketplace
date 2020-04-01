import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import OperationsPage from '~/modules/operations'

class Index extends Component {
  render() {
    const { currentTab } = this.props
    return (
      <Layout title={currentTab.name}>
        <OperationsPage />
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.operations.currentTab
  }
}

export default securePage(connect(mapStateToProps)(Index))
