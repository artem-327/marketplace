import MyOffersContainer from './components/MyOffersContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const MyOffers = props => {
  const urlApiConfig = {
    url: '/prodex/api/purchase-request-offers/own/datagrid',
    searchToFilter: v => (v && v.searchInput
        ? [{
          operator: 'LIKE',
          path: 'PurchaseRequestOffer.productOffer.companyProduct.companyGenericProduct.name',
          values: [`%${v.searchInput}%`]
        }]
        : []
    )
  }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig} preserveFilters skipInitLoad>
        <MyOffersContainer {...props} />
      </DatagridProvider>
    </>
  )
}
