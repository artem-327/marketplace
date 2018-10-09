import React, {Component} from 'react';
import PropTypes from "prop-types";
import './TooltipFilter.css'
import classnames from 'classnames';

class TooltipFilter extends Component {
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
            <div className={'tooltipFilter-component ' + this.props.className}>
                <span onMouseEnter={() => this.showTip(true)} onMouseLeave={() => this.showTip(false)}>{this.props.name}</span>
                <label className={classnames({show: this.state.isVisible})}>{this.props.content}</label>
            </div>
        )
    }
}

TooltipFilter.propTypes = {
    content: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string
};

export default TooltipFilter;