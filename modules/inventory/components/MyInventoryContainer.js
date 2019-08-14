import React from 'react'

import { connect } from 'react-redux'
import MyInventory from './MyInventory'
import * as Actions from '../actions'
import { withDatagrid } from '~/modules/datagrid'
import { Label, Popup, List } from 'semantic-ui-react'

import { openImportPopup } from '~/modules/settings/actions'
import { openBroadcast } from '~/modules/broadcast/actions'
import { applyFilter } from '~/modules/filter/actions'
import { FormattedNumber, FormattedMessage } from 'react-intl'


import { FormattedUnit, UnitOfPackaging } from '~/components/formatted-messages'
import { getSafe } from '~/utils/functions'
import moment from 'moment/moment'

const transformLotNumbers = lots => {
  if (lots.length > 1) {
    let onMouseoverTest = lots.map(d => (d.lotNumber))
    return (
      <div>
        <Popup
          data-test='my_inventory_lot_number_btn'
          content={<List items={onMouseoverTest} />}
          trigger={<Label><FormattedMessage id='global.multiple' defaultMessage='Multiple' /></Label>}
        />
      </div>
    )
  }
  else {
    return lots[0].lotNumber
  }
}

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
          : <> <FormattedNumber style='currency' currency={currency} value={po.pricing.price} /> {qtyPart && (`/ ${qtyPart}`)} </>,
        manufacturer: getSafe(() => po.manufacturer.name, 'N/A'),
        broadcasted: po.broadcasted,
        lotNumber: transformLotNumbers(po.lots),
        status: po.status,// new broadcasted
        minOrderQuantity: getSafe(() => po.minimum, ''),
        splits: getSafe(() => po.splits, ''),
        condition: getSafe(() => po.productCondition.name, ''),
        grade: po.productGrades && po.productGrades.length ? po.productGrades[0].name : '',  // ! ! array productGrades
        origin: getSafe(() => po.origin.name, ''),
        form: getSafe(() => po.productForm.name, ''),
        assay: po.assayMin && po.assayMax ?
          po.assayMin + '/' + po.assayMax : '',
        mfgDate: getSafe(() => moment(po.manufacturedDate).format('MM/DD/YYYY'), ''),
        expDate: getSafe(() => moment(po.expirationDate).format('MM/DD/YYYY'), ''),
        allocatedPkg: 'TODO', // ! ! kterou promennou?
        offerExpiration: 'TODO',  // ! ! kterou promennou?
      }
    }),
    isOpenImportPopup: store.settings.isOpenImportPopup
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions, openImportPopup, openBroadcast, applyFilter })(MyInventory))


