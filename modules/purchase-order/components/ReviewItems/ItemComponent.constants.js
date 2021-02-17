/**
 * @constant {{key: number, text: string, value: string | number}[]} Options for quantity dropdown.
 */
export const OPTIONS_QUANTITY = [
  { key: 1, text: '1', value: '1' },
  { key: 2, text: '2', value: '2' },
  { key: 3, text: '3', value: '3' },
  { key: 4, text: '4', value: '4' },
  { key: 5, text: '5', value: '5' },
  { key: 6, text: '6', value: '6' },
  { key: 7, text: '7', value: '7' },
  { key: 8, text: '8', value: '8' },
  { key: 9, text: '9', value: '9' },
  { key: 10, text: '10+', value: '' }
]

/**
 * @constant {key: enum type, value: string} Cart item types.
 */
export const CART_ITEM_TYPES = {
  INVENTORY_HOLD: 'INVENTORY_HOLD',
  PURCHASE_REQUEST_OFFER: 'PURCHASE_REQUEST_OFFER',
  MARKETPLACE_OFFER: 'MARKETPLACE_OFFER',
  PRODUCT_OFFER_BID: 'PRODUCT_OFFER_BID'
}
