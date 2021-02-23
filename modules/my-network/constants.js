import { FormattedMessage } from 'react-intl'

/**
 * @constant {{
 *    ALL: 'ALL',
 *    ACTIVE: 'ACTIVE',
 *    PENDING: 'PENDING',
 *    REQUESTED: 'REQUESTED'
 *}}
 */
export const NETWORK_STATUS = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  PENDING: 'PENDING',
  REQUESTED: 'REQUESTED'
}

/**
 * Options for dropdown.
 * @constant {{
 *    key: string,
 *    text: string,
 *    value: string
 *  }[]}
 */
export const NETWORK_TYPES = [
  {
    key: 'ALL',
    text: 'All',
    value: 'ALL'
  },
  {
    key: 'ACTIVE',
    text: 'Active',
    value: 'ACTIVE'
  },
  {
    key: 'PENDING',
    text: 'Pending',
    value: 'PENDING'
  }
]
/**
 * Columns for My Network table.
 * @constant {{
 *    name: string,
 *     title: Node,
 *     width: number
 *  }[]}
 */
export const COLUMNS = [
  {
    name: 'member',
    title: (
      <FormattedMessage id='myNetwork.member' defaultMessage='MEMBER'>
        {text => text}
      </FormattedMessage>
    ),
    width: 200
  },
  {
    name: 'connectionStatus',
    title: (
      <FormattedMessage id='myNetwork.connectionStatus' defaultMessage='CONNECTION STATUS'>
        {text => text}
      </FormattedMessage>
    ),
    width: 220
  },
  {
    name: 'eligibilityCriteria',
    title: (
      <FormattedMessage id='myNetwork.eligibilityCriteria' defaultMessage='ELIGIBILITY CRITERIA'>
        {text => text}
      </FormattedMessage>
    ),
    width: 150
  },
  {
    name: 'date',
    title: (
      <FormattedMessage id='myNetwork.inviteConectionDate' defaultMessage='INVITE/CONNECTION DATE'>
        {text => text}
      </FormattedMessage>
    ),
    width: 150
  }
]
