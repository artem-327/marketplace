import HoldsContainer from './HoldsContainer'
import { DatagridProvider } from '~/modules/datagrid'
//TODO
export const Holds = () => (
  <>
    <DatagridProvider apiConfig={{ url: '/prodex/api/hold/datagrid/' }}>
      <HoldsContainer />
    </DatagridProvider>
  </>
)
