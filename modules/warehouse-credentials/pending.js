import WarehouseCredentialsPendingContainer from './WarehouseCredentials/WarehouseCredentialsPending'
import { DatagridProvider } from '../datagrid'

const WarehouseCredentialsPending = () => (
  <>
    <DatagridProvider
      apiConfig={{
        url: '/prodex/api/branches/warehouses/pending/datagrid/',
        searchToFilter: v => v && v.searchInput ? [
          { operator: 'LIKE', path: 'Branch.company.cfDisplayName', values: [`%${v.searchInput}%`] },
          { operator: 'LIKE', path: 'Branch.company.name', values: [`%${v.searchInput}%`] },
          { operator: 'LIKE', path: 'Branch.deliveryAddress.addressName', values: [`%${v.searchInput}%`] },
          { operator: 'LIKE', path: 'Branch.deliveryAddress.address.streetAddress', values: [`%${v.searchInput}%`] }
        ] : []
      }}
      preserveFilters
      skipInitLoad>
      <WarehouseCredentialsPendingContainer />
    </DatagridProvider>
  </>
)

export default WarehouseCredentialsPending
