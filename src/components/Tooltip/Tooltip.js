import React, {Component} from 'react';
import PropTypes from "prop-types";
import './tooltip.css'

class Tooltip extends Component {
    constructor(props){
        super(props);
        this.state = {
            isVisible: false
        }
    }
    showTip = () => {
        this.setState({isVisible: true})
        };
    render() {
        console.log(this.state);
        let label = this.state.isVisible ? <label>{this.props.content}</label> : null;
        return (
            <div className={'tooltip-component ' + this.props.className}>
                <span className='tooltip-icon' onMouseOver={this.showTip}>i</span>
                {label}
            </div>
        )
    }
}

Tooltip.propTypes = {
    content: PropTypes.string,
    className: PropTypes.string,
};

export default Tooltip;