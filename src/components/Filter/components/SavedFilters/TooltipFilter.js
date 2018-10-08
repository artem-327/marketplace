import React, {Component} from 'react';
import PropTypes from "prop-types";
import './tooltip.css'
import classnames from 'classnames';

class Tooltip extends Component {
    constructor(props){
        super(props);
        this.state = {
            isVisible: false
        }
    }

    showTip(type) {
        this.setState({isVisible: type})
    };

    render() {
        return (
            <div className={'tooltip-component ' + this.props.className}>
                <span className='tooltip-icon' onMouseEnter={() => this.showTip(true)} onMouseLeave={() => this.showTip(false)}>i</span>
                <label className={classnames({show: this.state.isVisible})}>{this.props.content}</label>
            </div>
        )
    }
}

Tooltip.propTypes = {
    content: PropTypes.string,
    className: PropTypes.string,
};

export default Tooltip;