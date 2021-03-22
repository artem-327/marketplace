import { createSelector } from 'reselect'
import { getSafe, getLocationString } from '../../utils/functions'
import { FormattedNumber } from 'react-intl'
import moment from 'moment'
import { Image } from 'semantic-ui-react'

//Constants
import { currency } from '../../constants/index'
//Services
import { getPriceColumns } from './shared-listings/components/SharedListings.services'
import { FormattedUnit } from '../../components/formatted-messages'
//Styles
import { DivSeller, SpanSellerName, CapitalizedText } from './shared-listings/components/SharedListings.styles'

const getDatagridRows = props => props?.datagrid?.rows
export const getBroadcastTemplates = state => state?.broadcast?.templates

export const makeGetDatagridRows = () => {
  return createSelector([getDatagridRows], rows => {
    return rows.map(po => {
      const qtyPart = getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation)
      let price
      let address = po?.warehouse?.deliveryAddress?.address?.city //MOVE to mapStateToProps and services
      const companyProduct = getSafe(() => po.companyProduct, null)
      const companyGenericProduct = getSafe(() => po.companyProduct.companyGenericProduct, null)
      if (po?.warehouse?.deliveryAddress?.address?.province?.abbreviation) {
        address = `${address}, ${po?.warehouse?.deliveryAddress?.address?.province?.abbreviation}`
      } else {
        address = `${address}, ${po?.warehouse?.deliveryAddress?.address?.country?.code}`
      }
      try {
        if (po.pricingTiers.length > 1)
          price = (
            <>
              <FormattedNumber
                minimumFractionDigits={3}
                maximumFractionDigits={3}
                style='currency'
                currency={currency}
                value={po.pricingTiers[po.pricingTiers.length - 1].pricePerUOM}
              />
              - <FormattedNumber style='currency' currency={currency} value={po.pricingTiers[0].pricePerUOM} />{' '}
              {qtyPart && `/ ${qtyPart}`}{' '}
            </>
          )
        else
          price = (
            <>
              <FormattedNumber
                minimumFractionDigits={3}
                maximumFractionDigits={3}
                style='currency'
                currency={currency}
                value={getSafe(() => po.pricingTiers[0].pricePerUOM)}
              />
              {qtyPart && `/ ${qtyPart}`}{' '}
            </>
          )
      } catch (e) {
        console.error(e)
      }

      let tdsFields = null
      //Convert tdsFields string array of objects to array
      if (getSafe(() => po.tdsFields, '')) {
        let newJson = po.tdsFields.replace(/([a-zA-Z0-9]+?):/g, '"$1":')
        newJson = newJson.replace(/'/g, '"')
        tdsFields = JSON.parse(newJson)
      }

      return {
        ...po,

        rawData: {
          ...po,
          elementsTdsFields: { elements: getSafe(() => tdsFields, [{ property: '', specifications: '' }]) },
          address,
          priceColumns: getPriceColumns(po)
        },
        groupProductName: getSafe(() => po.companyProduct.intProductName, 'Unmapped'),
        seller: (
          <DivSeller key={po.id}>
            <Image verticalAlign='middle' size='mini' spaced={true} src={po?.createdBy?.company?.base64Logo} />
            <SpanSellerName>{po?.owner?.cfDisplayName}</SpanSellerName>
          </DivSeller>
        ),
        expired: po.lotExpirationDate ? moment().isAfter(po.lotExpirationDate) : false,
        productName: getSafe(() => po.companyProduct.intProductName, 'N/A'),
        //seller: getSafe(() => po.owner.cfDisplayName, 'N/A'),
        packagingType: getSafe(() => po.companyProduct.packagingType.name, ''),
        packagingSize: getSafe(() => po.companyProduct.packagingSize, ''),
        packagingUnit: getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation, ''),
        qtyPart: qtyPart,
        available: po.pkgAvailable ? <FormattedNumber minimumFractionDigits={0} value={po.pkgAvailable} /> : 'N/A',
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
        price,
        packaging: (
          <>
            {`${po.companyProduct.packagingSize} ${po.companyProduct.packagingUnit.nameAbbreviation} `}
            <CapitalizedText>{po.companyProduct.packagingType.name}</CapitalizedText>{' '}
          </>
        ),
        quantityShared:
          qtyPart && po?.quantity ? <FormattedUnit unit={qtyPart} separator=' ' value={po?.quantity} /> : 'N/A'
      }
    })
  })
}
