import { TRowProductOffer } from './MyListings.types'
import { TModalProps } from './MyListings.types'

/**
 * Open ModalDetail on Price Book tab for custom price rules on specific product offer.
 * @category Inventory - My Listings
 * @method
 * @param {TRowProductOffer} row Object from one row.
 * @param {TModalProps} modalProps Object with variables and functions for open ModalDetail on Price Book tab.
 * @param {boolean} [bool=true] Default = true.
 * @param {number} [indexTab=3] Default = 3. Index of tab in ModalDetail.
 * @example
 * import { tableRowClickedProductOffer } from './MyListings.services'
 * tableRowClickedProductOffer(
 *        {id: 1, name: Chemical, ...},
 *        {modalDetailTrigger: ()=>{}, ...},
 *        BOOLEAN_TRUE = true,
 *        INDEX_TAB_PRICE_BOOK = 3,
 * )
 * @returns {void} Nothing
 *
 */
export const tableRowClickedProductOffer = (row, modalProps, bool = true, indexTab = 3) => {
  const {
    isProductInfoOpen,
    closePopup,
    isExportInventoryOpen,
    setExportModalOpenState,
    modalDetailTrigger
  } = modalProps

  if (isProductInfoOpen) closePopup()
  if (isExportInventoryOpen) setExportModalOpenState(false)
  modalDetailTrigger(row, bool, indexTab)
}

/**
 * Bradcast is change or show modal for set up own custom price rules.
 * @category Inventory - My Listings
 * @method
 * @param {TRowProductOffer} row Object from one row.
 * @param {"CUSTOM_RULES" | "GLOBAL_RULES" | "CLIENT_COMPANIES" | "GLOBAL_RULES" | "NO_BROADCAST" | "BROADCAST_TEMPLATE|{template.id}"} value Enum
 * @param {function} broadcastChange Action of redux from /modules/broadcast/actions
 * @param {Object.<string, any>} datagrid Datagrid object.
 * @param {{ id: number, name: string } | null} [template=null] Object or null. If parameter 'value' contains '|' then template is mandatory.
 * @param {{ isProductInfoOpen: boolean, closePopup: function, isExportInventoryOpen: boolean, setExportModalOpenState: function, modalDetailTrigger: function}} [modalProps=null] Object with variables and functions for open ModalDetail on Price Book tab.
 * @param {boolean} updateWarehouse Update warehouse in datagrid
 * @example
 * import { onClickBroadcast } from './MyListings.services'
 * onClickBroadcast(
 *        {id: 1, name: Chemical, ...},
 *        "CUSTOM_RULES",
 *        () => {},
 *        {updateRow: ()=>, rows: [], ...},
 *        { id: 2, name: My Price Rules For Europe},
 *        {modalDetailTrigger: ()=>{}, ...}
 * )
 * @returns {void} Nothing
 */
export const onClickBroadcast = (
  row,
  value,
  broadcastChange,
  datagrid,
  template = null,
  modalProps = null,
  updateWarehouse = false
) => {
  switch (value) {
    case 'CUSTOM_RULES':
      modalProps && tableRowClickedProductOffer(row, modalProps)
      break
    default:
      if (value.indexOf('|') >= 0) {
        broadcastChange(row, value.substr(0, value.indexOf('|')), template, datagrid, false)
      } else {
        broadcastChange(row, value, template, datagrid, updateWarehouse)
      }
      break
  }
}
