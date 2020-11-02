import BidsSentContainer from './components/BidsSentContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const BidsSent = props => {
  const urlApiConfig = {
    url: '/prodex/api/purchase-request-offers/own/datagrid',
    searchToFilter: v => {
      let filters = { or: [], and: [], url: '' }
      if (v && v.filterProductName && v.filterProductName.length > 0) {
        filters.or = v.filterProductName.map(id => {
          return {
            operator: 'EQUALS',
            path: 'PurchaseRequestOffer.productOffer.companyProduct.companyGenericProduct.productGroup.id',
            values: [id]
          }
        })
      }
      if (v && v.filterCasProduct && v.filterCasProduct.length > 0) {
        filters.or = filters.or.concat(v.filterCasProduct.map(id => {
          return {
            operator: 'EQUALS',
            path: 'PurchaseRequestOffer.productOffer.companyProduct.companyGenericProduct.elements.casProduct.id',
            values: [id]
          }
        }))
      }
      return filters
    }
  }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig} preserveFilters skipInitLoad>
        <BidsSentContainer {...props} />
      </DatagridProvider>
    </>
  )
}
