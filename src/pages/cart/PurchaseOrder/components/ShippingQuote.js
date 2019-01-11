import React, { Component } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import moment from 'moment'
import Spinner from '../../../../components/Spinner/Spinner'
import Radio from '../../../../components/Radio/Radio'
import PerfectScrollbar from 'react-perfect-scrollbar'

class ShippingQuote extends Component {
    state = {}

    constructor(props) {
        super(props);

        this.state = {
            selectedItem: null,
            shippingQuotesAreFetching: this.props.shippingQuotesAreFetching
        };
    }

    changeRadio(value){
        this.setState({selectedItem: value});
    }

    handleScrollY() {
        // get table header height
        const tableHeaderHeight = document.querySelector('.scrollbar-container.freight-selection-wrapper thead tr th:first-child').clientHeight;

        // get position of scrollbar (0 - 1)
        let freightWrapper = document.querySelector('.scrollbar-container.freight-selection-wrapper');
        let scrollPosition = freightWrapper.scrollTop / (freightWrapper.scrollHeight - freightWrapper.clientHeight);

        // get real scroll height (minus table header height)
        let scrollHeight = (freightWrapper.scrollHeight - freightWrapper.clientHeight - tableHeaderHeight);

        // floated header (move header together with scrolling)
        let topPosition = document.querySelector('.scrollbar-container.freight-selection-wrapper').scrollTop;
        let fixHeader = document.querySelectorAll('.freight-selection-wrapper th > .fix-header');
        for (let i = 0; i < fixHeader.length; i++) {
            fixHeader[i].style.top = topPosition + 'px';
        }

        // calculate scrollbar position
        let yScrollbar = document.querySelector('.scrollbar-container.freight-selection-wrapper > .ps__rail-y');
        yScrollbar.style.marginTop = scrollPosition * scrollHeight + 'px';
    }

    renderShippingQuotes() {
        if (typeof this.props.shippingQuotes.length === 'undefined' || this.props.shippingQuotes.length < 1 || typeof this.props.selectedAddress.id == 'undefined') {
            return (
                <div>Nothing to show</div>
            );
        }

        return (
            <PerfectScrollbar className="freight-selection-wrapper" onScrollY={this.handleScrollY}>
                <table className="freight-selection">
                    <thead>
                        <tr>
                            <th>
                                <div className={'fix-header'}></div>
                            </th>
                            <th>
                                Carrier
                                <div className={'fix-header'}>Carrier</div>
                            </th>
                            <th className="a-right">
                                Cost
                                <div className={'fix-header'}>Cost</div>
                            </th>
                            <th>
                                Estimated Delivery
                                <div className={'fix-header'}>Estimated Delivery</div>
                            </th>
                            <th>
                                ETD
                                <div className={'fix-header'}>ETD</div>
                            </th>
                            <th>
                                Service Type
                                <div className={'fix-header'}>Service Type</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.shippingQuotes.map((sQuote, i) => {
                            let now = moment();
                            let deliveryDate = sQuote.estimatedDeliveryDate;
                            let etd = now.diff(deliveryDate, 'days') * -1 + 1;
                            const label = sQuote.carrierName;
                            const radioOptions = [{value: i.toString(), label: label}];

                            return (
                                <tr key={i}>
                                    <td>
                                        <Radio onChange={(value)=>this.changeRadio(value)}
                                            name="freight"
                                            opns={radioOptions}
                                            checked={this.state.selectedItem} />
                                    </td>
                                    <td>{sQuote.carrierName}</td>
                                    <td className="a-right"><NumberFormat
                                            value={sQuote.estimatedPrice}
                                            displayType={'text'}
                                            prefix={'$'}
                                            thousandSeparator={','}
                                            decimalSeparator={'.'}
                                            decimalScale={2}
                                            fixedDecimalScale={true} /></td>
                                    <td>{moment(sQuote.estimatedDeliveryDate).format('MMM D, YYYY')}</td>
                                    <td>{etd + (etd == 1 ? ' Day' : ' Days')}</td>
                                    <td>{sQuote.serviceType}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </PerfectScrollbar>
        );
    }

    render() {
        let sQuotes = this.renderShippingQuotes();
        return (
            <div className="shopping-cart-items">
                <header><h2>2. Freight Selection</h2></header>
                <div className="purchase-order-section">
                    <div className="group-item-wr">
                        {this.props.shippingQuotesAreFetching ? <Spinner /> : sQuotes}
                    </div>
                </div>
            </div>
        );
    }
}

export default ShippingQuote

ShippingQuote.propTypes = {
    selectedAddress: PropTypes.object,
    shippingQuotes: PropTypes.array,
    shippingQuotesAreFetching: PropTypes.bool
}