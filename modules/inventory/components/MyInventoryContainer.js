import React from 'react'

import { connect } from 'react-redux'
import MyInventory from './MyInventory'
import * as Actions from '../actions'
import { withDatagrid } from '~/modules/datagrid'
// import { Label, Popup, List } from 'semantic-ui-react'

import { openImportPopup } from '~/modules/settings/actions'
import { openBroadcast } from '~/modules/broadcast/actions'
import { applyFilter } from '~/modules/filter/actions'
import { openPopup, closePopup } from '~/modules/company-product-info/actions'
import { setCompanyElligible } from '~/modules/auth/actions'
import { FormattedNumber } from 'react-intl'
import { currency } from '~/constants/index'

import { FormattedUnit, UnitOfPackaging, ArrayToFirstItem, FormattedAssay } from '~/components/formatted-messages'
import { getSafe } from '~/utils/functions'
import moment from 'moment/moment'
import { getLocaleDateFormat } from '~/components/date-format'

function mapStateToProps(store, { datagrid }) {
  const sidebarValues = store.simpleAdd.sidebarValues
  const editedId = store.simpleAdd.sidebarDetailOpen && store.simpleAdd.editedId ? store.simpleAdd.editedId : -1

  return {
    ...store.simpleAdd,
    editedId,
    sellEligible: getSafe(() => store.auth.identity.company.sellEligible, false),
    appliedFilter: store.filter.filter.appliedFilter,
    sidebarValues,
    rows: datagrid.rows.map(po => {
      const qtyPart = getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation)
      let fobPrice = 'N/A'

      try {
        if (po.pricingTiers.length > 1)
          fobPrice = (
            <>
              {' '}
              <FormattedNumber
                style='currency'
                currency={currency}
                value={po.pricingTiers[po.pricingTiers.length - 1].pricePerUOM}
              />{' '}
              - <FormattedNumber style='currency' currency={currency} value={po.pricingTiers[0].pricePerUOM} />{' '}
              {qtyPart && `/ ${qtyPart}`}{' '}
            </>
          )
        else
          fobPrice = (
            <>
              {' '}
              <FormattedNumber
                style='currency'
                currency={currency}
                value={getSafe(() => po.pricingTiers[0].pricePerUOM)}
              />{' '}
              {qtyPart && `/ ${qtyPart}`}{' '}
            </>
          )
      } catch (e) {
        console.error(e)
      }
      return {
        ...po,
        id: po.id,
        product: po.product,
        productName: getSafe(() => po.companyProduct.intProductName),
        productNumber: getSafe(() => po.companyProduct.intProductCode, 'N/A'),
        echoName: getSafe(() => po.companyProduct.echoProduct.name, ''),
        echoCode: getSafe(() => po.companyProduct.echoProduct.code, 'Unmapped'),
        chemicalName: getSafe(() => po.product.casProduct.chemicalName, po.companyProduct.intProductName),
        warehouse: getSafe(() => po.warehouse.deliveryAddress.cfName),
        productId: getSafe(() => po.product.casProduct.id, 0),
        available: po.pkgAvailable ? <FormattedNumber minimumFractionDigits={0} value={po.pkgAvailable} /> : 'N/A',
        packaging: getSafe(() => po.companyProduct.packagingType.name) ? (
          <UnitOfPackaging value={po.companyProduct.packagingType.name} />
        ) : (
          'N/A'
        ),
        pkgAmount: qtyPart ? (
          <FormattedUnit unit={qtyPart} separator={' '} value={po.companyProduct.packagingSize} />
        ) : (
          'N/A'
        ),
        //qtyPart ? `${po.product.packagingSize} ${qtyPart}` : 'N/A',
        packagingUnit: getSafe(() => po.companyProduct.packagingUnit.name),
        quantity: qtyPart ? <FormattedUnit unit={qtyPart} separator=' ' value={po.quantity} /> : 'N/A',
        cost: po.costPerUOM ? <FormattedNumber style='currency' currency={currency} value={po.costPerUOM} /> : 'N/A',
        pricingTiers: po.pricingTiers,
        //pricing: po.pricing,
        fobPrice,
        manufacturer: getSafe(() => po.companyProduct.echoProduct.manufacturer.name, 'N/A'),
        broadcasted: po.broadcasted,
        // lotNumber: <ArrayToMultiple values={po.lots.map(d => (d.lotNumber))} />,
        status: po.cfStatus, // new broadcasted
        minOrderQuantity: getSafe(() => po.minPkg, ''),
        splits: getSafe(() => po.splitPkg, ''),
        condition: getSafe(() => po.conforming, ''),
        grade: po.grades && po.grades.length ? <ArrayToFirstItem values={po.grades.map(d => d.name)} /> : '',
        origin: getSafe(() => po.origin.name, ''),
        form: getSafe(() => po.form.name, ''),
        assayString: <FormattedAssay min={po.assayMin} max={po.assayMax} />,
        mfgDate: po.lotManufacturedDate ? moment(po.lotManufacturedDate).format(getLocaleDateFormat()) : 'N/A',
        expDate: po.lotExpirationDate ? moment(po.lotExpirationDate).format(getLocaleDateFormat()) : 'N/A',
        allocatedPkg: po.pkgAllocated,
        // processingTimeDays: po.processingTimeDays,
        offerExpiration: po.validityDate ? moment(po.validityDate).format(getLocaleDateFormat()) : 'N/A',
        groupId: getSafe(() => po.parentOffer, ''),
        lotNumber: getSafe(() => po.lotNumber, '')
      }
    }),
    unmappedRows: datagrid.rows,
    isOpenImportPopup: store.settings.isOpenImportPopup,
    isProductInfoOpen: store.companyProductInfo.isOpen,
    tutorialCompleted: getSafe(() => store.auth.identity.tutorialCompleted, false)
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions,
    openPopup,
    closePopup,
    openImportPopup,
    openBroadcast,
    applyFilter,
    setCompanyElligible
  })(MyInventory)
)
