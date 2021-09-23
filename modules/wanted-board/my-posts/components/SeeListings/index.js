import SeeListingsView from './SeeListings'
import { DatagridProvider } from '../../../../datagrid'

const SeeListings = props => {
    return (
      <>
        <DatagridProvider
          apiConfig={{
            url: `/prodex/api/wanted-board-direct-bids/other/datagrid?wantedBoardRequestId=${props.id}`,
            searchToFilter: v => {
              let filters = { or: [], and: [] }
              return filters
            }
          }}
          preserveFilters
          skipInitLoad>
          <SeeListingsView />
        </DatagridProvider>
      </>
    )
}

export default SeeListings