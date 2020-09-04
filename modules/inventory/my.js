import MyInventoryContainer from './components/MyInventoryContainer'
import { DatagridProvider } from '~/modules/datagrid'
import { CompanyProductInfo } from '~/modules/company-product-info'

const MyInventory = () => (
  <>
    <CompanyProductInfo />
    <DatagridProvider
      apiConfig={{
        url: '/prodex/api/product-offers/own/datagrid/',
        searchToFilter: v => {
          let filters = { or: [], and: [] }
          if (v && v.filterName) {
            filters.or = [
              { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductName', values: [`%${v.filterName}%`] },
              { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductCode', values: [`%${v.filterName}%`] }
            ]
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
      }}
      preserveFilters
      skipInitLoad>
      <MyInventoryContainer />
    </DatagridProvider>
  </>
)

export { MyInventory }
