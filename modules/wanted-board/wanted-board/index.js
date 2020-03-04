import WantedBoardContainer from './components/WantedBoardContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const WantedBoard = props => {
  const urlApiConfig = { url: '/prodex/api/purchase-requests/other/datagrid' }
  return (
    <>
      <DatagridProvider apiConfig={urlApiConfig}>
        <WantedBoardContainer {...props} />
      </DatagridProvider>
    </>
  )
}