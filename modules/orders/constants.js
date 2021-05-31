export const HEADER_ATTRIBUTES = [
  'orderStatus',
  'shippingStatus',
  'reviewStatus',
  'disputeResolutionStatus',
  'paymentStatus'
]

export const CONTENT_ATTRIBUTES = [
  { name: 'productName', width: '34%' },
  { name: 'packaging', width: '20%' },
  { name: 'fobPrice', width: '10%' },
  { name: 'bl', width: '7%' },
  { name: 'sds', width: '7%' },
  { name: 'cofA', width: '7%' },
  { name: 'orderTotal', width: '15%' }
]

export const filters = {
  all: {
    filters: []
  },
  draft: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Draft`]
      }
    ]
  },
  pending: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Pending`]
      }
    ]
  },
  inTransit: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`In Transit`]
      }
    ]
  },
  review: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Review`]
      }
    ]
  },
  credit: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Credit`]
      }
    ]
  },
  completed: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Completed`]
      }
    ]
  },
  toShip: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`To Ship`]
      }
    ]
  },
  returned: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Returned`]
      }
    ]
  },
  declined: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Declined`]
      }
    ]
  },
  cancelled: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Cancelled`]
      }
    ]
  },
  toReturn: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`To Return`]
      }
    ]
  },
  confirmed: {
    filters: [
      {
        operator: 'EQUALS',
        path: 'Order.cfGlobalStatus',
        values: [`Confirmed`]
      }
    ]
  }
}
