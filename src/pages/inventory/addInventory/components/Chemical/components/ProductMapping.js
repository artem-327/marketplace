import React, {Component} from 'react';
import {Control, Form, Errors} from 'react-redux-form';
import DropdownRedux from "../../../../../../components/Dropdown/DropdownRedux";
import {required, isNumber, min, messages} from "../../../../../../utils/validation";
import './ProductMapping.css'
import Tooltip from "../../../../../../components/Tooltip/Tooltip";
export default class ProductMapping extends Component {
    constructor(props){
        super(props);
        this.state = {
            save: false,
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
        values = Object.assign({}, values, {
            product: this.props.productID
        });
        this.setState({save: true}, ()=>{
            this.props.saveMapping(values);
                setTimeout(function(){
                    this.setState({save: false});
                }.bind(this),1000);
        });
    }

    render() {

        //console.log(this.props)

        let button = this.state.save ? <button className='saved-productMapping'>SAVED</button> :
            <button className='save-productMapping'>Save Mapping</button>;

        return (

            <div>
                <h4 className=''>PRODUCT MAPPING</h4>
                <Form model="forms.productMapping" onSubmit={(values)=>this.saveMapping(values)} >
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
                        <label htmlFor=".indexName">CAS Index Name</label>
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
                        <label htmlFor=".casNumber">CAS Number</label>
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
                        <label htmlFor=".chemicalName">Chemical Name</label>
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
                        <label htmlFor=".productName">Product Name</label>
                        <Control.text model=".productName"
                                      validators={{required}}
                                      id=".productName"
                                      defaultValue=""
                                      />
                    </div>
                    <div className='group-item-wr'>
                        <Errors
                            className="form-error"
                            model=".productNumber"
                            show="touched"
                            messages={{
                                required: messages.required,
                            }}
                        />
                        <label htmlFor=".productNumber">Product Number</label>
                        <Control.text model=".productNumber"
                                      validators={{required}}
                                      id=".productNumber"
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
                                isNumber: messages.isNumber

                            }}
                        />
                        <label htmlFor=".measurements">Measure</label>
                        <Control.text model=".packaging.size"
                                      validators={{min: (val) => min(val, 0), isNumber, required}}
                                      id=".measurements"
                                      
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
                        <label htmlFor=".productGrade">U/M</label>
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
                        <label htmlFor=".productCondition">U/P</label>
                        <DropdownRedux opns={this.props.unitOfPackaging} placeholder='Select'
                                       model="forms.productMapping.packaging.packagingType"
                                       dispatch={this.props.dispatch}
                                       validators={{required}}
                                       />
                    </div>
                    {!this.props.edit ?
                    <React.Fragment>
                        <Tooltip className="save-mapping" content="By selecting 'Save Mapping' CAS Name, CAS Number, Product Name and Product Number will be mapped
                                  in our system. Next time you enter this product these fields will be pre-populated for you."/>
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


