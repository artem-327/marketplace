import { FormattedNumber } from 'react-intl'
import { connect } from 'react-redux'
import moment from 'moment/moment'

import { getLocationString } from '~/utils/functions'
import { withDatagrid } from '~/modules/datagrid'
import { applyFilter } from '~/modules/filter/actions'
import Listings from './Listings'
import * as Actions from '../../actions'
import { getProductOffer, sidebarChanged } from '~/modules/purchase-order/actions'
import { openPopup as openInfoPopup, closePopup } from '~/modules/company-product-info/actions'
import { FormattedUnit, FormattedAssay } from '~/components/formatted-messages'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'
import { getLocaleDateFormat } from '~/components/date-format'

function mapStateToProps(store, { datagrid }) {
  return {
    ...store.marketplace,
    advancedFilters: store.filter.marketplace.appliedFilter,
    // rows: store.marketplace.broadcastedProductOffers.map(po => {
    appliedFilter: store.filter.marketplace.appliedFilter,
    activeMarketplaceFilter: getSafe(() => store.filter.marketplace.appliedFilter.filters.length > 0, false),
    defaultZip: getSafe(() => store.auth.identity.homeBranch.deliveryAddress.address.zip.zip, ''),
    defaultCountry: getSafe(() => store.auth.identity.homeBranch.deliveryAddress.address.country.id, 1),
    rows: datagrid.rows.map(po => {
      const qtyPart = getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation)
      return {
        ...po,
        rawData: po,
        id: po.id,
        expired: po.lotExpirationDate ? moment().isAfter(po.lotExpirationDate) : false,
        productGroupName: getSafe(() => po.companyProduct.companyGenericProduct.productGroup.name, ''),
        intProductName: getSafe(() => po.companyProduct.intProductName, ''),
        productNumber: getSafe(() => po.companyProduct.companyGenericProduct.code, 'Unmapped'),
        // merchant: getSafe(() => po.warehouse.warehouseName, ''),
        available: po.pkgAvailable ? <FormattedNumber minimumFractionDigits={0} value={po.pkgAvailable} /> : 'N/A',
        packagingType: getSafe(() => po.companyProduct.packagingType.name, ''),
        packagingUnit: getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation, ''),
        packagingSize: getSafe(() => po.companyProduct.packagingSize, ''),
        quantity: qtyPart ? <FormattedUnit unit={qtyPart} separator=' ' value={po.quantity} /> : 'N/A',
        fobPrice:
          po.pricingTiers.length > 1 ? (
            <>
              {' '}
              <FormattedNumber
                minimumFractionDigits={3}
                maximumFractionDigits={3}
                style='currency'
                currency={currency}
                value={po.pricingTiers[po.pricingTiers.length - 1].pricePerUOM}
              />{' '}
              -{' '}
              <FormattedNumber
                minimumFractionDigits={3}
                maximumFractionDigits={3}
                style='currency'
                currency={currency}
                value={po.pricingTiers[0].pricePerUOM}
              />{' '}
              {qtyPart && `/ ${qtyPart}`}{' '}
            </>
          ) : (
            <>
              {' '}
              <FormattedNumber
                minimumFractionDigits={3}
                maximumFractionDigits={3}
                style='currency'
                currency={currency}
                value={getSafe(() => po.pricingTiers[0].pricePerUOM, 0)}
              />{' '}
              {qtyPart && `/ ${qtyPart}`}{' '}
            </>
          ),
        manufacturer: getSafe(() => po.companyProduct.companyGenericProduct.manufacturer.name, 'N/A'),
        origin: getSafe(() => po.origin.name),
        expiration: po.lotExpirationDate ? moment(po.lotExpirationDate).format(getLocaleDateFormat()) : 'N/A',
        assay: <FormattedAssay min={po.assayMin} max={po.assayMax} />,
        condition: !getSafe(() => po.conforming),
        conditionNotes: getSafe(() => po.conditionNotes, false),
        form: getSafe(() => po.form.name),
        location: getLocationString(po),
        notes: getSafe(() => po.externalNotes, ''),
        association: po && po.ownerAssociations && getSafe(() => po.ownerAssociations.map(a => a.name), []),
        leadTime: getSafe(() => po.leadTime, 'N/A'),
        tagsNames: getSafe(() => po.companyProduct.companyGenericProduct.productGroup.tags.length, '')
          ? po.companyProduct.companyGenericProduct.productGroup.tags.map(tag => tag.name)
          : ''
      }
    }),
    sidebar: store.cart.sidebar,
    isProductInfoOpen: store.companyProductInfo.isOpen,
    isMerchant: getSafe(() => store.auth.identity.isMerchant, false),
    isCompanyAdmin: getSafe(() => store.auth.identity.isCompanyAdmin, false),
    tutorialCompleted: getSafe(() => store.auth.identity.tutorialCompleted, false)
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions,
    sidebarChanged,
    openInfoPopup,
    closePopup,
    getProductOffer,
    applyFilter
  })(Listings)
)
