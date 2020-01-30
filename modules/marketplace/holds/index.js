import HoldsContainer from './components/HoldsContainer'
import { DatagridProvider } from '~/modules/datagrid'
//TODO url
export const Holds = () => (
  <>
    <DatagridProvider apiConfig={{ url: '/prodex/api/holds/datagrid/' }}>
      <HoldsContainer />
    </DatagridProvider>
  </>
)
