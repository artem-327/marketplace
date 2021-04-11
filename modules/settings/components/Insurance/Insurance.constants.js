import { FormattedMessage } from 'react-intl'

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
    align: 'right',
    width: 220
  }
]
