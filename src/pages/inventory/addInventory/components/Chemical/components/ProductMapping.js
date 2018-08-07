import React, {Component} from 'react';
import {Control, Form, Errors} from 'react-redux-form';
import DropdownRedux from "../../../../../../components/Dropdown/DropdownRedux";
import {required, isNumber, min, isCasNumber, messages} from "../../../../../../utils/validation";

export default class ProductMapping extends Component {
    constructor(props){
        super(props);
        this.state = {
            save: false,
        }
    }

    componentDidMount () {
        this.props.getUnitOfMeasurement();
        this.props.getUnitOfPackaging();
    }
    saveMapping(values){
        values = Object.assign({}, values, {
            product: this.props.productID
        });
        this.setState({save: true}, ()=>{
            this.props.saveMapping(values);
        });
    }

    render() {
        let button = this.state.save ? <button className='saved-productMapping'>SAVED</button> :
            <button className='save-productMapping'>Save Mapping</button>;

        return (
            <div>
                <h6 className=''>PRODUCT MAPPING</h6>
                <Form model="forms.products.productsMapping" onSubmit={(values)=>this.saveMapping(values)}>
                <div>
                    <Errors
                        className="form-error"
                        model=".indexName"
                        show="touched"
                        messages={{
                            required: messages.required,
                        }}
                    />
                    <div className='group-item-wr'>
                        <label htmlFor=".indexName">CAS Index Name</label>
                        <Control.text model=".indexName"
                                      validators={{
                                          required,
                                      }}
                                      id=".indexName"/>
                    </div>
                    <Errors
                        className="form-error"
                        model=".casNumber"
                        show="touched"
                        messages={{
                            required: messages.required,
                            isCasNumber: messages.isCasNumber
                        }}
                    />
                    <div className='group-item-wr'>
                        <label htmlFor=".casNumber">CAS Number</label>
                        <Control.text model=".casNumber"
                                      validators={{isCasNumber, required}}
                                      id=".casNumber"/>
                    </div>
                    <Errors
                        className="form-error"
                        model=".chemicalName"
                        show="touched"
                        messages={{
                            required: messages.required,
                        }}
                    />
                    <div className='group-item-wr'>
                        <label htmlFor=".chemicalName">Chemical Name</label>
                        <Control.text model=".chemicalName"
                                      validators={{required}}
                                      id=".chemicalName"/>
                    </div>
                </div>
                <div>
                    <Errors
                        className="form-error"
                        model=".productName"
                        show="touched"
                        messages={{
                            required: messages.required,
                        }}
                    />
                    <div className='group-item-wr'>
                        <label htmlFor=".productName">Product Name</label>
                        <Control.text model=".productName"
                                      validators={{required}}
                                      id=".productName"/>
                    </div>
                    <Errors
                        className="form-error"
                        model=".productNumber"
                        show="touched"
                        messages={{
                            required: messages.required,
                            min: messages.min,
                            isNumber: messages.isNumber

                        }}
                    />
                    <div className='group-item-wr'>
                        <label htmlFor=".productNumber">Product Number</label>
                        <Control.text model=".productNumber"
                                      validators={{min: (val) => min(val, 0), isNumber, required}}
                                      id=".productNumber"/>
                    </div>
                    <Errors
                        className="form-error"
                        model=".packaging.capacity"
                        show="touched"
                        messages={{
                            required: messages.required,
                            min: messages.min,
                            isNumber: messages.isNumber

                        }}
                    />
                    <div className='group-item-wr'>
                        <label htmlFor=".measurements">Measurement</label>
                        <Control.text model=".packaging.capacity"
                                      validators={{min: (val) => min(val, 0), isNumber, required}}
                                      id=".measurements"/>
                    </div>
                    <Errors
                        className="form-error"
                        model="forms.products.productsMapping.packaging.unit"
                        show="touched"
                        messages={{
                            required: messages.required,
                        }}
                    />
                    <div className='group-item-wr'>
                        <label htmlFor=".productGrade">U/M</label>
                        <DropdownRedux opns={this.props.unitOfMeasurement} placeholder='Select'
                                       model="forms.products.productsMapping.packaging.unit"
                                       validators={{required}}
                                       dispatch={this.props.dispatch}/>
                    </div>
                    <Errors
                        className="form-error"
                        model="forms.products.productsMapping.packaging.container"
                        show="touched"
                        messages={{
                            required: messages.required,
                        }}
                    />
                    <div className='group-item-wr'>
                        <label htmlFor=".productCondition">U/P</label>
                        <DropdownRedux opns={this.props.unitOfPackaging} placeholder='Select'
                                       model="forms.products.productsMapping.packaging.container"
                                       dispatch={this.props.dispatch}
                                       validators={{required}}/>
                    </div>
                    {button}
                </div>
                </Form>
            </div>
        );
    }
}


