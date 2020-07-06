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
import SearchByNamesAndTags from '~/modules/search'
import { getSafe } from '~/utils/functions'

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
        name: 'createdAt',
        title: (
          <FormattedMessage id='wantedBoard.datePost' defaultMessage='Date Post'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'PurchaseRequest.createdAt'
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
        name: 'createdAt',
        title: (
          <FormattedMessage id='wantedBoard.datePost' defaultMessage='Date Post'>
            {text => text}
          </FormattedMessage>
        ),
        width: 120,
        sortPath: 'PurchaseRequest.createdAt',
        disabled: true
      }
    ],
    selectedRows: [],
    pageNumber: 0,
    open: false,
    popupValues: null,
    filterValues: {
      SearchByNamesAndTags: null
    }
  }

  componentDidMount() {
    const { tableHandlersFiltersWantedBoard } = this.props

    if (tableHandlersFiltersWantedBoard) {
      this.setState({ filterValues: tableHandlersFiltersWantedBoard },
        () => {
        const filter = {
          ...this.state.filterValues,
          ...(!!this.state.filterValues.SearchByNamesAndTags
            && { ...this.state.filterValues.SearchByNamesAndTags.filters })
        }
        this.handleFiltersValue(filter)
      })
    } else {
      this.handleFiltersValue(this.state.filterValues)
    }
  }

  componentWillUnmount() {
    this.props.handleVariableSave('tableHandlersFiltersWantedBoard', this.state.filterValues)
  }

  handleFiltersValue = debounce(filter => {
    const { datagrid } = this.props
    datagrid.setSearch(filter, true, 'pageFilters')
  }, 300)

  SearchByNamesAndTagsChanged = data => {
    this.setState({
      filterValues: {
        ...this.state.filterValues,
        SearchByNamesAndTags: data
      }}, () => {
      const filter = {
        ...this.state.filterValues,
        ...(!!this.state.filterValues.SearchByNamesAndTags
          && { ...this.state.filterValues.SearchByNamesAndTags.filters })
      }
      this.handleFiltersValue(filter)
    })
  }

  handleProductChemicalSwitch = data => {
    const { datagrid } = this.props
    this.props.setWantedBoardType(data)
    datagrid.clear()
    const filter = {
      ...this.state.filterValues,
      ...(!!this.state.filterValues.SearchByNamesAndTags
        && { ...this.state.filterValues.SearchByNamesAndTags.filters })
    }
    this.handleFiltersValue(filter)
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
      tutorialCompleted,
      tableHandlersFiltersWantedBoard
    } = this.props
    const { columnsProduct, columnsChemical } = this.state
    let { formatMessage } = intl

    return (
      <>
        {!tutorialCompleted && <Tutorial marginWantedBoard />}
        {openedSubmitOfferPopup && <SubmitOffer {...popupValues} />}
        <ControlPanel>
          <Grid>
            <Grid.Row>
              <SearchByNamesAndTags
                onChange={this.SearchByNamesAndTagsChanged}
                initFilterState={
                  getSafe(() => tableHandlersFiltersWantedBoard.SearchByNamesAndTags, null)
                }
                filterApply={false}
              />
              <GridColumn width={8}>
                <TopButtons>
                  <ProductChemicalSwitch className={type}>
                    <Button
                      attached='left'
                      onClick={() => this.handleProductChemicalSwitch('product')}
                      data-test='wanted_board_product_switch_btn'>
                      <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                    <Button
                      attached='right'
                      onClick={() => this.handleProductChemicalSwitch('chemical')}
                      data-test='wanted_board_chemical_switch_btn'>
                      <FormattedMessage id='wantedBoard.chemical' defaultMessage='Chemical'>
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
        <div className='flex stretched' style={{ padding: '0 30px 20px 30px' }}>
          <ProdexGrid
            tableName={`wanted_board_${type}_grid`}
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
