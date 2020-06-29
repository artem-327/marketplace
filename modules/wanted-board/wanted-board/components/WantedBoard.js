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
import { number } from 'prop-types'
import Link from 'next/link'
import Tutorial from '~/modules/tutorial/Tutorial'
import {
  UpperCaseText,
  ControlPanel,
  ProductChemicalSwitch,
  TopButtons,
  ButtonRequest,
  IconPlusCircle,
  TopRow
} from '../../constants/layout'
import SearchByNamesAndTags from '~/modules/search'

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
        width: 250
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
        name: 'funcionalEquivalent',
        title: (
          <FormattedMessage id='wantedBoard.funcionalEquivalent' defaultMessage='Funcional Equivalent'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160
      },
      {
        name: 'assayMin',
        title: (
          <FormattedMessage id='wantedBoard.assayMin' defaultMessage='Assay Min'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'assayMax',
        title: (
          <FormattedMessage id='wantedBoard.assayMax' defaultMessage='Assay Max'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
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
        width: 100
      },
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='wantedBoard.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160
      },
      {
        name: 'form',
        title: (
          <FormattedMessage id='wantedBoard.form' defaultMessage='Form'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'fobPrice',
        title: (
          <FormattedMessage id='wantedBoard.fobPrice' defaultMessage='Fob Price'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'quantity',
        title: (
          <FormattedMessage id='wantedBoard.quantity' defaultMessage='Quantity'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'neededBy',
        title: (
          <FormattedMessage id='wantedBoard.neededBy' defaultMessage='Needed By'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'createdAt',
        title: (
          <FormattedMessage id='wantedBoard.datePost' defaultMessage='Date Post'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100,
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
        width: 250,
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
        name: 'funcionalEquivalent',
        title: (
          <FormattedMessage id='wantedBoard.funcionalEquivalent' defaultMessage='Funcional Equivalent'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160
      },
      {
        name: 'assayMin',
        title: (
          <FormattedMessage id='wantedBoard.assayMin' defaultMessage='Assay Min'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'assayMax',
        title: (
          <FormattedMessage id='wantedBoard.assayMax' defaultMessage='Assay Max'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
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
        width: 100
      },
      {
        name: 'manufacturer',
        title: (
          <FormattedMessage id='wantedBoard.manufacturer' defaultMessage='Manufacturer'>
            {text => text}
          </FormattedMessage>
        ),
        width: 160
      },
      {
        name: 'form',
        title: (
          <FormattedMessage id='wantedBoard.form' defaultMessage='Form'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'fobPrice',
        title: (
          <FormattedMessage id='wantedBoard.fobPrice' defaultMessage='Fob Price'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'quantity',
        title: (
          <FormattedMessage id='wantedBoard.quantity' defaultMessage='Quantity'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
      },
      {
        name: 'neededBy',
        title: (
          <FormattedMessage id='wantedBoard.neededBy' defaultMessage='Needed By'>
            {text => text}
          </FormattedMessage>
        ),
        width: 100
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

        <Grid>
          <TopRow>
            <SearchByNamesAndTags />
            <GridColumn width={8}>
              <ControlPanel>
                <TopButtons>
                  <ProductChemicalSwitch className={type}>
                    <Button
                      attached='left'
                      onClick={() => this.props.setWantedBoardType('product')}
                      data-test='wanted_board_product_switch_btn'>
                      <FormattedMessage id='wantedBoard.product' defaultMessage='Product'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                    <Button
                      attached='right'
                      onClick={() => this.props.setWantedBoardType('chemical')}
                      data-test='wanted_board_chemical_switch_btn'>
                      <FormattedMessage id='wantedBoard.chemical' defaultMessage='Chemical'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                  </ProductChemicalSwitch>
                  <ButtonRequest
                    primary
                    onClick={() => sidebarDetailTrigger(null, 'wanted-board')}
                    data-test='wanted_board_open_popup_btn'>
                    <IconPlusCircle />
                    <FormattedMessage id='wantedBoard.requestProduct' defaultMessage='Request Product'>
                      {text => text}
                    </FormattedMessage>
                  </ButtonRequest>
                </TopButtons>
              </ControlPanel>
            </GridColumn>
          </TopRow>

          <Grid.Row>
            <GridColumn>
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
            </GridColumn>
          </Grid.Row>
        </Grid>
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
