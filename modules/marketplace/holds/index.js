import HoldsContainer from './components/HoldsContainer'
import { DatagridProvider } from '~/modules/datagrid'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

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

const mapStateToProps = state => ({
  typeHolds: state.holds.typeHolds
})

export default connect(mapStateToProps)(Holds)
