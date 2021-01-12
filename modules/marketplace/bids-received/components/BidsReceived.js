import React, { Component } from 'react'
import { Container, Icon, Image, Dropdown } from 'semantic-ui-react'
import { MoreVertical, Sliders } from 'react-feather'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withRouter } from 'next/router'
import { number, boolean } from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'
import { Warning } from '@material-ui/icons'
import { ShippingQuotes } from '~/modules/shipping'
import ProdexGrid from '~/components/table'
import ActionCell from '~/components/table/ActionCell'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import AddCart from '~/src/pages/cart/components/AddCart'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { filterTypes } from '~/modules/filter/constants/filter'
import { groupActionsMarketplace } from '~/modules/company-product-info/constants'
import Tutorial from '~/modules/tutorial/Tutorial'
import { Datagrid } from '~/modules/datagrid'
import { debounce } from 'lodash'
import { ArrayToFirstItem } from '~/components/formatted-messages/'
import SearchByNamesAndTags from '~/modules/search'
import { getSafe } from '~/utils/functions'
import { Filter } from '~/modules/filter'
import { CustomRowDiv } from '~/modules/inventory/constants/layout'
import BidsRowDetail from '../../bids-sent/components/BidsRowDetail'
import moment from 'moment'
import { DefaultIcon, IconWrapper, StyledName } from '../../constants/layout'

const CustomSearchNameTags = styled.div`
  .column {
    width: 370px;
    padding-top: 0 !important;
  }
`

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
          width: 600,
          maxWidth: 2000,
        },
        {
          name: 'createdAt',
          title: <div></div>,
          width: 150,
          //sortPath: 'ProductOffer.pkgAvailable'
        }
      ],
      //pageNumber: 0,
      expandedRowIds: [],
      filterValues: {
        SearchByNamesAndTags: null
      },
      RowDetailState: null
    }
  }

  componentDidMount() {
    const { tableHandlersFiltersBidsSent, advancedFilters, datagrid, applyDatagridFilter } = this.props

    if (tableHandlersFiltersBidsSent) {
      this.setState({ filterValues: tableHandlersFiltersBidsSent }, () => {
        const filter = {
          ...this.state.filterValues,
          ...(!!this.state.filterValues.SearchByNamesAndTags && {
            ...this.state.filterValues.SearchByNamesAndTags.filters
          })
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

  toDatagridFilter = savedFilter => {
    let { filters, ...rest } = savedFilter

    return {
      filters: filters.map(filter => ({
        operator: filter.operator,
        path: filter.path,
        values: filter.values.map(val => val.value)
      })),
      //pageNumber: savedFilter.pageNumber,
      pageSize: 50
    }
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  SearchByNamesAndTagsChanged = data => {
    this.setState(
      {
        filterValues: {
          ...this.state.filterValues,
          SearchByNamesAndTags: data
        }
      },
      () => {
        const filter = {
          ...this.state.filterValues,
          ...(!!this.state.filterValues.SearchByNamesAndTags && {
            ...this.state.filterValues.SearchByNamesAndTags.filters
          })
        }
        this.handleFiltersValue(filter)
      }
    )
  }

  handleRowClick = row => {
    const { expandedRowIds } = this.state

    if (expandedRowIds.length) {
      if (expandedRowIds[0] === row.id) {
        this.setState({ expandedRowIds: [] })
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

    return rows.map(r => {
      const lastHistory = r.histories[r.histories.length - 1]
      return({
        ...r,
        name: (
          <ActionCell
            row={r}
            getActions={this.getActions}
            leftContent={<IconWrapper>{DefaultIcon}</IconWrapper>}
            content={
              <StyledName>
                <div className='name'>
                  {lastHistory.createdBy.name}
                </div>
                <div className='company'>
                  {lastHistory.createdBy.company.cfDisplayName}
                </div>
              </StyledName>
            }
            onContentClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              this.handleRowClick(r)
            }}
          />
        ),
        description: (
          <div onClick={() => this.handleRowClick(r)}>
            text
          </div>
        ),
        createdAt: (
          <div
            style={{ color: '#848893' }}
            onClick={() => this.handleRowClick(r)}>
            {moment(r.createdAt).fromNow()}
          </div>
        )
      })
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
      openPopup
    } = this.props
    const rowActions = []

    const buttonAccept = {
      text: formatMessage({
        id: 'marketplace.accept',
        defaultMessage: 'Accept'
      }),
      callback: () => acceptOffer(row.id)
    }
    const buttonReject = {
      text: formatMessage({
        id: 'marketplace.reject',
        defaultMessage: 'Reject'
      }),
      callback: () => rejectOffer(row.id)
    }
    const buttonCounter = {
      text: formatMessage({
        id: 'marketplace.counter',
        defaultMessage: 'Counter'
      }),
      callback: () => openPopup(row)
    }
    const buttonDelete = {
      text: formatMessage({
        id: 'marketplace.delete',
        defaultMessage: 'Delete'
      }),
      callback: () => deleteOffer(row.id)
    }

    rowActions.push(buttonAccept)
    rowActions.push(buttonReject)
    rowActions.push(buttonCounter)
    rowActions.push(buttonDelete)

    /*
    if (isMerchant || isCompanyAdmin) {
      rowActions.push(buttonInfo)
      rowActions.push(buttonBuy)
      rowActions.push(buttonRequestHold)
    } else {
      rowActions.push(buttonInfo)
      rowActions.push(buttonBuy)
    }
    */
    return rowActions
  }

  getRowDetail = ({ row }) => {
    console.log('!!!!!!!!!! bids received getRowDetail row', row)
    return (
      <BidsRowDetail
        initValues={this.state.rowDetailState}
        popupValues={row}
        onUnmount={(values) => this.setState({ rowDetailState: values })}
        onClose={() => this.setState({ expandedRowIds: [] })}
      />
    )
  }

  render = () => {
    const {
      datagrid,
      intl,
      isMerchant,
      tutorialCompleted,
      isCompanyAdmin,
      tableHandlersFiltersListings,
      isOpenPopup
    } = this.props
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
                <CustomSearchNameTags>
                  <SearchByNamesAndTags
                    onChange={this.SearchByNamesAndTagsChanged}
                    initFilterState={getSafe(() => tableHandlersFiltersListings.SearchByNamesAndTags, null)}
                    filterApply={false}
                    isMarketplace={true}
                  />
                </CustomSearchNameTags>
              </div>
            </div>
            <ColumnSettingButton />
          </CustomRowDiv>
        </div>

        <div className='flex stretched table-detail-rows-wrapper'>
          <ProdexGrid
            tableName='marketplace_bids_sent_grid'
            {...datagrid.tableProps}
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
            data-test='marketplace_listings_row_action'
          />
        </div>
      </Container>
    )
  }
}

export default injectIntl(BidsReceived)