import React, {Component} from 'react';
import PropTypes from "prop-types";
import './TooltipFilter.css'
import classnames from 'classnames';

class TooltipFilter extends Component {

    renderContent(content){
        let inside = content.map((item, index) => (
            <tr key={index}>
                <td>{item.name}</td>
                <td className="tooltip-data">{item.value}</td>
            </tr>
        ));
        return <table className="tooltip-content">
            <tbody>
                <tr>
                    <th className="tooltip-header">FILTERS APPLIED</th>
                </tr>
                {inside}
            </tbody>
        </table>;

    }

    render() {
        return (
            <div className={'tooltipFilter-component'}>
                <span>{this.props.name}</span>
                <label className={classnames({show: this.props.isVisible})}>{this.renderContent(this.props.content)}</label>
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