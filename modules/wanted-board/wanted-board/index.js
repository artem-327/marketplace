import WantedBoardContainer from './components/WantedBoardContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const WantedBoard = props => {
  const urlApiConfig = {
    url: `/prodex/api/purchase-requests/other/datagrid?type=${props.type}`,
    searchViaPattern: v =>
      v
        ? { url: `/prodex/api/purchase-requests/other/datagrid?type=${props.type}&pattern=${v}` }
        : { url: `/prodex/api/purchase-requests/other/datagrid?type=${props.type}` }
  }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig}>
        <WantedBoardContainer {...props} />
      </DatagridProvider>
    </>
  )
}
