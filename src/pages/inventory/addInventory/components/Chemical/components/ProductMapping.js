import React, {Component} from 'react';
import {Control, Form, Errors} from 'react-redux-form';
import DropdownRedux from "../../../../../../components/Dropdown/DropdownRedux";
import {required, isInteger, min, messages} from "../../../../../../utils/validation";
import './ProductMapping.css'
import Tooltip from "../../../../../../components/Tooltip/Tooltip";
import {FormattedMessage} from 'react-intl';
import {checkToken} from "../../../../../../utils/auth";
export default class ProductMapping extends Component {
    
    constructor(props){
        super(props);
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
                        <Errors
                            className="form-error"
                            model=".indexName"
                            show="touched"
                            messages={{
                                required: messages.required,
                            }}
                        />
                        <label htmlFor=".indexName">
                            <FormattedMessage
                                id='addInventory.CasIndexName'
                                defaultMessage='CAS Index Name'
                            />
                        </label>
                        <Control.text model=".indexName"
                                      validators={{
                                          required,
                                      }}
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
                                required: messages.required,
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
                                      validators={{required}}
                                      disabled={true}
                                      id=".casNumber"
                                      defaultValue={""}
                        />
                    </div>
                    <div className='group-item-wr'>
                        <Errors
                            className="form-error"
                            model=".chemicalName"
                            show="touched"
                            messages={{
                                required: messages.required,
                            }}
                        />
                        <label htmlFor=".chemicalName">
                            <FormattedMessage
                                id='addInventory.chemicalName'
                                defaultMessage='Chemical Name'
                            />
                        </label>
                        <Control.text model=".chemicalName"
                                      validators={{required}}
                                      disabled={true}
                                      id=".chemicalName"
                                      defaultValue={""}
                        />
                    </div>
                </div>
                <div>
                {!this.props.edit ?
                    <React.Fragment>
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
                                      defaultValue=""
                                      />
                    </div>
                    <div className='group-item-wr'>
                        <Errors
                            className="form-error"
                            model=".productCode"
                            show="touched"
                            messages={{
                                required: messages.required,
                            }}
                        />
                        <label htmlFor=".productCode">
                            <FormattedMessage
                                id='addInventory.productCode'
                                defaultMessage='Product Number'
                            />
                        </label>
                        <Control.text model=".productCode"
                                      validators={{required}}
                                      id=".productCode"
                                      defaultValue=""
                                      />
                    </div>
                    </React.Fragment>
                    : null }
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
                        <DropdownRedux opns={this.props.unitOfMeasurement} placeholder='Select'
                                       model="forms.productMapping.packaging.unit"
                                       validators={{required}}
                                       dispatch={this.props.dispatch}
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
                        <DropdownRedux opns={this.props.unitOfPackaging} placeholder='Select'
                                       model="forms.productMapping.packaging.packagingType"
                                       dispatch={this.props.dispatch}
                                       validators={{required}}
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


