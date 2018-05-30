import {Control, Form} from 'react-redux-form';
import {Translate} from 'react-localize-redux';
import './filter.css';
import FilterGroup from './components/FilterGroup';
import React, {Component} from 'react';


class Filter extends Component {

    handleSubmit(inputs){
        console.log(inputs);
    }

    render(){
        return (
            <div className="filter">
                <Form model="forms.filterForm" onSubmit={(val) => this.handleSubmit(val)}>
                    <FilterGroup className="filterGroup"
                        header='Chemical Type'
                        inputs={[
                            {
                                label: 'Chemical name',
                                model: 'forms.filterForm.chemicalName',
                                type: 'text'
                            }
                        ]}/>
                    <FilterGroup className="filterGroup"
                        header='Quantity'
                        inputs={[
                            {
                                label: 'From Quantity',
                                model: 'forms.filterForm.fromQuantity',
                                type: 'text'
                            },
                            {
                                label: 'To Quantity',
                                model: 'forms.filterForm.toQuantity',
                                type: 'text'
                            }
                        ]}/>
                    <FilterGroup className="filterGroup"
                    header='Price'
                    inputs={[
                        {
                            label: 'From Price',
                            model: 'forms.filterForm.fromPrice',
                            type: 'text'
                        },
                        {
                            label: 'To Price',
                            model: 'forms.filterForm.toPrice',
                            type: 'text'
                        }
                    ]}/>
                    <FilterGroup className="filterGroup"
                        header='Location'
                        inputs={[
                            {
                                label: 'Enter your zip code',
                                model: 'forms.filterForm.zipCode',
                                type: 'text'
                            },
                            {
                                label: 'Max. Miles Away',
                                model: 'forms.filterForm.maxMilesAway',
                                type: 'text'
                            }
                        ]}/>
                    <FilterGroup className="filterGroup"
                        header='Packaging'
                        inputs={[
                            {
                                label: 'Super Sack',
                                model: 'forms.filterForm.superSack',
                                type: 'checkbox'
                            },
                            {
                                label: 'Drums',
                                model: 'forms.filterForm.drums',
                                type: 'checkbox'
                            },
                            {
                                label: 'Pails',
                                model: 'forms.filterForm.pails',
                                type: 'checkbox'
                            },
                            {
                                label: 'Bags',
                                model: 'forms.filterForm.bags',
                                type: 'checkbox'
                            },
                            {
                                label: 'Bulk',
                                model: 'forms.filterForm.bulk',
                                type: 'checkbox'
                            },
                            {
                                label: 'Fiber Drums',
                                model: 'forms.filterForm.fiberDrums',
                                type: 'checkbox'
                            },
                            {
                                label: 'Totes',
                                model: 'forms.filterForm.totes',
                                type: 'checkbox'
                            },
                            {
                                label: 'Cartoons / Boxes',
                                model: 'forms.filterForm.cartoonsBoxes',
                                type: 'checkbox'
                            }
                        ]}/>
                    <div>
                        <button className="filter-button">Apply</button>
                    </div>
                </Form>
            </div>
        )
    }
};


export default Filter;