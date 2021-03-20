import { createSelector } from 'reselect'
import { getSafe, getLocationString } from '../../utils/functions'
import { FormattedNumber } from 'react-intl'
import moment from 'moment'
//Constants
import { currency } from '~/constants/index'
//Services
import { getPriceColumns } from './shared-listings/components/SharedListings.services'

const getDatagridRows = props => props?.datagrid?.rows

export const makeGetDatagridRows = () => {
  return createSelector([getDatagridRows], rows => {
    console.log('Memoized makeGetDatagridRows')
    return rows.map(po => {
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
  })
}

export const getBroadcastTemplates = state => {
  console.log('Not memoized getBroadcastTemplates')
  return state?.broadcast?.templates
}
