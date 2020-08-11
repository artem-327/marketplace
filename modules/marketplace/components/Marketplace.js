import React, { Component } from 'react'
import { Container, Menu, Header, Button, Popup, List, Icon, Tab, Grid, Input } from 'semantic-ui-react'
import { AlertTriangle, Clock } from 'react-feather'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withRouter } from 'next/router'
import { number, boolean } from 'prop-types'
import Link from 'next/link'
import styled from 'styled-components'

import { ShippingQuotes } from '~/modules/shipping'
import ProdexGrid from '~/components/table'
import AddCart from '~/src/pages/cart/components/AddCart'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { filterTypes } from '~/modules/filter/constants/filter'
import { groupActionsMarketplace } from '~/modules/company-product-info/constants'
import Holds from '~/modules/marketplace/holds'
import Tutorial from '~/modules/tutorial/Tutorial'
import { Datagrid } from '~/modules/datagrid'
import { debounce } from 'lodash'
import { ArrayToFirstItem } from '~/components/formatted-messages/'
import SearchByNamesAndTags from '~/modules/search'
import { getSafe } from '~/utils/functions'

const defaultHiddenColumns = [
  'conformingIcon',
  'expired',
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
  <Link prefetch href={to}>
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
    color: #848893;
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
    color: #848893;
  }
`

const MarketplaceTab = styled(Tab)`
  flex-grow: 1;
  flex-shrink: 1;
`

const CustomDiv = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const CustomRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: -5px -5px;
  flex-wrap: wrap;

  > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .column {
    margin: 5px 5px;
  }

  input,
  .ui.dropdown {
    height: 40px;
  }
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

class Marketplace extends Component {
  state = {
    columns: [
      { name: 'productGroupName', disabled: true },
      { name: 'productNumber', disabled: true },
      // { name: 'merchant', title: <FormattedMessage id='marketplace.merchant' defaultMessage='Merchant'>{(text) => text}</FormattedMessage>, width: 250 },
      {
        name: 'conformingIcon',
        title: <RedTriangle className='grey' />,
        width: 45,
        align: 'center'
      },
      {
        name: 'expired',
        title: <ClockIcon className='grey' />,
        width: 45,
        align: 'center'
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

  componentDidMount() {
    const { tableHandlersFilters } = this.props

    if (tableHandlersFilters) {
      this.setState({ filterValues: tableHandlersFilters }, () => {
        const filter = {
          ...this.state.filterValues,
          ...(!!this.state.filterValues.SearchByNamesAndTags && {
            ...this.state.filterValues.SearchByNamesAndTags.filters
          })
        }
        this.handleFiltersValue(filter)
      })
    } else {
      this.handleFiltersValue(this.state.filterValues)
    }
  }

  componentWillUnmount() {
    const { sidebarChanged } = this.props
    let { isOpen, isHoldRequest } = this.props.sidebar

    this.props.handleVariableSave('tableHandlersFilters', this.state.filterValues)
    if (isOpen || isHoldRequest) sidebarChanged({ isHoldRequest: false, isOpen: false })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { datagridFilterUpdate, datagridFilterReload, datagridFilter, datagrid } = this.props
    if (prevProps.datagridFilterUpdate !== datagridFilterUpdate) {
      datagrid.setFilter(datagridFilter, datagridFilterReload, 'marketplace')
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
      conformingIcon: r.condition ? (
        <Popup
          header={
            <FormattedMessage id='global.nonConforming.tooltip' defaultMessage='This is a non-conforming product.' />
          }
          content={r.conditionNotes}
          trigger={
            <div>
              <RedTriangle />
            </div>
          } // <div> has to be there otherwise popup will be not shown
        />
      ) : null,
      expired: r.expired ? (
        <Popup
          header={<FormattedMessage id='global.expiredProduct.tooltip' defaultMessage='Expired Product' />}
          trigger={
            <div>
              <ClockIcon />
            </div>
          } // <div> has to be there otherwise popup will be not shown
        />
      ) : null,
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

  renderTabMarketplace = () => {
    const {
      datagrid,
      intl,
      openPopup,
      isMerchant,
      tutorialCompleted,
      isCompanyAdmin,
      sidebar: { openInfo },
      tableHandlersFilters
    } = this.props
    const { columns } = this.state
    let { formatMessage } = intl
    const rows = this.getRows()

    const rowActions = []
    const buttonInfo = {
      text: formatMessage({
        id: 'marketplace.info',
        defaultMessage: 'Info'
      }),
      callback: row => openPopup(row)
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

    return (
      <>
        {!tutorialCompleted && <Tutorial marginMarketplace />}
        <div style={{ padding: '10px 1px' }}>
          <CustomRowDiv>
            <CustomSearchNameTags>
              <SearchByNamesAndTags
                onChange={this.SearchByNamesAndTagsChanged}
                initFilterState={getSafe(() => tableHandlersFilters.SearchByNamesAndTags, null)}
                filterApply={false}
              />
            </CustomSearchNameTags>

            <div>
              <div className='column'>
                <FiltersRow>
                  <FilterTags datagrid={datagrid} data-test='marketplace_remove_filter' />
                </FiltersRow>
              </div>
            </div>
          </CustomRowDiv>
        </div>

        <div class='flex stretched' style={{ padding: '10px 0' }}>
          <ProdexGrid
            defaultHiddenColumns={defaultHiddenColumns}
            tableName='marketplace_grid'
            {...datagrid.tableProps}
            rows={rows}
            columns={columns}
            groupBy={['productNumber']}
            shrinkGroups={true}
            // sameGroupSelectionOnly
            getChildGroups={rows =>
              _(rows)
                .groupBy('productGroupName')
                .map(v => ({
                  key: `${v[0].productGroupName}_${v[0].productNumber}_${v.length}_${v[0].companyProduct.id}_${v[0].tagsNames}`,
                  childRows: v
                }))
                .value()
            }
            renderGroupLabel={({ row: { value }, children = null }) => {
              const [name, number, count, id, tagsNames] = value.split('_')
              // const numberArray = number.split(' & ')
              const tagNames = tagsNames ? tagsNames.split(',') : []
              return (
                <span>
                  <span style={{ fontWeight: '600', color: '#2599d5' }}>
                    {name ? name : 'Unmapped'} <span style={{ color: '#848893' }}>({count})</span>
                  </span>
                  <span className='flex row right'>
                    <span>
                      {tagNames.length ? <ArrayToFirstItem values={tagNames} rowItems={5} tags={true} /> : ''}
                    </span>
                  </span>
                </span>
              )
            }}
            onRowClick={(e, row) => {
              const targetTag = e.target.tagName.toLowerCase()
              if (targetTag !== 'input' && targetTag !== 'label') {
                this.tableRowClicked(row.id, false, true)
              }
            }}
            data-test='marketplace_row_action'
            rowActions={rowActions}
          />
        </div>
        <AddCart openInfo={openInfo} />
      </>
    )
  }

  render() {
    const { activeIndex } = this.props

    const panes = [
      {
        menuItem: (
          <MenuLink to='/marketplace/all' data-test='marketplace_submenu_tab_marketplace'>
            MARKETPLACE
          </MenuLink>
        ),
        render: () => <>{this.renderTabMarketplace()}</>
      },
      // {
      //   menuItem: <MenuLink to='/marketplace/wanted-board' data-test='marketplace_submenu_tab_wanted_board'>WANTED BOARD</MenuLink>,
      //   render: () => <>Tab 2 Content</>
      // },
      {
        menuItem: (
          <MenuLink to='/marketplace/holds' data-test='marketplace_submenu_tab_holds'>
            HOLDS
          </MenuLink>
        ),
        render: () => <>{<Holds />}</>
      }
    ]
    return (
      <>
        <Container fluid style={{ padding: '0 32px' }} className='flex stretched'>
          <MarketplaceTab
            activeIndex={activeIndex}
            className='marketplace-container'
            menu={{ secondary: true, pointing: true }}
            panes={panes}
          />
        </Container>
      </>
    )
  }
}

Marketplace.propTypes = {
  activeIndex: number,
  isMerchant: boolean,
  isCompanyAdmin: boolean,
  tutorialCompleted: boolean
}

Marketplace.defaultProps = {
  activeIndex: 0,
  isMerchant: false,
  isCompanyAdmin: false,
  tutorialCompleted: false
}

export default injectIntl(Marketplace)
