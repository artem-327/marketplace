import React, { Component } from 'react'
import ExportInventoryModalContainer from './ExportInventoryModalContainer'
import { DatagridProvider } from '~/modules/datagrid'
import { func } from 'prop-types'

class ExportInventory extends Component {
  getApiConfig = () => ({
    url: '/prodex/api/companies/client/datagrid/',
    searchToFilter: v => {
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
