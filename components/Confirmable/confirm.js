//import React from 'react'
import { createConfirmation } from 'react-confirm'
import ConfirmDialog from './ConfirmDialog'

/**
 * HOC confirm modal.
 * @method
 * @param {string | Node} title Title of confirm modal.
 * @param {string | Node} confirmation Content of confirm modal.
 * @param {{cancelText: string, proceedText: string}} [options={cancelText: 'No', proceedText: 'Yes'}] Text for Cancel and Confirm Buttons.
 * @param {boolean} [basicModal] True shows basic modal without background color and all attributes wiil be in center.
 * @returns {Promise<string>}
 * @example
 *  confirm(
 *    formatMessage({ id: d.confirmTitleId, defaultMessage: d.confirmTitleDefaultMessage }),
 *    formatMessage({ id: d.confirmContentId,defaultMessage: d.confirmContentDefaultMessage},
 *       d.confirmValues ? d.confirmValues : {}), // Some values (name of company, etc.) for the content text in modal.
 *    {
 *      cancelText: formatMessage({ id: 'global.no', defaultMessage: 'No' }),
 *      proceedText: formatMessage({ id: 'global.yes', defaultMessage: 'Yes' }),
 *    },
 *    true
 *  ).then(
 *    () => {
 *      d.confirmAction() // confirm
 *    },
 *    () => {
 *      d.cancelAction() // cancel
 *    }
 *  )
 */
const confirm = createConfirmation(ConfirmDialog)

export default function ConfirmComponent(
  title,
  confirmation,
  options = { cancelText: 'No', proceedText: 'Yes' },
  basicModal
) {
  return confirm({ title, confirmation, options, basicModal })
}
