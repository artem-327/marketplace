import RespondModalView from './RespondModal'
import { DatagridProvider } from '../../../../datagrid'

const RespondModal = props => {
    return (
      <>
        <DatagridProvider
          apiConfig={{
            url: `/prodex/api/wanted-board/id/${props.id}/product-offers-datagrid`,
            searchToFilter: v => {
              let filters = { or: [], and: [] }
              if (v && v.searchInput) {
                filters.or.push({
                  operator: 'LIKE',
                  path: 'ProductOffer.companyProduct.companyGenericProduct.name',
                  values: [`%${v.searchInput}%`]
                })
                filters.or.push({
                  operator: 'LIKE',
                  path: 'ProductOffer.companyProduct.companyGenericProduct.code',
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