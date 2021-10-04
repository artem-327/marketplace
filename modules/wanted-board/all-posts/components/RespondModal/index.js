import RespondModalView from './RespondModal'
import { DatagridProvider } from '../../../../datagrid'

const RespondModal = props => {
    return (
      <>
        <DatagridProvider
          apiConfig={{
            url: `/prodex/api/wanted-board/id/${props.id}/product-offers-datagrid`,
            searchToFilter: v => {
              let filters = { or: [], and: [] }
              return filters
            }
          }}
          preserveFilters
          skipInitLoad>
          <RespondModalView />
        </DatagridProvider>
      </>
    )
}

export default RespondModal