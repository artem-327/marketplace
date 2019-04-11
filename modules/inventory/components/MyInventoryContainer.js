import {connect} from 'react-redux'
import Router from 'next/router'
import MyInventory from './MyInventory'
import * as Actions from '../actions'
import { Checkbox } from "semantic-ui-react"

function mapStateToProps(store) {
  return {
    rows: store.simpleAdd.myProductOffers.map(po => {
      const qtyPart = `${po.product.packagingUnit ? po.product.packagingUnit.nameAbbreviation : ''}`;
      return {
        selection: <Checkbox />,
        productName: po.product.productName,
        productNumber: po.product.casProduct.casNumber,
        warehouse: po.warehouse.warehouseName,
        available: po.pkgAmount.formatNumber(),
        packaging: po.product.packagingType && po.product.packagingType.name ? po.product.packagingType.name : 'N/A',
        pkgAmount: qtyPart ? `${po.product.packagingSize} ${qtyPart}` : 'N/A',
        quantity: qtyPart ? `${(parseInt(po.pkgAmount, 10) * parseInt(po.product.packagingSize, 10)).formatNumber()} ${qtyPart}` : 'N/A',
        cost: po.pricing.cost ? "$" + po.pricing.cost.formatMoney(3) : 'N/A',
        fobPrice: po.pricing.tiers.length > 1 ?
          ("$" + po.pricing.tiers[po.pricing.tiers.length - 1].price.formatMoney(3)
            + ' - ' + "$" + po.pricing.tiers[0].price.formatMoney(3))
          : ("$" + po.pricing.price.formatMoney(3)),
        manufacturer: po.manufacturer && po.manufacturer.name ? po.manufacturer.name : 'N/A',
        broadcast: <Checkbox toggle checked={po.broadcasted} />
      }
    })
  }
}

export default connect(mapStateToProps, Actions)(MyInventory)
