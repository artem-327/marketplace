import React, { Component } from 'react';
import ProductOffers from "./components/ProductOffers";
import Filter from '../../../components/Filter';

class MyInventory extends Component {

    componentDidMount(){
        this.props.getData({mrchnt: true});
    }

    render() {
        let content = this.props.isFetching ? <div>Loading...</div> :
            <ProductOffers productOffers={this.props.productOffers} addPopup={this.props.addPopup}/>;
        return (
            <div>
                <Filter filterFunc={(filter) => {this.props.getData({...filter, mrchnt: true})}} />
                {content}
            </div>
        )
    }
}

export default MyInventory;