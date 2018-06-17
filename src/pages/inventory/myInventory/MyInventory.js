import React, { Component } from 'react';
import ProductOffers from "./components/ProductOffers";
import Filter from '../../../components/Filter';
import data from './data';
import BroadcastRule from "./components/BroadcastRule";

const GROUP_BY_ALL_COMPANIES = 1;
const GROUP_BY_REGIONS = 2;

class MyInventory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            targetGroups: [],
            selections: {
                [GROUP_BY_ALL_COMPANIES]: {name: 'All companies', active: true, callback: () => this.groupByAllCompanies(this.props.companies)},
                [GROUP_BY_REGIONS]: {name: 'Region', active: false, callback: () => this.groupByRegions(this.props.companies)},
            }
        };

        this.groupByAllCompanies(props.companies);
    }

    componentDidMount() {
        this.props.getProductOffers();
        this.props.getCompanies();
    }

    componentWillReceiveProps(nextProps) {
        this.groupByAllCompanies(nextProps.companies);
    }

    groupByAllCompanies(companies) {
        let targets = companies.map(company => ({name: company.name}));
        this.setState({
            targetGroups: [{name: 'All Companies', visible: true, targets: targets}],
            selections: {...this.state.selections, [GROUP_BY_ALL_COMPANIES]: {...this.state.selections[GROUP_BY_ALL_COMPANIES], active: true}}
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
            selections: {...this.state.selections, [GROUP_BY_REGIONS]: {...this.state.selections[GROUP_BY_REGIONS], active: true}}
        });
    }

    render() {
        let content = this.props.isFetching ? <div>načítání</div> : <ProductOffers productOffers={this.props.productOffers}/>;
        content = <ProductOffers productOffers={data}/>;
        return (
            <div>
                <Filter filterFunc={(inputs) => {this.props.getData(inputs)}} />
                {content}
                <BroadcastRule
                    targetGroups={this.state.targetGroups}
                    selections={Object.values(this.state.selections)}
                />
            </div>
        )
    }
}

export default MyInventory;