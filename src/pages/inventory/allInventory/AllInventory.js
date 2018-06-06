import React, { Component } from 'react';
import ProductOffers from "./components/ProductOffers";
import offers from "./data"

class AllInventory extends Component {

    componentDidMount(){
        // this.props.getData();
    }

    render() {
        // return this.props.isFetching ? <div>načítání</div>: <ProductOffers productOffers={this.props.productOffers}/>;
        return <ProductOffers productOffers={offers}/>;

    }
}

export default AllInventory;