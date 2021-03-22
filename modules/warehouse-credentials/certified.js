import WarehouseCredentialsCertified from './WarehouseCredentials/WarehouseCredentialsCertified'
import { DatagridProvider } from '../datagrid'

const WarehouseCredentials = () => {
  return (
    <>
      <DatagridProvider
        apiConfig={{
          url: '/prodex/api/branches/warehouses/certified/datagrid/',
          searchToFilter: v => {
            let filters = { or: [], and: [] }
            /*if (v && v.filterName && v.filterName.length > 0) {
              v.filterName.forEach(
                name =>
                  (filters.or = filters.or.concat([
                    { operator: 'LIKE', path: 'Branch.company.cfDisplayName', values: [`%${name}%`] },
                    { operator: 'LIKE', path: 'Branch.company.primaryBranch.warehouse', values: [`%${name}%`] },
                    { operator: 'LIKE', path: 'Branch.warehouse', values: [`%${name}%`] }
                  ]))
              )
            }
            if (v && v.filterTags && v.filterTags.length > 0) {
              filters.and = v.filterTags.map(idTag => {
                return {
                  operator: 'EQUALS',
                  path: 'ProductOffer.companyProduct.companyGenericProduct.productGroup.tags.id',
                  values: [idTag]
                }
              })
            }*/
            return filters
          }
        }}
        preserveFilters>
        <WarehouseCredentialsCertified />
      </DatagridProvider>
    </>
  )
}

export default WarehouseCredentials
