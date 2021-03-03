import { FormattedMessage } from 'react-intl'

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
 * @constant {Array<string>}
 */
export const ATTRIBUTES_TRADE_CRITERIA = [
  'aggregateInsurance',
  'daysBeyond',
  'creditRisk',
  'violations',
  'socialPresence'
]

/**
 * @constant {Object<string, array>}
 */
export const BUTTON_PROPS = {
  PENDING: [
    {
      textId: 'myNetworks.detailRow.reject',
      color: '#ffffff !important',
      background: '#f16844 !important',
      action: 'reject'
    },
    {
      textId: 'myNetworks.detailRow.accept',
      color: '#ffffff !important',
      background: '#84c225 !important',
      action: 'accept'
    }
  ],
  REQUESTED: [
    {
      textId: 'myNetworks.detailRow.disconnect',
      color: '#ffffff !important',
      background: '#5e5e5e !important',
      action: 'disconnect'
    }
  ],
  CONNECTED: [
    {
      textId: 'myNetworks.detailRow.disconect',
      color: '#ffffff !important',
      background: '#5e5e5e !important',
      action: 'disconect'
    }
  ],
  DECLINED: [
    {
      textId: 'global.remove',
      color: '#ffffff !important',
      background: '#f16844 !important',
      action: 'remove'
    }
  ],
  DISCONNECTED: [
    {
      textId: 'global.remove',
      color: '#ffffff !important',
      background: '#f16844 !important',
      action: 'remove'
    }
  ]
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
 * @constant {{
 *    PENDING: 'pending',
 *    REQUESTED: 'requested',
 *    CONNECTED: 'active'
 *}}
 */
export const CONNECTIONS_STATUSES = {
  PENDING: 'pending',
  REQUESTED: 'requested',
  CONNECTED: 'active'
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
