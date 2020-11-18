import React, { Component } from 'react'
import { Container, Menu, Header, Button, Popup, List, Icon, Tab, Grid, Input } from 'semantic-ui-react'
import { AlertTriangle, Clock, MoreVertical, Sliders } from 'react-feather'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withRouter } from 'next/router'
import { number, boolean } from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'

import { ShippingQuotes } from '~/modules/shipping'
import ProdexGrid from '~/components/table'
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

const defaultHiddenColumns = [
  'origin',
  'expiration',
  'condition',
  'form',
  'location',
  'association',
  'notes',
  'leadTime'
]

const CapitalizedText = styled.span`
  text-transform: capitalize;
`

const MenuLink = withRouter(({ router: { pathname }, to, children }) => (
  <Link href={to}>
    <Menu.Item as='a' active={pathname === to}>
      {children}
    </Menu.Item>
  </Link>
))

const RedTriangle = styled(AlertTriangle)`
  display: block;
  width: 20px;
  height: 19px;
  margin: 0 auto;
  vertical-align: top;
  font-size: 20px;
  color: #f16844;
  line-height: 20px;

  &.grey {
    color: #20273a;
  }
`

const ClockIcon = styled(Clock)`
  display: block;
  width: 20px;
  height: 19px;
  margin: 0 auto;
  vertical-align: top;
  font-size: 20px;
  color: #f16844;
  line-height: 20px;

  &.grey {
    color: #20273a;
  }
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

const FiltersRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: -5px;
`

const DivRow = styled.div`
  display: flex !important;
`

const SpanText = styled.span`
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: #2599d5;
  }
`

const DivIcons = styled.div`
  position: -webkit-sticky !important;
  position: sticky !important;
  right: 0px !important;
  display: flex !important;
  margin-left: 10px !important;
`

const DivSetting = styled.div`
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer !important;
  border-radius: 3px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
  border: solid 1px #dee2e6;
  background-color: #ffffff;
`

const RowDropDownIcon = styled.div`
  width: 16px;
  height: 16px;
  margin: 2px 0 2px -4px;

  svg {
    width: 16px !important;
    height: 16px !important;
    color: #848893 !important;
  }
`

class Listings extends Component {
  constructor(props) {
    super(props)
    //this.getRowActions = this.getRowActions.bind(this)
    this.state = {
      columns: [
        { name: 'productGroupName', disabled: true },
        { name: 'productNumber', disabled: true },
        // { name: 'merchant', title: <FormattedMessage id='marketplace.merchant' defaultMessage='Merchant'>{(text) => text}</FormattedMessage>, width: 250 },
        {
          name: 'actCol',
          title: ' ',
          width: 40,
          actions: this.getRowActions()
        },
        {
          name: 'intProductName',
          title: (
            <FormattedMessage id='global.productName' defaultMessage='Product Name'>
              {text => text}
            </FormattedMessage>
          ),
          width: 180,
          sortPath: 'ProductOffer.companyProduct.intProductName'
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
          name: 'available',
          title: (
            <FormattedMessage id='marketplace.available' defaultMessage='Available PKGs'>
              {text => text}
            </FormattedMessage>
          ),
          width: 140,
          align: 'right',
          sortPath: 'ProductOffer.pkgAvailable'
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
          name: 'location',
          title: (
            <FormattedMessage id='marketplace.location' defaultMessage='Location'>
              {text => text}
            </FormattedMessage>
          ),
          width: 160
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
    const { tableHandlersFiltersListings, advancedFilters, datagrid, applyDatagridFilter } = this.props

    if (tableHandlersFiltersListings) {
      this.setState({ filterValues: tableHandlersFiltersListings }, () => {
        const filter = {
          ...this.state.filterValues,
          ...(!!this.state.filterValues.SearchByNamesAndTags && {
            ...this.state.filterValues.SearchByNamesAndTags.filters
          })
        }
        datagrid.setSearch(filter, !advancedFilters.filters, 'pageFilters')
      })
    } else {
      datagrid.setSearch(this.state.filterValues, !advancedFilters.filters, 'pageFilters')
    }

    if (advancedFilters.filters) {
      let datagridFilter = this.toDatagridFilter(advancedFilters)
      applyDatagridFilter(datagridFilter, true)
    }
  }

  componentWillUnmount() {
    const { sidebarChanged } = this.props
    let { isOpen, isHoldRequest } = this.props.sidebar

    this.props.handleVariableSave('tableHandlersFiltersListings', this.state.filterValues)
    if (isOpen || isHoldRequest) sidebarChanged({ isHoldRequest: false, isOpen: false })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { datagridFilterUpdate, datagridFilterReload, datagridFilter, datagrid } = this.props
    if (prevProps.datagridFilterUpdate !== datagridFilterUpdate) {
      datagrid.setFilter(datagridFilter, datagridFilterReload, 'marketplace')
    }
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
      clsName: r.condition ? 'non-conforming' : '',
      actCol: (
        <RowDropDownIcon>
          <MoreVertical />
        </RowDropDownIcon>
      ),
      intProductName: (
        <DivRow>
          <SpanText onClick={() => this.tableRowClicked(r.id)}>{r.intProductName}</SpanText>
          <DivIcons>
            {r.expired ? (
              <Popup
                header={<FormattedMessage id='global.expiredProduct.tooltip' defaultMessage='Expired Product' />}
                trigger={
                  <div>
                    <ClockIcon />
                  </div>
                } // <div> has to be there otherwise popup will be not shown
              />
            ) : null}
            {r.condition ? (
              <Popup
                size='small'
                header={
                  <FormattedMessage
                    id='global.nonConforming.tooltip'
                    defaultMessage='This is a non-conforming product.'
                  />
                }
                trigger={
                  <div>
                    <RedTriangle />
                  </div>
                } // <div> has to be there otherwise popup will be not shown
              />
            ) : null}
          </DivIcons>
        </DivRow>
      ),
      condition: r.condition ? (
        <Popup
          content={r.conditionNotes}
          trigger={
            <div className='dashed-underline'>
              <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
            </div>
          } // <div> has to be there otherwise popup will be not shown
        />
      ) : (
        <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
      ),
      packaging: (
        <>
          {`${r.packagingSize} ${r.packagingUnit} `}
          <CapitalizedText>{r.packagingType}</CapitalizedText>{' '}
        </>
      ),
      notes: r.notes ? (
        <Popup
          content={r.notes}
          trigger={<CustomDiv>{r.notes}</CustomDiv>} // <div> has to be there otherwise popup will be not shown
        />
      ) : null,
      association: <ArrayToFirstItem values={r.association} rowItems={1} />
    }))
  }

  tableRowClicked = (clickedId, isHoldRequest = false, openInfo = false) => {
    const { getProductOffer, sidebarChanged, isProductInfoOpen, closePopup } = this.props
    let { isOpen, id } = this.props.sidebar
    getProductOffer(clickedId)

    if (isProductInfoOpen) closePopup()
    sidebarChanged({ isOpen: true, id: clickedId, quantity: 1, isHoldRequest: isHoldRequest, openInfo: openInfo })
  }

  getRowActions = () => {
    const {
      isMerchant,
      isCompanyAdmin,
      intl: { formatMessage }
    } = this.props
    const rowActions = []
    const buttonInfo = {
      text: formatMessage({
        id: 'marketplace.info',
        defaultMessage: 'Info'
      }),
      callback: row => this.tableRowClicked(row.id, false, true)
    }
    const buttonRequestHold = {
      text: formatMessage({
        id: 'hold.requestHold',
        defaultMessage: 'Request Hold'
      }),
      callback: row => this.tableRowClicked(row.id, true)
    }
    const buttonBuy = {
      text: formatMessage({
        id: 'marketplace.buy',
        defaultMessage: 'Buy Product Offer'
      }),
      callback: row => this.tableRowClicked(row.id)
    }
    if (isMerchant || isCompanyAdmin) {
      rowActions.push(buttonInfo)
      rowActions.push(buttonBuy)
      rowActions.push(buttonRequestHold)
    } else {
      rowActions.push(buttonInfo)
      rowActions.push(buttonBuy)
    }
    return rowActions
  }

  render = () => {
    const {
      datagrid,
      intl,
      isMerchant,
      tutorialCompleted,
      isCompanyAdmin,
      sidebar: { openInfo },
      tableHandlersFiltersListings,
      activeMarketplaceFilter
    } = this.props
    const { columns, openFilterPopup } = this.state
    let { formatMessage } = intl
    const rows = this.getRows()

    return (
      <Container fluid style={{ padding: '10px 25px' }} className='flex stretched'>
        {false && !tutorialCompleted && <Tutorial marginMarketplace />}
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
              <div className='column'>
                <Button
                  className='light'
                  size='large'
                  primary
                  onClick={() => this.setState({ openFilterPopup: true })}
                  data-test='my_inventory_advanced_filters_btn'>
                  <Sliders />
                  {formatMessage({
                    id: 'global.filters',
                    defaultMessage: 'Filters'
                  })}
                </Button>
              </div>
              <FiltersRow>
                <FilterTags filterType='marketplace' datagrid={datagrid} />
              </FiltersRow>
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
            groupBy={['productNumber']}
            getChildGroups={rows =>
              _(rows)
                .groupBy('productGroupName')
                .map(v => ({
                  key: `${v[0].productGroupName}_${v[0].productNumber}_${v[0].companyProduct.id}_${v[0].tagsNames}`,
                  groupLength: v.length,
                  childRows: v
                }))
                .value()
            }
            renderGroupLabel={
              ({ row: { value }, groupLength }) => null
              /* #35127
              {
                const [name, number, id, tagsNames] = value.split('_')
                // const numberArray = number.split(' & ')
                const tagNames = tagsNames ? tagsNames.split(',') : []
                return (
                  <span>
                    <span className='flex row right'>
                      <span>
                        {tagNames.length ? <ArrayToFirstItem values={tagNames} rowItems={5} tags={true} /> : ''}
                      </span>
                    </span>
                  </span>
                )
              }
              */
            }
            onRowClick={(e, row) => {
              const targetTag = e.target.tagName.toLowerCase()
              if (targetTag !== 'input' && targetTag !== 'label') {
                this.tableRowClicked(row.id, false, true)
              }
            }}
            data-test='marketplace_listings_row_action'
            columnActions={'actCol'}
          />
        </div>
        <AddCart openInfo={openInfo} />
        {openFilterPopup && <Filter onClose={() => this.setState({ openFilterPopup: false })} />}
      </Container>
    )
  }
}

Listings.propTypes = {
  isMerchant: boolean,
  isCompanyAdmin: boolean,
  isOpenColumnSettingModal: boolean,
  tutorialCompleted: boolean
}

Listings.defaultProps = {
  isMerchant: false,
  isCompanyAdmin: false,
  tutorialCompleted: false,
  isOpenColumnSettingModal: false
}

export default injectIntl(Listings)
