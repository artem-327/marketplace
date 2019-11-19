import React, {Component} from 'react'
import Router from 'next/router'
import './ProductOffers.scss'
import DataTable from '../../../../components/DataTable'
import BroadcastRule from './BroadcastRule'
import AddBroadcast from '../../../../pages/inventory/myInventory/components/broadcast'

import confirm from '../../../../components/Confirmable/confirm'
import {checkToken} from '../../../../utils/auth'
import {Checkbox} from 'semantic-ui-react'

class ProductOffers extends Component {
  state = {
    id: null,
    open: false
  }

  groupProductOffers(productOffers) {
    return productOffers.reduce((carry, offer) => {
      ;(carry[offer.product && offer.product.casProduct ? offer.product.casProduct.id : 0] = carry[
        offer.product && offer.product.casProduct ? offer.product.casProduct.id : 0
      ] || {...offer.product, visible: true, productOffers: []}).productOffers.push(offer)
      return carry
    }, {})
  }

  openBroadcast = id => {
    this.setState({id, open: true}, console.log('state', this.state))
  }

  render() {
    if (this.props.productOffers.length === 0) return null
    const rows = Object.values(this.groupProductOffers(this.props.productOffers)).map(product => {
      return {
        group: (
          <React.Fragment>
            {product.casProduct && product.casProduct.casNumber ? (
              <span className='product-casnumber '>{product.casProduct.casNumber}</span>
            ) : (
              ''
            )}
            <span className='product-name capitalize'>
              {product.casProduct && product.casProduct.casIndexName ? product.casProduct.casIndexName : 'Unmapped'}
            </span>
          </React.Fragment>
        ),
        countLabel: 'Product Offerings: ',
        rows: product.productOffers.map(productOffer => {
          const productOfferId = productOffer.id
          const productName = productOffer.product.productName
          const productCode = productOffer.product.hasOwnProperty('productCode') ? productOffer.product.productCode : ''
          const warehouse = productOffer.warehouse.warehouseName
          const available = productOffer.pkgAmount.formatNumber()
          const packaging = productOffer.product.hasOwnProperty('packagingType')
            ? productOffer.product.packagingType.name
            : 'N/A'
          const quantityPart2 = `${
            productOffer.product.packagingUnit ? productOffer.product.packagingUnit.nameAbbreviation : ''
          }`
          const pkgSize =
            quantityPart2 && productOffer.product.packagingSize
              ? `${productOffer.product.packagingSize} ${quantityPart2}`
              : 'N/A'
          const quantity =
            quantityPart2 && productOffer.product.packagingSize
              ? `${(
                  parseInt(productOffer.pkgAmount, 10) * parseInt(productOffer.product.packagingSize, 10)
                ).formatNumber()} ` + quantityPart2
              : 'N/A'
          const cost =
            productOffer.pricing.cost && productOffer.pricing.cost.amount
              ? '$' + productOffer.pricing.cost.amount.formatMoney(3)
              : 'N/A'
          const fobPrice =
            productOffer.pricing.tiers.length > 1
              ? '$' +
                productOffer.pricing.tiers[productOffer.pricing.tiers.length - 1].price.formatMoney(3) +
                ' - ' +
                '$' +
                productOffer.pricing.tiers[0].price.formatMoney(3)
              : '$' + productOffer.pricing.price.amount.formatMoney(3)

          const tradeName = productOffer.tradeName
          const mfr = typeof productOffer.manufacturer !== 'undefined' ? productOffer.manufacturer.name : '' //const condition = productOffer.productCondition.name //const mfgDate = productOffer.creationDate ? moment(productOffer.creationDate).format(DATE_FORMAT) : 'none'
          /* temporarily removed */ /* temporarily removed */ const broadcast = (
            <Checkbox
              toggle
              checked={productOffer.broadcasted}
              offerId={productOfferId}
              onChange={(event, data) => this.props.offerBroadcast(data)}
              data-test='inventory_my_product_offers_broadcast_chckb'
            />
          )

          return {
            id: productOfferId,
            data: [
              productName,
              productCode,
              warehouse,
              available,
              packaging,
              pkgSize,
              quantity,
              cost,
              fobPrice,
              tradeName,
              mfr, //condition, //mfgDate,
              /* temporarily removed */ /* temporarily removed */ {
                content: broadcast,
                align: 'a-center'
              }
            ]
          }
        })
      }
    })

    const headerInit = [
      {name: 'ProductName'},
      {name: 'Trade Name test 1 ! !'},
      {name: 'ProductNumber'},
      {name: 'Warehouse'},
      {name: 'Available PKGs'},
      {name: 'Packaging'},
      {name: 'Pkg.size'},
      {name: 'Quantity'},
      {name: 'Cost'},
      {name: 'FOBPrice'},
      {name: 'TradeName'},
      {name: 'MFR.'}, //{name: 'Condition'}, //{name: 'MFGDate'},
      /* temporarily removed */ /* temporarily removed */ {name: 'Broadcast', align: 'a-center'}
    ]

    const dataTable = (
      <>
        <DataTable
          id='myInventoryTable'
          selectableRows
          sortFunc={nameColumn => console.log(nameColumn)}
          headerInit={headerInit}
          contextMenu={[
            {
              action: id => {
                if (checkToken(this.props)) return
                Router.push(`/inventory/edit?id=${id}`)
              },
              label: 'editListing'
            },
            {
              action: id => {
                if (checkToken(this.props)) return
                this.openBroadcast(id)
              },
              label: 'customBroadcast'
            },
            {
              action: id => {
                if (checkToken(this.props)) return
                confirm('Remove Listing', 'Are you sure you want to remove listings from Your Inventory?').then(() => {
                  this.props.deleteProductOffer(id, () => this.props.fetchMyProductOffers({}))
                })
              },
              label: 'Delete Listing'
            }
          ]}
          rows={rows}
          rowComponent={
            <BroadcastRule
              submitRules={this.props.submitRules}
              addPopup={this.props.addPopup}
              removePopup={this.props.removePopup}
              getProductOffers={this.props.fetchMyProductOffers}
              targetGroups={this.props.targetGroups}
              selections={this.props.selections}
              setFilter={type => this.props.setFilter(type)}
              currentSelected={this.props.currentSelected}
              setActiveBroadcastButton={active => this.props.setActiveBroadcastButton(active)}
            />
          }
        />
        {this.state.open ? (
          <AddBroadcast open={this.state.open} id={this.state.id} closeModal={() => this.setState({open: false})} />
        ) : null}
      </>
    )

    return dataTable
  }
}

export default ProductOffers
