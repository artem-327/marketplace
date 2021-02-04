//import React from 'react'
import { createConfirmation } from 'react-confirm'
import ConfirmDialog from './ConfirmDialog'

// create confirm function
const confirm = createConfirmation(ConfirmDialog)

// confirm function easy to call.
export default function ConfirmComponent(
  title,
  confirmation,
  options = {
    cancelText: 'No',
    proceedText: 'Yes'
  }
) {
  return confirm({ title, confirmation, options })
}
