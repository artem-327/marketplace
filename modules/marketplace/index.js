import MarketplaceContainer from './components/MarketplaceContainer'
import { DatagridProvider } from '~/modules/datagrid'
import { CompanyProductInfo } from '~/modules/company-product-info'

export const Marketplace = props => {
  const urlApiConfig =
    props && props.activeIndex && props.activeIndex === 1
      ? null
      : {
          url: '/prodex/api/product-offers/broadcasted/datagrid/',
          searchToFilter: v => {
            let filters = { or: [], and: [] }
            if (v) {
              filters.or = [
                { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductName', values: [`%${v}%`] },
                { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductCode', values: [`%${v}%`] },
                { operator: 'LIKE', path: 'ProductOffer.companyProduct.echoProduct.name', values: [`%${v}%`] },
                { operator: 'LIKE', path: 'ProductOffer.companyProduct.echoProduct.tags.name', values: [`%${v}%`] }
              ]
            }
            return filters
          }
        }
  return (
    <>
      <CompanyProductInfo fromMarketPlace />
      <DatagridProvider apiConfig={urlApiConfig}>
        <MarketplaceContainer {...props} />
      </DatagridProvider>
    </>
  )
}
