import MyInventoryContainer from './components/MyInventoryContainer'
import {DatagridProvider} from '~/modules/datagrid'
import {CompanyProductInfo} from '~/modules/company-product-info'

const MyInventory = () => (
  <>
    <CompanyProductInfo />
    <DatagridProvider apiConfig={{url: '/prodex/api/product-offers/own/datagrid/'}}>
      <MyInventoryContainer />
    </DatagridProvider>
  </>
)

export {MyInventory}
