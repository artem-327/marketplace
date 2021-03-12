/**
 * Default initial form values
 * @category Admin Settings - Add/Edit Carrier
 * @constant
 */
export const INITIAL_VALUES = {
  code: '',
  blindShipmentSupport: false,
  priceMarkup: ''
}

/**
 * Options for Dropdown 'Blind Shipment Support'
 * @category Admin Settings - Add/Edit Carrier
 * @constant
 */
export const OPTIONS_YES_NO = [
  {
    id: 0,
    text: 'Yes',
    value: true
  },
  {
    id: 1,
    text: 'No',
    value: false
  }
]