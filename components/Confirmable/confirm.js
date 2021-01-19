//import React from 'react';
import { createConfirmation } from 'react-confirm'
import ConfirmDialog from './ConfirmDialog'
import { FormattedMessage } from 'react-intl'

// create confirm function
const confirm = createConfirmation(ConfirmDialog)

// confirm function easy to call.
export default function ConfirmComponent(
  title,
  confirmation,
  options = {
    cancelText: <FormattedMessage id='global.no' defaultMessage='No' />,
    proceedText: <FormattedMessage id='global.yes' defaultMessage='Yes' />
  }
) {
  return confirm({ title, confirmation, options })
}
