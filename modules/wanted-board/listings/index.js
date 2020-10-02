import ListingsContainer from './components/ListingsContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const Listings = props => {
  const type = props && props.type && props.type.toUpperCase()

  const urlApiConfig = {
    url: `/prodex/api/purchase-requests/other/datagrid?type=${type}`,
    searchToFilter: v => {
      let filters = { or: [], and: [], url: '' }
      if (v && v.filterTags && v.filterTags.length > 0) {
        filters.and = v.filterTags.map(idTag => {
          return {
            operator: 'EQUALS',
            path: 'PurchaseRequest.elements.productGroup.tags.id',
            values: [idTag]
          }
        })
      }
      if (v && v.filterName) {
        filters.url = `/prodex/api/purchase-requests/other/datagrid?type=${type}&pattern=${encodeURIComponent(
          v.filterName
        )}`
      }
      return filters
    }
  }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig} preserveFilters skipInitLoad>
        <ListingsContainer {...props} />
      </DatagridProvider>
    </>
  )
}
