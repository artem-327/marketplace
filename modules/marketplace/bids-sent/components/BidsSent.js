import React, { Component } from 'react'
import { Container, Input } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import ProdexGrid from '~/components/table'
import ActionCell from '~/components/table/ActionCell'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import Tutorial from '~/modules/tutorial/Tutorial'
import { debounce } from 'lodash'
import { CustomRowDiv } from '~/modules/inventory/constants/layout'
import BidsRowDetail from '../../components/BidsRowDetail'
import RowDescription from '../../components/RowDescription'
import moment from 'moment'
import confirm from '~/components/Confirmable/confirm'
import { DefaultIcon, IconWrapper, StyledName } from '../../constants/layout'
import MakeOfferPopup from '../../listings/components/MakeOfferPopup'
import Router from 'next/router'
import { getSafe } from '~/utils/functions'

class BidsSent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          name: 'name',
          title: <div></div>,
          width: 310,
          //sortPath: 'ProductOffer.companyProduct.intProductName',
          allowReordering: false
        },
        {
          name: 'description',
          title: <div></div>,
          caption: (
            <FormattedMessage id='marketplace.description' defaultMessage='Description'>
              {text => text}
            </FormattedMessage>
          ),
          width: 600,
          maxWidth: 2000
        },
        {
          name: 'createdAt',
          title: <div></div>,
          caption: (
            <FormattedMessage id='marketplace.createdAt' defaultMessage='Created At'>
              {text => text}
            </FormattedMessage>
          ),
          width: 150
          //sortPath: 'ProductOffer.pkgAvailable'
        }
      ],
      //pageNumber: 0,
      expandedRowIds: [],
      filterValues: {
        searchInput: ''
      },
      rowDetailState: null
    }
  }

  componentDidMount() {
    const { datagrid } = this.props

    const initId = parseInt(getSafe(() => Router.router.query.id, 0))
    if (initId) {
      datagrid.setSearch({ initId }, true, 'pageFilters')
      this.setState({ expandedRowIds: [initId] })
    } else {
      this.setInitFilters()
    }
  }

  componentWillUnmount() {
    const { isOpenPopup, closePopup } = this.props
    if (!getSafe(() => Router.router.query.id, 0)) {
      this.props.handleVariableSave('tableHandlersFiltersBidsSent', this.state.filterValues)
    }
    if (isOpenPopup) closePopup()
  }

  setInitFilters = () => {
    const { tableHandlersFiltersBidsSent, datagrid } = this.props

    if (tableHandlersFiltersBidsSent) {
      this.setState({filterValues: tableHandlersFiltersBidsSent}, () => {
        const filter = {
          ...this.state.filterValues
        }
        datagrid.setSearch(filter, true, 'pageFilters')
      })
    } else {
      datagrid.setSearch(this.state.filterValues, true, 'pageFilters')
    }
  }

  handleFilterChangeInputSearch = (e, data) => {
    const filter = {
      ...this.state.filterValues,
      [data.name]: data.value
    }
    this.setState({ filterValues: filter })
    this.handleFiltersValue(filter)
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  handleRowClick = row => {
    const { expandedRowIds } = this.state

    if (expandedRowIds.length) {
      if (expandedRowIds[0] === row.id) {
        this.setState({ expandedRowIds: [] })
      } else {
        this.setState({ expandedRowIds: [row.id] })
      }
    } else {
      this.setState({ expandedRowIds: [row.id] })
    }
  }

  handleUpdateFinished = () => {
    if (getSafe(() => Router.router.query.id, 0)) {
      Router.push(Router.router.pathname)
      this.setInitFilters()
    }
  }

  getRows = () => {
    const {
      rows,
      intl: { formatMessage }
    } = this.props
    const { expandedRowIds } = this.state

    return rows.map(r => {
      const lastHistory = r.histories[r.histories.length - 1]
      const greyed = expandedRowIds.length && expandedRowIds[0] !== r.id

      return {
        ...r,
        clsName:
          expandedRowIds[0] === r.id
            ? 'open zoomed' // row detail expanded
            : greyed
            ? 'bids-greyed'
            : '',
        name: (
          <ActionCell
            row={r}
            getActions={this.getActions}
            leftContent={<IconWrapper>{DefaultIcon}</IconWrapper>}
            content={
              <StyledName>
                <div className='name'>{lastHistory.createdBy.name}</div>
                <div className='company'>{lastHistory.createdBy.company.cfDisplayName}</div>
              </StyledName>
            }
            onContentClick={e => {
              e.stopPropagation()
              e.preventDefault()
              this.handleRowClick(r)
            }}
          />
        ),
        description: (
          <div onClick={() => this.handleRowClick(r)} style={{ paddingTop: '5px', cursor: 'pointer' }}>
            <RowDescription
              history={lastHistory}
              productOffer={r.productOffer}
              index={r.histories.length - 1}
              lastHistory={true}
            />
          </div>
        ),
        createdAt: (
          <div
            style={{ paddingTop: '5px', color: '#848893', cursor: 'pointer' }}
            onClick={() => this.handleRowClick(r)}>
            {moment(r.createdAt).fromNow()}
          </div>
        )
      }
    })
  }

  getActions = row => {
    const {
      isMerchant,
      isCompanyAdmin,
      intl: { formatMessage },
      deleteOffer,
      acceptOffer,
      rejectOffer,
      addOfferToCart,
      datagrid
    } = this.props
    const { expandedRowIds } = this.state
    const rowActions = []
    const { cfHistoryLastStatus, cfHistoryLastType } = row

    const buttonPurchase = {
      text: formatMessage({
        id: 'marketplace.purchase',
        defaultMessage: 'Purchase'
      }),
      callback: async () => {
        try {
          const { value } = await addOfferToCart(row.id)
          Router.push('/cart')
        } catch (e) {
          console.error(e)
        }
      }
    }
    const buttonAccept = {
      text: formatMessage({
        id: 'marketplace.accept',
        defaultMessage: 'Accept'
      }),
      callback: async () => {
        try {
          const { value } = await acceptOffer(row.id)
          datagrid.updateRow(row.id, () => value)
          this.handleUpdateFinished()
        } catch (e) {
          console.error(e)
        }
      }
    }
    const buttonReject = {
      text: formatMessage({
        id: 'marketplace.reject',
        defaultMessage: 'Reject'
      }),
      callback: async () => {
        try {
          const { value } = await rejectOffer(row.id)
          datagrid.updateRow(row.id, () => value)
          this.handleUpdateFinished()
        } catch (e) {
          console.error(e)
        }
      }
    }
    const buttonCounter = {
      text: formatMessage({
        id: 'marketplace.counter',
        defaultMessage: 'Counter'
      }),
      callback: () => this.setState({ expandedRowIds: [row.id] })
    }
    const buttonDelete = {
      text: formatMessage({
        id: 'marketplace.delete',
        defaultMessage: 'Delete'
      }),
      callback: row => {
        confirm(
          formatMessage({
            id: 'marketplace.confirm.deleteBid.Header',
            defaultMessage: 'Delete Bid'
          }),
          formatMessage(
            {
              id: 'marketplace.confirm.deleteBid.Content',
              defaultMessage: 'Do you really want to remove Bid?'
            },
            { item: row.chemicalName }
          )
        ).then(async () => {
          try {
            await deleteOffer(row.id)
            if (expandedRowIds[0] === row.id) {
              this.setState({ expandedRowIds: [] })
            }
            datagrid.removeRow(row.id)
            this.handleUpdateFinished()
          } catch (e) {
            console.error(e)
          }
        })
      }
    }

    if (cfHistoryLastStatus === 'ACCEPTED') {
      rowActions.push(buttonPurchase)
    } else if (cfHistoryLastStatus === 'NEW' && cfHistoryLastType === 'NORMAL') {
      rowActions.push(buttonReject)
    } else if (cfHistoryLastStatus === 'NEW' && cfHistoryLastType === 'COUNTER') {
      rowActions.push(buttonAccept)
      rowActions.push(buttonReject)
      rowActions.push(buttonCounter)
    }
    rowActions.push(buttonDelete)

    return rowActions
  }

  getRowDetail = ({ row }) => {
    return (
      <BidsRowDetail
        initValues={this.state.rowDetailState}
        popupValues={row}
        onUnmount={values => this.setState({ rowDetailState: values })}
        onClose={() => {
          this.setState({ expandedRowIds: [] })
          this.handleUpdateFinished()
        }}
      />
    )
  }

  render = () => {
    const { datagrid, intl, loading, isOpenPopup } = this.props
    const { columns, fixed, openFilterPopup, expandedRowIds } = this.state
    let { formatMessage } = intl
    const rows = this.getRows()

    return (
      <Container fluid style={{ padding: '10px 25px' }} className='flex stretched'>
        {<Tutorial marginMarketplace isTutorial={false} isBusinessVerification={true} />}
        <div style={{ padding: '10px 0' }}>
          <CustomRowDiv>
            <div>
              <div className='column'>
                <Input
                  style={{ width: '370px' }}
                  icon='search'
                  name='searchInput'
                  value={this.state.filterValues.searchInput}
                  placeholder={formatMessage({
                    id: 'marketplace.SearchBidByNameOrCompany',
                    defaultMessage: 'Search bid by name or company...'
                  })}
                  onChange={this.handleFilterChangeInputSearch}
                />
              </div>
            </div>
            <ColumnSettingButton />
          </CustomRowDiv>
        </div>

        <div className='flex stretched table-detail-rows-wrapper'>
          <ProdexGrid
            tableName='marketplace_bids_sent_grid'
            {...datagrid.tableProps}
            loading={datagrid.loading || loading}
            rows={rows}
            columns={columns}
            rowDetailType={true}
            rowDetail={this.getRowDetail}
            expandedRowIds={expandedRowIds}
            rowSelection={true}
            lockSelection={false}
            showSelectAll={false}
            isToggleCellComponent={false}
            estimatedRowHeight={1000} // to fix virtual table for large rows - hiding them too soon and then hiding the whole table
          />
        </div>
        {isOpenPopup && <MakeOfferPopup />}
      </Container>
    )
  }
}

export default injectIntl(BidsSent)
