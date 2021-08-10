import { useState } from 'react'
import { connect } from 'react-redux'
// Components
import MyProductsPage from './components/MyProductsContainer'
import { DatagridProvider } from '../../datagrid'
import { getSafe } from '../../../utils/functions'
// Constants
import { GA_TRACK_QUERY } from '../../../constants'

const MyProducts = props => {
  const [gaSearch, setGaSearch] = useState('')
  const { myProductsUnmappedValue } = props

  return (
    <>
      <DatagridProvider
        apiConfig={{
          url: gaSearch ? `/prodex/api/company-products/datagrid?type=${myProductsUnmappedValue}&${GA_TRACK_QUERY}=${gaSearch}` : `/prodex/api/company-products/datagrid?type=${myProductsUnmappedValue}`,
          searchToFilter: v => {
            setGaSearch(getSafe(() => v.searchInput, ''))
            return v && v.searchInput
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
          }
        }}
        preserveFilters
        skipInitLoad>
        <MyProductsPage />
      </DatagridProvider>
    </>
  )
}

export default connect(
  store => ({
    myProductsUnmappedValue: store.simpleAdd.myProductsUnmappedValue
  }),
  null
)(MyProducts)
