import React, { Component } from 'react';
import ProductOffers from "./components/ProductOffers";
// import offers from "./data"
import Filter from '../../../components/Filter';

class AllInventory extends Component {

    componentDidMount(){
        this.props.getData();
    }

    render() {
        let table = this.props.isFetching ? <div>načítání</div> : <ProductOffers productOffers={this.props.productOffers}/>;
        return (
            <div>
                <Filter filterFunc={(inputs) => {this.props.getData(inputs)}} />
                {table}
            </div>
        )
    }
}

export default AllInventory;