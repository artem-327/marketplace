import React, { Component } from 'react';
import ProductOffers from "./components/ProductOffers";
import Filter from '../../../components/Filter';

class AllInventory extends Component {

    componentDidMount(){
        this.props.getData();
    }

    render() {
        let content = this.props.isFetching ? <div>Loading...</div> :
            <ProductOffers productOffers={this.props.productOffers} addPopup={this.props.addPopup}/>;
        return (
            <div>
                <h1 className='inventory-header'>INVENTORY OVERVIEW</h1>
                <Filter filterFunc={(inputs) => {this.props.getData(inputs)}} />
                {content}
            </div>
        )
    }
}

export default AllInventory;