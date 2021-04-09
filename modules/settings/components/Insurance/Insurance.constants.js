import { FormattedMessage } from 'react-intl'

//!!REMOVE after BE return rows
export const MOCK_ROWS = [
  {
    id: 1,
    type: 'General Liability',
    carrier: 'Lorem Ipsum',
    coverage: 'United States',
    expiration: '2011-10-05T14:48:00.000Z'
  },
  {
    id: 2,
    type: 'General Liability2',
    carrier: 'Lorem Ipsum',
    coverage: 'United States',
    expiration: '2011-10-05T14:48:00.000Z'
  },
  {
    id: 3,
    type: 'General Liability3',
    carrier: 'Lorem Ipsum',
    coverage: 'United States',
    expiration: '2011-10-05T14:48:00.000Z'
  },
  {
    id: 4,
    type: 'General Liability4',
    carrier: 'Lorem Ipsum',
    coverage: 'United States',
    expiration: '2011-10-05T14:48:00.000Z'
  },
  {
    id: 5,
    type: 'General Liability5',
    carrier: 'Lorem Ipsum',
    coverage: 'United States',
    expiration: '2011-10-05T14:48:00.000Z'
  },
  {
    id: 6,
    type: 'General Liability6',
    carrier: 'Lorem Ipsum',
    coverage: 'United States',
    expiration: '2011-10-05T14:48:00.000Z'
  }
]

/**
 * Columns for Insurance.
 * @category My TradePass - Insurance
 * @constant
 */
export const COLUMNS = [
  {
    name: 'type',
    title: (
      <FormattedMessage id='insurance.type' defaultMessage='TYPE'>
        {text => text}
      </FormattedMessage>
    ),
    width: 400,
    sortDirection: 'desc'
  },
  {
    name: 'carrier',
    title: (
      <FormattedMessage id='insurance.carrier' defaultMessage='CARRIER'>
        {text => text}
      </FormattedMessage>
    ),
    width: 220
  },
  {
    name: 'coverage',
    title: (
      <FormattedMessage id='insurance.coverage' defaultMessage='COVERAGE'>
        {text => text}
      </FormattedMessage>
    ),
    width: 220
  },
  {
    name: 'expiration',
    title: (
      <FormattedMessage id='insurance.expiration' defaultMessage='EXPIRATION'>
        {text => text}
      </FormattedMessage>
    ),
    width: 220
  },
  {
    name: 'update',
    title: ' ',
    width: 220
  }
]
