export const ROLE_GUEST = 'ROLE_GUEST'; //USER - ROLE
export const DATE_FORMAT = 'MM/DD/YYYY';
export const PRICE_PRECISION = 2;
export const DEBOUNCE_TIME = 50; //ms
export const PHONE_REGEXP = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/


export const ROLES_ENUM = [
  { name: 'SuperAdmin', id: 1, propertyName: 'isAdmin' },
  { name: 'CompanyAdmin', id: 2, propertyName: 'isCompanyAdmin' },
  { name: 'Merchant', id: 3, propertyName: 'isMerchant' }
]