import MyInventoryContainer from './components/MyInventoryContainer'
import { DatagridProvider } from '~/modules/datagrid'

const MyInventory = () => (
  <DatagridProvider apiUrl='/prodex/api/product-offers/own/datagrid/'>
    <MyInventoryContainer />
  </DatagridProvider>
)

export {
  MyInventory
}
