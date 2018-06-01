import {Control, Form} from 'react-redux-form';
import {Translate} from 'react-localize-redux';
import Drop from './Drop';
import React, {Component} from 'react';


class Dropdown extends Component {

    handleSubmit(inputs){
        console.log(inputs);
    }

    render(){
        return (

                <Form model="forms.filterForm" onSubmit={(val) => this.handleSubmit(val)}>
                    <Drop className="filterGroup"

                                 inputs={[
                                     {
                                         label: 'Chemical name',
                                         model: 'forms.filterForm.chemicalName',
                                         type: 'text'
                                     }
                                 ]}/>
                    <Drop className="filterGroup"

                                 inputs={[
                                     {
                                         label: 'Super Sack',
                                         model: 'forms.filterForm.superSack',
                                         type: 'checkbox'
                                     }
                                 ]}/>
                    <Drop className="label-dropdown"

                                    inputs={[
                                     {
                                         model: 'forms.filterForm.superSack',
                                         type: 'dropdown'
                                     },
                                 ]}/>
                    <div>
                        <button className="filter-button">Apply</button>
                    </div>
                </Form>

        )
    }
};


export default Dropdown;