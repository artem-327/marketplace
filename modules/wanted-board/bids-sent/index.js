import BidsSentContainer from './components/BidsSentContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const BidsSent = props => {
  const urlApiConfig = {
    url: '/prodex/api/purchase-request-offers/own/datagrid',
    searchToFilter: v =>
      v && v.searchInput
        ? [
            {
              operator: 'LIKE',
              path: 'PurchaseRequestOffer.productOffer.companyProduct.companyGenericProduct.name',
              values: [`%${v.searchInput}%`]
            }
          ]
        : []
  }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig} preserveFilters skipInitLoad>
        <BidsSentContainer {...props} />
      </DatagridProvider>
    </>
  )
}
