import React, {Component} from 'react';
import './shippingquotes.css';
import Button from '../../../../../components/Button/Button'
import '../../../../../components/PopUp/popup.css'
import PopupComponent from '../../../../../components/PopUp/PopupComponent'
import Spinner from '../../../../../components/Spinner/Spinner'
import NumberFormat from 'react-number-format';
import moment from "moment/moment";
import {Control, Errors, actions} from 'react-redux-form';
import {required, isNumber, min, messages} from "../../../../../utils/validation";
import {Form} from 'react-redux-form';
import Checkbox from '../../../../../components/Checkbox/Checkbox';
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";
import PerfectScrollbar from 'react-perfect-scrollbar';

class ShippingQuotes extends Component {

    getShippingQuotes(inputs) {
        let params = {};
        params.productOfferIds = this.props.selectedRows;
        params.destinationZIP = inputs.destination.zip;
        params.destinationCountry = 1;
        params.quantity = parseInt(inputs.destination.quantity);
        params.maxTransitDays = inputs.destination.maxTransit;

        this.props.getShippingQuotes(params);
    }

    checkBox(value){
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

    renderForm() {
        const sQuotes = this.renderShippingQuotes();

        let shippingQty = 'Shipping Quantity';
        let zipCode = 'Zip Code';
        let maxTransit = 'Max Transit Time';
        let sendButton = 'Calculate';

        return (
            <Form id="shipping-quotes" model="forms.shippingQuotes" onSubmit={(inputs) => this.getShippingQuotes(inputs)}>
                <div className='filterbar'>
                    <div className='group-item-wr col-md-2'>
                        <Errors
                            className="form-error"
                            model=".destination.quantity"
                            show="touched"
                            messages={{
                                required: messages.required,
                                isNumber: messages.isNumber,
                                min: messages.min
                            }}
                        />
                        <label htmlFor=".quantityPr" className="shipping-qty">{shippingQty}</label>
                        <Control.text model=".destination.quantity"
                                      id=".quantityPr"
                                      validators={{
                                          min: (val) => min(val, 0),
                                          isNumber,
                                          required
                                      }}
                                      type='number'
                                      name='quantity'
                                      defaultValue=''
                        />
                    </div>
                    <div className='group-item-wr col-md-3'>
                        <Errors
                            className="form-error"
                            model=".destination.zip"
                            show="touched"
                            messages={{
                                required: messages.required,
                                isNumber: messages.isNumber,
                                min: messages.min
                            }}
                        />
                        <label htmlFor=".zipPr">{zipCode}</label>
                        <Control.text model=".destination.zip"
                                      id=".zipPr"
                                      validators={{
                                          required
                                      }}
                                      type='text'
                                      name='destinationZIP'
                                      placeholder=""
                                      defaultValue=''
                        />
                    </div>
                    <div className='group-item-wr col-md-3'>
                        <Errors
                            className="form-error"
                            model=".destination.maxTransit"
                            show="touched"
                        />
                        <label htmlFor=".zipPr">{maxTransit}</label>
                        <DropdownRedux opns={[
                                                {id: 0, name: 'No limit'},
                                                {id: 2, name: '2 days'},
                                                {id: 3, name: '3 days'},
                                                {id: 5, name: '5 days'},
                                                {id: 7, name: '7 days'},
                                                {id: 14, name: '14 days'}
                                            ]}
                                       model=".destination.maxTransit"
                                       defaultValue={0}
                                       dispatch={this.props.dispatch}
                        />
                    </div>
                    <button type="submit" className='button'>{sendButton}</button>
                </div>
                {this.props.shippingQuotesIsFetching ? <Spinner /> : sQuotes}
            </Form>
        )
    }

    renderShippingQuotes() {
        if (typeof this.props.shippingQuotes.length === 'undefined' || this.props.shippingQuotes.length < 1) {
            return (
                <div>Input some data above.</div>
            );
        }

        return (
            <div className='shipping-quotes'>
                <PerfectScrollbar className="freight-selection-wrapper" onScrollY={this.handleScrollY} option={{wheelSpeed: 0.4}}>
                    <table className="shipping-quotes">
                        <thead>
                            <tr>
                                <th>
                                    <div className={'fix-header'}></div>
                                </th>
                                <th>
                                    Vendor
                                    <div className={'fix-header'}>Vendor</div>
                                </th>
                                <th>
                                    ETD
                                    <div className={'fix-header'}>ETD</div>
                                </th>
                                <th>
                                    Service Type
                                    <div className={'fix-header'}>Service Type</div>
                                </th>
                                <th className="a-right">
                                    FOB Price/lb
                                    <div className={'fix-header'}>FOB Price/lb</div>
                                </th>
                                <th className="a-right">
                                    Freight/lb
                                    <div className={'fix-header'}>Freight/lb</div>
                                </th>
                                <th className="a-right">
                                    Total Price/lb
                                    <div className={'fix-header'}>Total Price/lb</div>
                                </th>
                                <th className="a-right">
                                    Total Freight
                                    <div className={'fix-header'}>Total Freight</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.shippingQuotes.map((sQuote, i) => {
                                let now = moment();
                                let deliveryDate = sQuote.shipmentRate.estimatedDeliveryDate;
                                let etd = now.diff(deliveryDate, 'days') * -1 + 1;
                                const label = sQuote.shipmentRate.carrierName;
                                const checkOptions = [{value: i.toString(), label: label}];

                                return (
                                    <tr key={i}>
                                        <td><Checkbox onChange={(value)=>this.checkBox(value)}
                                                      name="freight"
                                                      opns={checkOptions}
                                                      checked={false} /></td>
                                        <td>{sQuote.shipmentRate.carrierName}</td>
                                        <td>{etd + (etd == 1 ? ' Day' : ' Days')}</td>
                                        <td>{sQuote.shipmentRate.serviceType}</td>
                                        <td className="a-right"><NumberFormat
                                            value={sQuote.shipmentRate.fobPricePerLb}
                                            displayType={'text'}
                                            prefix={'$'}
                                            thousandSeparator={','}
                                            decimalSeparator={'.'}
                                            decimalScale={2}
                                            fixedDecimalScale={true} /></td>
                                        <td className="a-right"><NumberFormat
                                            value={sQuote.shipmentRate.freightPricePerLb}
                                            displayType={'text'}
                                            prefix={'$'}
                                            thousandSeparator={','}
                                            decimalSeparator={'.'}
                                            decimalScale={2}
                                            fixedDecimalScale={true} /></td>
                                        <td className="a-right"><NumberFormat
                                            value={sQuote.shipmentRate.totalPricePerLb}
                                            displayType={'text'}
                                            prefix={'$'}
                                            thousandSeparator={','}
                                            decimalSeparator={'.'}
                                            decimalScale={2}
                                            fixedDecimalScale={true} /></td>
                                        <td className="a-right"><NumberFormat
                                            value={sQuote.shipmentRate.estimatedPrice}
                                            displayType={'text'}
                                            prefix={'$'}
                                            thousandSeparator={','}
                                            decimalSeparator={'.'}
                                            decimalScale={2}
                                            fixedDecimalScale={true} /></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </PerfectScrollbar>
            </div>
        )
    }

    render() {
        const footerComponent = (
            <>
                <Button color="grey-white" onClick={this.props.removePopup}>
                    Close
                </Button>
                <Button color="blue" onClick={this.createOrder}>
                    Purchase
                </Button>
            </>
        )

        const formCode = this.renderForm();

        return (
            <PopupComponent
                footerComponent={footerComponent}
                handleContinue={this.handleContinue}
                removePopup={this.props.removePopup}
                headerTitle="Shipping Quote"
            >
                {formCode}
            </PopupComponent>
        )
    }
}

export default ShippingQuotes;