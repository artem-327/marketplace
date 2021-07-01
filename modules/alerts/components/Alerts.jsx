import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { injectIntl } from 'react-intl'

// Components
import { withDatagrid, DatagridProvider } from '../../datagrid'
import TablesHandlers from './TablesHandlers'
import Table from './Table'
import Tutorial from '../../tutorial/Tutorial'
import ShippingQuotesPopup from '../../operations/components/shipping-quotes/ShippingQuotesPopupContainer'

// Services
import { getSafe } from '../../../utils/functions'

// Actions
import { getCategories, loadData } from '../actions'

const Alerts = props => {
  const { isOpenPopupOperations} = props
  const [selectedRows, setSelectedRows] = useState([])

  // Similar to call componentDidMount:
  useEffect(() => {
    props.getCategories()
  }, [])  // If [] is empty then is similar as componentDidMount.

  const getApiConfig = () => ({
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

  return (
    <>
      {<Tutorial isTutorial={false} isBusinessVerification={true} />}
      <DatagridProvider apiConfig={getApiConfig()} preserveFilters skipInitLoad>
        <div id='page' className='flex stretched scrolling'>
          <Container fluid style={{ padding: '20px 30px' }}>
            <TablesHandlers
              selectedRows={selectedRows}
              onDatagridUpdate={selection => setSelectedRows(selection)}
            />
          </Container>

          <Container fluid style={{ padding: '0 30px 20px 30px' }} className='flex stretched'>
            <Table
              onSelectionChange={selectedRows => setSelectedRows(selectedRows)}
              selectedRows={selectedRows}
            />
          </Container>
        </div>
      </DatagridProvider>
      {isOpenPopupOperations && <ShippingQuotesPopup updateDatagrid={false} />}
    </>
  )
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
