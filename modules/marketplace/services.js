import { FormattedNumber, FormattedMessage } from 'react-intl'
import moment from 'moment/moment'
import { Image } from 'semantic-ui-react'
//Services
import { getLocationString, getSafe } from '../../utils/functions'
import { getLocaleDateFormat } from '../../components/date-format'
import { FormattedUnit, FormattedAssay } from '../../components/formatted-messages'
//Constants
import { currency } from '../../constants/index'

/**
 * Prepares datagrid rows object for a table in Marketplace.
 * @method
 * @param {Array<object, string>} rows Datagrid rows from POST /prodex/api/product-offers/broadcasted/datagrid/.
 * @returns {Array<object, string> | []} Returns rows object for a table in Marketplace.
 */
export const getRows = rows => {
  if (!rows?.length) return []
  return rows?.map(po => {
    const qtyPart = getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation)
    return {
      ...po,
      id: po.id + '_' + po.sellerId,
      rawData: po,
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
        : '',
      seller: (
        <div key={po?.id}>
          <Image
            verticalAlign='middle'
            style={{ width: '20px' }}
            size='mini'
            spaced={true}
            src={po?.owner?.avatarUrl}
          />

          <span>{po?.owner?.name}</span>
        </div>
      )
    }
  })
}

/**
 * Prepares Sellers dropdown options array for filter in Marketplace.
 * @method
 * @param {Array<object>} companies Array of companies returned from GET /api/companies/search.
 * @returns {Array<object> | []} Returns Sellers dropdown options array for filter in Marketplace.
 */
export const getCompaniesDropdown = companies => {
  const options = companies?.map(c => {
    const logo = c.avatarUrl || c.logoUrl

    const seller = (
      <div key={c.id} style={{ display: 'flex' }}>
        {logo ? (
          <Image
            verticalAlign='middle'
            style={{ width: '20px', margin: 'auto 10px auto 0' }}
            size='mini'
            spaced={true}
            src={logo}
          />
        ) : null
        }
        <div style={{ margin: 'auto 0' }}>{c.cfDisplayName}</div>
      </div>
    )

    return {
      text: seller,
      value: c.id,
      key: c.id,
      content: seller
    }
  })

  return [
    {
      text: (<FormattedMessage id='marketplace.allSellers' defaultMessage='All Sellers' />),
      value: 0,
      key: 0
    }
  ].concat(options)
}
