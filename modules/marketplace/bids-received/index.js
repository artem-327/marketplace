import { useState } from 'react'
// Components
import BidsReceivedContainer from './components/BidsReceivedContainer'
import { DatagridProvider } from '../../datagrid'
// Constants
import { GA_TRACK_QUERY } from '../../../constants'
import { getSafe } from '../../../utils/functions'

export const BidsReceived = props => {
  const [gaSearch, setGaSearch] = useState('')

  const urlApiConfig = {
    url: gaSearch ? `/prodex/api/product-offer-bids/other/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}` : `/prodex/api/product-offer-bids/other/datagrid`,
    searchToFilter: v => {
      setGaSearch(getSafe(() => v.searchInput, ''))
      let filters = { or: [], and: [], url: '' }
      if (v && v.searchInput) {
        filters.url = `/prodex/api/product-offer-bids/other/search?pattern=${encodeURIComponent(v.searchInput)}`
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