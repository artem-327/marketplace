import MarketplaceContainer from './components/MarketplaceContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const Marketplace = () => (
  <DatagridProvider apiConfig={{ url: "/prodex/api/product-offers/broadcasted/datagrid/" }}>
    <MarketplaceContainer />
  </DatagridProvider>
)
