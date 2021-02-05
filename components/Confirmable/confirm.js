//import React from 'react'
import { createConfirmation } from 'react-confirm'
import ConfirmDialog from './ConfirmDialog'

// create confirm function
const confirm = createConfirmation(ConfirmDialog)

/**
 * HOC confirm modal.
 * @method
 * @param {string} title Title of confirm modal.
 * @param {string} confirmation Content of confirm modal.
 * @param {{cancelText: string, proceedText: string}} [options={cancelText: 'No', proceedText: 'Yes'}] Text for Cancel and Confirm Buttons.
 * @returns {Promise<string>}
 * @example
 *  confirm(
 *    formatMessage({ id: d.confirmTitleId, defaultMessage: d.confirmTitleDefaultMessage }),
 *    formatMessage({ id: d.confirmContentId,defaultMessage: d.confirmContentDefaultMessage},
 *       d.confirmValues ? d.confirmValues : {}), // Some values (name of company, etc.) for the content text in modal.
 *    {
 *      cancelText: formatMessage({ id: 'global.no', defaultMessage: 'No' }),
 *      proceedText: formatMessage({ id: 'global.yes', defaultMessage: 'Yes' }),
 *    }
 *  ).then(
 *    () => {
 *      d.confirmAction() // confirm
 *    },
 *    () => {
 *      d.cancelAction() // cancel
 *    }
 *  )
 */
export default function ConfirmComponent(title, confirmation, options = { cancelText: 'No', proceedText: 'Yes' }) {
  return confirm({ title, confirmation, options })
}
