import ListingsContainer from './components/ListingsContainer'
import { DatagridProvider } from '~/modules/datagrid'
import { CompanyProductInfo } from '~/modules/company-product-info'

export const Listings = props => {
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
      if (v && v.seller) {
        filters.and.push({ operator: 'EQUALS', path: 'ProductOffer.owner.id', values: [v.seller] })
      }
      return filters
    }
  }
  return (
    <>
      <CompanyProductInfo fromMarketPlace />
      <DatagridProvider apiConfig={urlApiConfig} preserveFilters skipInitLoad>
        <ListingsContainer {...props} />
      </DatagridProvider>
    </>
  )
}
