import HoldsContainer from './components/HoldsContainer'
import { DatagridProvider } from '~/modules/datagrid'

export const Holds = () => (
  <>
    <DatagridProvider apiConfig={{
      url: '/prodex/api/holds/my/datagrid/',
      searchToFilter: v => {
        let filters = { or: [], and: [] }
        if (v) {
          filters.or = [
            { operator: 'LIKE', path: 'InventoryHold.productOffer.companyProduct.intProductName', values: [`%${v}%`] },
            { operator: 'LIKE', path: 'InventoryHold.productOffer.companyProduct.echoProduct.name', values: [`%${v}%`] }
          ]
        }
        return filters
      }
    }}>
      <HoldsContainer />
    </DatagridProvider>
  </>
)
