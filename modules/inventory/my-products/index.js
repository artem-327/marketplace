import React, { Component } from 'react'
import MyProductsPage from './components/MyProducts'
import { DatagridProvider } from '~/modules/datagrid'
import { connect } from 'react-redux'

class MyProducts extends Component {
  render() {
  const { myProductsUnmappedValue } = this.props

    return (
      <>
        <DatagridProvider
          apiConfig={{
            url: `/prodex/api/company-products/datagrid?type=${myProductsUnmappedValue}`,
            searchToFilter: v =>
              v && v.searchInput
                ? [
                  {
                    operator: 'LIKE',
                    path: 'CompanyProduct.intProductName',
                    values: [`%${v.searchInput}%`]
                  },
                  {
                    operator: 'LIKE',
                    path: 'CompanyProduct.intProductCode',
                    values: [`%${v.searchInput}%`]
                  },
                  {
                    operator: 'LIKE',
                    path: 'CompanyProduct.companyGenericProduct.name',
                    values: [`%${v.searchInput}%`]
                  },
                  {
                    operator: 'LIKE',
                    path: 'CompanyProduct.companyGenericProduct.code',
                    values: [`%${v.searchInput}%`]
                  }
                ]
                : []
          }}
          preserveFilters
          skipInitLoad>
          <MyProductsPage/>
        </DatagridProvider>
      </>
    )
  }
}

export default connect(
  store => ({
    myProductsUnmappedValue: store.simpleAdd.myProductsUnmappedValue
  }),
  null
)(MyProducts)