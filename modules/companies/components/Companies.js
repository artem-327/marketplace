import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'
import TableHandlers from './TableHandlers'
import Table from './Table'

class Alerts extends Component {
  getApiConfig = () => ({
    url: '/prodex/api/companies/datagrid',
    searchToFilter: v =>
      v
        ? [
            { operator: 'LIKE', path: 'Company.name', values: [`%${v}%`] },
            { operator: 'LIKE', path: 'Company.cfDisplayName', values: [`%${v}%`] }
          ]
        : []
  })

  render() {
    return (
      <DatagridProvider apiConfig={this.getApiConfig()}>
        <Container fluid className='flex stretched'>
          <div style={{ padding: '20px 30px' }}>
            <TableHandlers />
          </div>
          <div style={{ padding: '0 30px 20px 30px' }}>
            <Table />
          </div>
        </Container>
      </DatagridProvider>
    )
  }
}

export default Alerts
