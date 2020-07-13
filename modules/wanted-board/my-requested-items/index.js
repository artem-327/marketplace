import MyRequestedItemsContainer from './components/MyRequestedItemsContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const MyRequestedItems = props => {
  const apiConfig = {
    url: `/prodex/api/purchase-requests/own/datagrid?type=${props.type}`,
    searchToFilter: v =>
      v && v.searchInput
        ? { url: `/prodex/api/purchase-requests/own/datagrid?type=${props.type}&pattern=${encodeURIComponent(v.searchInput)}` }
        : { url: `/prodex/api/purchase-requests/own/datagrid?type=${props.type}` }
  }
  return (
    <>
      <DatagridProvider apiConfig={apiConfig} preserveFilters skipInitLoad>
        <MyRequestedItemsContainer {...props} />
      </DatagridProvider>
    </>
  )
}
