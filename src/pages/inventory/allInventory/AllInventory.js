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

const initialCartState = {
  pricing: null,
  quantity: 1,
  warning: null
}

export default class AllInventory extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sidebarOpen: false,
      id: null,
      ...initialCartState
    }
  }
  componentDidMount() {
    this.props.fetchAllProductOffers()
  }

  componentWillUnmount() {
    this.props.resetFilterTags()
    this.props.deleteProductOffersList()
    this.props.resetForm('forms.filter')
  }

  tableRowClicked = (id) => {
    let { sidebarOpen } = this.state
    const { getProductOffer } = this.props

    if (this.state.id !== id && this.state.id) this.setState({ sidebarOpen: true, id, ...initialCartState })
    else this.setState({ sidebarOpen: !sidebarOpen, id, ...initialCartState })

    getProductOffer(id)
  }

  render() {
    const content = this.props.productOffersIsFetching
      ? <div><Spinner /></div>
      : <ProductOffers onRowClick={this.tableRowClicked} {...this.props} />

    return (
      <div>

        <Container fluid>
          <Menu secondary>
            <Menu.Item header>`
              <Header as='h1' size='medium'>
                <FormattedMessage id='myInventory.myInventory'
                  defaultMessage='MY INVENTORY' />
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
        <AddCart
          hideSidebar={() => this.setState({ sidebarOpen: false })}
          visible={this.state.sidebarOpen}
          id={this.state.id}
          pricing={this.state.pricing}
          warning={this.state.warning}
          quantity={this.state.quantity}
          valueChanged={(...values) => this.setState(...values)} />

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