import { FormattedMessage } from 'react-intl'
import { Image } from 'semantic-ui-react'
// Styles
import { DivIconOptions } from '../../../styles'
// Image
import BluePalletLogoMini from '../../../../../assets/images/blue-pallet/guest-copy-9@3x.png'

/**
 * @category Inventory - My Listings
 * @constant {{key: number, text: JSX.Element, value: boolean}[]} OPTIONS_YES_NO Options for dropdown.
 */
export const OPTIONS_YES_NO = [
  {
    key: 1,
    text: <FormattedMessage id='global.yes' defaultMessage='Yes' />,
    value: true
  },
  {
    key: 0,
    text: <FormattedMessage id='global.no' defaultMessage='No' />,
    value: false
  }
]
/**
 * @category Inventory - My Listings
 * @constant {{key: number, text: JSX.Element, value: boolean}[]} LIST_CONFORMING Options for dropdown.
 */
export const LIST_CONFORMING = [
  {
    key: 1,
    text: <FormattedMessage id='global.conforming' defaultMessage='Conforming' />,
    value: true
  },
  {
    key: 0,
    text: <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />,
    value: false
  }
]

/**
 * @category Inventory - My Listings
 * @type {'GLOBAL_RULES'}
 */
export const GLOBAL_RULES = 'GLOBAL_RULES'
/**
 * @category Inventory - My Listings
 * @type {'NO_BROADCAST'}
 */
const NO_BROADCAST = 'NO_BROADCAST'
/**
 * @category Inventory - My Listings
 * @type {'CLIENT_COMPANIES'}
 */
const CLIENT_COMPANIES = 'CLIENT_COMPANIES'

/**
 * @category Inventory - My Listings
 * @constant {{icon: JSX.Element, title: JSX.Element, subtitleId: string, subtitleText: string, value: CLIENT_COMPANIES | NO_BROADCAST | GLOBAL_RULES}[] } OPTIONS_BROADCAST  Options for dropdown "Who should see this offer?"
 */
export const OPTIONS_BROADCAST = [
  {
    icon: (
      <DivIconOptions>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <g fill='none' fill-rule='evenodd'>
            <path
              d='M0 0L24 0 24 24 0 24z'
              transform='translate(-1125 -387) translate(1105 295) translate(0 29) translate(20 63)'
            />
            <path
              fill='#20273A'
              fill-rule='nonzero'
              d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z'
              transform='translate(-1125 -387) translate(1105 295) translate(0 29) translate(20 63)'
            />
          </g>
        </svg>
      </DivIconOptions>
    ),
    title: <FormattedMessage id='global.all' defaultMessage='All' />,
    subtitleId: 'myInventory.allSubtitle',
    subtitleText: 'My Network + BlueTrade',
    value: GLOBAL_RULES,
    id: null,
    tmp: null
  },
  {
    icon: (
      <DivIconOptions>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
          <g fill='none' fill-rule='evenodd'>
            <path
              d='M0 0L24 0 24 24 0 24z'
              transform='translate(-335 -691) translate(0 80) translate(315 525) translate(20 86)'
            />
            <path
              fill='#848893'
              fill-rule='nonzero'
              d='M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V18c0 .55.45 1 1 1h9c.55 0 1-.45 1-1v-1.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h6v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z'
              transform='translate(-335 -691) translate(0 80) translate(315 525) translate(20 86)'
            />
          </g>
        </svg>
      </DivIconOptions>
    ),
    title: <FormattedMessage id='myInventory.myNetworkOnly' defaultMessage='My Network Only' />,
    subtitleId: 'myInventory.myNetworkOnlySubtitle',
    subtitleText: "Members I'm Connected To",
    value: 'GLOBAL_RULES_NO_BROKERS'
  },
  {
    icon: (
      <DivIconOptions>
        <Image size='mini' src={BluePalletLogoMini} />
      </DivIconOptions>
    ),
    titleId: 'myInventory.bluePalletDirect',
    titleText: 'BlueTrade',
    subtitleId: 'myInventory.bluePalletDirectSubtitle',
    subtitleText: 'Open Marketplace',
    value: 'GLOBAL_RULES_ONLY_BROKERS'
  },
  /*{
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <g fill="none" fill-rule="evenodd">
          <path d="M0 0L24 0 24 24 0 24z" transform="translate(-1125 -447) translate(1105 295) translate(0 29) translate(20 123)"/>
          <path fill="#848893" fill-rule="nonzero" d="M16.5 12c1.38 0 2.49-1.12 2.49-2.5S17.88 7 16.5 7C15.12 7 14 8.12 14 9.5s1.12 2.5 2.5 2.5zM9 11c1.66 0 2.99-1.34 2.99-3S10.66 5 9 5C7.34 5 6 6.34 6 8s1.34 3 3 3zm7.5 3c-1.83 0-5.5.92-5.5 2.75V18c0 .55.45 1 1 1h9c.55 0 1-.45 1-1v-1.25c0-1.83-3.67-2.75-5.5-2.75zM9 13c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h6v-2.25c0-.85.33-2.34 2.37-3.47C10.5 13.1 9.66 13 9 13z" transform="translate(-1125 -447) translate(1105 295) translate(0 29) translate(20 123)"/>
        </g>
      </svg>

    ),
    title: <FormattedMessage id='myInventory.partners', defaultMessage: 'Partners' />,
    subtitle: <FormattedMessage id='myInventory.partnersSubtitle', defaultMessage: 'Your accepted Partners' />,
    value: ''
  },*/
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

/**
 * @category Inventory - My Listings
 * @constant {{
 *   edit: {
 *     broadcasted: true,
 *     condition: null,
 *     conditionNotes: '',
 *     conforming: true,
 *     costPerUOM: null,
 *     externalNotes: '',
 *     pkgAvailable: 1,
 *     product: null,
 *     warehouse: null,
 *     fobPrice: '',
 *     inStock: false,
 *     internalNotes: '',
 *     leadTime: 1,
 *     lotNumber: '',
 *     lotExpirationDate: '',
 *     lotManufacturedDate: '',
 *     minimum: 1,
 *     origin: null,
 *     productCondition: null,
 *     productForm: null,
 *     productGrades: [],
 *     splits: 1,
 *     doesExpire: false,
 *     expirationDate: '',
 *     documentType: '',
 *     broadcastOption: 'GLOBAL_RULES',
 *     acceptBids: true
 *   },
 *   priceTiers: {
 *     priceTiers: 1,
 *     pricingTiers: []
 *   },
 *   documents: {
 *     documentType: null,
 *     attachments: []
 *   },
 * shared: false
 * }} INIT_VALUES Initial values for form.
 */
export const INIT_VALUES = {
  edit: {
    broadcasted: true,
    condition: null,
    conditionNotes: '',
    conforming: true,
    costPerUOM: null,
    externalNotes: '',
    pkgAvailable: 1,
    product: null,
    warehouse: null,
    fobPrice: '',
    inStock: false,
    internalNotes: '',
    leadTime: 1,
    lotNumber: '',
    lotExpirationDate: '',
    lotManufacturedDate: '',
    minimum: 1, // minPkg
    origin: null,
    productCondition: null,
    productForm: null,
    productGrades: [],
    splits: 1, // splitPkg
    doesExpire: false,
    expirationDate: '',
    documentType: '',
    broadcastOption: 'GLOBAL_RULES',
    acceptBids: false
  },
  priceTiers: {
    priceTiers: 1,
    pricingTiers: []
  },
  documents: {
    documentType: null,
    attachments: []
  },
  shared: false
}
