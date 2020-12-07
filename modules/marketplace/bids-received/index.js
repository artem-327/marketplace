import BidsReceivedContainer from './components/BidsReceivedContainer'
import { DatagridProvider } from '~/modules/datagrid'
import { CompanyProductInfo } from '~/modules/company-product-info'

export const BidsReceived = props => {
  const urlApiConfig = {
    url: '/prodex/api/product-offers/broadcasted/datagrid/',
    searchToFilter: v => {
      let filters = { or: [], and: [] }
      if (v && v.filterName && v.filterName.length > 0) {
        v.filterName.forEach(name =>
          filters.or = filters.or.concat(
            [
              { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductName', values: [`%${name}%`] },
              { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductCode', values: [`%${name}%`] },
              {
                operator: 'LIKE',
                path: 'ProductOffer.companyProduct.companyGenericProduct.name',
                values: [`%${name}%`]
              },
              {
                operator: 'LIKE',
                path: 'ProductOffer.companyProduct.companyGenericProduct.productGroup.tags.name',
                values: [`%${name}%`]
              }
            ]
          )
        )
      }
      if (v && v.filterTags && v.filterTags.length > 0) {
        filters.and = v.filterTags.map(idTag => {
          return {
            operator: 'EQUALS',
            path: 'ProductOffer.companyProduct.companyGenericProduct.productGroup.tags.id',
            values: [idTag]
          }
        })
      }
      return filters
    }
  }
  return (
    <>
      <CompanyProductInfo fromMarketPlace />
      <DatagridProvider apiConfig={urlApiConfig} preserveFilters skipInitLoad>
        <BidsReceivedContainer {...props} />
      </DatagridProvider>
    </>
  )
}