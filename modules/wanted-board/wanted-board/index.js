import WantedBoardContainer from './components/WantedBoardContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const WantedBoard = props => {
  const urlApiConfig = {
    url: `/prodex/api/purchase-requests/other/datagrid?type=${props.type}`,
    searchToFilter: v => {
      let filters = { or: [], and: [], url: '' }
      if (v && v.and && v.and.length > 0) {
        filters.and = v.and.map(idTag => {
          return {
            operator: 'EQUALS',
            path: 'PurchaseRequest.elements.productGroup.tags.id',
            values: [idTag]
          }
        })
      }
      if (v && v.or) {
        filters.url = `/prodex/api/purchase-requests/other/datagrid?type=${props.type}&pattern=${v.or}`
      }
      return filters
    }
  }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig}>
        <WantedBoardContainer {...props} />
      </DatagridProvider>
    </>
  )
}
