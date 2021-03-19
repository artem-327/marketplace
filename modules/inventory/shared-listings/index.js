import SharedListingsContainer from './components/SharedListingsContainer'
import { DatagridProvider } from '~/modules/datagrid'
//preserveFilters skipInitLoad
const SharedListings = () => (
  <>
    <DatagridProvider
      apiConfig={{
        url: '/prodex/api/product-offers/shared-listings/datagrid',
        searchToFilter: v => {
          let filters = { or: [], and: [] }
          if (v && v.filterName && v.filterName.length > 0) {
            v.filterName.forEach(
              name =>
                (filters.or = filters.or.concat([
                  { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductName', values: [`%${name}%`] },
                  { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductCode', values: [`%${name}%`] }
                ]))
            )
          }
          if (v && v.filterTags && v.filterTags.length > 0) {
            filters.and = v.filterTags.map(idTag => {
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
    >
      <SharedListingsContainer />
    </DatagridProvider>
  </>
)

export { SharedListings }
