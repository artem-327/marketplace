import BidsReceivedContainer from './components/BidsReceivedContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const BidsReceived = props => {
  const urlApiConfig = {
    url: '/prodex/api/product-offer-bids/other/datagrid',
    searchToFilter: v => {
      let filters = { or: [], and: [], url: '' }
      if (v && v.searchInput) {
        filters.url = `/prodex/api/product-offer-bids/other/search?pattern=${v.searchInput}`
      }
      if (v && v.initId) {
        filters.or = filters.or.concat([
          { operator: 'EQUALS', path: 'ProductOfferBid.id', values: [v.initId] },
        ])
      }
      return filters
    }
  }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig} preserveFilters skipInitLoad>
        <BidsReceivedContainer {...props} />
      </DatagridProvider>
    </>
  )
}