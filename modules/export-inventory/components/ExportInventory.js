import { Component } from 'react'
import ExportInventoryModalContainer from './ExportInventoryModalContainer'
import { DatagridProvider } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'
import { func } from 'prop-types'
// Constants
import { GA_TRACK_QUERY } from '../../../constants'

class ExportInventory extends Component {
  state = {
    gaSearch: ''
  }

  getApiConfig = () => ({
    url: `/prodex/api/companies/client/datagrid/?${GA_TRACK_QUERY}=${this.state.gaSearch}`,
    searchToFilter: v => {
      this.setState({ gaSearch: getSafe(() => v.searchInput, '') })
      let filters = { or: [], and: [] }
      if (v && v.company) {
        filters.and = [{ operator: 'EQUALS', path: 'ClientCompany.id', values: [`${v.company}`] }]
      }
      return filters
    }
  })

  render() {
    return (
      <DatagridProvider apiConfig={this.getApiConfig()}>
        <ExportInventoryModalContainer {...this.props} />
      </DatagridProvider>
    )
  }
}

ExportInventory.propTypes = {
  onClose: func
}

ExportInventory.defaultProps = {
  onClose: () => {}
}

export default ExportInventory
