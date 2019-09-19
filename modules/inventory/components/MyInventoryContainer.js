import React from 'react'

import { connect } from 'react-redux'
import MyInventory from './MyInventory'
import * as Actions from '../actions'
import { withDatagrid } from '~/modules/datagrid'
import { Label, Popup, List } from 'semantic-ui-react'

import { openImportPopup } from '~/modules/settings/actions'
import { openBroadcast } from '~/modules/broadcast/actions'
import { applyFilter } from '~/modules/filter/actions'
import { FormattedNumber } from 'react-intl'


import { FormattedUnit, UnitOfPackaging, ArrayToMultiple, FormattedAssay } from '~/components/formatted-messages'
import { getSafe } from '~/utils/functions'
import moment from 'moment/moment'

function mapStateToProps(store, { datagrid }) {
  return {
    ...store.simpleAdd,
    appliedFilter: store.filter.filter.appliedFilter,
    rows: datagrid.rows.map(po => {
      const qtyPart = getSafe(() => po.product.packagingUnit.nameAbbreviation)
      let currency = getSafe(() => po.cost.currency.code, 'USD')

      return {
        id: po.id,
        product: po.product,
        productName: po.product.productName,
        tradeName: getSafe(() => po.tradeName, 'N/A'),
        productNumber: getSafe(() => po.product.productCode, 'N/A'),
        casNumberCombined: getSafe(() => po.product.casNumberCombined, 'Unmapped'),
        chemicalName: getSafe(() => po.product.casProduct.chemicalName, po.product.productName),
        warehouse: po.warehouse.warehouseName,
        productId: getSafe(() => po.product.casProduct.id, 0),
        available: <FormattedNumber minimumFractionDigits={0} value={po.pkgAmount} />,
        packaging: getSafe(() => po.product.packagingType.name) ? <UnitOfPackaging value={po.product.packagingType.name} /> : 'N/A',
        pkgAmount: qtyPart ? <FormattedUnit unit={qtyPart} separator={' '} value={po.product.packagingSize} /> : 'N/A',
        //qtyPart ? `${po.product.packagingSize} ${qtyPart}` : 'N/A',
        quantity: qtyPart ? <FormattedUnit unit={qtyPart} separator=' ' value={po.pkgAmount * po.product.packagingSize} /> : 'N/A',
        cost: po.pricing.cost ? <FormattedNumber style='currency' currency={currency} value={po.pricing.cost} /> : 'N/A',
        pricingTiers: po.pricingTiers,
        pricing: po.pricing,
        fobPrice: po.pricingTiers.length > 1
          ? <> <FormattedNumber style='currency' currency={currency} value={po.pricingTiers[po.pricingTiers.length - 1].price} /> - <FormattedNumber style='currency' currency={currency} value={po.pricingTiers[0].price} /> {qtyPart && (`/ ${qtyPart}`)} </>
          : <> <FormattedNumber style='currency' currency={currency} value={po.pricingTiers[0].price} /> {qtyPart && (`/ ${qtyPart}`)} </>,
        manufacturer: getSafe(() => po.manufacturer.name, 'N/A'),
        broadcasted: po.broadcasted,
        lotNumber: <ArrayToMultiple values={po.lots.map(d => (d.lotNumber))} />,
        status: po.status,// new broadcasted
        minOrderQuantity: getSafe(() => po.minimum, ''),
        splits: getSafe(() => po.splits, ''),
        condition: getSafe(() => po.productCondition.name, ''),
        grade: po.productGrades && po.productGrades.length ? <ArrayToMultiple values={po.productGrades.map(d => (d.name))} /> : '',
        origin: getSafe(() => po.origin.name, ''),
        form: getSafe(() => po.productForm.name, ''),
        assay: <FormattedAssay min={po.assayMin} max={po.assayMax} />,
        mfgDate: getSafe(() => moment(po.manufacturedDate).format('MM/DD/YYYY'), ''),
        expDate: getSafe(() => moment(po.expirationDate).format('MM/DD/YYYY'), ''),
        allocatedPkg: po.pkgAllocated,
        processingTimeDays: po.processingTimeDays,
        offerExpiration: getSafe(() => moment(po.validityDate).format('MM/DD/YYYY'), ''),
      }
    }),
    isOpenImportPopup: store.settings.isOpenImportPopup
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions, openImportPopup, openBroadcast, applyFilter })(MyInventory))


