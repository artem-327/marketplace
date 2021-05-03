import { connect } from 'react-redux'
import MyListings from './MyListings'
import * as Actions from '../../actions'
import { getTemplates } from '~/modules/broadcast/actions'
import { withDatagrid } from '~/modules/datagrid'
// import { Label, Popup, List } from 'semantic-ui-react'

import { openImportPopup } from '~/modules/settings/actions'
import { openBroadcast, broadcastChange } from '~/modules/broadcast/actions'
import { applyFilter } from '~/modules/filter/actions'
import { openPopup, closePopup } from '~/modules/company-product-info/actions'
import { setCompanyElligible } from '~/modules/auth/actions'
import { FormattedNumber } from 'react-intl'
import { currency } from '~/constants/index'

import { FormattedUnit, ArrayToFirstItem, FormattedAssay } from '~/components/formatted-messages'
import { getSafe } from '~/utils/functions'
import moment from 'moment/moment'
import { getLocaleDateFormat } from '~/components/date-format'

function mapStateToProps(store, { datagrid }) {
  const detailValues = store.simpleAdd.detailValues
  const editedId = store.simpleAdd.isModalDetailOpen && store.simpleAdd.editedId ? store.simpleAdd.editedId : -1

  return {
    ...store.simpleAdd,
    applicationName: store?.auth?.identity?.appInfo?.applicationName,
    broadcastTemplates: store.broadcast.templates,
    advancedFilters: store.filter.inventory.appliedFilter,
    editedId,
    sellEligible: getSafe(() => store.auth.identity.company.sellEligible, false),
    detailValues,
    rows: datagrid.rows.map(po => {
      const qtyPart = getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation)
      let fobPrice

      try {
        if (po.pricingTiers.length > 1)
          fobPrice = (
            <>
              {' '}
              <FormattedNumber
                minimumFractionDigits={3}
                maximumFractionDigits={3}
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
                minimumFractionDigits={3}
                maximumFractionDigits={3}
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
        rawData: po,
        id: po.id,
        product: po.product,
        expired: po.lotExpirationDate ? moment().isAfter(po.lotExpirationDate) : false,
        productName: getSafe(() => po.companyProduct.intProductName),
        productNumber: getSafe(() => po.companyProduct.intProductCode, 'N/A'),
        echoName: getSafe(() => po.companyProduct.companyGenericProduct.name, ''),
        echoCode: getSafe(() => po.companyProduct.companyGenericProduct.code, 'Unmapped'),
        chemicalName: getSafe(() => po.product.casProduct.chemicalName, po.companyProduct.intProductName),
        warehouse: getSafe(() => po.warehouse.deliveryAddress.cfName, ''),
        productId: getSafe(() => po.product.casProduct.id, 0),
        available: po.pkgAvailable ? <FormattedNumber minimumFractionDigits={0} value={po.pkgAvailable} /> : 'N/A',
        packagingType: getSafe(() => po.companyProduct.packagingType.name, ''),
        packagingSize: getSafe(() => po.companyProduct.packagingSize, ''),
        //qtyPart ? `${po.product.packagingSize} ${qtyPart}` : 'N/A',
        packagingUnit: getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation, ''),
        qtyPart: qtyPart,
        quantity: getSafe(() => po.quantity, ''),
        cost: po.costPerUOM ? (
          <FormattedNumber
            minimumFractionDigits={3}
            maximumFractionDigits={3}
            style='currency'
            currency={currency}
            value={po.costPerUOM}
          />
        ) : (
          'N/A'
        ),
        pricingTiers: po.pricingTiers,
        //pricing: po.pricing,
        fobPrice,
        manufacturer: getSafe(() => po.companyProduct.companyGenericProduct.manufacturer.name, 'N/A'),
        broadcasted: po.broadcasted,
        // lotNumber: <ArrayToMultiple values={po.lots.map(d => (d.lotNumber))} />,
        cfStatus: getSafe(() => po.cfStatus, 'N/A'),
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
        lotNumber: getSafe(() => po.lotNumber, ''),
        productStatus:
          po.companyProduct &&
          po.companyProduct.companyGenericProduct &&
          !po.companyProduct.companyGenericProduct.isPublished,
        productGroup: getSafe(() => po.companyProduct.companyGenericProduct.productGroup.name, null),
        tagsNames:
          po.companyProduct &&
          po.companyProduct.companyGenericProduct &&
          po.companyProduct.companyGenericProduct.productGroup &&
          po.companyProduct.companyGenericProduct.productGroup.tags &&
          po.companyProduct.companyGenericProduct.productGroup.tags.length
            ? po.companyProduct.companyGenericProduct.productGroup.tags.map(tag => tag.name)
            : []
      }
    }),
    unmappedRows: datagrid.rows,
    isOpenImportPopup: store.settings.isOpenImportPopup,
    isProductInfoOpen: store.companyProductInfo.isOpen,
    tutorialCompleted: getSafe(() => store.auth.identity.tutorialCompleted, false),
    activeInventoryFilter: getSafe(() => store.filter.inventory.appliedFilter.filters.length > 0, false)
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions,
    getTemplates,
    openPopup,
    closePopup,
    openImportPopup,
    openBroadcast,
    broadcastChange,
    applyFilter,
    setCompanyElligible
  })(MyListings)
)
