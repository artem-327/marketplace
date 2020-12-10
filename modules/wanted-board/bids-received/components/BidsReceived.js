import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Container, Input, Button, Label, Dropdown } from 'semantic-ui-react'
import { PlusCircle, ChevronDown, ChevronRight } from 'react-feather'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withRouter } from 'next/router'
import { debounce } from 'lodash'

import { ShippingQuotes } from '~/modules/shipping'
import ProdexGrid from '~/components/table'
import { filterTypes } from '~/modules/filter/constants/filter'
import confirm from '~/components/Confirmable/confirm'
import DetailSidebar from './DetailSidebar'
import { Datagrid } from '~/modules/datagrid'
import { getSafe } from '~/utils/functions'
import Tutorial from '~/modules/tutorial/Tutorial'
import { CustomRowDiv } from '../../constants/layout'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import styled from 'styled-components'
import { SubmitOffer } from '../../listings/components/SubmitOffer/index'
import SearchInput from '../../components/SearchInput'
import { statusFilterList } from '../../constants/constants'

const StyledDropdown = styled(Dropdown)`
  z-index: 501 !important;
  height: auto !important;
  min-height: 40px !important;
  input.search {
    height: auto !important;
  }
`

const CountedName = styled.div`
  display: flex;
  alignitems: center;
  flexdirection: row;

  > .ui.label {
    margin: 0;
    font-weight: normal;
    font-size: 12px;
    color: #2599d5;
    border-radius: 2px;
    background-color: #b7e7ff;
    &.cnt-0 {
      color: #848893;
      border: solid 1px #dee2e6;
      background-color: #f8f9fb;
    }
  }
`

class BidsReceived extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        //{ name: 'productName', disabled: true },
        //{ name: 'productNumber', disabled: true },
        {
          name: 'assay',
          title: (
            <FormattedMessage id='wantedBoard.assay' defaultMessage='Assay'>
              {text => text}
            </FormattedMessage>
          ),
          width: 80,
          disabled: true
        },
        {
          name: 'product',
          title: (
            <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
              {text => text}
            </FormattedMessage>
          ),
          width: 304,
          actions: this.getActions()
          //align: 'right',
          //sortPath: 'ProductOffer.pkgAvailable'
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
          width: 160
        },
        {
          name: 'orderQuantity',
          title: (
            <FormattedMessage id='wantedBoard.orderQuantity' defaultMessage='Order Quantity'>
              {text => text}
            </FormattedMessage>
          ),
          width: 145
        },
        {
          name: 'orderFrequency',
          title: (
            <FormattedMessage id='wantedBoard.orderFrequency' defaultMessage='orderFrequency'>
              {text => text}
            </FormattedMessage>
          ),
          width: 160
        },
        {
          name: 'neededBy',
          title: (
            <FormattedMessage id='wantedBoard.neededBy' defaultMessage='Needed By'>
              {text => text}
            </FormattedMessage>
          ),
          width: 110
        },
        {
          name: 'dealExpired',
          title: (
            <FormattedMessage id='wantedBoard.dealExpired' defaultMessage='Deal Expired'>
              {text => text}
            </FormattedMessage>
          ),
          width: 130
        },
        /*
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='wantedBoard.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130
      },
      */
        {
          name: 'condition',
          title: (
            <FormattedMessage id='wantedBoard.condition' defaultMessage='Condition'>
              {text => text}
            </FormattedMessage>
          ),
          width: 120
        },
        {
          name: 'deliveryLocation',
          title: (
            <FormattedMessage id='wantedBoard.deliveryLoc' defaultMessage='Delivery Loc'>
              {text => text}
            </FormattedMessage>
          ),
          width: 120
        },
        {
          name: 'packaging',
          title: (
            <FormattedMessage id='wantedBoard.packaging' defaultMessage='Packaging'>
              {text => text}
            </FormattedMessage>
          ),
          width: 110
        },
        {
          name: 'deliveryPriceMax',
          title: (
            <FormattedMessage id='wantedBoard.deliveryPriceMax' defaultMessage='Delivery Price Max'>
              {text => text}
            </FormattedMessage>
          ),
          align: 'right',
          width: 170
        },
        {
          name: 'measurement',
          title: (
            <FormattedMessage id='wantedBoard.weightUnit' defaultMessage='Weight Unit'>
              {text => text}
            </FormattedMessage>
          ),
          width: 135
        },
        {
          name: 'fobQuote',
          title: (
            <FormattedMessage id='wantedBoard.fobQuote' defaultMessage='FOB Quote'>
              {text => text}
            </FormattedMessage>
          ),
          align: 'right',
          width: 110
        },
        {
          name: 'deliveredQuote',
          title: (
            <FormattedMessage id='wantedBoard.deliveredQuote' defaultMessage='Delivered Quote'>
              {text => text}
            </FormattedMessage>
          ),
          align: 'right',
          width: 145
        },
        {
          name: 'ownerBranch',
          title: (
            <FormattedMessage id='wantedBoard.requestedBy' defaultMessage='Requested By'>
              {text => text}
            </FormattedMessage>
          ),
          width: 145
        }
      ],
      selectedRows: [],
      pageNumber: 0,
      open: false,
      filterValues: {
        searchByNamesAndCas: null,
        statusFilter: 0
      },
      expandedRowIds: []
    }
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  async componentDidMount() {
    const { tableHandlersFiltersBidsReceived, sidebarDetailTrigger } = this.props
    if (window) {
      const searchParams = new URLSearchParams(getSafe(() => window.location.href, ''))

      if (searchParams.has('id') || searchParams.has(`${window.location.href.split('?')[0]}?id`)) {
        const idRequest = searchParams.has('id')
          ? Number(searchParams.get('id'))
          : Number(searchParams.get(`${window.location.href.split('?')[0]}?id`))

        try {
          await sidebarDetailTrigger({ id: idRequest }, 'bids-received')
        } catch (error) {
          console.error(error)
        }
      }
    }

    if (tableHandlersFiltersBidsReceived) {
      this.setState({ filterValues: tableHandlersFiltersBidsReceived }, () => {
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
    this.props.handleVariableSave('tableHandlersFiltersBidsReceived', this.state.filterValues)
    if (this.props.openSidebar && this.props.activeTab === 'bids-received') this.props.closeDetailSidebar()
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
    const { intl, sidebarDetailTrigger, datagrid, deletePurchaseRequestItem, isCompanyAdmin, isMerchant } = this.props
    let { formatMessage } = intl
    let hasPermission = isCompanyAdmin || isMerchant
    return [
      {
        text: formatMessage({
          id: 'global.edit',
          defaultMessage: 'Edit'
        }),
        callback: row => {
          sidebarDetailTrigger(row, 'bids-received')
        },
        hidden: row => !row.treeRoot
      },
      {
        text: formatMessage({
          id: 'global.delete',
          defaultMessage: 'Delete'
        }),
        disabled: row => this.props.editedId === row.id,
        callback: row => {
          confirm(
            formatMessage({
              id: 'confirm.deleteRequestedItem.Header',
              defaultMessage: 'Delete Requested Item'
            }),
            formatMessage({
              id: 'confirm.deleteRequestedItem.Content',
              defaultMessage: 'Do you really want to delete requested item?'
            })
          ).then(async () => {
            try {
              await deletePurchaseRequestItem(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
        },
        hidden: row => !row.treeRoot
      },
      {
        text: formatMessage({
          id: 'wantedBoard.reject',
          defaultMessage: 'Reject'
        }),
        disabled: row => editedId === row.id,
        callback: row => {
          confirm(
            formatMessage({
              id: 'confirm.rejectReceivedBid.Header',
              defaultMessage: 'Reject Received Bid'
            }),
            formatMessage({
              id: 'confirm.rejectReceivedBid.Content',
              defaultMessage: 'Do you really want to reject received bid?'
            })
          ).then(async () => {
            try {
              await this.props.rejectRequestedItem(row.id.split('_')[1])
              datagrid.loadData()
            } catch (e) {
              console.error(e)
            }
          })
        },
        hidden: row =>
          row.treeRoot ||
          row.cfHistoryLastStatus === 'REJECTED' ||
          row.cfHistoryLastStatus === 'ACCEPTED_BY_BUYER' ||
          row.cfHistoryLastStatus === 'ACCEPTED_BY_SELLER' ||
          !hasPermission
      },
      {
        text: formatMessage({
          id: 'wantedBoard.purchase',
          defaultMessage: 'Purchase'
        }),
        disabled: row => editedId === row.id,
        callback: async row => {
          try {
            await this.props.purchaseRequestedItem(row.id.split('_')[1])
            datagrid.loadData()
          } catch (e) {
            console.error(e)
          }
        },
        hidden: row =>
          row.treeRoot ||
          row.cfHistoryLastStatus === 'REJECTED' ||
          (row.cfHistoryLastStatus === 'NEW' && row.cfHistoryLastType === 'COUNTER') ||
          !hasPermission
      },
      {
        text: formatMessage({
          id: 'wantedBoard.accept',
          defaultMessage: 'Accept'
        }),
        disabled: row => editedId === row.id,
        callback: async row => {
          await this.props.acceptRequestedItem(row.id.split('_')[1])
          datagrid.loadData()
        },
        hidden: row =>
          row.treeRoot ||
          row.cfHistoryLastStatus === 'REJECTED' ||
          (row.cfHistoryLastStatus === 'NEW' && row.cfHistoryLastType === 'COUNTER') ||
          row.cfHistoryLastStatus === 'ACCEPTED_BY_BUYER' ||
          row.cfHistoryLastStatus === 'ACCEPTED_BY_SELLER' ||
          !hasPermission
      },
      {
        text: formatMessage({
          id: 'wantedBoard.counter',
          defaultMessage: 'Counter'
        }),
        disabled: row => editedId === row.id,
        callback: async row => {
          await this.props.openSubmitOffer(row, true)
        },
        hidden: row =>
          row.treeRoot ||
          row.cfHistoryLastStatus === 'REJECTED' ||
          (row.cfHistoryLastStatus === 'NEW' && row.cfHistoryLastType === 'COUNTER') ||
          row.cfHistoryLastStatus === 'ACCEPTED_BY_BUYER' ||
          row.cfHistoryLastStatus === 'ACCEPTED_BY_SELLER' ||
          !hasPermission
      }
    ]
  }

  getRows = rows => {
    return rows.map(row => {
      let filteredPurchaseRequestOffers = []

      switch (this.state.filterValues.statusFilter) {
        case 1: {
          filteredPurchaseRequestOffers = row.purchaseRequestOffers.filter(
            el => el.cfHistoryLastStatus === 'NEW' && el.cfHistoryLastType === 'NORMAL'
          )
          break
        }
        case 2: {
          filteredPurchaseRequestOffers = row.purchaseRequestOffers.filter(
            el =>
              (el.cfHistoryLastStatus === 'REJECTED' && el.cfHistoryLastType === 'NORMAL') ||
              (el.cfHistoryLastStatus === 'REJECTED' && el.cfHistoryLastType === 'COUNTER')
          )
          break
        }
        case 3: {
          filteredPurchaseRequestOffers = row.purchaseRequestOffers.filter(
            el => el.cfHistoryLastStatus === 'NEW' && el.cfHistoryLastType === 'COUNTER'
          )
          break
        }
        case 4: {
          filteredPurchaseRequestOffers = row.purchaseRequestOffers.filter(
            el =>
              (el.cfHistoryLastStatus === 'ACCEPTED_BY_BUYER' && el.cfHistoryLastType === 'NORMAL') ||
              (el.cfHistoryLastStatus === 'ACCEPTED_BY_SELLER' && el.cfHistoryLastType === 'COUNTER') ||
              (el.cfHistoryLastStatus === '32' && el.cfHistoryLastType === 'COUNTER')
          )
          break
        }
        default:
          filteredPurchaseRequestOffers = row.purchaseRequestOffers
      }

      const offersLength = filteredPurchaseRequestOffers.length
      return {
        ...row,
        purchaseRequestOffers: filteredPurchaseRequestOffers,
        product: (
          <CountedName>
            <Label className={`cnt-${offersLength}`}>{offersLength}</Label>
            <div style={{ width: '30px', height: '20px', padding: '5px' }}>
              {offersLength ? (
                this.state.expandedRowIds.some(el => el === row.id) ? (
                  <ChevronDown
                    size={20}
                    style={{ color: '#2599d5', cursor: 'pointer' }}
                    onClick={e => {
                      e.stopPropagation()
                      const expandedRowIds = this.state.expandedRowIds.filter(id => id !== row.id)
                      this.setState({ expandedRowIds })
                    }}
                  />
                ) : (
                  <ChevronRight
                    size={20}
                    style={{ color: '#2599d5', cursor: 'pointer' }}
                    onClick={e => {
                      e.stopPropagation()
                      let expandedRowIds = this.state.expandedRowIds.slice()
                      expandedRowIds.push(row.id)
                      this.setState({ expandedRowIds })
                    }}
                  />
                )
              ) : (
                <div style={{ padding: '0 10px' }} />
              )}
            </div>
            {row.product}
          </CountedName>
        ),
        casNumber: (
          <CountedName>
            <Label className={`cnt-${offersLength}`}>{offersLength}</Label>
            <div style={{ width: '30px', height: '20px', paddingLeft: '5px', paddingTop: '5px' }}>
              {offersLength ? (
                this.state.expandedRowIds.some(el => el === row.id) ? (
                  <ChevronDown
                    size={20}
                    style={{ color: '#2599d5', cursor: 'pointer' }}
                    onClick={e => {
                      e.stopPropagation()
                      const expandedRowIds = this.state.expandedRowIds.filter(id => id !== row.id)
                      this.setState({ expandedRowIds })
                    }}
                  />
                ) : (
                  <ChevronRight
                    size={20}
                    style={{ color: '#2599d5', cursor: 'pointer' }}
                    onClick={e => {
                      e.stopPropagation()
                      let expandedRowIds = this.state.expandedRowIds.slice()
                      expandedRowIds.push(row.id)
                      this.setState({ expandedRowIds })
                    }}
                  />
                )
              ) : (
                <div style={{ padding: '0 10px' }} />
              )}
            </div>
            {row.casNumber}
          </CountedName>
        )
      }
    })
  }

  renderContent = () => {
    const {
      datagrid,
      intl,
      rows,
      editedId,
      sidebarDetailTrigger,
      openedSubmitOfferPopup,
      popupValues,
      counterRequestedItem,
      updatingDatagrid,
      tutorialCompleted,
      isSecondPage,
      tableHandlersFiltersBidsReceived
    } = this.props
    const { columns, selectedRows, filterValues } = this.state
    let { formatMessage } = intl

    return (
      <>
        {<Tutorial marginWantedBoard isTutorial={false} isBusinessVerification={true} />}
        {openedSubmitOfferPopup && (
          <SubmitOffer {...popupValues} counterRequestedItem={counterRequestedItem} isSecondPage={isSecondPage} />
        )}
        <div style={{ padding: '10px 0' }}>
          <CustomRowDiv>
            <div>
              <div className='column' style={{ width: '340px' }}>
                <StyledDropdown
                  options={statusFilterList}
                  value={this.state.filterValues.statusFilter}
                  selection
                  name='statusFilter'
                  onChange={(event, { value }) => this.handleStatusFilterChange(value)}
                  fluid
                />
              </div>
              <div className='column' style={{ width: '340px' }}>
                <SearchInput
                  onChange={this.SearchByNamesAndCasChanged}
                  initFilterState={getSafe(() => tableHandlersFiltersBidsReceived.searchByNamesAndCas, null)}
                  filterApply={false}
                />
              </div>
            </div>

            <div>
              <div className='column'>
                <Button
                  className='secondary'
                  primary
                  onClick={() => {
                    sidebarDetailTrigger(null, 'bids-received')
                  }}
                  data-test='bids_received_open_popup_btn'>
                  <PlusCircle />
                  <FormattedMessage id='wantedBoard.requestProduct' defaultMessage='Request Product'>
                    {text => text}
                  </FormattedMessage>
                </Button>
              </div>
              <ColumnSettingButton divide={true} />
            </div>
          </CustomRowDiv>
        </div>
        <div className='flex stretched wanted-wrapper' style={{ padding: '10px 0 20px 0' }}>
          <ProdexGrid
            tableName={'bids_received_grid'}
            {...datagrid.tableProps}
            loading={datagrid.loading || updatingDatagrid}
            rows={this.getRows(rows)}
            columns={columns}
            rowSelection={false}
            showSelectionColumn={false}
            treeDataType={true}
            tableTreeColumn={'product'}
            getChildRows={(row, rootRows) => {
              return row ? row.purchaseRequestOffers : rootRows
            }}
            onRowClick={(_, row) => {
              if (row.root && row.purchaseRequestOffers.length) {
                let ids = this.state.expandedRowIds.slice()
                if (ids.includes(row.id)) {
                  //ids.filter(id => id === row.id)
                  this.setState({ expandedRowIds: ids.filter(id => id !== row.id) })
                } else {
                  ids.push(row.id)
                  this.setState({ expandedRowIds: ids })
                }
              }
            }}
            expandedRowIds={this.state.expandedRowIds}
            onExpandedRowIdsChange={expandedRowIds => this.setState({ expandedRowIds })}
            columnActions={'product'}
          />
        </div>
      </>
    )
  }

  render() {
    const { openSidebar } = this.props

    return (
      <>
        <Container fluid style={{ padding: '10px 30px 0 30px' }} className='flex stretched'>
          {this.renderContent()}
        </Container>
        {openSidebar ? <DetailSidebar /> : null}
      </>
    )
  }
}

const mapStateToProps = state => ({})

export default injectIntl(connect(mapStateToProps)(BidsReceived))
