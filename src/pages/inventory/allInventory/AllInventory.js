import React, { Component } from 'react';
import ProductOffers from "./components/ProductOffers";
import Filter from '../../../components/Filter';
import Spinner from '../../../components/Spinner/Spinner';
import FilterTag from "../../../components/Filter/components/FilterTag";
import SubMenu from '../../../components/SubMenu';

class AllInventory extends Component {

    componentDidMount(){
        this.props.fetchAllProductOffers();
    }

    componentWillUnmount(){
        this.props.resetFilterTags();
        this.props.deleteProductOffersList();
        this.props.resetForm('forms.filter');
    }

    render() {

        const content = this.props.isFetching ? <div><Spinner/></div> :
            <ProductOffers {...this.props}/>;
        return (
            <div>
                <div className='header-top'>
                    <h1 className='header inv-header'>MARKETPLACE</h1>
                    <SubMenu/>
                    <FilterTag dispatch={this.props.dispatch} closeFunc={(filter) => {this.props.fetchAllProductOffers({...filter})}}/>
                </div>
                <Filter chemicalName quantity date price assay condition form package filterFunc={(inputs) => this.props.fetchAllProductOffers(inputs)} />
                {content}
            </div>
        )
    }
}

export default AllInventory;