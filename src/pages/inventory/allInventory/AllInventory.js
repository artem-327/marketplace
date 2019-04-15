import React, { Component } from 'react'
import ProductOffers from "./components/ProductOffers"
import Filter from '../../../components/Filter'
import Spinner from '../../../components/Spinner/Spinner'
import FilterTag from "../../../components/Filter/components/FilterTag"
import SubMenu from '../../../components/SubMenu'
// import ShippingQuotes from './components/ShippingQuotes'
import { ShippingQuotes } from '~/modules/shipping'
import { getSelectedRowsDataTable } from "../../../utils/functions"
import './allinventory.scss'
import { FormattedMessage } from 'react-intl'
import { checkToken } from "../../../utils/auth"
import cn from "classnames"
import { Menu, Header, Button } from "semantic-ui-react"

class AllInventory extends Component {

  componentDidMount() {
    this.props.fetchAllProductOffers()
  }

  componentWillUnmount() {
    this.props.resetFilterTags()
    this.props.deleteProductOffersList()
    this.props.resetForm('forms.filter')
  }

  openShippingQuote() {
    if (checkToken(this.props)) return

    const selectedRows = getSelectedRowsDataTable(this.props.productOffersTable)
    this.props.addPopup(<ShippingQuotes
      selectedRows={selectedRows}
      className='shipping-quotes-popup'
      removePopup={this.props.removePopup}
      {...this.props} />)
  }

  render() {
    const content = this.props.productOffersIsFetching
      ? <div><Spinner /></div>
      : <ProductOffers {...this.props} />

    return (
      <div>

        <Menu secondary>
          <Menu.Item header>
            <Header as='h1' size='medium'>
              <FormattedMessage
                id='allInventory.marketplace'
                defaultMessage='MARKETPLACE'
              />
            </Header>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Button primary id='shippingQuotes' className={cn({ hidden: !this.props.shippingQuotes })} onClick={() => this.openShippingQuote()}>
                <FormattedMessage
                  id='allInventory.shippingQuote'
                  defaultMessage='Shipping Quote'
                />
              </Button>
            </Menu.Item>
            <Menu.Item>
              <FilterTag dispatch={this.props.dispatch} closeFunc={(filter) => { this.props.fetchAllProductOffers({ ...filter }) }} />
            </Menu.Item>
            <Menu.Item>
              <SubMenu />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
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
      </div>
    )
  }
}

export default AllInventory