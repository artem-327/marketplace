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
import PerfectScrollbar from 'react-perfect-scrollbar';

class ShippingQuotes extends Component {

    getShippingQuotes(inputs){
        let params = {};
        params.productOfferId = 1;
        params.destinationZIP = inputs.destination.zip;
        params.destinationCountry = 'USA';
        params.quantity = inputs.destination.quantity;

        this.props.getShippingQuotes(params);
    }

    checkBox(value){
        this.setState({selectedItem: value});
    }

    renderForm() {
        const sQuotes = this.renderShippingQuotes();

        let shippingQty = 'Shipping Quantity';
        let zipCode = 'Zip Code';
        let sendButton = 'Calculate';

        return (
            <Form id="shipping-quotes" model="forms.shippingQuotes" onSubmit={(inputs) => this.getShippingQuotes(inputs)}>
                <div className='filterbar'>
                    <div className='group-item-wr'>
                        <Errors
                            className="form-error"
                            model=".shipping.quote"
                            show="touched"
                            messages={{
                                required: messages.required,
                                isNumber: messages.isNumber,
                                min: messages.min
                            }}
                        />
                        <label htmlFor=".quantityPr">{shippingQty}</label>
                        <Control.text model=".destination.quantity"
                                      id=".quantityPr"
                                      validators={{
                                          min: (val) => min(val, 0),
                                          isNumber,
                                          required
                                      }}
                                      type='number'
                                      name='quantity'
                                      placeholder="/lbs"
                                      defaultValue=''
                        />
                    </div>
                    <div className='group-item-wr'>
                        <Errors
                            className="form-error"
                            model=".shipping.quote"
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
                    <button type="submit" className='button'>{sendButton}</button>
                </div>
                {this.props.shippingQuotesIsFetching ? <Spinner /> : sQuotes}
            </Form>
        )
    }

    renderShippingQuotes() {
        if (typeof this.props.shippingQuotes.length === 'undefined' || this.props.shippingQuotes.length < 1) {
            return (
                <div>Input some data above</div>
            );
        }

        return (
            <div className='shipping-quotes'>
                <PerfectScrollbar>
                    <table className="shipping-quotes">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Vendor</th>
                                <th>ETD</th>
                                <th>Service Type</th>
                                <th className="a-right">FOB Price/lb</th>
                                <th className="a-right">Freight/lb</th>
                                <th className="a-right">Total Price/lb</th>
                                <th className="a-right">Total Freight</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.shippingQuotes.map((sQuote, i) => {
                                let now = moment();
                                let deliveryDate = sQuote.estimatedDeliveryDate;
                                let etd = now.diff(deliveryDate, 'days') * -1 + 1;
                                const label = sQuote.carrierName;
                                const checkOptions = [{value: i.toString(), label: label}];

                                return (
                                    <tr key={i}>
                                        <td><Checkbox onChange={(value)=>this.checkBox(value)}
                                                      name="freight"
                                                      opns={checkOptions}
                                                      checked={false} /></td>
                                        <td>{sQuote.carrierName}</td>
                                        <td>{etd + (etd == 1 ? ' Day' : ' Days')}</td>
                                        <td>{sQuote.serviceType}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className="a-right"><NumberFormat
                                            value={sQuote.estimatedPrice}
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