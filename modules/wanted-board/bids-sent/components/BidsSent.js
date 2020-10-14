import React, { Component } from 'react'
import { Container, Input } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withRouter } from 'next/router'
import { ShippingQuotes } from '~/modules/shipping'
import ProdexGrid from '~/components/table'
import { filterTypes } from '~/modules/filter/constants/filter'
import { groupActionsMarketplace } from '~/modules/company-product-info/constants'
import confirm from '~/src/components/Confirmable/confirm'
import DetailSidebar from './DetailSidebar'
import { Datagrid } from '~/modules/datagrid'
import Tutorial from '~/modules/tutorial/Tutorial'
import { debounce } from 'lodash'

import { CustomRowDiv } from '../../constants/layout'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import { SubmitOffer } from '../../listings/components/SubmitOffer/index'

class BidsSent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'product',
          title: (
            <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
              {text => text}
            </FormattedMessage>
          ),
          width: 375,
          actions: this.getActions()
        },
        {
          name: 'fobPrice',
          title: (
            <FormattedMessage id='wantedBoard.fobPrice' defaultMessage='FOB Price'>
              {text => text}
            </FormattedMessage>
          ),
          align: 'right',
          width: 125
        },
        /*
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='wantedBoard.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 310
      },
      */
        {
          name: 'condition',
          title: (
            <FormattedMessage id='wantedBoard.condition' defaultMessage='Condition'>
              {text => text}
            </FormattedMessage>
          ),
          width: 145
        },
        {
          name: 'status',
          title: (
            <FormattedMessage id='wantedBoard.status' defaultMessage='Status'>
              {text => text}
            </FormattedMessage>
          ),
          width: 200
        }
      ],
      selectedRows: [],
      pageNumber: 0,
      open: false,
      filterValue: {
        searchInput: ''
      }
    }
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  componentDidMount() {
    const { tableHandlersFiltersBidsSent } = this.props

    if (tableHandlersFiltersBidsSent) {
      this.setState({ filterValue: tableHandlersFiltersBidsSent })
      this.handleFiltersValue(tableHandlersFiltersBidsSent)
    } else {
      this.handleFiltersValue(this.state.filterValue)
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('tableHandlersFiltersBidsSent', this.state.filterValue)
    if (this.props.editWindowOpen) this.props.closeDetailSidebar()
  }

  handleFilterChangeInputSearch = (e, data) => {
    this.setState({
      filterValue: {
        ...this.state.filterValue,
        [data.name]: data.value
      }
    })

    const filter = {
      ...this.state.filterValue,
      [data.name]: data.value
    }
    this.handleFiltersValue(filter)
  }

  getActions = () => {
    const { datagrid, intl, myOffersSidebarTrigger } = this.props
    let { formatMessage } = intl
    return [
      {
        text: formatMessage({
          id: 'global.delete',
          defaultMessage: 'Delete'
        }),
        hidden: row =>
          row.cfHistoryLastStatus === 'REJECTED' ||
          row.cfHistoryLastStatus === 'ACCEPTED_BY_BUYER' ||
          row.cfHistoryLastStatus === 'ACCEPTED_BY_SELLER',
        disabled: row => this.props.editedId === row.id,
        callback: row => {
          confirm(
            formatMessage({
              id: 'confirm.deleteItemOffer.Header',
              defaultMessage: 'Delete Item Offer'
            }),
            formatMessage(
              {
                id: 'confirm.deleteItemOffer.Content',
                defaultMessage: 'Do you really want to remove item offer?'
              },
              { item: row.chemicalName }
            )
          ).then(async () => {
            try {
              await this.props.deleteMyOfferItem(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
        }
      },
      {
        text: formatMessage({
          id: 'wantedBoard.counter',
          defaultMessage: 'Counter'
        }),
        disabled: row => this.props.editedId === row.id,
        callback: async row => {
          await this.props.openSubmitOffer(row, true)
          datagrid.loadData()
        },
        hidden: row =>
          row.cfHistoryLastStatus === 'REJECTED' ||
          (row.cfHistoryLastStatus === 'NEW' && row.cfHistoryLastType === 'NORMAL') ||
          row.cfHistoryLastStatus === 'ACCEPTED_BY_BUYER' ||
          row.cfHistoryLastStatus === 'ACCEPTED_BY_SELLER'
      },
      {
        text: formatMessage({
          id: 'wantedBoard.readyPurchase',
          defaultMessage: 'Ready for purchase'
        }),
        disabled: row => this.props.editedId === row.id,
        callback: async row => {
          await this.props.acceptRequestedItem(row.id)
          datagrid.loadData()
        },
        hidden: row =>
          row.cfHistoryLastStatus === 'REJECTED' ||
          (row.cfHistoryLastStatus === 'NEW' && row.cfHistoryLastType === 'NORMAL') ||
          row.cfHistoryLastStatus === 'ACCEPTED_BY_BUYER' ||
          row.cfHistoryLastStatus === 'ACCEPTED_BY_SELLER'
      }
    ]
  }

  renderContent = () => {
    const { datagrid, intl, rows, editedId, myOffersSidebarTrigger, updatingDatagrid, tutorialCompleted } = this.props
    const { columns, selectedRows, filterValue } = this.state
    let { formatMessage } = intl

    return (
      <>
        {!tutorialCompleted && <Tutorial marginWantedBoard />}
        <div style={{ padding: '10px 0' }}>
          <CustomRowDiv>
            <div>
              <div className='column'>
                <Input
                  style={{ width: 340 }}
                  name='searchInput'
                  icon='search'
                  value={filterValue.searchInput}
                  placeholder={formatMessage({
                    id: 'wantedBoard.searchByProductName',
                    defaultMessage: 'Search by product name'
                  })}
                  onChange={this.handleFilterChangeInputSearch}
                />
              </div>
            </div>
            <ColumnSettingButton />
          </CustomRowDiv>
        </div>
        <div className='flex stretched' style={{ padding: '10px 0' }}>
          <ProdexGrid
            tableName='my_offers_grid'
            {...datagrid.tableProps}
            loading={datagrid.loading || updatingDatagrid}
            rows={rows}
            columns={columns}
            rowSelection={false}
            showSelectionColumn={false}
            columnActions='product'
            editingRowId={editedId}
          />
        </div>
      </>
    )
  }

  render() {
    const { editWindowOpen, openedSubmitOfferPopup, counterRequestedItem, popupValues } = this.props

    return (
      <>
        {openedSubmitOfferPopup && <SubmitOffer {...popupValues} counterRequestedItem={counterRequestedItem} />}

        <Container fluid style={{ padding: '10px 30px 0 30px' }} className='flex stretched'>
          {this.renderContent()}
        </Container>
        {editWindowOpen === 'bids-sent' && <DetailSidebar />}
      </>
    )
  }
}

export default injectIntl(BidsSent)
