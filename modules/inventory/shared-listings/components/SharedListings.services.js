import { Popup, Header, Image } from 'semantic-ui-react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Warning } from '@material-ui/icons'
import moment from 'moment'
// Components
import ActionCell from '../../../../components/table/ActionCell'
//Constants
import { currency } from '../../../../constants/index'
import { BROADCAST_OPTIONS } from './SharedListings.constants'
//Styles
import { NetworkDropdown, NetworkChevronDown } from '../../../../components/Network'
import { DivSeller, SpanSellerName, CapitalizedText } from './SharedListings.styles'
//Services
import { onClickBroadcast } from '../../my-listings/components/MyListings.services'
import { getSafe, getLocationString } from '../../../../utils/functions'
import { FormattedUnit } from '../../../../components/formatted-messages'

export const getActions = triggerPriceBookModal => {
  return [
    {
      text: 'Price Book',
      callback: row => triggerPriceBookModal(true, row)
    }
  ]
}

/**
 * Added actions to the productName column and adjusted broadcast option in network column and returns rows.
 * @category Shared Listings
 * @param {array} rows
 * @param {object} props
 * @returns {array}
 */
export const getRows = (rows, props) => {
  const {
    triggerPriceBookModal,
    broadcastTemplates,
    broadcastChange,
    datagrid,
    intl: { formatMessage }
  } = props

  const options = BROADCAST_OPTIONS.map(opt => {
    return { ...opt, subtitle: formatMessage({ id: opt.subtitleId, defaultMessage: opt.subtitleText }) }
  }).concat([
    ...broadcastTemplates.map(template => {
      return {
        icon: (
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
            <g fill='none' fill-rule='evenodd'>
              <path
                d='M0 0L24 0 24 24 0 24z'
                transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
              />
              <path
                fill='#848893'
                fill-rule='nonzero'
                d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z'
                transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
              />
            </g>
          </svg>
        ),
        title: template.name,
        subtitle: formatMessage({ id: 'myInventory.customTemplate', defaultMessage: 'Custom Template' }),
        id: template.id,
        tmp: template.name,
        value: `BROADCAST_TEMPLATE|${template.id}`
      }
    }),
    {
      icon: (
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <g fill='none' fill-rule='evenodd'>
            <path
              d='M0 0L24 0 24 24 0 24z'
              transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
            />
            <path
              fill='#848893'
              fill-rule='nonzero'
              d='M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm7-7H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-1.75 9c0 .23-.02.46-.05.68l1.48 1.16c.13.11.17.3.08.45l-1.4 2.42c-.09.15-.27.21-.43.15l-1.74-.7c-.36.28-.76.51-1.18.69l-.26 1.85c-.03.17-.18.3-.35.3h-2.8c-.17 0-.32-.13-.35-.29l-.26-1.85c-.43-.18-.82-.41-1.18-.69l-1.74.7c-.16.06-.34 0-.43-.15l-1.4-2.42c-.09-.15-.05-.34.08-.45l1.48-1.16c-.03-.23-.05-.46-.05-.69 0-.23.02-.46.05-.68l-1.48-1.16c-.13-.11-.17-.3-.08-.45l1.4-2.42c.09-.15.27-.21.43-.15l1.74.7c.36-.28.76-.51 1.18-.69l.26-1.85c.03-.17.18-.3.35-.3h2.8c.17 0 .32.13.35.29l.26 1.85c.43.18.82.41 1.18.69l1.74-.7c.16-.06.34 0 .43.15l1.4 2.42c.09.15.05.34-.08.45l-1.48 1.16c.03.23.05.46.05.69z'
              transform='translate(-1125 -627) translate(1105 295) translate(0 29) translate(20 303)'
            />
          </g>
        </svg>
      ),
      title: formatMessage({ id: 'myInventory.custom', defaultMessage: 'Custom' }),
      subtitle: formatMessage({ id: 'myInventory.customSubtitle', defaultMessage: 'Create Custom Rule' }),
      value: 'CUSTOM_RULES'
    }
  ])

  return rows.map((r, index) => {
    //const isOfferValid = r.validityDate ? moment().isBefore(r.validityDate) : true

    let productStatusText = null
    switch (r.cfStatus) {
      case 'Unpublished': {
        productStatusText = (
          <FormattedMessage
            id='global.notPublished'
            defaultMessage='This echo product is not published and will not show on the Marketplace.'
          />
        )
        break
      }
      case 'Unmapped': {
        productStatusText = (
          <FormattedMessage
            id='myInventory.productStatus.unmapped'
            defaultMessage="This Offer's Company Product is not mapped to Company Generic Product, so it will not be visible to other users at Marketplace."
          />
        )
        break
      }
    }

    return {
      ...r,
      productName: (
        <ActionCell
          row={r}
          getActions={() => getActions(triggerPriceBookModal)}
          content={r.productName}
          rightAlignedContent={
            r.expired || productStatusText ? (
              <Popup
                size='small'
                inverted
                style={{
                  fontSize: '12px',
                  color: '#cecfd4',
                  opacity: '0.9'
                }}
                header={
                  <div>
                    {r.expired && (
                      <div>
                        <FormattedMessage id='global.expiredProduct.tooltip' defaultMessage='Expired Product' />
                      </div>
                    )}
                    {productStatusText && <div>{productStatusText}</div>}
                  </div>
                }
                trigger={
                  <div>
                    <Warning className='title-icon' style={{ fontSize: '16px', color: '#f16844' }} />
                  </div>
                } // <div> has to be there otherwise popup will be not shown
              />
            ) : null
          }
        />
      ),
      network: (
        <NetworkDropdown
          $widthSharedListings='50px'
          icon={<NetworkChevronDown />}
          floating
          scrolling
          header={formatMessage({ id: 'myInventory.whoShouldSee', defaultMessage: 'Who should see this offer?' })}
          pointing='top right'
          value={
            r?.resellerBroadcastOption?.key === 'BROADCAST_TEMPLATE'
              ? `BROADCAST_TEMPLATE|${broadcastTemplates[0].id}`
              : r?.resellerBroadcastOption?.key
          }
          loading={!!r.isBroadcastLoading}
          closeOnChange
          options={options.map((option, optIndex) => {
            return {
              key: option.id ? option.id : optIndex * -1 - 1,
              text: option.icon,
              value: option.value,
              content: <Header icon={option.icon} content={option.title} subheader={option.subtitle} />,
              onClick: () => {
                if (option.value === 'CUSTOM_RULES') {
                  triggerPriceBookModal(true, r)
                } else {
                  onClickBroadcast(
                    r,
                    option.value,
                    broadcastChange,
                    datagrid,
                    option.id ? { id: option.id, name: option.tmp } : null,
                    null,
                    false,
                    'shared-listings'
                  )
                }
              }
            }
          })}
        />
      )
    }
  })
}

/**
 * @category Shared Listings
 * @method
 * @param {object} row
 * @returns {{titleNumbers: string, value: JSX.Element}[]}
 */
const getPriceColumns = row => {
  if (!row) return
  return row?.pricingTiers?.map((p, i) => {
    return {
      titleNumbers:
        i === 0 ? `0 - ${p.quantityFrom}` : `${row?.pricingTiers[i - 1].quantityFrom + 1} - ${p.quantityFrom}`,
      value: (
        <span>
          <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            style='currency'
            currency={currency}
            value={p?.pricePerUOM}
          />
          {`/${row?.companyProduct?.packagingUnit?.nameAbbreviation}`}
        </span>
      )
    }
  })
}

export const getMappedRows = datagrid => datagrid.rows.map(po => {
  const qtyPart = getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation)
  let price
  let address = po?.warehouse?.deliveryAddress?.address?.city

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
        <Image verticalAlign='middle' size='mini' spaced={true} src={po?.createdBy?.company?.avatarUrl} />
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
