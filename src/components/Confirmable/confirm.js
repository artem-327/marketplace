//import React from 'react';
import { createConfirmation } from 'react-confirm';
import ConfirmDialog from './ConfirmDialog';

// create confirm function
const confirm = createConfirmation(ConfirmDialog);

// confirm function easy to call.
export default function(title, confirmation, options = {}) {
    return confirm({title, confirmation, options});
}