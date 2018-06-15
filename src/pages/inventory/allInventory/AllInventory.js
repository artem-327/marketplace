import React, { Component } from 'react';
import ProductOffers from "./components/ProductOffers";
import Filter from '../../../components/Filter';
import {addPopup} from "../../../modules/popup";

class AllInventory extends Component {

    componentDidMount(){
        this.props.getData();
    }

    render() {
        let content = this.props.isFetching ? <div>načítání</div> :
            <ProductOffers productOffers={this.props.productOffers} addPopup={this.props.addPopup}/>;
        return (
            <div>
                <Filter filterFunc={(inputs) => {this.props.getData(inputs)}} />
                {content}
            </div>
        )
    }
}

export default AllInventory;