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

import { FormattedUnit, FormattedAssay } from '~/components/formatted-messages'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'
import React from "react";

function mapStateToProps(store, { datagrid }) {

  return {
    ...store.marketplace,
    // rows: store.marketplace.broadcastedProductOffers.map(po => {
    ...datagrid,
    appliedFilter: store.filter.filter.appliedFilter,
    defaultZip: getSafe(() => store.auth.identity.homeBranch.deliveryAddress.address.zip.zip, ''),
    rows: datagrid.rows.map(po => {
      const qtyPart = getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation)

      return {
        id: po.id,
        productName: po.companyProduct.echoProduct.name,
        productNumber: getSafe(() => po.companyProduct.echoProduct.code, 'Unmapped'),
        // merchant: getSafe(() => po.warehouse.warehouseName, ''),
        available: po.pkgAvailable ? <FormattedNumber minimumFractionDigits={0} value={po.pkgAvailable} /> : 'N/A',
        packagingType: getSafe(() => po.companyProduct.packagingType.name, ''),
        packagingUnit: getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation, ''),
        packagingSize: getSafe(() => po.companyProduct.packagingSize, ''),
        quantity: qtyPart ? <FormattedUnit unit={qtyPart} separator=' ' value={po.quantity} /> : 'N/A',
        fobPrice: po.pricingTiers.length > 1
          ? <> <FormattedNumber style='currency' currency={currency} value={po.pricingTiers[po.pricingTiers.length - 1].pricePerUOM} /> -  <FormattedNumber style='currency' currency={currency} value={po.pricingTiers[0].pricePerUOM} /> {qtyPart && (`/ ${qtyPart}`)} </>
          : <> <FormattedNumber style='currency' currency={currency} value={getSafe(() => po.pricing.pricingTiers[0].pricePerUOM, 0)} /> {qtyPart && (`/ ${qtyPart}`)} </>,
        manufacturer: getSafe(() => po.companyProduct.echoProduct.manufacturer.name, 'N/A'),
        origin: getSafe(() => po.origin.name),
        expiration: moment(po.expirationDate).format('MM/DD/YYYY'),
        assay: <FormattedAssay min={po.assayMin} max={po.assayMax} />,
        condition: getSafe(() => po.conforming),
        form: getSafe(() => po.form.name),
        location: getLocationString(po)
      }
    }),
    sidebar: store.cart.sidebar
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions, sidebarChanged, getProductOffer, applyFilter })(Marketplace))
