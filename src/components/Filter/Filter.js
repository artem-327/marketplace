import {Form} from 'react-redux-form';
// import {Translate} from 'react-localize-redux';
import './filter.css';
import FilterGroup from './components/FilterGroup';
import React, {Component} from 'react';
import PropTypes from 'prop-types';


class Filter extends Component {

    constructor(props){
        super(props);
        this.state = {
            isOpen: false
        }
    }

    handleSubmit(inputs){
        console.log(inputs);
        this.props.filterFunc(inputs);

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isOpen: nextProps.isOpen
        })
    }

    render(){
        return this.state.isOpen ?
            <div className="filter">
                <Form model="forms.filter.filterForm.data" onSubmit={(val) => this.handleSubmit(val)}>
                    <FilterGroup className="filterGroup"
                                 header='Chemical Type'
                                 inputs={[
                                     {
                                         label: 'Chemical name',
                                         model: 'forms.filter.filterForm.data.search',
                                         type: 'text'
                                     }
                                 ]}/>
                    <FilterGroup className="filterGroup"
                                 header='Quantity'
                                 inputs={[
                                     {
                                         label: 'From Quantity',
                                         model: 'forms.filter.filterForm.data.qntylb',
                                         type: 'text'
                                     },
                                     {
                                         label: 'To Quantity',
                                         model: 'forms.filter.filterForm.data.qntyub',
                                         type: 'text'
                                     }
                                 ]}/>
                    <FilterGroup className="filterGroup"
                                 header='Price'
                                 inputs={[
                                     {
                                         label: 'From Price',
                                         model: 'forms.filter.filterForm.data.prclb',
                                         type: 'text'
                                     },
                                     {
                                         label: 'To Price',
                                         model: 'forms.filter.filterForm.data.prcub',
                                         type: 'text'
                                     }
                                 ]}/>
                    {/*<FilterGroup className="filterGroup"*/}
                                 {/*header='Location'*/}
                                 {/*inputs={[*/}
                                     {/*{*/}
                                         {/*label: 'Enter your zip code',*/}
                                         {/*model: 'forms.filterForm.zipCode',*/}
                                         {/*type: 'text'*/}
                                     {/*},*/}
                                     {/*{*/}
                                         {/*label: 'Max. Miles Away',*/}
                                         {/*model: 'forms.filterForm.maxMilesAway',*/}
                                         {/*type: 'text'*/}
                                     {/*}*/}
                                 {/*]}/>*/}
                    <FilterGroup className="filterGroup"
                                 header='Packaging'
                                 inputs={[
                                     {
                                         label: 'Super Sack',
                                         model: 'forms.filter.filterForm.data.checkboxes[1]',
                                         type: 'checkbox'
                                     },
                                     // {
                                     //     label: 'Drums',
                                     //     model: 'forms.filterForm.drums',
                                     //     type: 'checkbox'
                                     // },
                                     // {
                                     //     label: 'Pails',
                                     //     model: 'forms.filterForm.pails',
                                     //     type: 'checkbox'
                                     // },
                                     // {
                                     //     label: 'Bags',
                                     //     model: 'forms.filterForm.bags',
                                     //     type: 'checkbox'
                                     // },
                                     // {
                                     //     label: 'Bulk',
                                     //     model: 'forms.filterForm.bulk',
                                     //     type: 'checkbox'
                                     // },
                                     // {
                                     //     label: 'Fiber Drums',
                                     //     model: 'forms.filterForm.fiberDrums',
                                     //     type: 'checkbox'
                                     // },
                                     // {
                                     //     label: 'Totes',
                                     //     model: 'forms.filterForm.totes',
                                     //     type: 'checkbox'
                                     // },
                                     // {
                                     //     label: 'Cartoons / Boxes',
                                     //     model: 'forms.filterForm.cartoonsBoxes',
                                     //     type: 'checkbox'
                                     // }
                                 ]}/>
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