import React, { Component } from 'react'
import { Container, Grid, GridColumn, Input, Menu, Header, Button, Popup, List, Icon, Tab } from 'semantic-ui-react'
import { AlertTriangle } from 'react-feather'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { withRouter } from 'next/router'
import { debounce } from 'lodash'
import { ShippingQuotes } from '~/modules/shipping'
import ProdexGrid from '~/components/table'
import AddCart from '~/src/pages/cart/components/AddCart'
import FilterTags from '~/modules/filter/components/FitlerTags'
import { filterTypes } from '~/modules/filter/constants/filter'
import { groupActionsMarketplace } from '~/modules/company-product-info/constants'
import { MyRequestedItems } from '~/modules/wanted-board/my-requested-items'
import { MyOffers } from '~/modules/wanted-board/my-offers'
import confirm from '~/src/components/Confirmable/confirm'
import DetailSidebar from './DetailSidebar'
import { Datagrid } from '~/modules/datagrid'
import { SubmitOffer } from './SubmitOffer/index'

import { PlusCircle } from 'react-feather'

import { number } from 'prop-types'
import Link from 'next/link'
import Tutorial from '~/modules/tutorial/Tutorial'

import { UpperCaseText, ControlPanel, ProductChemicalSwitch, TopButtons } from '../../constants/layout'

const MenuLink = withRouter(({ router: { pathname }, to, children }) => (
  <Link prefetch href={to}>
    <Menu.Item as='a' active={pathname === to}>
      {children}
    </Menu.Item>
  </Link>
))

class WantedBoard extends Component {
  state = {
    columnsProduct: [
      {
        name: 'product',
        title: (
          <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
            {text => text}
          </FormattedMessage>
        ),
        width: 290
        //align: 'right',
        //sortPath: 'ProductOffer.pkgAvailable'
      },
      {
        name: 'casNumber',
        title: (
          <FormattedMessage id='wantedBoard.casNumber' defaultMessage='CAS Number'>
            {text => text}
          </FormattedMessage>
        ),
        width: 225,
        disabled: true
      },
      {
        name: 'assay',
        title: (
          <FormattedMessage id='wantedBoard.assay' defaultMessage='Assay'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130,
        disabled: true
      },
      {
        name: 'packaging',
        title: (
          <FormattedMessage id='wantedBoard.packaging' defaultMessage='Packaging'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      /*
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='wantedBoard.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 420
      },
      */
      {
        name: 'form',
        title: (
          <FormattedMessage id='wantedBoard.form' defaultMessage='Form'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'fobPrice',
        title: (
          <FormattedMessage id='wantedBoard.maxPrice' defaultMessage='Max Price/Unit'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      {
        name: 'quantity',
        title: (
          <FormattedMessage id='wantedBoard.quantityNeeded' defaultMessage='Quantity Needed'>
            {text => text}
          </FormattedMessage>
        ),
        width: 180
      },
      {
        name: 'neededBy',
        title: (
          <FormattedMessage id='wantedBoard.neededBy' defaultMessage='Needed By'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'ownerBranch',
        title: (
          <FormattedMessage id='wantedBoard.requestedBy' defaultMessage='Requested By'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'location',
        title: (
          <FormattedMessage id='wantedBoard.location' defaultMessage='Location'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      }
    ],
    columnsChemical: [
      {
        name: 'product',
        title: (
          <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
            {text => text}
          </FormattedMessage>
        ),
        width: 290,
        disabled: true
        //align: 'right',
        //sortPath: 'ProductOffer.pkgAvailable'
      },
      {
        name: 'casNumber',
        title: (
          <FormattedMessage id='wantedBoard.casNumber' defaultMessage='CAS Number'>
            {text => text}
          </FormattedMessage>
        ),
        width: 225
      },
      {
        name: 'assay',
        title: (
          <FormattedMessage id='wantedBoard.assay' defaultMessage='Assay'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130
      },
      {
        name: 'packaging',
        title: (
          <FormattedMessage id='wantedBoard.packaging' defaultMessage='Packaging'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      /*
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='wantedBoard.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 420
      },
      */
      {
        name: 'form',
        title: (
          <FormattedMessage id='wantedBoard.form' defaultMessage='Form'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'fobPrice',
        title: (
          <FormattedMessage id='wantedBoard.maxPrice' defaultMessage='Max Price/Unit'>
            {text => text}
          </FormattedMessage>
        ),
        width: 150
      },
      {
        name: 'quantity',
        title: (
          <FormattedMessage id='wantedBoard.quantityNeeded' defaultMessage='Quantity Needed'>
            {text => text}
          </FormattedMessage>
        ),
        width: 180
      },
      {
        name: 'neededBy',
        title: (
          <FormattedMessage id='wantedBoard.neededBy' defaultMessage='Needed By'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'ownerBranch',
        title: (
          <FormattedMessage id='wantedBoard.requestedBy' defaultMessage='Requested By'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      },
      {
        name: 'location',
        title: (
          <FormattedMessage id='wantedBoard.location' defaultMessage='Location'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120
      }
    ],
    selectedRows: [],
    pageNumber: 0,
    open: false,
    popupValues: null,
    filterValue: ''
  }

  componentDidMount() {
    this.setState({ filterValue: '' })
    //this.handleFilterClear()
    this.props.handleFiltersValue('')
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //const { datagridFilterUpdate, datagridFilter, datagrid } = this.props
    //if (prevProps.datagridFilterUpdate !== datagridFilterUpdate) {
    //  datagrid.setFilter(datagridFilter)
    //}
  }

  handleFiltersValue = debounce(value => {
    const { handleFiltersValue } = this.props
    if (Datagrid.isReady()) Datagrid.setSearchPattern(value)
    else handleFiltersValue(value)
  }, 300)

  handleFilterChange = (e, { value }) => {
    this.setState({ filterValue: value })
    this.handleFiltersValue(value)
  }

  renderContent = () => {
    const {
      datagrid,
      intl,
      rows,
      editedId,
      sidebarDetailTrigger,
      openedSubmitOfferPopup,
      type,
      popupValues,
      tutorialCompleted
    } = this.props
    const { columnsProduct, columnsChemical, selectedRows, filterValue } = this.state
    let { formatMessage } = intl

    return (
      <>
        {!tutorialCompleted && <Tutorial marginWantedBoard />}
        {openedSubmitOfferPopup && <SubmitOffer {...popupValues} />}
        <ControlPanel>
          <Grid>
            <Grid.Row>
              <GridColumn floated='left' width={5} data-test='wanted_board_search_inp'>
                <Input
                  fluid
                  icon='search'
                  value={filterValue}
                  placeholder={formatMessage({
                    id: 'wantedBoard.searchByProductName',
                    defaultMessage: 'Search by product name...'
                  })}
                  onChange={this.handleFilterChange}
                />
              </GridColumn>

              <GridColumn width={11}>
                <TopButtons>
                  <ProductChemicalSwitch className={type}>
                    <Button
                      attached='left'
                      onClick={() => this.props.setWantedBoardType('product')}
                      data-test='wanted_board_product_switch_btn'>
                      <FormattedMessage id='wantedBoard.switcher.product' defaultMessage='Finished Goods'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                    <Button
                      attached='right'
                      onClick={() => this.props.setWantedBoardType('chemical')}
                      data-test='wanted_board_chemical_switch_btn'>
                      <FormattedMessage id='wantedBoard.switcher.chemical' defaultMessage='Raw Materials'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                  </ProductChemicalSwitch>
                  <Button
                    primary
                    onClick={() => sidebarDetailTrigger(null, 'wanted-board')}
                    data-test='wanted_board_open_popup_btn'>
                    <FormattedMessage id='wantedBoard.addNewRequest' defaultMessage='Add New Request'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </TopButtons>
              </GridColumn>
            </Grid.Row>
          </Grid>
        </ControlPanel>
        <div className='flex stretched' style={{ padding: '10px 0' }}>
          <ProdexGrid
            tableName='wanted_board_grid'
            {...datagrid.tableProps}
            rows={rows}
            columns={type === 'product' ? columnsProduct : columnsChemical}
            rowSelection={false}
            showSelectionColumn={false}
            rowActions={[
              {
                text: formatMessage({
                  id: 'wantedBoard.submitOffer',
                  defaultMessage: 'Submit Offer'
                }),
                callback: row => this.props.openSubmitOffer(row)
              }
            ]}
          />
        </div>
      </>
    )
  }

  render() {
    const {
      activeIndex,
      intl: { formatMessage },
      editWindowOpen
    } = this.props

    const panes = [
      {
        menuItem: (
          <MenuLink to='/wanted-board/wanted-board' data-test='wanted_board_submenu_tab_wanted_board'>
            <UpperCaseText>{formatMessage({ id: 'title.wantedBoard', defaultMessage: 'Wanted Board' })}</UpperCaseText>
          </MenuLink>
        ),
        render: () => <>{this.renderContent()}</>
      },
      {
        menuItem: (
          <MenuLink to='/wanted-board/my-requested-items' data-test='wanted_board_submenu_tab_my_requested_items'>
            <UpperCaseText>
              {formatMessage({ id: 'title.myRequestedItems', defaultMessage: 'My Requested Items' })}
            </UpperCaseText>
          </MenuLink>
        ),
        render: () => <>{<MyRequestedItems />}</>
      },
      {
        menuItem: (
          <MenuLink to='/wanted-board/my-offers' data-test='wanted_board_submenu_tab_my_offers'>
            <UpperCaseText>{formatMessage({ id: 'title.myOffers', defaultMessage: 'My Offers' })}</UpperCaseText>
          </MenuLink>
        ),
        render: () => <>{<MyOffers />}</>
      }
    ]

    return (
      <>
        <Container fluid style={{ padding: '0 32px' }} className='flex stretched'>
          <Tab
            activeIndex={activeIndex}
            className='marketplace-container'
            menu={{ secondary: true, pointing: true }}
            panes={panes}
          />
        </Container>
        {editWindowOpen === 'wanted-board' && <DetailSidebar />}
      </>
    )
  }
}

WantedBoard.propTypes = {
  activeIndex: number
}

WantedBoard.defaultProps = {
  activeIndex: 0
}

export default injectIntl(WantedBoard)
