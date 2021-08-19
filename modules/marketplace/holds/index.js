import { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// Components
import HoldsContainer from './components/HoldsContainer'
import { DatagridProvider } from '../../datagrid'
// Selectors
import { makeGetTypeHolds } from '../selectors'
// Constants
import { GA_TRACK_QUERY } from '../../../constants'
import { getSafe } from '../../../utils/functions'

const Holds = ({ typeHolds }) => {
  const [gaSearch, setGaSearch] = useState('')

  return (
    <>
      <DatagridProvider
        apiConfig={{
          url: gaSearch
            ? `/prodex/api/holds/${typeHolds}/datagrid?${GA_TRACK_QUERY}=${encodeURIComponent(gaSearch)}`
            : `/prodex/api/holds/${typeHolds}/datagrid`,
          searchToFilter: v => {
            setGaSearch(getSafe(() => v.searchInput, ''))
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
}

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
