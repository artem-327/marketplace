import React, { Component } from 'react';
import ProductOffers from "./components/ProductOffers";
import Filter from '../../../components/Filter';
import './myInventory.css';
import Spinner from "../../../components/Spinner/Spinner";
import FilterTag from "../../../components/Filter/components/FilterTag";
import {getSelectedDataTable} from "../../../utils/functions";
import SubMenu from '../../../components/SubMenu';

const GROUP_BY_ALL_COMPANIES = 1;
const GROUP_BY_REGIONS = 2;

class MyInventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            targetGroups: [],
            currentSelected: 'All companies',
            selections: [
                {name: 'All companies', id: GROUP_BY_ALL_COMPANIES},
                // {name: 'Region', id: GROUP_BY_REGIONS}
            ]
        };
    }

    componentDidMount() {
        this.props.fetchMyProductOffers();
        this.props.getCompanies();
    }

    componentWillReceiveProps(nextProps) {
        this.setFilter(GROUP_BY_ALL_COMPANIES, nextProps.companies)
    }

    componentWillUnmount(){
        this.props.resetFilterTags();
        this.props.deleteProductOffersList();
        this.props.resetForm('forms.filter');
    }

    setActiveBroadcastButton(active){
        this.setState({brActive:active})
    }

    setFilter(type, companies = this.props.companies) {
        switch (type) {
            case GROUP_BY_ALL_COMPANIES: {
                this.groupByAllCompanies(companies);
                break;
            }
            case GROUP_BY_REGIONS: {
                this.groupByRegions(companies);
                break;
            }
            default: this.groupByAllCompanies(companies)
        }
    }

    groupByAllCompanies(companies) {
        let targets = companies.map(company => ({name: company.name, company: company.id}));
        this.setState({
            currentSelected: 'All companies',
            targetGroups: [{name: 'All Companies', type:'company', visible: true, targets: targets}],
        });
    }

    groupByRegions(companies) {
        let targetsGroups = Object.values(companies.reduce((carry, company) => {
            let locations = company.offices.map(office => office.location);
            locations.forEach(location => {
                (carry[location.id] = carry[location.id] || {name: location.state, type:'location', id: location.id, visible: true, targets: []})
                    .targets
                    .push({name: company.name, company: company.id});
            });
            return carry;
        }, {}));
        this.setState({
            targetGroups: targetsGroups,
            currentSelected: 'Regions'
        });
    }

    render() {
        let content = this.props.isFetching ? <Spinner/> :
            <ProductOffers
                productOffers={this.props.productOffers}
                fetchMyProductOffers={this.props.fetchMyProductOffers}
                submitRules={this.props.sendRules}
                addPopup={this.props.addPopup}
                removePopup={this.props.removePopup}
                removeProductOffer={this.props.removeProductOffer}
                getProductOffers={this.props.fetchMyProductOffers}
                targetGroups={this.state.targetGroups}
                setFilter={(type) => this.setFilter(type)}
                history={this.props.history}
                selections={this.state.selections}
                currentSelected={this.state.currentSelected}
                setActiveBroadcastButton={active => this.setActiveBroadcastButton(active)}
                broadcastActive={this.state.brActive}/>;
        return (
            <div className='my-inventory'>
                <div className='header-top'>
                    <h1 className='header inv-header'>MY INVENTORY</h1>
                    <SubMenu/>
                    <FilterTag dispatch={this.props.dispatch} closeFunc={(filter) => {this.props.fetchMyProductOffers({...filter})}}/>
                    <h3 className='header small'>{getSelectedDataTable(this.props.productOffersTable)} product offerings selected</h3>
                </div>
                <Filter chemicalName productAgeFilter date assay quantity price package condition productGrade form filterFunc={(filter) => {this.props.fetchMyProductOffers({...filter})}} />
                {content}
            </div>
        )
    }
}

export default MyInventory;