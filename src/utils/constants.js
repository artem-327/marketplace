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
  { name: 'Guest Company Manager', id: 36, propertyName: 'isClientCompanyManager' }
]
