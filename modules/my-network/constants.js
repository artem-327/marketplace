import { FormattedMessage } from 'react-intl'

//REMOVE
export const mockRows = [
  {
    connectionId: 1,
    connectedCompany: {
      id: 255,
      name: 'AAAAAA',
      tin: '12345',
      phone: 123456,
      inBusinessSince: 1987,
      numberOfEmployees: 245,
      website: 'www.aaa.cz',
      socialFacebook: 'www.facebook.com',
      socialInstagram: 'www.socialInstagram.com',
      socialLinkedin: 'www.socialLinkedin.com',
      socialTwitter: 'www.socialTwitter.com',
      connectionsCount: 'www.connectionsCount.com',
      articlesIncorporation: true,
      certificateInsurance: true,
      paymentProcessor: true,
      dunsNumber: true
    },
    status: 'REQUESTED',
    criteria: {
      aggregateInsurance: {
        match: 'green',
        actualValue: '1,000,000 - 2,500,000'
      },
      daysBeyond: {
        match: 'green',
        actualValue: '60'
      },
      creditRisk: {
        match: 'red',
        actualValue: '40-60'
      },
      violations: {
        match: 'green',
        actualValue: '4'
      },
      socialPresence: {
        match: 'yellow',
        actualValue: 'Website + 1 Social'
      }
    },
    updatedAt: '2021-02-24T06:43:28-08:00'
  },
  {
    connectionId: 2,
    connectedCompany: {
      id: 255,
      name: 'BBBBB',
      tin: '12345',
      phone: 123456,
      inBusinessSince: 1987,
      numberOfEmployees: 245,
      website: 'www.aaa.cz',
      socialFacebook: 'www.facebook.com',
      socialInstagram: 'www.socialInstagram.com',
      socialLinkedin: 'www.socialLinkedin.com',
      socialTwitter: 'www.socialTwitter.com',
      connectionsCount: 'www.connectionsCount.com',
      articlesIncorporation: true,
      certificateInsurance: true,
      paymentProcessor: true,
      dunsNumber: true
    },
    status: 'PENDING',
    criteria: {
      aggregateInsurance: {
        match: 'red',
        actualValue: '1,000,000 - 2,500,000'
      },
      daysBeyond: {
        match: 'green',
        actualValue: '60'
      },
      creditRisk: {
        match: 'green',
        actualValue: '40-60'
      },
      violations: {
        match: 'green',
        actualValue: '4'
      },
      socialPresence: {
        match: 'green',
        actualValue: 'Website + 1 Social'
      }
    },
    updatedAt: '2021-01-24T06:43:28-08:00'
  },
  {
    connectionId: 3,
    connectedCompany: {
      id: 255,
      name: 'CCCCCCCCC',
      tin: '12345',
      phone: 123456,
      inBusinessSince: 1987,
      numberOfEmployees: 245,
      website: 'www.aaa.cz',
      socialFacebook: 'www.facebook.com',
      socialInstagram: 'www.socialInstagram.com',
      socialLinkedin: 'www.socialLinkedin.com',
      socialTwitter: 'www.socialTwitter.com',
      connectionsCount: 'www.connectionsCount.com',
      articlesIncorporation: true,
      certificateInsurance: true,
      paymentProcessor: true,
      dunsNumber: true
    },
    status: 'CONNECTED',
    criteria: {
      aggregateInsurance: {
        match: 'red',
        actualValue: '1,000,000 - 2,500,000'
      },
      daysBeyond: {
        match: 'green',
        actualValue: '60'
      },
      creditRisk: {
        match: 'green',
        actualValue: '40-60'
      },
      violations: {
        match: 'green',
        actualValue: '4'
      },
      socialPresence: {
        match: 'green',
        actualValue: 'Website + 1 Social'
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
  ],
  INVITE: [
    {
      textId: 'global.cancel',
      color: '#20273a !important',
      background: '#ffffff !important',
      action: 'cancel'
    },
    {
      textId: 'global.invite',
      color: '#ffffff !important',
      background: '#00c7f9 !important',
      action: 'invite'
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
  DISCONNECTED: 'DISCONNECTED',
  INVITE: 'INVITE'
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
