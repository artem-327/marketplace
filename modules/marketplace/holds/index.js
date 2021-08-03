import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// Components
import HoldsContainer from './components/HoldsContainer'
import { DatagridProvider } from '../../datagrid'
// Selectors
import { makeGetTypeHolds } from '../selectors'

const Holds = ({ typeHolds }) => (
  <>
    <DatagridProvider
      apiConfig={{
        url: `/prodex/api/holds/${typeHolds}/datagrid/`,
        searchToFilter: v => {
          let filters = { or: [], and: [] }
          if (v && v.searchInput) {
            filters.or = [
              {
                operator: 'LIKE',
                path: 'InventoryHold.productOffer.companyProduct.intProductName',
                values: [`%${v.searchInput}%`]
              },
              {
                operator: 'LIKE',
                path: 'InventoryHold.productOffer.companyProduct.companyGenericProduct.name',
                values: [`%${v.searchInput}%`]
              }
            ]
          }
          return filters
        }
      }}
      preserveFilters
      skipInitLoad
    >
      <HoldsContainer />
    </DatagridProvider>
  </>
)

Holds.propTypes = {
  typeHolds: PropTypes.string.isRequired
}

Holds.defaultProps = {
  typeHolds: 'my'
}

const makeMapStateToProps = () => {
  const getTypeHolds = makeGetTypeHolds()

  const mapStateToProps = store => ({
    typeHolds: getTypeHolds(store)
  })
  return mapStateToProps
}

export default connect(makeMapStateToProps)(Holds)
