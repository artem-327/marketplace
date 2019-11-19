import MarketplaceContainer from './components/MarketplaceContainer'
import { DatagridProvider } from '~/modules/datagrid'
import { CompanyProductInfo } from '~/modules/company-product-info'

export const Marketplace = () => (
  <>
    <CompanyProductInfo fromMarketPlace />
    <DatagridProvider apiConfig={{ url: '/prodex/api/product-offers/broadcasted/datagrid/' }}>
      <MarketplaceContainer />
    </DatagridProvider>
  </>
)
