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
                    <FilterGroup className="filterGroup, {}"
                                 header='Chemical Type'
                                 isOpen={this.props.filterGroupStatus.chemName}
                                 onOpen={(value)=>{this.props.toggleFilterGroup('chemName', value)}}
                                 inputs={[
                                     {
                                         label: 'Chemical name / CAS #',
                                         model: '.search',
                                         type: 'text',
                                     }
                                 ]}/>
                    <FilterGroup className="filterGroup"
                                 isOpen={this.props.filterGroupStatus.quantity}
                                 onOpen={(value)=>{this.props.toggleFilterGroup('quantity', value)}}
                                 header='Quantity'
                                 split
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
                                 split
                                 isOpen={this.props.filterGroupStatus.price}
                                 onOpen={(value)=>{this.props.toggleFilterGroup('price', value)}}
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
                                 split
                                 isOpen={this.props.filterGroupStatus.packaging}
                                 onOpen={(value)=>{this.props.toggleFilterGroup('packaging', value)}}
                                 inputs={this.props.packageTypes.map(packageType => ({
                                        label: packageType.name,
                                        type: 'checkbox',
                                        model: `.pckgs[${packageType.id}]`
                                 }))}/>
                    <div className="filterBottom">

                        {/*<button className="filter-button">Apply</button>*/}
                        <button className='button filter-button'>Apply</button>
                        <button className='button disabled filter-button' onClick={()=>{this.props.resetForm()}}>Clear filter</button>

                    </div>
                </Form>
            </div> : null;

    }
}

Filter.propTypes = {
    filterFunc: PropTypes.func,
};


export default Filter;