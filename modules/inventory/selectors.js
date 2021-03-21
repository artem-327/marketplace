import { createSelector } from 'reselect'
import { getSafe, getLocationString } from '../../utils/functions'
import { FormattedNumber } from 'react-intl'
import moment from 'moment'
import { Image } from 'semantic-ui-react'
//Constants
import { currency } from '../../constants/index'
//Services
import { getPriceColumns } from './shared-listings/components/SharedListings.services'
//Styles
import { DivSeller, ImageInRow, SpanSellerName } from './shared-listings/components/SharedListings.styles'

const getDatagridRows = props => props?.datagrid?.rows
export const getBroadcastTemplates = state => state?.broadcast?.templates

export const makeGetDatagridRows = () => {
  return createSelector([getDatagridRows], rows => {
    return rows.map(po => {
      const qtyPart = getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation)
      let price
      let address = po?.warehouse?.deliveryAddress?.address?.city //MOVE to mapStateToProps and services

      if (po?.warehouse?.deliveryAddress?.address?.province?.abbreviation) {
        address = `${address}, ${po?.warehouse?.deliveryAddress?.address?.province?.abbreviation}`
      } else {
        address = `${address}, ${po?.warehouse?.deliveryAddress?.address?.country?.code}`
      }
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
        rawData: { ...po, address, priceColumns: getPriceColumns(po) },
        groupProductName: getSafe(() => po.companyProduct.intProductName, 'Unmapped'),
        // Datagrid columns
        expired: po.lotExpirationDate ? moment().isAfter(po.lotExpirationDate) : false,
        productName: getSafe(() => po.companyProduct.intProductName, 'N/A'),

        seller: (
          <DivSeller key={po.id}>
            <Image verticalAlign='middle' size='mini' spaced={true} src={po?.createdBy?.company?.base64Logo} />
            <SpanSellerName>{po?.owner?.cfDisplayName}</SpanSellerName>
          </DivSeller>
        ),

        //seller: getSafe(() => po.owner.cfDisplayName, 'N/A'),
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
