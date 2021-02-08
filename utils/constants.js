export const ROLE_GUEST = 'ROLE_GUEST' //USER - ROLE
export const DATE_FORMAT = 'MM/DD/YYYY'
export const PRICE_PRECISION = 2
export const DEBOUNCE_TIME = 50 //ms
export const PHONE_REGEXP = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

export const ROLES_ENUM = [
  { name: 'Super Admin', id: 1, propertyName: 'isAdmin' },
  { name: 'Company Admin', id: 2, propertyName: 'isCompanyAdmin' },
  { name: 'Merchant', id: 3, propertyName: 'isMerchant' },
  { name: 'User Admin', id: 4, propertyName: 'isUserAdmin' },
  { name: 'Order View', id: 5, propertyName: 'isOrderView' },
  { name: 'Product Catalog Admin', id: 6, propertyName: 'isProductCatalogAdmin' },
  { name: 'Order Processing', id: 7, propertyName: 'isOrderProcessing' },
  { name: 'Product Offer Manager', id: 8, propertyName: 'isProductOfferManager' },
  { name: 'Guest Company Admin', id: 67, propertyName: 'isClientCompanyAdmin' },
  { name: 'Guest Company Manager', id: 36, propertyName: 'isClientCompanyManager' },
  { name: 'Order Operator', id: 37, propertyName: 'isOrderOperator' }
]

/**
 * Links translation table.
 * key (left side) is requested page address
 * value (right side) is translated page address (existing in the current FE version)
 * - parameters used in required page url are included automatically
 * - please, do not change existing key values in a list, add another line instead
 */
export const LINK_TRANSLATE_TABLE = {
  /* The following paths will be deleted after some time, new emails will NOT use this */
  '/marketplace/listings': '/marketplace/listings',
  '/inventory/my-listings': '/inventory/my-listings',
  '/wanted-board/listings': '/wanted-board/listings',
  '/my-purchase-request': '/wanted-board/listings',
  '/wanted-board/bids-sent': '/wanted-board/bids-sent',
  '/wanted-board/bids-received': '/wanted-board/bids-received',
  '/orders/detail': '/orders/detail',
  '/velloci/beneficial-owners': '/velloci/beneficial-owners',
  '/velloci/bank-accounts': '/velloci/bank-accounts',
  '/marketplace/bids-sent': '/marketplace/bids-sent',
  '/marketplace/bids-received': '/marketplace/bids-received',

  /* These paths will be used in all new emails, keep the names as in backend endpoints */
  '/broadcasted-product-offers': '/marketplace/listings',
  '/own-product-offers': '/inventory/my-listings',
  '/other-purchase-requests': '/wanted-board/listings',
  '/own-purchase-request-offers': '/wanted-board/bids-sent',
  '/own-purchase-requests': '/wanted-board/bids-received',
  '/order-detail': '/orders/detail',
  '/beneficial-owners': '/velloci/beneficial-owners',
  '/bank-accounts': '/velloci/bank-accounts',
  '/own-product-offer-bids': '/marketplace/bids-sent',
  '/other-product-offer-bids': '/marketplace/bids-received'
}