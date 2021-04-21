import { Component } from 'react'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'
import { withDatagrid, DatagridProvider } from '../../datagrid'
import { getSafe } from '../../../utils/functions'
import HighMenu from './HighMenu/HighMenu'
import TablesHandlers from './TablesHandlers'
import Table from './Table'
import Tutorial from '../../tutorial/Tutorial'
import { generateQueryString } from '../../../utils/functions'
import ShippingQuotesPopup from '../../operations/components/shipping-quotes/ShippingQuotesPopup'
import { getCategories, loadData } from '../actions'
import { CircularLabel } from './HighMenu/HighMenu.styles'
import { injectIntl } from 'react-intl'

class Alerts extends Component {
  state = {
    selectedRows: []
  }

  componentDidMount = () => {
    this.props.getCategories()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (JSON.stringify(prevProps.categories) !== JSON.stringify(this.props.categories)) {
      this.updateCategories(this.props.categories)
    }
  }

  updateCategories = value => {
    const {
      intl: { formatMessage },
      topMenuTab
    } = this.props

    // Generate menu items from returned Categories
    // ! ! use this code in main left menu (to avoid word1_word2_word3 names)
    const menuItems = value.map(cat => {
      return {
        key: cat.category,
        name: cat.category,
        content: (
          <>
            {formatMessage({
              id: `alerts.menu.${cat.category.toLowerCase()}`,
              defaultMessage: cat.category.replace(/_/g, ' ')
            })}
            <CircularLabel circular>{cat.newMessages}</CircularLabel>
          </>
        ),
        onClick: () => this.loadData(cat.category),
        style: { textTransform: 'uppercase' },
        'data-test': `menu_alerts_${cat.category}`
      }
    })

    this.setState(
      {
        categories: value,
        menuItems
      },
      () => {
        if (value.length && value.findIndex(cat => cat.category === topMenuTab) === -1) {
          this.loadData(value[0].category)
        }
      }
    )
  }

  loadData(category) {
    const { isAdmin, topMenuTab } = this.props
    // ! ! this.props.loadData(isAdmin ? topMenuTab : category)
    this.props.loadData(topMenuTab)
    // ! !! if (this.props.onDatagridUpdate) this.props.onDatagridUpdate([])
    this.setState({ selectedRows: [] })
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
            {false && (
              <Container fluid>
                <HighMenu onDatagridUpdate={selection => this.setState({ selectedRows: selection })} />
              </Container>
            )}

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
