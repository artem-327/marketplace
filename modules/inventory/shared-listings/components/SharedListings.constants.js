import { FormattedMessage, injectIntl } from 'react-intl'

export const COLUMNS = [
  { name: 'groupProductName', disabled: true },
  {
    name: 'productName',
    title: (
      <FormattedMessage id='sharedListings.internalProductName' defaultMessage='Internal Product Name'>
        {text => text}
      </FormattedMessage>
    ),
    width: 320,
    sortPath: 'ProductOffer.companyProduct.intProductName',
    allowReordering: false
  },
  {
    name: 'seller',
    title: (
      <FormattedMessage id='sharedListings.seller' defaultMessage='Seller'>
        {text => text}
      </FormattedMessage>
    ),
    width: 180,
    // ! ! sortPath: 'ProductOffer.cfPricePerUOM'
  },
  {
    name: 'packaging',
    title: (
      <FormattedMessage id='sharedListings.packaging' defaultMessage='Packaging'>
        {text => text}
      </FormattedMessage>
    ),
    width: 150
  },
  {
    name: 'available',
    title: (
      <FormattedMessage id='sharedListings.availablePkgs' defaultMessage='Available PKGs'>
        {text => text}
      </FormattedMessage>
    ),
    width: 130,
    sortPath: 'ProductOffer.quantity'
  },
  {
    name: 'quantity',
    title: (
      <FormattedMessage id='sharedListings.quantity' defaultMessage='Quantity'>
        {text => text}
      </FormattedMessage>
    ),
    width: 130,
    align: 'right',
    sortPath: 'ProductOffer.quantity'
  },
  {
    name: 'location',
    title: (
      <FormattedMessage id='sharedListings.location' defaultMessage='Location'>
        {text => text}
      </FormattedMessage>
    ),
    width: 130,
    sortPath: 'ProductOffer.warehouse.warehouse'
  },
  {
    name: 'cost',
    title: (
      <FormattedMessage id='sharedListings.cost' defaultMessage='Cost'>
        {text => text}
      </FormattedMessage>
    ),
    width: 100,
    align: 'right'
  },
  {
    name: 'price',
    title: (
      <FormattedMessage id='sharedListings.price' defaultMessage='Price'>
        {text => text}
      </FormattedMessage>
    ),
    width: 200,
    align: 'right'
  },
  {
    name: 'network',
    title: ' ',
    width: 81,
    allowReordering: false
  }
]
