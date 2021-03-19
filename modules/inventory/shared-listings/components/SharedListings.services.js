import moment from "../../my-listings/components/MyListings";
import ActionCell from '../../../../components/table/ActionCell'
import { Container, Menu, Header, Modal, Checkbox, Popup, Button, Dropdown, Grid, Input } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Warning } from '@material-ui/icons'
import { FormattedUnit } from '../../../../components/formatted-messages'

import {
  CapitalizedText,

} from './SharedListings.styles'

const getActions = props => {
  const {
    intl: { formatMessage },
    datagrid
  } = props

  return [
    {
      text: formatMessage({
        id: 'inventory.broadcast',
        defaultMessage: 'Price Book'
      }),
      callback: row => console.log('!!!!!!!!!! Open Action Price Book', row)
    }
  ]
}

export const getRows = (rows, props) => {
  const {
    datagrid,
    pricingEditOpenId,
    setPricingEditOpenId,
    modalDetailTrigger,
    toastManager,
    closePricingEditPopup,
    intl: { formatMessage },
    broadcastTemplates,
    isProductInfoOpen,
    closePopup,
    isExportInventoryOpen,
    setExportModalOpenState,
    broadcastChange
  } = props
  let title


  return rows.map((r, index) => {
    const isOfferValid = r.validityDate ? moment().isBefore(r.validityDate) : true


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
          getActions={() => getActions(props)}
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
      packaging: (
        <>
          {`${r.packagingSize} ${r.packagingUnit} `}
          <CapitalizedText>{r.packagingType}</CapitalizedText>{' '}
        </>
      ),
      quantity: r.qtyPart && r.quantity ? <FormattedUnit unit={r.qtyPart} separator=' ' value={r.quantity} /> : 'N/A'
    }
  })
}