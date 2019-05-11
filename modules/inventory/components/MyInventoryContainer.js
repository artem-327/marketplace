import {connect} from 'react-redux'
import Router from 'next/router'
import MyInventory from './MyInventory'
import * as Actions from '../actions'
import { Checkbox } from "semantic-ui-react"

function mapStateToProps(store) {
  return {
    loading: store.simpleAdd.loading,
    rows: store.simpleAdd.myProductOffers.map(po => {
      const qtyPart = `${po.product.packagingUnit ? po.product.packagingUnit.nameAbbreviation : ''}`
      
      return {
        id: po.id,
        productName: po.product.productName,
        productNumber: po.product.casProduct ? po.product.casProduct.casNumber : 'Unmapped',
        chemicalName: po.product.casProduct ? po.product.casProduct.chemicalName : po.product.productName,
        warehouse: po.warehouse.warehouseName,
        productId: po.product.casProduct ? po.product.casProduct.id : 0,
        available: po.pkgAmount.formatNumber(),
        packaging: po.product.packagingType && po.product.packagingType.name ? po.product.packagingType.name : 'N/A',
        pkgAmount: qtyPart ? `${po.product.packagingSize} ${qtyPart}` : 'N/A',
        quantity: qtyPart ? `${(parseInt(po.pkgAmount, 10) * parseInt(po.product.packagingSize, 10)).formatNumber()} ${qtyPart}` : 'N/A',
        cost: po.pricing.cost ? "$" + po.pricing.cost.amount.formatMoney(3) : 'N/A',
        fobPrice: po.pricing.tiers.length > 1 ?
          ("$" + po.pricing.tiers[po.pricing.tiers.length - 1].price.formatMoney(3)
            + ' - ' + "$" + po.pricing.tiers[0].price.formatMoney(3))
          : po.pricing.price ? ("$" + po.pricing.price.amount.formatMoney(3)) : 'N/A',
        manufacturer: po.manufacturer && po.manufacturer.name ? po.manufacturer.name : 'N/A',
        broadcast: <Checkbox toggle checked={po.broadcasted} />
      }
    })
  }
}

export default connect(mapStateToProps, Actions)(MyInventory)
