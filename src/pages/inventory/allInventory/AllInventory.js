import React, { Component } from 'react';
import ProductOffers from "./components/ProductOffers";
import Filter from '../../../components/Filter';
import Spinner from '../../../components/Spinner/Spinner';
import FilterTag from "../../../components/Filter/components/FilterTag";
import SubMenu from '../../../components/SubMenu';
import ShippingQuotes from './components/ShippingQuotes';
import {getSelectedRowsDataTable} from "../../../utils/functions";
import './allinventory.css';
import {FormattedMessage} from 'react-intl';
import {checkToken} from "../../../utils/auth";

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
        if (checkToken(this.props)) return;

        const selectedRows = getSelectedRowsDataTable(this.props.productOffersTable);
        this.props.addPopup(<ShippingQuotes
                                selectedRows={selectedRows}
                                className='shipping-quotes-popup'
                                removePopup={this.props.removePopup}
                                {...this.props}/>);
    }

    render() {
        const content = this.props.productOffersIsFetching 
            ? <div><Spinner/></div> 
            : <ProductOffers {...this.props}/>;

        return (
            <div>
                <div className='header-top'>
                    <h1 className='header inv-header'>
                        <FormattedMessage
                            id='allInventory.marketplace'
                            defaultMessage='MARKETPLACE'
                        />
                    </h1>
                    <SubMenu/>
                    <button id='shippingQuotes' className='button hidden' onClick={() => this.openShippingQuote()}>
                        <FormattedMessage
                            id='allInventory.shippingQuote'
                            defaultMessage='Shipping Quote'
                        />
                    </button>
                    <FilterTag dispatch={this.props.dispatch} closeFunc={(filter) => {this.props.fetchAllProductOffers({...filter})}}/>
                </div>
                <Filter
                    chemicalName
                    quantity
                    date
                    price
                    assay
                    condition
                    form
                    package
                    productGrade
                    filterFunc={(inputs) => this.props.fetchAllProductOffers(inputs)}
                    {...this.props}
                />
                {content}
            </div>
        )
    }
}

export default AllInventory;