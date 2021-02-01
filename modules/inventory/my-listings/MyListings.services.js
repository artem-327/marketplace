import { BOOLEAN_TRUE, INDEX_TAB_PRICE_BOOK } from './MyListings.constants'

/**
 * @typedef {import('./MyListings.types').TRowProductOffer} TRowProductOffer
 */

/**
 * Open ModalDetail on Price Book tab for custom price rules on specific product offer.
 *
 * @param {TRowProductOffer} row Object from one row.
 * @param {{ isProductInfoOpen: boolean, closePopup: function, isExportInventoryOpen: boolean, setExportModalOpenState: function, modalDetailTrigger: function}} modalProps Object with variables and functions for open ModalDetail on Price Book tab.
 * @param {BOOLEAN_TRUE} [BOOLEAN_TRUE=true] Default = true. Constant stores boolean true
 * @param {INDEX_TAB_PRICE_BOOK} [INDEX_TAB_PRICE_BOOK=3] Default = 3. Constants stores index of Price Book tab in ModalDetail.
 */
export const tableRowClickedProductOffer = (row, modalProps, BOOLEAN_TRUE, INDEX_TAB_PRICE_BOOK) => {
  const {
    isProductInfoOpen,
    closePopup,
    isExportInventoryOpen,
    setExportModalOpenState,
    modalDetailTrigger
  } = modalProps

  if (isProductInfoOpen) closePopup()
  if (isExportInventoryOpen) setExportModalOpenState(false)
  modalDetailTrigger(row, BOOLEAN_TRUE, INDEX_TAB_PRICE_BOOK)
}

/**
 * Bradcast is change or show modal for set up own custom price rules.
 *
 * @param {TRowProductOffer} row Object from one row.
 * @param {"CUSTOM_RULES" | "GLOBAL_RULES" | "CLIENT_COMPANIES" | "NO_BROADCAST" | "BROADCAST_TEMPLATE|{template.id}"} value Enum
 * @param {{ isProductInfoOpen: boolean, closePopup: function, isExportInventoryOpen: boolean, setExportModalOpenState: function, modalDetailTrigger: function}} modalProps Object with variables and functions for open ModalDetail on Price Book tab.
 * @param {function} broadcastChange Action of redux from /modules/broadcast/actions
 * @param {Object.<string, any>} datagrid Datagrid object.
 * @param {{ id: number, name: string } | null} template Object or null. If parameter 'value' contains '|' then template is mandatory.
 */
export const onClickBroadcast = (row, value, modalProps, broadcastChange, datagrid, template = null) => {
  switch (value) {
    case 'CUSTOM_RULES':
      tableRowClickedProductOffer(row, modalProps)
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
