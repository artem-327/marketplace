import { useState } from 'react'
import WarehouseCredentialsCertifiedContainer from './WarehouseCredentials/WarehouseCredentialsCertified'
import { DatagridProvider } from '../datagrid'
// Services
import { getSafe } from '../../utils/functions'
// Constants
import { GA_TRACK_QUERY } from '../../constants'

const WarehouseCredentials = () => {
  const [gaSearch, setGaSearch] = useState('')

  return (
    <>
      <DatagridProvider
        apiConfig={{
          url: gaSearch
            ? `/prodex/api/branches/warehouses/certified/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}`
            : `/prodex/api/branches/warehouses/certified/datagrid`,
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
        <WarehouseCredentialsCertifiedContainer />
      </DatagridProvider>
    </>
  )
}

export default WarehouseCredentials
