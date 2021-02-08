import BidsSentContainer from './components/BidsSentContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const BidsSent = props => {
  const urlApiConfig = {
    url: '/prodex/api/product-offer-bids/own/datagrid',
    searchToFilter: v => {
      let filters = { or: [], and: [], url: '' }
      if (v && v.searchInput) {
        filters.url = `/prodex/api/product-offer-bids/own/search?pattern=${v.searchInput}`
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
        <BidsSentContainer {...props} />
      </DatagridProvider>
    </>
  )
}