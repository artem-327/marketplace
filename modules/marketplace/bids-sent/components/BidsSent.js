import React, { Component } from 'react'
import { Container, Menu, Header, Button, Popup, List, Icon, Tab, Grid, Input, Dropdown } from 'semantic-ui-react'
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
import BidsSentPopup from './BidsSentPopup'

const defaultHiddenColumns = [
  'origin',
  'expiration',
  'condition',
  'form',
  'manufacturer',
  'association',
  'notes',
  'leadTime'
]

const CapitalizedText = styled.span`
  text-transform: capitalize;
`

const CustomDiv = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CustomSearchNameTags = styled.div`
  .column {
    width: 370px;
    padding-top: 0 !important;
  }
`

class BidsSent extends Component {
  constructor(props) {
    super(props)
    //this.getRowActions = this.getRowActions.bind(this)
    this.state = {
      fixed: [
        {
          name: 'intProductName',
          position: 2
        }
      ],
      columns: [
        { name: 'productGroupName', disabled: true },
        { name: 'productNumber', disabled: true },
        // { name: 'merchant', title: <FormattedMessage id='marketplace.merchant' defaultMessage='Merchant'>{(text) => text}</FormattedMessage>, width: 250 },
        {
          name: 'intProductName',
          title: (
            <FormattedMessage id='global.productName' defaultMessage='Product Name'>
              {text => text}
            </FormattedMessage>
          ),
          width: 430,
          sortPath: 'ProductOffer.companyProduct.intProductName',
          allowReordering: false
        },
        {
          name: 'packaging',
          title: (
            <FormattedMessage id='marketplace.packaging' defaultMessage='Packaging'>
              {text => text}
            </FormattedMessage>
          ),
          width: 140
        },
        {
          name: 'available',
          title: (
            <FormattedMessage id='marketplace.available' defaultMessage='Avail PKGs'>
              {text => text}
            </FormattedMessage>
          ),
          width: 140,
          align: 'right',
          sortPath: 'ProductOffer.pkgAvailable'
        },
        {
          name: 'quantity',
          title: (
            <FormattedMessage id='marketplace.quantity' defaultMessage='Quantity'>
              {text => text}
            </FormattedMessage>
          ),
          width: 140,
          align: 'right',
          sortPath: 'ProductOffer.quantity'
        },
        {
          name: 'location',
          title: (
            <FormattedMessage id='marketplace.location' defaultMessage='Location'>
              {text => text}
            </FormattedMessage>
          ),
          width: 160
        },
        {
          name: 'fobPrice',
          title: (
            <FormattedMessage id='marketplace.fobPrice' defaultMessage='FOB Price'>
              {text => text}
            </FormattedMessage>
          ),
          width: 160,
          align: 'right',
          sortPath: 'ProductOffer.cfPricePerUOM'
        },
        {
          name: 'manufacturer',
          title: (
            <FormattedMessage id='marketplace.manufacturer' defaultMessage='Manufacturer'>
              {text => text}
            </FormattedMessage>
          ),
          width: 220,
          sortPath: 'ProductOffer.companyProduct.companyGenericProduct.manufacturer.name'
        },
        {
          name: 'origin',
          title: (
            <FormattedMessage id='marketplace.origin' defaultMessage='Origin'>
              {text => text}
            </FormattedMessage>
          ),
          width: 120,
          sortPath: 'ProductOffer.origin.name'
        },
        {
          name: 'expiration',
          title: (
            <FormattedMessage id='marketplace.expirationDate' defaultMessage='Expiration Date'>
              {text => text}
            </FormattedMessage>
          ),
          width: 120,
          sortPath: 'ProductOffer.lotExpirationDate'
        },
        {
          name: 'condition',
          title: (
            <FormattedMessage id='marketplace.condition' defaultMessage='Condition'>
              {text => text}
            </FormattedMessage>
          ),
          width: 100,
          sortPath: 'ProductOffer.condition.name'
        },
        {
          name: 'form',
          title: (
            <FormattedMessage id='marketplace.form' defaultMessage='Form'>
              {text => text}
            </FormattedMessage>
          ),
          width: 100,
          sortPath: 'ProductOffer.form.name'
        },
        {
          name: 'association',
          title: (
            <FormattedMessage id='marketplace.association' defaultMessage='Association'>
              {text => text}
            </FormattedMessage>
          ),
          width: 160
        },
        {
          name: 'notes',
          title: (
            <FormattedMessage id='marketplace.notes' defaultMessage='Notes'>
              {text => text}
            </FormattedMessage>
          ),
          width: 160
        },
        {
          name: 'leadTime',
          title: (
            <FormattedMessage id='marketplace.leadTime' defaultMessage='Lead Time (days)'>
              {text => text}
            </FormattedMessage>
          ),
          width: 160
        }
      ],
      //pageNumber: 0,
      filterValues: {
        SearchByNamesAndTags: null
      }
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
    this.props.handleVariableSave('tableHandlersFiltersBidsSent', this.state.filterValues)
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

  getRows = () => {
    const {
      rows,
      intl: { formatMessage }
    } = this.props

    return rows.map(r => ({
      ...r,
      intProductName: (
        <ActionCell
          row={r}
          getActions={this.getActions}
          content={r.intProductName}
          onContentClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            console.log('!!!!!!!!!! row name clicked')
          }}
        />
      ),

    }))
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
      callback: () => openPopup(row.rawData)
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
    const { columns, fixed, openFilterPopup } = this.state
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

        <div className='flex stretched marketplace-wrapper' style={{ padding: '10px 5px' }}>
          <ProdexGrid
            defaultHiddenColumns={defaultHiddenColumns}
            tableName='marketplace_listings_grid'
            {...datagrid.tableProps}
            rows={rows}
            columns={columns}
            fixed={fixed}
            data-test='marketplace_listings_row_action'
          />
        </div>
        {isOpenPopup && <BidsSentPopup />}
      </Container>
    )
  }
}

export default injectIntl(BidsSent)