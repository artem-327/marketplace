import SharedListingsContainer from './components/SharedListingsContainer'
import { DatagridProvider } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'

const SharedListings = () => (
  <>
    <DatagridProvider
      apiConfig={{
        url: '/prodex/api/product-offers/shared-listings/datagrid',
        searchToFilter: v => {
          let filters = { or: [], and: [] }
          const filterName = getSafe(() => v.SearchByNamesAndTags.filters.filterName, [])
          const filterTags = getSafe(() => v.SearchByNamesAndTags.filters.filterTags, [])

          // TODO - add location filter

          if (filterName.length > 0) {
            filterName.forEach(
              name =>
                (filters.or = filters.or.concat([
                  { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductName', values: [`%${name}%`] },
                  { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductCode', values: [`%${name}%`] }
                ]))
            )
          }
          if (filterTags.length > 0) {
            filters.and = filterTags.map(idTag => {
              return {
                operator: 'EQUALS',
                path: 'ProductOffer.companyProduct.companyGenericProduct.productGroup.tags.id',
                values: [idTag]
              }
            })
          }
          return filters
        }
      }}
      preserveFilters
      skipInitLoad
    >
      <SharedListingsContainer />
    </DatagridProvider>
  </>
)

export { SharedListings }
