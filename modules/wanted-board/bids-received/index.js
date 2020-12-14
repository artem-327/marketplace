import BidsReceivedContainer from './components/BidsReceivedContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const BidsReceived = props => {
  const apiConfig = {
    url: '/prodex/api/purchase-requests/own/datagrid',
    searchToFilter: v => {
      let filters = { or: [], and: [], url: '' }
      if (v && v.filterProductName && v.filterProductName.length > 0) {
        filters.or = v.filterProductName.map(id => {
          return {
            operator: 'EQUALS',
            path: 'PurchaseRequest.elements.productGroup.id',
            values: [id]
          }
        })
      }
      if (v && v.filterCasProduct && v.filterCasProduct.length > 0) {
        filters.or = filters.or.concat(v.filterCasProduct.map(id => {
          return {
            operator: 'EQUALS',
            path: 'PurchaseRequest.elements.casProduct.id',
            values: [id]
          }
        }))
      }
      return filters
    }
  }
  return (
    <>
      <DatagridProvider apiConfig={apiConfig} preserveFilters skipInitLoad>
        <BidsReceivedContainer {...props} />
      </DatagridProvider>
    </>
  )
}
