import React, { Component } from 'react';
import ProductOffers from "./components/ProductOffers";
import Filter from '../../../components/Filter';
import './myInventory.css';
import BroadcastRule from "./components/BroadcastRule";
import Spinner from "../../../components/Spinner/Spinner";

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
        let targets = companies.map(company => ({name: company.name}));
        this.setState({
            currentSelected: 'All companies',
            targetGroups: [{name: 'All Companies', visible: true, targets: targets}],
        });
    }

    groupByRegions(companies) {
        let targetsGroups = Object.values(companies.reduce((carry, company) => {
            let locations = company.offices.map(office => office.location);
            locations.forEach(location => {
                (carry[location.id] = carry[location.id] || {name: location.state, visible: true, targets: []})
                    .targets
                    .push({name: company.name});
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
                <Filter filterFunc={(inputs) => {this.props.getData(inputs)}}/>
                {content}
                <BroadcastRule
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