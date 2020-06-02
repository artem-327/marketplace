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
          if (v) {
            filters.or = [
              {
                operator: 'LIKE',
                path: 'InventoryHold.productOffer.companyProduct.intProductName',
                values: [`%${v}%`]
              },
              {
                operator: 'LIKE',
                path: 'InventoryHold.productOffer.companyProduct.companyGenericProduct.name',
                values: [`%${v}%`]
              }
            ]
          }
          return filters
        }
      }}>
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
