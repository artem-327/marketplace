import React from 'react';
import PropTypes from 'prop-types';
import { confirmable } from 'react-confirm';
import Dialog from '@material-ui/core/Dialog';
import './confirmDialog.css';

const ConfirmDialog = ({show, proceed, dismiss, cancel, title, confirmation, options}) => {
    return <Dialog onHide={dismiss} open={show}>
        <h2>{title}</h2>
        <div className="confirmation-text">{confirmation}</div>
        <div className="confirmation-buttons">
            <button className="button green" onClick={() => proceed('same as cancel')}>Yes</button>
            <button className="button grey" onClick={() => cancel('arguments will be passed to the callback')}>Cancel</button>
        </div>
    </Dialog>
}

ConfirmDialog.propTypes = {
    show: PropTypes.bool,            // from confirmable. indicates if the dialog is shown or not.
    proceed: PropTypes.func,         // from confirmable. call to close the dialog with promise resolved.
    cancel: PropTypes.func,          // from confirmable. call to close the dialog with promise rejected.
    dismiss: PropTypes.func,         // from confirmable. call to only close the dialog.
    title: PropTypes.string,         // arguments of your confirm function
    confirmation: PropTypes.string,  // arguments of your confirm function
    options: PropTypes.object        // arguments of your confirm function
}

// confirmable HOC pass props `show`, `dismiss`, `cancel` and `proceed` to your component.
export default confirmable(ConfirmDialog);