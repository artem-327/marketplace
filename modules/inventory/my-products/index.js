import { Component } from 'react'
import { connect } from 'react-redux'
// Components
import MyProductsPage from './components/MyProductsContainer'
import { DatagridProvider } from '../../datagrid'

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
          <MyProductsPage />
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
