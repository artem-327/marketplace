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
import { DefaultIcon, IconWrapper, StyledName } from '../../constants/layout'

class BidsReceived extends Component {
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
      RowDetailState: null
    }
  }

  componentDidMount() {
    const { tableHandlersFiltersBidsReceived, advancedFilters, datagrid, applyDatagridFilter } = this.props

    if (tableHandlersFiltersBidsReceived) {
      this.setState({ filterValues: tableHandlersFiltersBidsReceived }, () => {
        const filter = {
          ...this.state.filterValues
        }
        datagrid.setSearch(filter, true, 'pageFilters')
      })
    } else {
      datagrid.setSearch(this.state.filterValues, true, 'pageFilters')
    }
  }

  componentWillUnmount() {
    const { isOpenPopup, closePopup } = this.props
    this.props.handleVariableSave('tableHandlersFiltersBidsReceived', this.state.filterValues)
    if (isOpenPopup) closePopup()
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
      acceptOffer,
      rejectOffer,
      datagrid
    } = this.props
    const rowActions = []
    const { cfHistoryLastStatus, cfHistoryLastType } = row

    const buttonAccept = {
      text: formatMessage({
        id: 'marketplace.accept',
        defaultMessage: 'Accept'
      }),
      callback: async () => {
        try {
          const { value } = await acceptOffer(row.id)
          datagrid.updateRow(row.id, () => value)
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

    if (cfHistoryLastStatus === 'NEW' && cfHistoryLastType === 'NORMAL') {
      rowActions.push(buttonAccept)
      rowActions.push(buttonReject)
      rowActions.push(buttonCounter)
    }

    return rowActions
  }

  getRowDetail = ({ row }) => {
    return (
      <BidsRowDetail
        initValues={this.state.rowDetailState}
        popupValues={row}
        onUnmount={values => this.setState({ rowDetailState: values })}
        onClose={() => this.setState({ expandedRowIds: [] })}
        seller
      />
    )
  }

  render = () => {
    const { datagrid, intl, loading } = this.props
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
      </Container>
    )
  }
}

export default injectIntl(BidsReceived)
