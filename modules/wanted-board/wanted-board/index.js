import WantedBoardContainer from './components/WantedBoardContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const WantedBoard = props => {
  const urlApiConfig = {
    url: `/prodex/api/purchase-requests/other/datagrid?type=${props.type}`,
    searchToFilter: v =>
      v
        ? [
            { operator: 'CONTAINS', path: 'PurchaseRequestElement.echoProduct.name', values: [v] },
            { operator: 'CONTAINS', path: 'PurchaseRequestElement.echoProduct.code', values: [v] },
            { operator: 'CONTAINS', path: 'PurchaseRequestElement.casProduct.casNumber', values: [v] },
            { operator: 'CONTAINS', path: 'PurchaseRequestElement.casProduct.casIndexName', values: [v] }
          ]
        : []
  }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig}>
        <WantedBoardContainer {...props} />
      </DatagridProvider>
    </>
  )
}
