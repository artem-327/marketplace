export const ROLE_GUEST = 'ROLE_GUEST' //USER - ROLE
export const DATE_FORMAT = 'MM/DD/YYYY'
export const PRICE_PRECISION = 2
export const DEBOUNCE_TIME = 50 //ms
export const PHONE_REGEXP = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

export const ROLES_ENUM = [
  { role: 'SUPER_ADMIN', name: 'Super Admin', id: 1, propertyName: 'isAdmin' },
  { role: 'COMPANY_ADMIN', name: 'Company Admin', id: 2, propertyName: 'isCompanyAdmin' },
  { role: 'MERCHANT', name: 'Merchant', id: 3, propertyName: 'isMerchant' },
  { role: 'USER_ADMIN', name: 'User Admin', id: 4, propertyName: 'isUserAdmin' },
  { role: 'ORDER_VIEW', name: 'Order View', id: 5, propertyName: 'isOrderView' },
  { role: 'PRODUCT_CATALOG_ADMIN', name: 'Product Catalog Admin', id: 6, propertyName: 'isProductCatalogAdmin' },
  { role: 'ORDER_PROCESSING', name: 'Order Processing', id: 7, propertyName: 'isOrderProcessing' },
  { role: 'PRODUCT_OFFER_MANAGER', name: 'Product Offer Manager', id: 8, propertyName: 'isProductOfferManager' },
  { role: 'GUEST_COMPANY_ADMIN', name: 'Guest Company Admin', id: 67, propertyName: 'isClientCompanyAdmin' },
  { role: 'GUEST_COMPANY_MANAGER', name: 'Guest Company Manager', id: 36, propertyName: 'isClientCompanyManager' },
  { role: 'ORDER_OPERATOR', name: 'Order Operator', id: 37, propertyName: 'isOrderOperator' },
  { role: 'OPERATOR', name: 'Operator', id: 34, propertyName: 'isOperator' }
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
  '/velloci/beneficial-owners': '/onboarding/beneficial-owners',
  '/velloci/bank-accounts': '/onboarding/bank-accounts',
  '/marketplace/bids-sent': '/marketplace/bids-sent',
  '/marketplace/bids-received': '/marketplace/bids-received',

  /* These paths will be used in all new emails, keep the names as in backend endpoints */
  '/broadcasted-product-offers': '/marketplace/listings',
  '/own-product-offers': '/inventory/my-listings',
  '/other-purchase-requests': '/wanted-board/listings',
  '/own-purchase-request-offers': '/wanted-board/bids-sent',
  '/own-purchase-requests': '/wanted-board/bids-received',
  '/order-detail': '/orders/detail',
  '/beneficial-owners': '/onboarding/beneficial-owners',
  '/bank-accounts': '/onboarding/bank-accounts',
  '/own-product-offer-bids': '/marketplace/bids-sent',
  '/other-product-offer-bids': '/marketplace/bids-received',
  '/pending-branch-certificates': '/warehouse-credentials/pending',
  '/credentials-branch-certificates': '/warehouse-credentials/certified',
  '/own-wanted-board-requests': '/wanted-board/my-posts',
  '/public-wanted-board-requests': '/wanted-board/all-posts'
}
