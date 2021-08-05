import { useState } from 'react'
import WarehouseCredentialsPendingContainer from './WarehouseCredentials/WarehouseCredentialsPending'
import { DatagridProvider } from '../datagrid'
// Services
import { getSafe } from '../../utils/functions'
// Constants
import { GA_TRACK_QUERY } from '../../constants'

const WarehouseCredentialsPending = () => {
  const [gaSearch, setGaSearch] = useState('')

  return (
  <>
    <DatagridProvider
      apiConfig={{
        url: `/prodex/api/branches/warehouses/pending/datagrid?${GA_TRACK_QUERY}=${gaSearch}`,
        searchToFilter: v => {
          setGaSearch(getSafe(() => v.searchInput, ''))
          return v && v.searchInput ? [
            { operator: 'LIKE', path: 'Branch.company.cfDisplayName', values: [`%${v.searchInput}%`] },
            { operator: 'LIKE', path: 'Branch.company.name', values: [`%${v.searchInput}%`] },
            { operator: 'LIKE', path: 'Branch.deliveryAddress.addressName', values: [`%${v.searchInput}%`] },
            { operator: 'LIKE', path: 'Branch.deliveryAddress.address.streetAddress', values: [`%${v.searchInput}%`] }
          ] : []
        }
      }}
      preserveFilters
      skipInitLoad>
      <WarehouseCredentialsPendingContainer />
    </DatagridProvider>
  </>
  )
}

export default WarehouseCredentialsPending
