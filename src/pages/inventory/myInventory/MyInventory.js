import React, { Component } from 'react';
import ProductOffers from "./components/ProductOffers";
import Filter from '../../../components/Filter';
import './myInventory.css';
import BroadcastRule from "./components/BroadcastRule";
import Spinner from "../../../components/Spinner/Spinner";
import FilterTag from "../../../components/Filter/components/FilterTag";

const GROUP_BY_ALL_COMPANIES = 1;
const GROUP_BY_REGIONS = 2;

class MyInventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            targetGroups: [],
            currentSelected: 'All companies',
            brVisible: false,
            brPosition: null,
            productOffersSelection: [],
            selections: [
                {name: 'All companies', id: GROUP_BY_ALL_COMPANIES},
                {name: 'Region', id: GROUP_BY_REGIONS}
            ]
        };
    }

    componentDidMount() {
        this.props.getProductOffers();
        this.props.getCompanies();
    }

    componentWillReceiveProps(nextProps) {
        this.setFilter(GROUP_BY_ALL_COMPANIES, nextProps.companies)
    }

    componentWillUnmount(){
        this.props.resetFilterTags();
        this.props.resetForm();
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
            <ProductOffers productOffers={this.props.productOffers}
                toggleBroadcastRule={(state, position, selection) => this.setState(
                    {brVisible: state, brPosition: position, productOffersSelection: selection}
                )}
            />;
        return (
            <div className='my-inventory'>
                <h1 className='header inv-header'>INVENTORY OVERVIEW</h1>
                <FilterTag dispatch={this.props.dispatch} closeFunc={(filter) => {this.props.getProductOffers({...filter}, true)}}/>
                <h3 className='header small'>Undefined product offerings selected</h3>
                <Filter chemicalName productAge filterFunc={(filter) => {this.props.getProductOffers({...filter}, true)}} />
                {content}
                <BroadcastRule
                    submitRules={this.props.sendRules}
                    addPopup={this.props.addPopup}
                    removePopup={this.props.removePopup}
                    getProductOffers={this.props.getProductOffers}
                    targetGroups={this.state.targetGroups}
                    selections={this.state.selections}
                    setFilter={(type) => this.setFilter(type)}
                    currentSelected={this.state.currentSelected}
                    visible={this.state.brVisible}
                    position={this.state.brPosition}
                    productOffersSelection={this.state.productOffersSelection}
                />
            </div>
        )
    }
}

export default MyInventory;