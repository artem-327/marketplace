import React, {Component} from 'react';

export default class WarningLabel extends Component {
    render() {
        return (
                <div className='group-item-wr warningLabel'>
                    <span className="warning-icon">!</span>
                <label>Choose your product.</label>
                <div className='clearfix'></div>
                </div>
        );
    }
}


