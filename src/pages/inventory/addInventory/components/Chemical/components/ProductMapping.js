import React, {Component} from 'react';
import {Control, Form, Errors} from 'react-redux-form';
import DropdownRedux from "../../../../../../components/Dropdown/DropdownRedux";
import {required, isInteger, min, messages} from "../../../../../../utils/validation";
import './ProductMapping.scss'
import Tooltip from "../../../../../../components/Tooltip/Tooltip";
import {FormattedMessage} from 'react-intl';
import {checkToken} from "../../../../../../utils/auth";
export default class ProductMapping extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            'packagingType': (props.productOffer.packaging && props.productOffer.packaging.unit.measureType ? props.productOffer.packaging.unit.measureType : null),
            'measurementType': null
        }
    }

    componentDidMount(){
        this.props.getUnitOfMeasurement();
        this.props.getUnitOfPackaging();
    }

    componentWillUnmount(){
        this.props.resetForm('forms.productMapping');
    }

    saveMapping(values){
        if (checkToken(this.props)) return;

        values = Object.assign({}, values, {
            packaging: { ...values.packaging, size: Number(values.packaging.size) },
            product: this.props.productID,
            fakeSubmit: document.getElementById('form-mapping').classList.contains('validate-only')
        });

        // clear validate-only mark
        document.getElementById("form-mapping").classList.remove('validate-only')

        this.props.saveMapping(values);
        setTimeout(function(){
            this.props.setSavedMappingToFalse();
        }.bind(this),1000);
    }

    selectedMeasurementUnit(value) {
        if (this.state && this.state.measurementType)
            return

        for (let j = 0; j < this.props.unitOfMeasurement.length; j++) {
            if (this.props.unitOfMeasurement[j].id === value) {
                this.setState({
                    'packagingType': this.props.unitOfMeasurement[j].measureType
                })
            }
        }
    }

    selectedPackagingUnit(value) {
        if (this.state && this.state.packagingType)
            return

        for (let j = 0; j < this.props.unitOfPackaging.length; j++) {
            if (this.props.unitOfPackaging[j].id === value) {
                this.setState({
                    'measurementType': this.props.unitOfPackaging[j].measureType
                })
            }
        }
    }

    getMeasurementUnits() {
        let type = this.state && this.state.measurementType ? this.state.measurementType : null
        if (!type)
            return this.props.unitOfMeasurement

        return this.props.unitOfMeasurement.filter((unit) => {
            return (unit.measureType === type)
        })
    }

    getPackagingUnits() {
        let type = this.state && this.state.packagingType ? this.state.packagingType : null
        if (!type)
            return this.props.unitOfPackaging

        return this.props.unitOfPackaging.filter((unit) => {
            return (unit.measureType === type)
        })
    }

    render() {
        let button = this.props.savedMapping ?
            <button className='saved-productMapping'>
                <FormattedMessage
                    id='addInventory.saved'
                    defaultMessage='SAVED'
                />
            </button>
            : <button id="mapping-btn" className='save-productMapping'>
                <FormattedMessage
                    id='addInventory.saveMapping'
                    defaultMessage='Save Mapping'
                />
            </button>;

        return (

            <div>
                <h4>
                    <FormattedMessage
                        id='addInventory.productMapping'
                        defaultMessage='PRODUCT MAPPING'
                    />
                </h4>
                <Form
                    id="form-mapping"
                    model="forms.productMapping"
                    onSubmit={(values)=>this.saveMapping(values)}>
                <div>
                    <div className='group-item-wr'>
                        <label htmlFor=".indexName">
                            <FormattedMessage
                                id='addInventory.CasIndexName'
                                defaultMessage='CAS Index Name'
                            />
                        </label>
                        <Control.text model=".indexName"
                                      disabled={true}
                                      id=".indexName"
                                      defaultValue={""}
                        />
                    </div>
                    <div className='group-item-wr'>
                        <Errors
                            className="form-error"
                            model=".casNumber"
                            show="touched"
                            messages={{
                                isCasNumber: messages.isCasNumber
                            }}
                        />
                        <label htmlFor=".casNumber">
                            <FormattedMessage
                                id='addInventory.CasNumber'
                                defaultMessage='CAS Number'
                            />
                        </label>
                        <Control.text model=".casNumber"
                                      //validators={{required}} //! ! validace cisla??
                                      disabled={true}
                                      id=".casNumber"
                                      defaultValue={""}
                        />
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor=".chemicalName">
                            <FormattedMessage
                                id='addInventory.chemicalName'
                                defaultMessage='Chemical Name'
                            />
                        </label>
                        <Control.text model=".chemicalName"
                                      disabled={true}
                                      id=".chemicalName"
                                      defaultValue={""}
                        />
                    </div>
                </div>
                <div>
                    <div className='group-item-wr'>
                        <Errors
                            className="form-error"
                            model=".productName"
                            show="touched"
                            messages={{
                                required: messages.required,
                            }}
                        />
                        <label htmlFor=".productName">
                            <FormattedMessage
                                id='addInventory.productName'
                                defaultMessage='Product Name'
                            />
                        </label>
                        <Control.text model=".productName"
                                      validators={{required}}
                                      id=".productName"
                                      defaultValue={this.props.edit ? this.props.productOffer.productName : ''}
                                      />
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor=".productCode">
                            <FormattedMessage
                                id='addInventory.productCode'
                                defaultMessage='Product Number'
                            />
                        </label>
                        <Control.text model=".productCode"
                                      id=".productCode"
                                      defaultValue={this.props.edit ? this.props.productOffer.productCode : ''}
                                      />
                    </div>
                    <div className='group-item-wr'>
                        <Errors
                            className="form-error"
                            model=".packaging.size"
                            show="touched"
                            messages={{
                                required: messages.required,
                                min: messages.min,
                                isInteger: messages.isInteger
                            }}
                        />
                        <label htmlFor=".measurements">
                            <FormattedMessage
                                id='addInventory.measure'
                                defaultMessage='Measure'
                            />
                        </label>
                        <Control.text model=".packaging.size"
                                      validators={{required, min: (val) => min(val, 0), isInteger}}
                                      id=".measurements"
                                      onChange={this.props.measureHandler}
                                      //defaultValue=""
                                      />
                    </div>
                    <div className='group-item-wr'>
                        <Errors
                            className="form-error"
                            model="forms.productMapping.packaging.unit"
                            show="touched"
                            messages={{
                                required: messages.required,
                            }}
                        />
                        <label htmlFor=".productGrade">
                            <FormattedMessage
                                id='addInventory.UM'
                                defaultMessage='U/M'
                            />
                        </label>
                        <DropdownRedux opns={this.getMeasurementUnits()} placeholder='Select'
                                       model="forms.productMapping.packaging.unit"
                                       validators={{required}}
                                       dispatch={this.props.dispatch}
                                       onChange={(value)=>this.selectedMeasurementUnit(value)}
                                       //defaultValue=""
                                       />
                    </div>
                    <div className='group-item-wr'>
                        <Errors
                            className="form-error"
                            model="forms.productMapping.packaging.packagingType"
                            show="touched"
                            messages={{
                                required: messages.required,
                            }}
                        />
                        <label htmlFor=".productCondition">
                            <FormattedMessage
                                id='addInventory.UP'
                                defaultMessage='U/P'
                            />
                        </label>
                        <DropdownRedux opns={this.getPackagingUnits()} placeholder='Select'
                                       model="forms.productMapping.packaging.packagingType"
                                       dispatch={this.props.dispatch}
                                       validators={{required}}
                                       onChange={(value)=>this.selectedPackagingUnit(value)}
                                       />
                    </div>
                    {!this.props.edit ?
                    <React.Fragment>
                        <Tooltip
                            className="save-mapping"
                        />
                        {button}
                    </React.Fragment>
                    : null
                    }

                </div>
                </Form>
            </div>
        );
    }
}


