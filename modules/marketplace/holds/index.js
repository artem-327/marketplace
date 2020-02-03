import HoldsContainer from './components/HoldsContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const Holds = () => (
  <>
    <DatagridProvider apiConfig={{ url: '/prodex/api/holds/my/datagrid/' }}>
      <HoldsContainer />
    </DatagridProvider>
  </>
)
