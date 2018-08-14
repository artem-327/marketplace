import React, {Component} from 'react';

export default class WarningLabel extends Component {
    render() {
        return (
                <div className='warningLabel'>
                    <span className='warningBody'>
                    <span className="warning-icon">!</span>
                <label>Choose your product.</label>
                <div className='clearfix'></div>
                    </span>
                </div>
        );
    }
}


