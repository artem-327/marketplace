import {Form} from 'react-redux-form';
// import {Translate} from 'react-localize-redux';
import './filter.css';
import FilterGroup from './components/FilterGroup';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {filterNonEmptyAttributes} from "../../utils/functions";


class Filter extends Component {

    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
    }

    handleSubmit(inputs){
        let filter = Object.assign({}, inputs, {pckgs: Object.entries(inputs.pckgs || {}).filter(([key, value]) => value).map(([key]) => key).join(',')});
        this.props.filterFunc(filterNonEmptyAttributes(filter));
    }

    componentDidMount() {
        this.props.fetchPackageTypes();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isOpen: nextProps.isOpen
        })
    }

    render(){
        return this.state.isOpen ?
            <div className="filter">
                <Form model="forms.filter.data" onSubmit={(val) => this.handleSubmit(val)}>
                    <FilterGroup className="filterGroup"
                                 header='Chemical Type'
                                 inputs={[
                                     {
                                         label: 'Chemical name',
                                         model: '.search',
                                         type: 'text',
                                     }
                                 ]}/>
                    <FilterGroup className="filterGroup"
                                 header='Quantity'
                                 inputs={[
                                     {
                                         label: 'From Quantity',
                                         model: '.qntylb',
                                         type: 'number',
                                         placeholder: '0'
                                     },
                                     {
                                         label: 'To Quantity',
                                         model: '.qntyub',
                                         type: 'number',
                                         placeholder: '0'
                                     }
                                 ]}/>
                    <FilterGroup className="filterGroup"
                                 header='Price'
                                 inputs={[
                                     {
                                         label: 'From Price',
                                         model: '.prclb',
                                         type: 'number',
                                         placeholder: '0'
                                     },
                                     {
                                         label: 'To Price',
                                         model: '.prcub',
                                         type: 'number',
                                         placeholder: '0'
                                     }
                                 ]}/>
                    <FilterGroup className="filterGroup"
                                 header='Packaging'
                                 inputs={this.props.packageTypes.map(packageType => ({
                                        label: packageType.name,
                                        type: 'checkbox',
                                        model: `.pckgs[${packageType.id}]`
                                 }))}/>
                    <div>
                        <button className="filter-button">Apply</button>
                    </div>
                </Form>
            </div> : null;

    }
}

Filter.propTypes = {
    filterFunc: PropTypes.func
};


export default Filter;