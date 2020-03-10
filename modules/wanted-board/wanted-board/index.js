import WantedBoardContainer from './components/WantedBoardContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const WantedBoard = props => {
  const urlApiConfig = {
    url: '/prodex/api/purchase-requests/other/datagrid',
    searchToFilter: v =>
      v
        ? [
          //{ operator: 'LIKE', path: 'PurchaseRequestElement.echoProduct.name', values: [`%${v}%`] },
          //{ operator: 'LIKE', path: 'PurchaseRequestElement.casProduct.casNumber', values: [`%${v}%`] }
        ]
        : [],
    params: {
      orOperator: true
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