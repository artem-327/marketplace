import SharedListingsContainer from './components/SharedListingsContainer'
import { DatagridProvider } from '../../datagrid'
import { getSafe } from '../../../utils/functions'

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
            filterName.map(
              name =>
                (filters.or = filters.or.concat([
                  { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductName', values: [`%${name}%`] },
                  { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductCode', values: [`%${name}%`] }
                ]))
            )
          }
          if (v && v.filterTags && v.filterTags.length > 0) {
            v.filterTags.map(idTag => {
              filters.and =  filters.and.concat([{
                operator: 'EQUALS',
                path: 'ProductOffer.companyProduct.companyGenericProduct.productGroup.tags.id',
                values: [idTag]
              }])
            })
          }
          if (v && v.filterCAS && v.filterCAS.length > 0) {
            v.filterCAS.map(idCAS => {
              filters.and =  filters.and.concat([{
                operator: 'EQUALS',
                path: 'ProductOffer.companyProduct.companyGenericProduct.elements.casProduct.id',
                values: [idCAS]
              }])
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
