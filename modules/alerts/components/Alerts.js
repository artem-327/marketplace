import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'
import HighMenu from './HighMenu'
import TablesHandlers from './TablesHandlers'
import Table from './Table'

class Alerts extends Component {

  getApiConfig = () => ({
    url: '/prodex/api/messaging-center/datagrid',
    searchToFilter: v => {
      let filters = { or: [], and: [] }
      if (v && v.searchValue) {
        filters.or.push(
          {
            operator: 'LIKE',
            path: 'Message.text',
            values: [`%${v.searchValue}%`]
          }
        )
      }
      if (v && v.switchButtonsValue !== '') {
        filters.and.push(
          {
            operator: 'EQUALS',
            path: 'Message.text',  // ! ! Temporary
            values: [`${v.switchButtonsValue}`]
          }
        )
      }
      return filters
    }
  })

  render() {
    return (
      <DatagridProvider apiConfig={this.getApiConfig()} skipInitLoad>
        <Container fluid className='flex stretched'>
          <HighMenu />
          <div style={{ padding: '20px 30px' }}>
            <TablesHandlers />
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
