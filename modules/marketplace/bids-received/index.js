import BidsReceivedContainer from './components/BidsReceivedContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const BidsReceived = props => {
  const urlApiConfig = {
    url: '/prodex/api/product-offer-bids/other/datagrid',
    searchToFilter: v => {
      let filters = { or: [], and: [] }
      if (v && v.searchInput) {
        filters.or = filters.or.concat(
          [
            { operator: 'LIKE', path: 'ProductOfferBid.createdBy.name', values: [`%${v.searchInput}%`] },
            {
              operator: 'LIKE',
              path: 'ProductOfferBid.histories.createdBy.homeBranch.company.name',
              values: [`%${v.searchInput}%`]
            },
            {
              operator: 'LIKE',
              path: 'ProductOfferBid.histories.createdBy.homeBranch.company.cfDisplayName',
              values: [`%${v.searchInput}%`]
            },
          ]
        )
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