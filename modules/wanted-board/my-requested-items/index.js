import MyRequestedItemsContainer from './components/MyRequestedItemsContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const MyRequestedItems = props => {
  const urlApiConfig = { url: '/prodex/api/purchase-requests/own/datagrid' }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig}>
        <MyRequestedItemsContainer {...props} />
      </DatagridProvider>
    </>
  )
}