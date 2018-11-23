import React, {Component} from 'react';

export default class WarningLabel extends Component {
    render() {
        return (
            (this.props.isVisible) ?
                <div className='warningLabel'>
                    <span className='warningBody'>
                    <span className="warning-icon">!</span>
                <label>You have to remove all added lots first.</label>
                <div className='clearfix'></div>
                    </span>
                </div> : null
        );
    }
}


