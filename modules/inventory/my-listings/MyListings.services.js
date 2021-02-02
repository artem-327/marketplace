import { BOOLEAN_TRUE, INDEX_TAB_PRICE_BOOK } from './MyListings.constants'

/**
 * @typedef {import('./MyListings.types').TRowProductOffer} TRowProductOffer
 */

/**
 * @typedef {import('./MyListings.types').TModalProps} TModalProps
 */

/**
 * Open ModalDetail on Price Book tab for custom price rules on specific product offer.
 *
 * @param {TRowProductOffer} row Object from one row.
 * @param {TModalProps} modalProps Object with variables and functions for open ModalDetail on Price Book tab.
 * @param {boolean} [bool=true] Default = true.
 * @param {number} [indexTab=3] Default = 3. Index of tab in ModalDetail.
 * @return {void} Nothing
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
 *
 * @param {TRowProductOffer} row Object from one row.
 * @param {"CUSTOM_RULES" | "GLOBAL_RULES" | "CLIENT_COMPANIES" | "FREE_FOR_ALL" | "NO_BROADCAST" | "BROADCAST_TEMPLATE|{template.id}"} value Enum
 * @param {function} broadcastChange Action of redux from /modules/broadcast/actions
 * @param {Object.<string, any>} datagrid Datagrid object.
 * @param {{ id: number, name: string } | null} template Object or null. If parameter 'value' contains '|' then template is mandatory.
 * @param {{ isProductInfoOpen: boolean, closePopup: function, isExportInventoryOpen: boolean, setExportModalOpenState: function, modalDetailTrigger: function}} [modalProps] Object with variables and functions for open ModalDetail on Price Book tab.
 */
export const onClickBroadcast = (row, value, broadcastChange, datagrid, template = null, modalProps = null) => {
  switch (value) {
    case 'CUSTOM_RULES':
      modalProps && tableRowClickedProductOffer(row, modalProps)
      break
    default:
      if (value.indexOf('|') >= 0) {
        broadcastChange(row, value.substr(0, value.indexOf('|')), template, datagrid)
      } else {
        broadcastChange(row, value, template, datagrid)
      }
      break
  }
}
