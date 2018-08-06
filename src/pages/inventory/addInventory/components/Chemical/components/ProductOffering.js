import React, {Component} from 'react';
import {Control, Form, Errors} from 'react-redux-form';
import DropdownRedux from "../../../../../../components/Dropdown/DropdownRedux";
import DatepickerRedux from "../../../../../../components/Datepicker/DatepickerRedux";
import SearchOrigin from "./SearchOrigin";
import './ProductOffering.css'
import {actions} from "react-redux-form";
import {required} from "../../../../../../utils/validation";


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
        if(this.state.firstValue) localStorage.removeItem('productLots');
    }

    saveOffering(values){
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
                        <Errors
                            className="form-error"
                            model=".totalPackages"
                            show="touched"
                            messages={{
                                required: 'required packages',
                            }}
                        />
                        <div className='group-item-wr'>
                            <label htmlFor=".totalPackages">Total Packages</label>
                            <Control.text model=".totalPackages"
                                          validators={{required}}
                                          id=".totalPackages"
                                          type="number"
                                          min={0}/>
                        </div>
                        <Errors
                            className="form-error"
                            model=".lotNumber"
                            show="touched"
                            messages={{
                                required: 'required lot number',
                            }}
                        />
                        <div className='group-item-wr'>
                            <label htmlFor=".lotNumber">Lot Number</label>
                            <Control.text model=".lotNumber"
                                          validators={{required}}
                                          type="number"
                                          min={0}
                                          id=".lotNumber"/>
                        </div>
                        <div className='group-item-wr'>
                            <label htmlFor=".creationDate">Created Date</label>
                            <DatepickerRedux placeholder={'test'}
                                             dispatch={this.props.dispatch}
                                             onChange={(value)=>console.log(value)}
                                             model='forms.products.productsOffering.creationDate'/>
                            <Errors model='forms.products.productsOffering.creationDate'
                                    show="touched"
                                    messages={{required: 'Required'}} />
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
                        <Errors
                            className="form-error"
                            model=".manufacturer"
                            show="touched"
                            messages={{
                                required: 'required manufacturer',
                            }}
                        />
                        <div className='group-item-wr'>
                            <label htmlFor=".manufacturer">Manufacturer</label>
                            <Control.text model=".manufacturer"
                                          validators={{required}}
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
                        <Errors
                            className="form-error"
                            model=".tradeName"
                            show="touched"
                            messages={{
                                required: 'required Trade Name',
                            }}
                        />
                        <div className='group-item-wr'>
                            <label htmlFor=".tradeName">Trade Name</label>
                            <Control.text model=".name"
                                          validators={{required}}
                                          id=".tradeName"/>
                        </div>
                        <div>
                            <Errors
                                className="form-error"
                                model=".assayMin"
                                show="touched"
                                messages={{
                                    required: 'required Assay Min',
                                }}
                            />
                        <div className='group-item-wr'>
                            <label htmlFor=".assayMin">Assay Min %</label>
                            <Control.text model=".assayMin"
                                          validators={{required}}
                                          type="number"
                                          min={0}
                                          id=".assayMin"/>
                        </div>
                            <Errors
                                className="form-error"
                                model=".assayMax"
                                show="touched"
                                messages={{
                                    required: 'required Assay Max',
                                }}
                            />
                            <div className='group-item-wr'>
                                <label htmlFor=".assayMax">Assay Max %</label>
                                <Control.text model=".assayMax"
                                              validators={{required}}
                                              type="number"
                                              min={0}
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


