import React, {Component} from 'react';
import {Control, Form} from 'react-redux-form';
import DropdownRedux from "../../../../../../components/Dropdown/DropdownRedux";
import DatepickerRedux from "../../../../../../components/Datepicker/DatepickerRedux";
import SearchOrigin from "./SearchOrigin";
import './ProductOffering.css'

export default class ProductOffering extends Component {
    constructor(props){
        super(props);
        this.state = {
            save: false,
            firstValue: true,
        }
    }

    componentDidMount () {
        this.props.fetchProductForms();
        this.props.fetchProductGrade();
        this.props.fetchProductConditions();
    }

    saveOffering(values){
        if(this.state.firstValue) localStorage.removeItem('productLots');
        this.setState({save: true, firstValue: false});
        this.props.addLot(values);
    }

    render() {
        let button = this.state.save ? <button className='button big added-productOffering'>Added</button> :
            <button className='button big add-productOffering'>Add Lot</button>;
        return (
            <div>
                <h6 className=''>PRODUCT OFFERING</h6>
                <Form model="forms.products.productsOffering" onSubmit={(values)=>this.saveOffering(values)}>
                    <div>
                        <div className='group-item-wr'>
                            <label htmlFor=".totalPackages">Total Packages</label>
                            <Control.text model=".totalPackages"
                                          id=".totalPackages"
                                          required/>
                        </div>
                        <div className='group-item-wr'>
                            <label htmlFor=".lotNumber">Lot Number</label>
                            <Control.text model=".lotNumber"
                                          id=".lotNumber"/>
                        </div>
                        <div className='group-item-wr'>
                            <label htmlFor=".creationDate">Created Date</label>
                            <DatepickerRedux placeholder={'test'}
                                             dispatch={this.props.dispatch}
                                             onChange={(value)=>console.log(value)}
                                             model='forms.products.productsOffering.creationDate' />
                        </div>
                        <div className='group-item-wr'>
                            <label htmlFor=".expirationDate">Expiration Date</label>
                            <DatepickerRedux placeholder={'test'}
                                             dispatch={this.props.dispatch}
                                             onChange={(value)=>console.log(value)}
                                             model='forms.products.productsOffering.expirationDate' />
                        </div>
                    </div>
                    <div>
                        <div className='group-item-wr'>
                            <label htmlFor=".manufacturer">Manufacturer</label>
                            <Control.text model=".manufacturer"
                                          id=".manufacturer"/>
                        </div>
                        <div className='group-item-wr'>
                            <SearchOrigin {...this.props}/>
                        </div>

                        <div className='group-item-wr'>
                            <label htmlFor=".form">Form</label>
                            <DropdownRedux opns={this.props.productForms} placeholder='Select'
                                           model="forms.products.productsOffering.productForm"
                                           dispatch={this.props.dispatch}/>
                        </div>
                        <div className='group-item-wr'>
                            <label htmlFor=".tradeName">Trade Name</label>
                            <Control.text model=".name"
                                          id=".tradeName"/>
                        </div>
                        <div>
                        <div className='group-item-wr'>
                            <label htmlFor=".assayMin">Assay Min %</label>
                            <Control.text model=".assayMin"
                                          id=".assayMin"/>
                        </div>
                            <div className='group-item-wr'>
                                <label htmlFor=".assayMax">Assay Max %</label>
                                <Control.text model=".assayMax"
                                              id=".assayMax"/>
                            </div>

                        <div className='group-item-wr'>
                            <label htmlFor=".grade">Grade</label>
                            <DropdownRedux opns={this.props.productGrade} placeholder='Select'
                                           model="forms.products.productsOffering.productGrade"
                                           dispatch={this.props.dispatch}/>
                        </div>
                        <div className='group-item-wr'>
                            <label htmlFor=".condition">Condition</label>
                            <DropdownRedux opns={this.props.productConditions} placeholder='Select'
                                           model="forms.products.productsOffering.productCondition"
                                           dispatch={this.props.dispatch}/>
                        </div>
                        </div>
                    </div>
                        <div>
                            <div className="group-item-wr notes-textarea">
                                <label htmlFor=".externalNotes">External notes</label>
                                <Control.textarea model=".externalNotes" id=".externalNotes" className="textarea" placeholder="Enter notes here" />
                            </div>
                            <div className="group-item-wr notes-textarea">
                                <label htmlFor=".internalNotes">Internal Notes</label>
                                <Control.textarea model=".internalNotes" id=".internalNotes" className="textarea" placeholder="Enter notes here" />

                        </div>
                            {button}
                        </div>
                </Form>
            </div>
        );
    }
}


