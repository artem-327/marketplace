import BidsReceivedContainer from './components/BidsReceivedContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const BidsReceived = props => {
  const type = props && props.type && props.type.toUpperCase()
  const apiConfig = {
    url: `/prodex/api/purchase-requests/own/datagrid?type=${type}`,
    searchToFilter: v =>
      v && v.searchInput
        ? {
            url: `/prodex/api/purchase-requests/own/datagrid?type=${type}&pattern=${encodeURIComponent(v.searchInput)}`
          }
        : { url: `/prodex/api/purchase-requests/own/datagrid?type=${type}` }
  }
  return (
    <>
      <DatagridProvider apiConfig={apiConfig} preserveFilters skipInitLoad>
        <BidsReceivedContainer {...props} />
      </DatagridProvider>
    </>
  )
}
