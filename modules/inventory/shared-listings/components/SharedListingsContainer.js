import { connect } from 'react-redux'

import * as Actions from '../../actions'
import { getTemplates } from '~/modules/broadcast/actions'
import { withDatagrid } from '~/modules/datagrid'
import { FormattedNumber } from 'react-intl'
import { currency } from '~/constants/index'
import { getSafe, getLocationString } from '~/utils/functions'
import SharedListings from './SharedListings'
import moment from '../../my-listings/components/MyListingsContainer'

//Services
import { getPriceColumns } from './SharedListings.services'

function mapStateToProps(store, { datagrid }) {
  return {
    ...store.simpleAdd,
    broadcastTemplates: store.broadcast.templates,
    rows: datagrid.rows.map(po => {
      const qtyPart = getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation)
      let price
      try {
        if (po.pricingTiers.length > 1)
          price = (
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
          price = (
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
        rawData: { ...po, priceColumns: getPriceColumns(po) },
        groupProductName: getSafe(() => po.companyProduct.intProductName, 'Unmapped'),
        // Datagrid columns
        expired: po.lotExpirationDate ? moment().isAfter(po.lotExpirationDate) : false,
        productName: getSafe(() => po.companyProduct.intProductName, 'N/A'),
        seller: getSafe(() => po.owner.cfDisplayName, 'N/A'),
        packagingType: getSafe(() => po.companyProduct.packagingType.name, ''),
        packagingSize: getSafe(() => po.companyProduct.packagingSize, ''),
        packagingUnit: getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation, ''),
        qtyPart: qtyPart,
        available: po.pkgAvailable ? <FormattedNumber minimumFractionDigits={0} value={po.pkgAvailable} /> : 'N/A',
        quantity: getSafe(() => po.quantity, ''),
        location: getLocationString(po),

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
        price
      }
    })
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions, getTemplates })(SharedListings))
