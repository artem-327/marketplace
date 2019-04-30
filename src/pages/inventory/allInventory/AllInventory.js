import './allinventory.scss'

import React, { Component } from 'react'
import ProductOffers from "./components/ProductOffers"
import Filter from '../../../components/Filter'
import Spinner from '../../../components/Spinner/Spinner'
import FilterTag from "../../../components/Filter/components/FilterTag"
import SubMenu from '../../../components/SubMenu'
import { FormattedMessage } from 'react-intl'
import { Menu, Header, Container, Sidebar } from "semantic-ui-react"
import AddCart from '../../cart/components/AddCart'


export default class AllInventory extends Component {
  componentDidMount() {
    this.props.fetchAllProductOffers()
  }

  componentWillUnmount() {
    this.props.resetFilterTags()
    this.props.deleteProductOffersList()
    this.props.resetForm('forms.filter')
  }

  tableRowClicked = (clickedId) => {
    const { getProductOffer, sidebarChanged } = this.props
    let { isOpen, id } = this.props.sidebar
    getProductOffer(clickedId)

    if (id !== clickedId && id) sidebarChanged({ isOpen: true, id: clickedId, quantity: 1 })
    else sidebarChanged({ isOpen: !isOpen, id: clickedId, quantity: 1 })

  }

  render() {
    const content = this.props.productOffersIsFetching
      ? <div><Spinner /></div>
      : <ProductOffers onRowClick={this.tableRowClicked} {...this.props} />

    return (
      <div>

        <Container fluid>
          <Menu secondary>
            <Menu.Item header>
              <Header as='h1' size='medium'>
                <FormattedMessage id='allInventory.marketplace'
                  defaultMessage='MARKETPLACE' />
              </Header>
            </Menu.Item>

            <Menu.Menu position='right'>
              <Menu.Item>
                <FilterTag
                  dispatch={this.props.dispatch}
                  closeFunc={(filter) => { this.props.fetchMyProductOffers({ ...filter }) }}
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
          filterFunc={(inputs) => this.props.fetchAllProductOffers(inputs)}
          {...this.props}
        />
        {content}
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