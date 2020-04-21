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
          if (v && v.or) {
            filters.or = [
              { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductName', values: [`%${v.or}%`] },
              { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductCode', values: [`%${v.or}%`] }
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
      }}
      autoRefresh>
      <MyInventoryContainer />
    </DatagridProvider>
  </>
)

export { MyInventory }
