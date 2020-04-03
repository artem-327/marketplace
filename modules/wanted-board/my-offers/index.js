import MyOffersContainer from './components/MyOffersContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const MyOffers = props => {
  const urlApiConfig = {
    url: '/prodex/api/purchase-request-offers/own/datagrid',
    searchToFilter: v => (v ? [{ operator: 'LIKE', path: 'PurchaseRequestOffer.owner.name', values: [`%${v}%`] }] : [])
  }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig}>
        <MyOffersContainer {...props} />
      </DatagridProvider>
    </>
  )
}
