import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import ProductsPage from '~/modules/products'

class Index extends Component {
  render() {
    const { currentTab } = this.props
    return (
      <Layout title={currentTab.name}>
        <ProductsPage />
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.productsAdmin.currentTab
  }
}

export default securePage(connect(mapStateToProps)(Index))
