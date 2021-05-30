import { FormattedMessage, injectIntl } from 'react-intl'
//Styles
import { DivIconOptions } from '../../constants/layout'
/**
 * @category Shared Listings
 * @constant {array}
 */
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
    width: 200
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
    width: 150,
    sortPath: 'ProductOffer.quantity'
  },
  {
    name: 'quantityShared',
    title: (
      <FormattedMessage id='sharedListings.quantity' defaultMessage='Quantity'>
        {text => text}
      </FormattedMessage>
    ),
    width: 150,
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
    width: 150,
    sortPath: 'ProductOffer.warehouse.warehouse'
  },
  {
    name: 'cost',
    title: (
      <FormattedMessage id='sharedListings.cost' defaultMessage='Cost'>
        {text => text}
      </FormattedMessage>
    ),
    width: 150,
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
    minWidth: 81,
    allowReordering: false
  }
]

/**
 * @category
 * @type {'NO_BROADCAST'}
 */
const NO_BROADCAST = 'NO_BROADCAST'

/**
 * @category Shared Listings
 * @type {array}
 */
export const BROADCAST_OPTIONS = [
  {
    icon: (
      <DivIconOptions>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <g fill='none' fill-rule='evenodd'>
            <g>
              <path
                d='M0 0L24 0 24 24 0 24z'
                transform='translate(-1125 -567) translate(1105 295) translate(0 29) translate(20 243)'
              />
              <path
                d='M0 0L24 0 24 24 0 24z'
                opacity='.87'
                transform='translate(-1125 -567) translate(1105 295) translate(0 29) translate(20 243)'
              />
            </g>
            <path
              fill='#848893'
              fill-rule='nonzero'
              d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z'
              transform='translate(-1125 -567) translate(1105 295) translate(0 29) translate(20 243)'
            />
          </g>
        </svg>
      </DivIconOptions>
    ),
    title: <FormattedMessage id='myInventory.justMe' defaultMessage='Just Me' />,
    subtitleId: 'myInventory.justMeSubtitle',
    subtitleText: 'Only my Company',
    value: NO_BROADCAST,
    id: null,
    tmp: null
  }
]
