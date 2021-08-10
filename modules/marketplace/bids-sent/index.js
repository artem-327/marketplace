import { useState } from 'react'
// Components
import BidsSentContainer from './components/BidsSentContainer'
import { DatagridProvider } from '../../datagrid'
// Constants
import { GA_TRACK_QUERY } from '../../../constants'
import { getSafe } from '../../../utils/functions'

export const BidsSent = props => {
  const [gaSearch, setGaSearch] = useState('')

  const urlApiConfig = {
    url: gaSearch ? `/prodex/api/product-offer-bids/own/datagrid?${GA_TRACK_QUERY}=${gaSearch}` : `/prodex/api/product-offer-bids/own/datagrid`,
    searchToFilter: v => {
      setGaSearch(getSafe(() => v.searchInput, ''))
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