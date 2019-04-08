import React, { Component } from 'react'
import './ProductOffers.scss'
import moment from "moment"
//import AddCart from '../../../cart/components/AddCart'
import { DATE_FORMAT } from "../../../../utils/constants"
import { getUnit } from "../../../../utils/functions"
import DataTable from "../../../../components/DataTable"
import Spinner from '../../../../components/Spinner/Spinner'

class ProductOffers extends Component {
  componentDidMount() {
    new Promise(resolve => {
      this.props.getMerchant(this.props.identity.id, resolve)
    }).then(() => console.log("data fetched"))
  }

  groupProductOffers(productOffers) {
    return productOffers.reduce((carry, offer) => {
      (carry[(typeof offer.product !== 'undefined' ? offer.product.id : 0)] = carry[(typeof offer.product !== 'undefined' ? offer.product.id : 0)] || { ...offer.product, visible: true, productOffers: [] }).productOffers.push(offer)
      return carry
    }, {})
  }

  render() {

    if (this.props.productOffers.length === 0) return <Spinner />
    let rows = Object.values(this.groupProductOffers(this.props.productOffers)).map((product) => {
      return {
        group: <>
          {typeof product.casNumber !== 'undefined' ?
            <span
              className="product-casnumber ">
              {product.casNumber}
            </span> : ''
          }
          <span className="product-name capitalize">
            {typeof product.casIndexName !== 'undefined' ? product.casIndexName : 'Unmapped'}
          </span>
        </>,
        rows: product.productOffers.map((offer) => {
          const unit = offer.product.packagingUnit ? offer.product.packagingUnit.nameAbbreviation : ''
          const price = offer.pricing.tiers.length > 1 ?
            "$" + offer.pricing.tiers[offer.pricing.tiers.length - 1].price.formatMoney(3) + ' - ' + "$" + offer.pricing.tiers[0].price.formatMoney(3)
            : "$" + offer.pricing.price.formatMoney(3)
          const packageSize = offer.product.packagingSize
          const packageUnit = offer.product.packagingType ? offer.product.packagingType.name : ''
          //const countryException = ["USA", "Canada"]
          //const countryName = offer.warehouse.address.province.country ? offer.warehouse.address.province.country.name : null

          const location = (this.props.identity.id === offer.merchant.id || this.props.identity.branch.id === offer.merchant.id)
            ? `${offer.warehouse.address.city}, ${offer.warehouse.address.province.name}`
            : `${offer.warehouse.address.province.name}` + (typeof offer.warehouse.address.country !== 'undefined' ? `, ${offer.warehouse.address.country.name}` : ``)

          return {
            id: offer.id,
            data: [
              offer.warehouse.warehouseName,
              offer.pkgAmount.formatNumber(),
              packageUnit ? `${packageSize} ${unit} ${packageUnit}` : 'N/A',
              unit ? `${(parseInt(offer.pkgAmount, 10) * parseInt(offer.product.packagingSize, 10)).formatNumber()} ${unit}` : 'N/A',
              price,
              offer.name,
              (typeof offer.manufacturer !== 'undefined' ? offer.manufacturer.name : ''),
              (typeof offer.origin !== 'undefined' ? offer.origin.name : ''),
              offer.expirationDate ? moment(offer.expirationDate).format(DATE_FORMAT) : 'none',
              offer.assayMin + '/' + offer.assayMax,
              offer.productCondition.name,
              offer.productForm.name,
              location
            ]
          }
        })
      }
    })
    return (
      <div className="App ">
        <DataTable id="allInventoryTable"
          selectableRows
          sortFunc={(nameColumn) => console.log(nameColumn)}
          headerInit={[
            { name: 'Merchant' },
            { name: 'Available' },
            { name: 'Packaging' },
            { name: 'Quantity' },
            { name: 'FOBPrice' },
            { name: 'TradeName' },
            { name: 'MFR.' },
            { name: 'Origin' },
            { name: 'Expiration' },
            { name: 'Assay' },
            { name: 'Condition' },
            { name: 'Form' },
            { name: 'Location' }]}
          rows={rows}
          history={this.props.history}
          location={this.props.location}
        />
      </div>
    )
  }
}
export default ProductOffers