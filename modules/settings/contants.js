export const defaultTabs = [
  { name: 'Settings', id: 14, type: 'system-settings', hideHandler: true },
  { name: 'Users', id: 1, type: 'users' },
  { name: 'Trade Criteria', id: 16, type: 'trade-criteria' },
  { name: 'Locations', id: 2, type: 'locations' },
  //{ name: 'Credit Cards', id: 7, type: 'credit-cards' },
  { name: 'Bank Accounts', id: 8, type: 'bank-accounts' },
  { name: 'Logistics', id: 13, type: 'logistics' },
  { name: 'Documents', id: 15, type: 'documents' },
  { name: 'My TradePass', id: 17, type: 'my-tradepass' }
]

// TODO FORMATTED MESSAGE

export const companyDetailsTab = { name: 'Company Details', id: 0, type: 'company-details', hideHandler: true }

export const palletDimensions = {
  weight: 'APP_SHIPPING_PALLET_WEIGHT_LB',
  length: 'APP_SHIPPING_PALLET_LENGTH_IN',
  width: 'APP_SHIPPING_PALLET_WIDTH_IN',
  height: 'APP_SHIPPING_PALLET_HEIGHT_IN'
}
/**
 * @constant
 */
export const VELLOCI_ACCOUNT_STATUSES = {
  INACTIVE: 'inactive',
  ACTIVE: 'active',
  PENDING_KYB: 'pending_kyb',
  MEMBER_PENDING: 'member_pending',
  MEMBER_UNVERIFIED: 'member_unverified',
  MEMBER_REVIEW: 'member_review',
  MEMBER_FAILED: 'member_failed',
  REMOVED: 'removed'
}
