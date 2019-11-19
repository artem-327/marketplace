import './allinventory.scss'

import React, {Component} from 'react'
import ProductOffers from './components/ProductOffers'
import Filter from '../../../components/Filter'
import Spinner from '../../../components/Spinner/Spinner'
import FilterTag from '../../../components/Filter/components/FilterTag'
import {ShippingQuotes} from '~/modules/shipping'
import SubMenu from '../../../components/SubMenu'
import {FormattedMessage} from 'react-intl'
import {Menu, Header, Container, Sidebar, Button} from 'semantic-ui-react'
import AddCart from '../../cart/components/AddCart'
import {getSelectedRowsDataTable} from '../../../utils/functions'

export default class AllInventory extends Component {
  state = {
    open: false
  }

  componentDidMount() {
    this.props.fetchAllProductOffers()
  }

  componentWillUnmount() {
    this.props.resetFilterTags()
    this.props.deleteProductOffersList()
    this.props.resetForm('forms.filter')
  }

  tableRowClicked = clickedId => {
    const {getProductOffer, sidebarChanged} = this.props
    let {isOpen, id} = this.props.sidebar
    getProductOffer(clickedId)

    if (id !== clickedId && id) sidebarChanged({isOpen: true, id: clickedId, quantity: 1})
    else sidebarChanged({isOpen: !isOpen, id: clickedId, quantity: 1})
  }

  render() {
    const content = this.props.productOffersIsFetching ? (
      <div>
        <Spinner />
      </div>
    ) : (
      <ProductOffers onRowClick={this.tableRowClicked} {...this.props} />
    )
    const selectedRows = getSelectedRowsDataTable(this.props.productOffersTable)

    return (
      <div id='page' className='all-inventory flex stretched scrolling'>
        <Container fluid style={{padding: '0 32px'}}>
          <ShippingQuotes
            modalProps={{
              open: this.state.open,
              closeModal: () => this.setState({open: false})
            }}
            selectedRows={selectedRows}
            removePopup={this.props.removePopup}
            {...this.props}
          />
          <Menu secondary>
            <Menu.Item header>
              <Header as='h1' size='medium'>
                <FormattedMessage id='allInventory.marketplace' defaultMessage='MARKETPLACE' />
              </Header>
            </Menu.Item>

            <Menu.Menu position='right'>
              {selectedRows.length === 0 ? null : (
                <Button
                  primary
                  onClick={() => this.setState({open: true})}
                  data-test='all_inventory_shipping_quote_btn'>
                  <FormattedMessage id='allInventory.shippingQuote' defaultMessage='Shipping Quote'>
                    {text => text}
                  </FormattedMessage>
                </Button>
              )}
              <Menu.Item>
                <FilterTag
                  dispatch={this.props.dispatch}
                  closeFunc={filter => {
                    this.props.fetchMyProductOffers({...filter})
                  }}
                />
              </Menu.Item>
              <Menu.Item>
                <SubMenu />
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </Container>

        <Filter
          chemicalName
          quantity
          date
          price
          assay
          condition
          form
          package
          productGrade
          filterFunc={inputs => this.props.fetchAllProductOffers(inputs)}
          savingFilters={true}
          {...this.props}
        />
        <Container fluid style={{padding: '20px 32px 10px 32px'}}>
          {content}
        </Container>

        <AddCart />
      </div>
    )
  }
}

// openShippingQuote() {
//   if (checkToken(this.props)) return

//   const selectedRows = getSelectedRowsDataTable(this.props.productOffersTable)
//   this.props.addPopup(
//     <ShippingQuotes
//       selectedRows={selectedRows}
//       className='shipping-quotes-popup'
//       removePopup={this.props.removePopup}
//       {...this.props} />)
// }
