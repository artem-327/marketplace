import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'
import HighMenu from './HighMenu'
import TablesHandlers from './TablesHandlers'
import Table from './Table'
import Tutorial from '~/modules/tutorial/Tutorial'

class Alerts extends Component {
  getApiConfig = () => ({
    url: '/prodex/api/messaging-center/datagrid',
    searchToFilter: v => {
      let filters = { or: [], and: [] }
      if (v && v.searchInput) {
        filters.or.push({
          operator: 'LIKE',
          path: 'Message.text',
          values: [`%${v.searchInput}%`]
        })
      }
      if (v && v.switchButtonsValue !== '') {
        switch (v.switchButtonsValue) {
          case 'read':
            filters.and.push({
              operator: 'EQUALS',
              path: 'Message.isRead',
              values: ['TRUE']
            })
            break
          case 'unread':
            filters.and.push({
              operator: 'EQUALS',
              path: 'Message.isRead',
              values: ['FALSE']
            })
            break
        }
      }
      if (v && v.category) {
        filters.and.push({
          operator: 'EQUALS',
          path: 'Message.category',
          values: [v.category]
        })
      }
      return filters
    }
  })

  render() {
    return (
      <>
        {<Tutorial isTutorial={false} isBusinessVerification={true} />}
        <DatagridProvider apiConfig={this.getApiConfig()} preserveFilters skipInitLoad>
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
      </>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  tutorialCompleted: getSafe(() => auth.identity.tutorialCompleted, false)
})

export default connect(mapStateToProps)(Alerts)
