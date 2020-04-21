import WantedBoardContainer from './components/WantedBoardContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const WantedBoard = props => {
  const urlApiConfig = {
    url: `/prodex/api/purchase-requests/other/datagrid?type=${props.type}`,
    searchViaPattern: v =>
      v
        ? { url: `/prodex/api/purchase-requests/other/datagrid?type=${props.type}&pattern=${v}` }
        : { url: `/prodex/api/purchase-requests/other/datagrid?type=${props.type}` },
    searchToFilter: v => {
      let filters = { or: [], and: [] }
      if (v && v.and && v.and.length > 0) {
        filters.and = [
          {
            operator: 'EQUALS',
            path: 'PurchaseRequest.elements.echoProduct.tags.id',
            values: v.and
          }
        ]
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
