import ActionCell from '../../../../components/table/ActionCell'
import { Popup, Header } from 'semantic-ui-react'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Warning } from '@material-ui/icons'
//Constants
import { currency } from '../../../../constants/index'
import { OPTIONS_BROADCAST } from '../../my-listings/components/ModalDetail/ModalDetail.constants'
//Styles
import { DivIconOptions } from '../../constants/layout'
import { NetworkDropdown, NetworkChevronDown } from '../../../../components/Network'
//Services
import { onClickBroadcast } from '../../my-listings/MyListings.services'

export const getActions = triggerPriceBookModal => {
  return [
    {
      text: 'Price Book',
      callback: row => triggerPriceBookModal(true, row.id)
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

  const options = OPTIONS_BROADCAST.map(opt => {
    return { ...opt, subtitle: formatMessage({ id: opt.subtitleId, defaultMessage: opt.subtitleText }) }
  }).concat([
    ...broadcastTemplates.map(template => {
      return {
        icon: (
          <DivIconOptions>
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
          </DivIconOptions>
        ),
        title: template.name,
        subtitle: formatMessage({ id: 'myInventory.customTemplate', defaultMessage: 'Custom Template' }),
        id: template.id,
        tmp: template.name,
        value: `BROADCAST_TEMPLATE|${template.id}`
      }
    })
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
            defaultMessage="This Offer's Company Product is not mapped to Echo Product, so it will not be visible to other users at Marketplace."
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
          $widthSharedListings='65px'
          icon={<NetworkChevronDown />}
          floating
          scrolling
          header={formatMessage({ id: 'myInventory.whoShouldSee', defaultMessage: 'Who should see this offer?' })}
          pointing='top right'
          value={r?.resellerBroadcastOption?.key || 'GLOBAL_RULES'} //FIXME when BE works with custom template. 500 server error when I call prodex/api/product-offers/174/broadcast-option?broadcastTemplateId=36&option=BROADCAST_TEMPLATE
          //r.broadcastTemplateResponse ? r.broadcastOption + '|' + r.broadcastTemplateResponse.id : r.broadcastOption
          loading={!!r.isBroadcastLoading}
          closeOnChange
          //onChange={this.broadcastChange}
          options={options.map((option, optIndex) => {
            return {
              key: option.id ? option.id : optIndex * -1 - 1,
              text: option.icon,
              value: option.value,
              content: <Header icon={option.icon} content={option.title} subheader={option.subtitle} />,
              onClick: () =>
                onClickBroadcast(
                  r,
                  option.value,
                  broadcastChange,
                  datagrid,
                  option.id ? { id: option.id, name: option.tmp } : null
                )
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
export const getPriceColumns = row => {
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
