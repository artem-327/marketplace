import MyRequestedItemsContainer from './components/MyRequestedItemsContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const MyRequestedItems = props => {
  const apiConfig = {
    url: `/prodex/api/purchase-requests/own/datagrid?type=${props.type}`,
    searchViaPattern: v =>
      v
        ? { url: `/prodex/api/purchase-requests/own/datagrid?type=${props.type}&pattern=${v}` }
        : { url: `/prodex/api/purchase-requests/own/datagrid?type=${props.type}` }
  }
  return (
    <>
      <DatagridProvider apiConfig={apiConfig}>
        <MyRequestedItemsContainer {...props} />
      </DatagridProvider>
    </>
  )
}
