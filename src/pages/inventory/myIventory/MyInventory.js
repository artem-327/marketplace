import React, { Component } from 'react';
import ProductOffers from "./components/ProductOffers";
import Filter from '../../../components/Filter';
import Spinner from '../../../components/Spinner/Spinner';
import FilterTag from "../../../components/Filter/components/FilterTag";

class MyInventory extends Component {

    componentDidMount(){
        this.props.getData({mrchnt: true});
    }

    render() {
        let content = this.props.isFetching ? <div><Spinner/></div> :
            <ProductOffers productOffers={this.props.productOffers} addPopup={this.props.addPopup}/>;
        return (

            <div>
                <h1 className='header'>INVENTORY OVERVIEW</h1>
                <FilterTag/>
                <Filter filterFunc={(filter) => {this.props.getData({...filter, mrchnt: true})}} />
                {content}
            </div>
        )
    }
}

export default MyInventory;