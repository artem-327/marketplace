/**
 * defaultTabs constant is used in components / NavigationMenu.js
 * @category Operations
 * @constant
 */
export const defaultTabs = [
  { name: 'Shipping Quotes', id: 0, type: 'shipping-quotes' },
  { name: 'Shipping Quote Requests', id: 6, type: 'shipping-quote-requests' },
  { name: 'Tags', id: 1, type: 'tags' },
  { name: 'Company Product Catalog', id: 2, type: 'company-product-catalog' },
  { name: 'Company Inventory', id: 3, type: 'company-inventory' },
  { name: 'Orders', id: 4, type: 'orders' },
  { name: 'Company Generic Products', id: 5, type: 'company-generic-products' }
]

/**
 * orderOperatorTabs constant is used in components / NavigationMenu.js
 * @category Operations
 * @constant
 */
export const orderOperatorTabs = [
  { name: 'Orders', id: 4, type: 'orders' }
]

/**
 * OrdersFilters constant is used in modules / operations / components / TableHandlers
 * @category Operations
 * @constant
 */
export const OrdersFilters = {
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

/**
 * textsTable constant is used in modules / operations / components / TableHandlers
 * @category Operations
 * @constant
 */
export const textsTable = {
  'shipping-quotes': {
    BtnAddText: 'operations.tables.shippingQuotes.buttonAdd',
    SearchText: 'operations.tables.shippingQuotes.search'
  },
  'shipping-quote-requests': {
    SearchText: 'operations.tables.shippingQuoteRequests.search'
  },
  tags: {
    BtnAddText: 'operations.tables.tags.buttonAdd',
    SearchText: 'operations.tables.tags.search'
  },
  'company-product-catalog': {
    SearchText: 'operations.tables.companyProductCatalog.search',
    SearchCompanyText: 'operations.tables.companyProductCatalog.SearchCompanyText',
    MappedText: 'operations.tables.companyProductCatalog.MappedText'
  },
  'company-inventory': {
    SearchText: 'operations.tables.companyInventory.search'
  },
  orders: {
    SearchText: 'operations.tables.orders.search'
  },
  'company-generic-products': {
    SearchText: 'operations.tables.companyGenericProduct.search'
  }
}

/**
 * below constants are used in modules / operations / components / orders / ModalResolveDispute
 * @category Operations
 * @constant
 */
export const ACCEPT_ORDER = 'acceptOrder'
export const CREDIT_ORDER = 'creditOrder' 
export const REJECT_ORDER = 'rejectOrder'
 