import WantedBoardContainer from './components/WantedBoardContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const WantedBoard = props => {
  const urlApiConfig = {
    url: `/prodex/api/purchase-requests/other/datagrid?type=${props.type}`,
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
        filters.url = `/prodex/api/purchase-requests/other/datagrid?type=${props.type}&pattern=${encodeURIComponent(
          v.filterName
        )}`
      }
      return filters
    }
  }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig} preserveFilters skipInitLoad>
        <WantedBoardContainer {...props} />
      </DatagridProvider>
    </>
  )
}
