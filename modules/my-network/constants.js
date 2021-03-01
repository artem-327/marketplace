import { FormattedMessage } from 'react-intl'

//REMOVE
export const mockRows = [
  {
    id: 1,
    connectedCompany: { cfDisplayName: 'AAAAAA' },
    status: 'REQUESTED',
    criteria: {
      AGGREGATE_INSURANCE: {
        criteria_match: 'green',
        criteria_expected: '1,000,000 - 2,500,000'
      },
      DAYS_BEYOND: {
        criteria_match: 'green',
        criteria_expected: '60'
      },
      CREDIT_RISK: {
        criteria_match: 'red',
        criteria_expected: '40-60'
      },
      VIOLATIONS: {
        criteria_match: 'green',
        criteria_expected: '4'
      },
      SOCIAL_PRESENCE: {
        criteria_match: 'yellow',
        criteria_expected: 'Website + 1 Social'
      }
    },
    updatedAt: '2021-02-24T06:43:28-08:00'
  },
  {
    id: 2,
    connectedCompany: { cfDisplayName: 'BBBBBB' },
    status: 'PENDING',
    criteria: {
      AGGREGATE_INSURANCE: {
        criteria_match: 'red',
        criteria_expected: '1,000,000 - 2,500,000'
      },
      DAYS_BEYOND: {
        criteria_match: 'green',
        criteria_expected: '60'
      },
      CREDIT_RISK: {
        criteria_match: 'green',
        criteria_expected: '40-60'
      },
      VIOLATIONS: {
        criteria_match: 'green',
        criteria_expected: '4'
      },
      SOCIAL_PRESENCE: {
        criteria_match: 'green',
        criteria_expected: 'Website + 1 Social'
      }
    },
    updatedAt: '2021-01-24T06:43:28-08:00'
  },
  {
    id: 3,
    connectedCompany: { cfDisplayName: 'CCCCCCC' },
    status: 'CONNECTED',
    criteria: {
      AGGREGATE_INSURANCE: {
        criteria_match: 'red',
        criteria_expected: '1,000,000 - 2,500,000'
      },
      DAYS_BEYOND: {
        criteria_match: 'green',
        criteria_expected: '60'
      },
      CREDIT_RISK: {
        criteria_match: 'green',
        criteria_expected: '40-60'
      },
      VIOLATIONS: {
        criteria_match: 'green',
        criteria_expected: '4'
      },
      SOCIAL_PRESENCE: {
        criteria_match: 'green',
        criteria_expected: 'Website + 1 Social'
      }
    },
    updatedAt: '2021-01-23T06:43:28-08:00'
  }
]

/**
 * @constant {{
 *    red: '#f16844',
 *    yellow: '#ffb85d',
 *    green: '#84c225'
 *}}
 */
export const COLORS = {
  red: '#f16844',
  yellow: '#ffb85d',
  green: '#84c225'
}

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
 * @constant {{
 *    PENDING: 'PENDING',
 *    REQUESTED: 'REQUESTED',
 *    CONNECTED: 'CONNECTED',
 *    DECLINED: 'DECLINED',
 *    DISCONNECTED: 'DISCONNECTED'
 *}}
 */
export const STATUSES = {
  PENDING: 'PENDING',
  REQUESTED: 'REQUESTED',
  CONNECTED: 'CONNECTED',
  DECLINED: 'DECLINED',
  DISCONNECTED: 'DISCONNECTED'
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
    value: ''
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
  },
  {
    key: 'DECLINED',
    text: 'Declined',
    value: 'DECLINED'
  },
  {
    key: 'DISCONNECTED',
    text: 'Disconnected',
    value: 'DISCONNECTED'
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
    width: 400,
    sortDirection: 'desc'
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
    width: 220
  },
  {
    name: 'date',
    title: (
      <FormattedMessage id='myNetwork.inviteConectionDate' defaultMessage='INVITE/CONNECTION DATE'>
        {text => text}
      </FormattedMessage>
    ),
    width: 220
  }
]
