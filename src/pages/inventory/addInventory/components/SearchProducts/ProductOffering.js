import React, {Component} from 'react';
import {Control, Form} from 'react-redux-form';
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";
import DatepickerRedux from "../../../../../components/Datepicker/DatepickerRedux";
import SearchOrigin from "./SearchOrigin";
import './ProductOffering.css'
import {fetchProductConditions, fetchProductForms, fetchProductGrade} from "../../../../../modules/products";

export default class ProductOffering extends Component {
    constructor(props){
        super(props);
        this.state = {
            save: false,
        }
    }

    saveOffering(values){
        this.setState({save: true}
            // this.saveMapping.then(()=>{
            // this.setState({save: true}, ()=>{
            //     let that = this;
            //     setTimeout(function(){
            //         that.setState({save: false});
            //     }, 3000)
            // }
            // )
            // }
        )
    }

    render() {
        let button = this.state.save ? <button onClick={(e)=>e.preventDefault()} className='button big disabled added-productOffering'>Added</button> :
            <button className='button big disabled add-productOffering'>Add Lot</button>;
        return (
            <div>
                <h6 className=''>PRODUCT OFFERING</h6>
                <Form model="forms.products.productsOffering" onSubmit={(values)=>this.saveOffering(values)}>
                    <div>
                        <div className='group-item-wr'>
                            <label htmlFor=".totalPackages">Total Packages</label>
                            <Control.text model=".totalPackages"
                                          id=".totalPackages"/>
                        </div>
                        <div className='group-item-wr'>
                            <label htmlFor=".lotNumber">Lot Number</label>
                            <Control.text model=".lotNumber"
                                          id=".lotNumber"/>
                        </div>
                        <div className='group-item-wr'>
                            <label htmlFor=".createdDate">Created Date</label>
                            <DatepickerRedux placeholder={'test'}
                                             dispatch={this.props.dispatch}
                                             onChange={(value)=>console.log(value)}
                                             model='forms.addProductOffer.addProductOffer.createdDate' />
                        </div>
                        <div className='group-item-wr'>
                            <label htmlFor=".expirationDate">Expiration Date</label>
                            <DatepickerRedux placeholder={'test'}
                                             dispatch={this.props.dispatch}
                                             onChange={(value)=>console.log(value)}
                                             model='forms.addProductOffer.addProductOffer.expirationDate' />
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
                                           model="forms.products.productForms"
                                           dispatch={this.props.dispatch}/>
                        </div>
                        <div className='group-item-wr'>
                            <label htmlFor=".tradeName">Trade Name</label>
                            <Control.text model=".tradeName"
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
                                           model="forms.products.productGrade"
                                           dispatch={this.props.dispatch}/>
                        </div>
                        <div className='group-item-wr'>
                            <label htmlFor=".condition">Condition</label>
                            <DropdownRedux opns={this.props.productConditions} placeholder='Select'
                                           model="forms.products.productConditions"
                                           dispatch={this.props.dispatch}/>
                        </div>
                        </div>
                    </div>
                        <div>
                            <div className="group-item-wr">
                                <label htmlFor=".externalNotes">External notes</label>
                                <Control.textarea model=".externalNotes" id=".externalNotes" className="textarea" placeholder="Enter notes here" />
                            </div>
                            <div className="group-item-wr">
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


