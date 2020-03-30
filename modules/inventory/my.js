import MyInventoryContainer from './components/MyInventoryContainer'
import { DatagridProvider } from '~/modules/datagrid'
import { CompanyProductInfo } from '~/modules/company-product-info'

const MyInventory = () => (
  <>
    <CompanyProductInfo />
    <DatagridProvider apiConfig={{
      url: '/prodex/api/product-offers/own/datagrid/',
      searchToFilter: v => {
        let filters = { or: [], and: [] }
        if (v) {
          filters.or = [
            { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductName', values: [`%${v}%`] },
            { operator: 'LIKE', path: 'ProductOffer.companyProduct.intProductCode', values: [`%${v}%`] },
          ]
        }
        return filters
      }
    }}>
      <MyInventoryContainer />
    </DatagridProvider>
  </>
)

export { MyInventory }
