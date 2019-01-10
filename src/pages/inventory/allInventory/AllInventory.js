import React, { Component } from 'react';
import ProductOffers from "./components/ProductOffers";
import Filter from '../../../components/Filter';
import Spinner from '../../../components/Spinner/Spinner';
import FilterTag from "../../../components/Filter/components/FilterTag";
import SubMenu from '../../../components/SubMenu';
import ShippingQuote from '../../../components/ShippingQuote';

class AllInventory extends Component {

    componentDidMount(){
        this.props.fetchAllProductOffers();
    }

    componentWillUnmount(){
        this.props.resetFilterTags();
        this.props.deleteProductOffersList();
        this.props.resetForm('forms.filter');
    }

    openShippingQuote(){
        this.props.addPopup(<ShippingQuote className='shipping-quotes-popup' shippingQuotes={this.props.shippingQuotes} getShippingQuotes={this.props.getShippingQuotes} shippingQuotesAreFetching={this.props.shippingQuotesAreFetching} removePopup={this.props.removePopup}/>);
    }

    render() {
        const content = this.props.productOffersIsFetching 
            ? <div><Spinner/></div> 
            : <ProductOffers {...this.props}/>;

        return (
            <div>
                <div className='header-top'>
                    <h1 className='header inv-header'>MARKETPLACE</h1>
                    <SubMenu/>
                    <button id='shippingQuotes' className='button hidden' onClick={() => this.openShippingQuote()}>Shipping Quote</button>
                    <FilterTag dispatch={this.props.dispatch} closeFunc={(filter) => {this.props.fetchAllProductOffers({...filter})}}/>
                </div>
                <Filter chemicalName quantity date price assay condition form package productGrade filterFunc={(inputs) => this.props.fetchAllProductOffers(inputs)} />
                {content}
            </div>
        )
    }
}

export default AllInventory;