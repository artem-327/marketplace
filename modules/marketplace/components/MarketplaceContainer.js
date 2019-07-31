import { connect } from 'react-redux'
import Marketplace from './Marketplace'
import * as Actions from '../actions'
import { sidebarChanged } from '~/src/modules/cart'
import { getProductOffer } from '~/modules/purchase-order/actions'
import moment from 'moment/moment'
import { getLocationString } from '~/src/utils/functions'
import { withDatagrid } from '~/modules/datagrid'
import { applyFilter } from '~/modules/filter/actions'
import { FormattedNumber } from 'react-intl'

import { FormattedUnit } from '~/components/formatted-messages'

import { getSafe } from '~/utils/functions'

function mapStateToProps(store, { datagrid }) {

  return {
    ...store.marketplace,
    // rows: store.marketplace.broadcastedProductOffers.map(po => {
    ...datagrid,
    appliedFilter: store.filter.filter.appliedFilter,
    rows: datagrid.rows.map(po => {
      const qtyPart = getSafe(() => po.product.packagingUnit.nameAbbreviation)
      let currency = getSafe(() => po.cost.currency.code, 'USD')

      return {
        id: po.id,
        productName: po.product.productName,
        productNumber: getSafe(() => po.product.casNumberCombined, 'Unmapped'),
        merchant: po.warehouse.warehouseName,
        available: <FormattedNumber value={po.pkgAmount} minimumFractionDigits={0} />,
        packagingType: getSafe(() => po.product.packagingType.name, null),
        packagingUnit: getSafe(() => po.product.packagingUnit.nameAbbreviation, null),
        packagingSize: getSafe(() => po.product.packagingSize, null),
        quantity: qtyPart ? <FormattedUnit unit={qtyPart} separator=' ' value={po.pkgAmount * po.product.packagingSize} /> : 'N/A',
        // qtyPart ? `${(parseInt(po.pkgAmount, 10) * parseInt(po.product.packagingSize, 10)).formatNumber()} ${qtyPart}` : 'N/A',
        fobPrice: po.pricingTiers.length > 1
          ? <> <FormattedNumber style='currency' currency={currency} value={po.pricingTiers[0].price} /> -  <FormattedNumber style='currency' currency={currency} value={po.pricingTiers[po.pricingTiers.length - 1].price} /> </>
          : <FormattedNumber style='currency' currency={currency} value={po.pricing.price} />,
        // fobPrice: po.pricingTiers.length > 1 ?
        //   ('$' + po.pricingTiers[po.pricingTiers.length - 1].price.formatMoney(3)
        //     + ' - ' + '$' + po.pricingTiers[0].price.formatMoney(3))
        //   : po.pricing.price ? ('$' + po.pricing.price.formatMoney(3)) : 'N/A',
        tradeName: '',
        manufacturer: getSafe(() => po.manufacturer.name, 'N/A'),
        origin: getSafe(() => po.origin.name),
        expiration: moment(po.expirationDate).format('MM/DD/YYYY'),
        assay: po.assayMin + '/' + po.assayMax,
        condition: getSafe(() => po.productCondition.name),
        form: getSafe(() => po.productForm.name),
        location: getLocationString(po)
      }
    }),
    sidebar: store.cart.sidebar
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions, sidebarChanged, getProductOffer, applyFilter })(Marketplace))
