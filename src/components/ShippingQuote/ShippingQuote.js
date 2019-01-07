import React, {Component} from 'react';
import PropTypes from 'prop-types'
import './shippingquote.css';
import Button from '../../components/Button/Button'
import PopupComponent from '../../components/PopUp/PopupComponent'

class ShippingQuote extends Component {

    render() {
        const {removePopup} = this.props;

        const footerComponent = (
            <>
                <Button color="grey-white" onClick={this.onClick}>
                    Close
                </Button>
                <Button color="blue" onClick={this.createOrder}>
                    Purchase
                </Button>
            </>
        )

        return (
            <PopupComponent
                footerComponent={footerComponent}
                handleContinue={this.handleContinue}
                removePopup={removePopup}
                headerTitle="Shipping Quote"
            >
                <table className="shipping-quote">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Vendor</th>
                            <th>ETD</th>
                            <th>Service Type</th>
                            <th>FOB Price/lb</th>
                            <th>Freight/lb</th>
                            <th>Total Price/lb</th>
                            <th>Total Freight</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>123 Chemical</td>
                            <td>2 Days</td>
                            <td>Direct Point</td>
                            <td>$1.098</td>
                            <td>$0.876</td>
                            <td>$1.198</td>
                            <td>$165.32</td>
                        </tr>
                    </tbody>
                </table>
            </PopupComponent>
        )
    }
}

export default ShippingQuote;

ShippingQuote.propTypes = {
    removePopup: PropTypes.func,
}