import { FormattedMessage } from 'react-intl'

export const COLUMNS = [
  {
    name: 'code',
    title: (
      <FormattedMessage id='carrier.code' defaultMessage='Code'>
        {text => text}
      </FormattedMessage>
    ),
    width: 300,
    allowReordering: false,
    sortPath: 'LogisticsCarrier.code'
  },
  {
    name: 'blindShipmentSupport',
    title: (
      <FormattedMessage id='carrier.blindShipmentSupport' defaultMessage='Blind Shipment Support'>
        {text => text}
      </FormattedMessage>
    ),
    width: 200,
    align: 'center',
    sortPath: 'LogisticsCarrier.blindShipmentSupport'
  },
  {
    name: 'priceMarkup',
    title: (
      <FormattedMessage id='carrier.price' defaultMessage='Price'>
        {text => text}
      </FormattedMessage>
    ),
    width: 200,
    sortPath: 'LogisticsCarrier.priceMarkup'
  }
]