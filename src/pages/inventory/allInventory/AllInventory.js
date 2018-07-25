import React, { Component } from 'react';
import ProductOffers from "./components/ProductOffers";
import Filter from '../../../components/Filter';
import Spinner from '../../../components/Spinner/Spinner';
import FilterTag from "../../../components/Filter/components/FilterTag";

class AllInventory extends Component {

    componentDidMount(){
        this.props.getData();
    }

    componentWillUnmount(){
        this.props.resetFilterTags();
        this.props.resetForm();
    }

    render() {
        let content = this.props.isFetching ? <div><Spinner/></div> :
            <ProductOffers productOffers={this.props.productOffers} addPopup={this.props.addPopup}/>;
        return (
            <div>
                <h1 className='header inv-header'>INVENTORY OVERVIEW</h1>
                <FilterTag dispatch={this.props.dispatch} closeFunc={(filter) => {this.props.getData({...filter, mrchnt: true})}}/>
                <Filter filterFunc={(inputs) => this.props.getData(inputs)} />
                {content}
            </div>
        )
    }
}

export default AllInventory;