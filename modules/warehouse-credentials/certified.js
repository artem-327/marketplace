import WarehouseCredentialsCertifiedContainer from './WarehouseCredentials/WarehouseCredentialsCertified'
import { DatagridProvider } from '../datagrid'

const WarehouseCredentials = () => {
  return (
    <>
      <DatagridProvider
        apiConfig={{
          url: '/prodex/api/branches/warehouses/certified/datagrid/',
          searchToFilter: v => v && v.searchInput ? [
            { operator: 'LIKE', path: 'Branch.company.cfDisplayName', values: [`%${v.searchInput}%`] },
            { operator: 'LIKE', path: 'Branch.company.name', values: [`%${v.searchInput}%`] },
            { operator: 'LIKE', path: 'Branch.deliveryAddress.addressName', values: [`%${v.searchInput}%`] },
            { operator: 'LIKE', path: 'Branch.deliveryAddress.address.streetAddress', values: [`%${v.searchInput}%`] }
          ] : []
        }}
        preserveFilters
        skipInitLoad>
        <WarehouseCredentialsCertifiedContainer />
      </DatagridProvider>
    </>
  )
}

export default WarehouseCredentials
