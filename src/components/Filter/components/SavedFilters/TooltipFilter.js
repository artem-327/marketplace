import React, { Component } from 'react';
import PropTypes from "prop-types";
import './TooltipFilter.scss'
import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';

class TooltipFilter extends Component {

    formatName(name) {
        switch (name) {
            case 'chemicalName': return 'Chemical name';
            case 'quantityFrom': return 'Quantity From';
            case 'quantityTo': return 'Quantity To';
            case 'priceFrom': return 'Price from';
            case 'priceTo': return 'Price to';
            case 'distanceLimit': return 'Distance limit';
            case 'container': return 'Container';
            case 'grade': return 'Grade';
            case 'form': return 'Form';
            case 'condition': return 'Condition';
            case 'origin': return 'Origin';
            case 'manufacturer': return 'Manufacturer';
            case 'zip': return 'ZIP';
            default: return name;
        }
    }

    renderContent(content) {
        let inside = content.map((item, index) => {
            const value = item.value;
            return <tr key={index}>
                <td>{this.formatName(item.name)}</td>
                <td className="tooltip-data">{value}</td>
            </tr>
        });
        return <table className="tooltip-content">
            <tbody>
                <tr>
                    <th colSpan="2" className="tooltip-header">FILTERS APPLIED</th>
                </tr>
                {inside}
            </tbody>
        </table>;

    }

    render() {
        const { selected, name, isVisible, content } = this.props;
        const bold = selected ? 'tooltipBold' : '';
        return (
            <div className={'tooltipFilter-component'}>
                <span className={bold}>{selected ?
                    <FormattedMessage
                        id='filter.selectedFilter'
                        defaultMessage='SELECTED FILTER - '
                    />
                    : null}<FormattedMessage id='filter.saved.name' defaultMessage='Filter name: ' /><b>{name}</b></span>
                <label className={classnames({ show: isVisible })}>{this.renderContent(content)}</label>
            </div>
        )
    }
}

TooltipFilter.propTypes = {
    content: PropTypes.array,
    className: PropTypes.string,
    name: PropTypes.string
};

export default TooltipFilter;