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
            if (v && v.or) {
              filters.or = [
                { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductName', values: [`%${v.or}%`] },
                { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductCode', values: [`%${v.or}%`] },
                { operator: 'LIKE', path: 'ProductOffer.companyProduct.echoProduct.name', values: [`%${v.or}%`] },
                { operator: 'LIKE', path: 'ProductOffer.companyProduct.echoProduct.tags.name', values: [`%${v.or}%`] }
              ]
            }
            if (v && v.and && v.and.length > 0) {
              filters.and = [
                {
                  operator: 'EQUALS',
                  path: 'ProductOffer.companyProduct.echoProduct.tags.id',
                  values: v.and
                }
              ]
            }
            return filters
          }
        }
  return (
    <>
      <CompanyProductInfo fromMarketPlace />
      <DatagridProvider apiConfig={urlApiConfig} autoRefresh>
        <MarketplaceContainer {...props} />
      </DatagridProvider>
    </>
  )
}
