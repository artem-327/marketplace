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
        switch (v.switchButtonsValue) {
          case 'read':
            filters.and.push(
              {
                operator: 'EQUALS',
                path: 'Message.isRead',
                values: ["TRUE"]
              }
            )
            break
          case 'unread':
            filters.and.push(
              {
                operator: 'EQUALS',
                path: 'Message.isRead',
                values: ["FALSE"]
              }
            )
            break
        }
      }
      return filters
    }
  })

  render() {
    return (
      <DatagridProvider apiConfig={this.getApiConfig()} skipInitLoad>
        <div id='page' className='flex stretched scrolling'>
          <Container fluid>
            <HighMenu />
          </Container>

          <Container fluid style={{ padding: '20px 30px' }}>
            <TablesHandlers />
          </Container>

          <Container fluid style={{ padding: '0 30px 20px 30px' }} className='flex stretched'>
            <Table />
          </Container>
        </div>
      </DatagridProvider>
    )
  }
}

export default Alerts
