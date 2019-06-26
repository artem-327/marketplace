import MyInventoryContainer from './components/MyInventoryContainer'
import { DatagridProvider } from '~/modules/datagrid'

const MyInventory = () => (
  <DatagridProvider apiConfig={{ url: '/prodex/api/product-offers/own/datagrid/' }}>
    <MyInventoryContainer />
  </DatagridProvider>
)

export {
  MyInventory
}
