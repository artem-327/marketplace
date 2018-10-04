import React, {Component} from 'react';
import {Control, Form, Errors} from 'react-redux-form';
import DropdownRedux from "../../../../../../components/Dropdown/DropdownRedux";
import DatepickerRedux from "../../../../../../components/Datepicker/DatepickerRedux";
import './ProductOffering.css'
import {required, messages, min, isNumber, maxPercent, bigger} from "../../../../../../utils/validation";
import RemoteComboBoxRedux from "../../../../../../components/ComboBox/RemoteComboBoxRedux";
import Tooltip from "../../../../../../components/Tooltip/Tooltip";

export default class ProductOffering extends Component {
    constructor(props) {
        super(props);
        this.state = {
            save: false,
            firstValue: true,
        }
    }

    componentDidMount() {
        this.props.fetchProductForms();
        this.props.fetchProductGrade();
        this.props.fetchProductConditions();
    }

    componentWillUnmount() {
        this.props.resetForm('forms.productOffering');
    }

    validateMapping() {
        if (this.props.productMapping.indexName === '' || this.props.productMapping.casNumber === '' || this.props.productMapping.chemicalName === '' || this.props.productMapping.productName === '' || this.props.productMapping.productNumber === '' || this.props.productMapping.measurements === '' || this.props.productMapping.packaging.container === undefined || this.props.productMapping.packaging.unit === undefined) {
            return true;
        }
    }

    saveOffering(values) {
        if (this.validateMapping()) {
            this.props.addMessage("Please fill mapping forms before you add new lot.");
            return;
        }
        this.setState({save: true, firstValue: false});
        this.props.addLot(values);
    }

    render() {
        let button = this.state.save ? <button className='button big added-productOffering'>Added</button> :
            <button className='button big add-productOffering'>Add Lot</button>;
        return (
            <div>
                <h6 className=''>PRODUCT OFFERING</h6>
                <Form model="forms.productOffering" onSubmit={(values) => this.saveOffering(values)}>
                    <div>
                        <Errors
                            className="form-error"
                            model=".totalPackages"
                            show="touched"
                            messages={{
                                required: messages.required,
                                min: messages.min,
                                isNumber: messages.isNumber
                            }}
                        />
                        <div className='group-item-wr'>
                            <label htmlFor=".totalPackages">Total Packages</label>
                            <Control.text model=".totalPackages"
                                          validators={{min: (val) => min(val, 0), isNumber, required}}
                                          id=".totalPackages"
                            />
                        </div>
                        <Errors
                            className="form-error"
                            model=".lotNumber"
                            show="touched"
                            messages={{
                                required: messages.required,
                                min: messages.min,
                                isNumber: messages.isNumber
                            }}
                        />
                        <div className='group-item-wr'>
                            <label htmlFor=".lotNumber">Lot Number</label>
                            <Control.text model=".lotNumber"
                                          validators={{min: (val) => min(val, 0), isNumber, required}}
                                          id=".lotNumber"/>
                        </div>
                        <div className='group-item-wr'>
                            <label htmlFor=".creationDate">Created Date</label>
                            <DatepickerRedux placeholder={'test'}
                                             dispatch={this.props.dispatch}
                                             onChange={(value) => console.log(value)}
                                             model='forms.productOffering.creationDate'/>
                            <Errors model='forms.productOffering.creationDate'
                                    show="touched"
                                    messages={{required: 'Required'}}/>
                        </div>
                        <div className='group-item-wr'>
                            <label htmlFor=".expirationDate">Expiration Date</label>
                            <DatepickerRedux placeholder={'test'}
                                             dispatch={this.props.dispatch}
                                             onChange={(value) => console.log(value)}
                                             model='forms.productOffering.expirationDate'/>
                        </div>
                    </div>
                    <div>
                        <Errors
                            className="form-error"
                            model=".manufacturer"
                            show="touched"
                            messages={{
                                required: messages.required,
                            }}
                        />
                        <div className='group-item-wr'>
                            <RemoteComboBoxRedux items={this.props.manufacturer}
                                                 api={(text) => this.props.fetchManufacturer(text)}
                                                 currentValue={this.props.edit ? this.props.productOffer.manufacturer : null}
                                                 className="manufacturer" limit={5} label="Manufacturer"
                                                 isFetching={this.props.isFetchingManufacturer}
                                                 validators={{required}} dispatch={this.props.dispatch}
                                                 model="forms.productOffering.manufacturer"/>
                        </div>

                        <div className='group-item-wr'>
                            <Errors
                                className="form-error"
                                model="forms.productOffering.origin"
                                show="touched"
                                messages={{
                                    required: messages.required,
                                }}
                            />
                            <RemoteComboBoxRedux items={this.props.originData}
                                                 api={(text) => this.props.fetchOrigin(text)}
                                                 className="origin" limit={5} label="Origin"
                                                 currentValue={this.props.edit ? this.props.productOffer.origin : null}
                                                 isFetching={this.props.isFetchingOrigin}
                                                 validators={{required}} dispatch={this.props.dispatch}
                                                 model="forms.productOffering.origin"/>
                        </div>
                        <Errors
                            className="form-error"
                            model="forms.productOffering.productForm"
                            show="touched"
                            messages={{
                                required: messages.required,
                            }}
                        />
                        <div className='group-item-wr'>
                            <label htmlFor=".form">Form</label>
                            <DropdownRedux opns={this.props.productForms} placeholder='Select'
                                           model="forms.productOffering.productForm"
                                           validators={{required}}
                                           dispatch={this.props.dispatch}
                            />
                        </div>
                        <Errors
                            className="form-error"
                            model=".name"
                            show="touched"
                        />
                        <div className='group-item-wr'>
                            <label htmlFor=".tradeName">Trade Name</label>
                            <Control.text model=".name"
                                          id=".tradeName"
                            />
                        </div>
                        <div>
                            <Errors
                                className="form-error"
                                model=".assayMin"
                                show="touched"
                                messages={{
                                    required: messages.required,
                                    min: messages.min,
                                    isNumber: messages.isNumber,
                                    maxPercent: messages.maxPercent
                                }}
                            />
                            <div className='group-item-wr'>
                                <label htmlFor=".assayMin">Assay Min %</label>
                                <Control.text model=".assayMin"
                                              validators={{min: (val) => min(val, 0), isNumber, required, maxPercent}}
                                              id=".assayMin"
                                />
                            </div>
                            <Errors
                                className="form-error"
                                model=".assayMax"
                                show="touched"
                                messages={{
                                    required: messages.required,
                                    min: messages.min,
                                    isNumber: messages.isNumber,
                                    maxPercent: messages.maxPercent,
                                    bigger: messages.bigger
                                }}
                            />
                            <div className='group-item-wr'>
                                <label htmlFor=".assayMax">Assay Max %</label>
                                <Control.text model=".assayMax"
                                              validators={{
                                                  min: (val) => min(val, 0),
                                                  bigger: (val) => bigger(val, this.props.productOffering.assayMin),
                                                  isNumber,
                                                  required,
                                                  maxPercent
                                              }}
                                              id=".assayMax"
                                />
                            </div>
                            <Errors
                                className="form-error"
                                model="forms.productOffering.productGrade"
                                show="touched"
                                messages={{
                                    required: messages.required,
                                }}
                            />
                            <div className='group-item-wr'>
                                <label htmlFor=".grade">Grade</label>
                                <DropdownRedux opns={this.props.productGrade} placeholder='Select'
                                               model="forms.productOffering.productGrade"
                                               validators={{required}}
                                               dispatch={this.props.dispatch}
                                />
                            </div>
                            <Errors
                                className="form-error"
                                model="forms.productOffering.productCondition"
                                show="touched"
                                messages={{
                                    required: messages.required,
                                }}
                            />
                            <div className='group-item-wr'>
                                <label htmlFor=".condition">Condition</label>
                                <DropdownRedux opns={this.props.productConditions} placeholder='Select'
                                               model="forms.productOffering.productCondition"
                                               validators={{required}}
                                               dispatch={this.props.dispatch}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Tooltip className="notes" content="External notes are visible to other merchants."/>
                        <div className="group-item-wr notes-textarea">
                            <label htmlFor=".externalNotes">External notes</label>
                            <Control.textarea model=".externalNotes" id=".externalNotes" className="textarea"
                                              placeholder="Enter notes here"/>
                        </div>
                        <Tooltip className="notes" content="Internal notes are visible to you or other users of your company only."/>
                        <div className="group-item-wr notes-textarea">
                            <label htmlFor=".internalNotes">Internal Notes</label>
                            <Control.textarea model=".internalNotes" id=".internalNotes" className="textarea"
                                              placeholder="Enter notes here"/>

                        </div>
                        {!this.props.edit ? button : null}
                    </div>
                </Form>
            </div>
        );
    }
}


