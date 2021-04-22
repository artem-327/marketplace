import { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { withDatagrid, DatagridProvider } from '../../datagrid'
import { getSafe } from '../../../utils/functions'
import TablesHandlers from './TablesHandlers'
import Table from './Table'
import Tutorial from '../../tutorial/Tutorial'
import ShippingQuotesPopup from '../../operations/components/shipping-quotes/ShippingQuotesPopup'
import { getCategories, loadData } from '../actions'
import { injectIntl } from 'react-intl'

class Alerts extends Component {
  state = {
    selectedRows: []
  }

  componentDidMount = () => {
    this.props.getCategories()
  }

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
    const { isOpenPopupOperations} = this.props

    return (
      <>
        {<Tutorial isTutorial={false} isBusinessVerification={true} />}
        <DatagridProvider apiConfig={this.getApiConfig()} preserveFilters skipInitLoad>
          <div id='page' className='flex stretched scrolling'>
            <Container fluid style={{ padding: '20px 30px' }}>
              <TablesHandlers
                selectedRows={this.state.selectedRows}
                onDatagridUpdate={selection => this.setState({ selectedRows: selection })}
              />
            </Container>

            <Container fluid style={{ padding: '0 30px 20px 30px' }} className='flex stretched'>
              <Table
                onSelectionChange={selectedRows => this.setState({ selectedRows })}
                selectedRows={this.state.selectedRows}
              />
            </Container>
          </div>
        </DatagridProvider>
        {isOpenPopupOperations && <ShippingQuotesPopup updateDatagrid={false} />}
      </>
    )
  }
}

const mapStateToProps = ({ auth, operations, alerts }) => ({
  tutorialCompleted: getSafe(() => auth.identity.tutorialCompleted, false),
  isOpenPopupOperations: operations.isOpenPopup,
  topMenuTab: alerts.topMenuTab,
  /**
   * Categories from api/messaging-center/message-categories
   * Removed all Wanted_Board categories based on https://bluepallet.atlassian.net/browse/DT-88
   */
  categories: alerts.categories.filter(cat => cat.category.indexOf('Wanted_Board') < 0)
})

export default connect(mapStateToProps, { getCategories, loadData })(injectIntl(Alerts))
