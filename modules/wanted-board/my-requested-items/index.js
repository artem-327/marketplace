import MyRequestedItemsContainer from './components/MyRequestedItemsContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const MyRequestedItems = props => {
  const apiConfig = {
    url: `/prodex/api/purchase-requests/own/datagrid?type=${props.type}`,
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
      <DatagridProvider apiConfig={apiConfig}>
        <MyRequestedItemsContainer {...props}/>
      </DatagridProvider>
    </>
  )
}