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
      const qtyPart = getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation)
      let currency = getSafe(() => po.price.currency.code, 'USD')
      let fobPrice = null
      if (!po.pricingTiers[0]) fobPrice = 'N/A'
      else if (po.pricingTiers.length > 1) fobPrice = <> <FormattedNumber style='currency' currency={currency} value={po.pricingTiers[po.pricingTiers.length - 1].price.amount} /> - <FormattedNumber style='currency' currency={currency} value={po.pricingTiers[0].price.amount} /> {qtyPart && (`/ ${qtyPart}`)} </>
      else fobPrice = <> <FormattedNumber style='currency' currency={currency} value={getSafe(() => po.pricingTiers[0].price.amount)} /> {qtyPart && (`/ ${qtyPart}`)} </>

      return {
        id: po.id,
        product: po.product,
        productName: getSafe(() => po.companyProduct.intProductName),
        productNumber: getSafe(() => po.companyProduct.intProductCode, 'N/A'),
        echoName: getSafe(() => po.companyProduct.echoProduct.name, ''),
        echoCode: getSafe(() => po.companyProduct.echoProduct.code, 'Unmapped'),
        chemicalName: getSafe(() => po.product.casProduct.chemicalName, po.companyProduct.intProductName),
        warehouse: po.warehouse.warehouseName,
        productId: getSafe(() => po.product.casProduct.id, 0),
        available: po.pkgAmount ? <FormattedNumber minimumFractionDigits={0} value={po.pkgAmount} /> : 'N/A',
        packaging: getSafe(() => po.companyProduct.packagingType.name) ? <UnitOfPackaging value={po.companyProduct.packagingType.name} /> : 'N/A',
        pkgAmount: qtyPart ? <FormattedUnit unit={qtyPart} separator={' '} value={po.companyProduct.packagingSize} /> : 'N/A',
        //qtyPart ? `${po.product.packagingSize} ${qtyPart}` : 'N/A',
        packagingUnit: getSafe(() => po.companyProduct.packagingUnit.name),
        quantity: qtyPart ? <FormattedUnit unit={qtyPart} separator=' ' value={po.quantity} /> : 'N/A',
        cost: po.cost ? <FormattedNumber style='currency' currency={currency} value={po.cost.amount} /> : 'N/A',
        pricingTiers: po.pricingTiers,
        //pricing: po.pricing,
        fobPrice,
        manufacturer: getSafe(() => po.companyProduct.echoProduct.manufacturer.name, 'N/A'),
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
    unmappedRows: datagrid.rows,
    isOpenImportPopup: store.settings.isOpenImportPopup
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions, openImportPopup, openBroadcast, applyFilter })(MyInventory))


