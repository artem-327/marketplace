import {connect} from 'react-redux'
import Marketplace from './Marketplace'
import * as Actions from '../actions'
import { sidebarChanged } from '~/src/modules/cart'
import { getProductOffer } from '~/modules/purchase-order/actions'
import moment from "moment/moment"
import { getLocationString } from '~/src/utils/functions'

function mapStateToProps(store) {
  return {
    ...store.marketplace,
    rows: store.marketplace.broadcastedProductOffers.map(po => {
      const qtyPart = `${po.product.packagingUnit ? po.product.packagingUnit.nameAbbreviation : ''}`

      return {
        id: po.id,
        productName: po.product.productName,
        productNumber: po.product.casProduct ? po.product.casProduct.casNumber : 'Unmapped',
        merchant: po.warehouse.warehouseName,
        available: po.pkgAmount.formatNumber(),
        packaging: po.product.packagingType && po.product.packagingType.name ? po.product.packagingType.name : 'N/A',
        quantity: qtyPart ? `${(parseInt(po.pkgAmount, 10) * parseInt(po.product.packagingSize, 10)).formatNumber()} ${qtyPart}` : 'N/A',
        fobPrice: po.pricingTiers.length > 1 ?
          ("$" + po.pricingTiers[po.pricingTiers.length - 1].price.formatMoney(3)
            + ' - ' + "$" + po.pricingTiers[0].price.formatMoney(3))
          : po.pricing.price ? ("$" + po.pricing.price.formatMoney(3)) : 'N/A',
        tradeName: '',
        manufacturer: po.manufacturer && po.manufacturer.name ? po.manufacturer.name : 'N/A',
        origin: po.origin ? po.origin.name : '',
        expiration: moment(po.expirationDate).format('MM/DD/YYYY'),
        assay: po.assayMin + '/' + po.assayMax,
        condition: po.productCondition ? po.productCondition.name : '',
        form: po.productForm ? po.productForm.name : '',
        location: getLocationString(po)
      }
    }),
    sidebar: store.cart.sidebar
  }
}

export default connect(mapStateToProps, {...Actions, sidebarChanged, getProductOffer})(Marketplace)
