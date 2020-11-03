import React, { Component } from 'react'
import { Container, Input, Dropdown } from 'semantic-ui-react'
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
import { getSafe } from '~/utils/functions'
import { CustomRowDiv } from '../../constants/layout'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import { SubmitOffer } from '../../listings/components/SubmitOffer/index'
import SearchInput from '../../components/SearchInput'
import { statusFilterList } from '../../constants/constants'
import styled from 'styled-components'

const StyledDropdown = styled(Dropdown)`
  z-index: 501 !important;
  height: auto !important;
  min-height: 40px !important;
  input.search {
    height: auto !important;
  }
`

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
        },
        {
          name: 'type',
          title: (
            <FormattedMessage id='wantedBoard.type' defaultMessage='Type'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150
        }
      ],
      selectedRows: [],
      pageNumber: 0,
      open: false,
      filterValues: {
        searchByNamesAndCas: null,
        statusFilter: 0
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
      this.setState({ filterValues: tableHandlersFiltersBidsSent }, () => {
        const filter = {
          ...this.state.filterValues,
          ...(!!this.state.filterValues.searchByNamesAndCas && {
            ...this.state.filterValues.searchByNamesAndCas.filters
          })
        }
        this.handleFiltersValue(filter)
      })
    } else {
      this.handleFiltersValue(this.state.filterValues)
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('tableHandlersFiltersBidsSent', this.state.filterValues)
    if (this.props.editWindowOpen && this.props.activeTab === 'bids-sent') this.props.closeDetailSidebar()
  }

  SearchByNamesAndCasChanged = data => {
    this.setState(
      {
        filterValues: {
          ...this.state.filterValues,
          searchByNamesAndCas: data
        }
      },
      () => {
        const filter = {
          ...this.state.filterValues,
          ...(!!this.state.filterValues.searchByNamesAndCas && {
            ...this.state.filterValues.searchByNamesAndCas.filters
          })
        }
        this.handleFiltersValue(filter)
      }
    )
  }

  handleStatusFilterChange = value => {
    this.setState({ filterValues: { ...this.state.filterValues, statusFilter: value } })
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

  getRows = () => {
    const { rows } = this.props

    switch (this.state.filterValues.statusFilter) {
      case 1: {
        return rows.filter(el =>
          el.cfHistoryLastStatus === 'NEW' && el.cfHistoryLastType === 'NORMAL'
        )
      }
      case 2: {
        return rows.filter(el =>
          (el.cfHistoryLastStatus === 'REJECTED' && el.cfHistoryLastType === 'NORMAL')
          || (el.cfHistoryLastStatus === 'REJECTED' && el.cfHistoryLastType === 'COUNTER')
        )
      }
      case 3: {
        return rows.filter(el =>
          el.cfHistoryLastStatus === 'NEW' && el.cfHistoryLastType === 'COUNTER'
        )
      }
      case 4: {
        return rows.filter(el =>
          (el.cfHistoryLastStatus === 'ACCEPTED_BY_BUYER' && el.cfHistoryLastType === 'NORMAL')
          || (el.cfHistoryLastStatus === 'ACCEPTED_BY_SELLER' && el.cfHistoryLastType === 'COUNTER')
          || (el.cfHistoryLastStatus === '32' && el.cfHistoryLastType === 'COUNTER')
        )
      }
      default: return rows
    }
  }

  renderContent = () => {
    const {
      datagrid,
      intl,
      editedId,
      myOffersSidebarTrigger,
      updatingDatagrid,
      tutorialCompleted,
      tableHandlersFiltersBidsSent
    } = this.props
    const { columns, selectedRows, filterValues } = this.state
    let { formatMessage } = intl

    return (
      <>
        {false && !tutorialCompleted && <Tutorial marginWantedBoard />}
        <div style={{ padding: '10px 0' }}>
          <CustomRowDiv>
            <div>
              <div className='column' style={{ width: '340px'}}>
                <StyledDropdown
                  options={statusFilterList}
                  value={this.state.filterValues.statusFilter}
                  selection
                  name='statusFilter'
                  onChange={(event, { value }) => this.handleStatusFilterChange(value)}
                  fluid
                />
              </div>
              <div className='column' style={{ width: '340px'}}>
                <SearchInput
                  onChange={this.SearchByNamesAndCasChanged}
                  initFilterState={getSafe(() => tableHandlersFiltersBidsSent.searchByNamesAndCas, null)}
                  filterApply={false}
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
            rows={this.getRows()}
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
    const { editWindowOpen, openedSubmitOfferPopup, counterRequestedItem, popupValues, isSecondPage } = this.props

    return (
      <>
        {openedSubmitOfferPopup && (
          <SubmitOffer {...popupValues} counterRequestedItem={counterRequestedItem} isSecondPage={isSecondPage} />
        )}

        <Container fluid style={{ padding: '10px 30px 0 30px' }} className='flex stretched'>
          {this.renderContent()}
        </Container>
        {editWindowOpen === 'bids-sent' && <DetailSidebar />}
      </>
    )
  }
}

export default injectIntl(BidsSent)
