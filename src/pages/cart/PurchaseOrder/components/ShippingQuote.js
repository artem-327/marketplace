import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ShippingQuote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: this.props.shippingQuotes
        };
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate');
        if(this.props.shippingQuotes !== prevProps.shippingQuoets) this.setState({items: this.props.shippingQuotes})
    }

    renderShippingQuotes() {
        console.log('renderShippingQuotes');
        console.log(this.state.items);
        return (
            <div>
                KUK
            </div>
        );
    }

    render() {
        let sQuotes = this.renderShippingQuotes();
        return (
            <div className="shopping-cart-items">
                <header><h2>2. Freight Selection</h2></header>
                <div className="purchase-order-section">
                    <div className="group-item-wr">
                        {sQuotes}
                    </div>
                </div>
            </div>
        );
    }
}

export default ShippingQuote

ShippingQuote.propTypes = {
    shippingQuotes: PropTypes.array
}