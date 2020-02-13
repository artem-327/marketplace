import MarketplaceContainer from './components/MarketplaceContainer'
import { DatagridProvider } from '~/modules/datagrid'
import { CompanyProductInfo } from '~/modules/company-product-info'

export const Marketplace = props => {
  const urlApiConfig =
    props && props.activeIndex && props.activeIndex === 1
      ? null
      : { url: '/prodex/api/product-offers/broadcasted/datagrid/' }
  return (
    <>
      <CompanyProductInfo fromMarketPlace />
      <DatagridProvider apiConfig={urlApiConfig}>
        <MarketplaceContainer {...props} />
      </DatagridProvider>
    </>
  )
}
