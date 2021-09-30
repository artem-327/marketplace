import RespondModalView from './RespondModal'
import { DatagridProvider } from '../../../../datagrid'

const RespondModal = props => {
    return (
      <>
        <DatagridProvider
          apiConfig={{
            url: `/prodex/api/wanted-board/id/${props.id}/matching-product-offers-datagrid`,
            searchToFilter: v => {
              let filters = { or: [], and: [] }
              if (v && v.searchInput) {
                filters.or.push({
                  operator: 'LIKE',
                  path: 'ProductOfferBid.productOffer.companyProduct.intProductCode',
                  values: [`%${v.searchInput}%`]
                })
                filters.or.push({
                  operator: 'LIKE',
                  path: 'ProductOfferBid.productOffer.companyProduct.intProductName',
                  values: [`%${v.searchInput}%`]
                })
              }
              return filters
            }
          }}
          preserveFilters
          skipInitLoad>
          <RespondModalView />
        </DatagridProvider>
      </>
    )
}

export default RespondModal