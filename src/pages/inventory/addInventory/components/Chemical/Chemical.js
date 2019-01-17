import React, {Component} from 'react';
import ProductOffering from "./components/ProductOffering";
import ProductMapping from "./components/ProductMapping";
import AddedLots from "./components/AddedLots/AddedLots";
import SearchProducts from './components/SearchProducts';
import AdditionalDocuments from "./components/AdditionalDocuments";
/*
import WarningLabel from "./components/WarningLabel";
import {Control, Errors, Form} from "react-redux-form";
import {isNumber, maxPercent, messages, min, required} from "../../../../../utils/validation";
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";
import Tooltip from "../../../../../components/Tooltip/Tooltip";
import RemoteComboBoxRedux from "../../../../../components/ComboBox/RemoteComboBoxRedux";
import DatepickerRedux from "../../../../../components/Datepicker/DatepickerRedux";
import moment from "moment";
*/

class Chemical extends Component {
    constructor(props) {
        super(props);
        this.setProductMapping = this.setProductMapping.bind(this);
        this.state = {
            selectedProduct: null,
            selectedProductMapping: null,
            productID: null,
            lots: []
            /*
            save: false, // #PRODUCTMAPPING
            firstValue: true,
            minWarning: null,
            maxWarning: null
            */
        }

        // this.minValidationHandler = this.minValidationHandler.bind(this)
        // this.maxValidationHandler = this.maxValidationHandler.bind(this)
    }

    componentDidMount(){
        if(localStorage.getItem('productLots')){
            this.setState({lots: JSON.parse(localStorage.getItem('productLots'))})
        }
        if(this.props.edit){
            this.setState({productID: this.props.productOffer.product.id})
        }

        // #PRODUCTMAPPING
        /*
        this.props.getUnitOfMeasurement();
        this.props.getUnitOfPackaging();
        this.props.fetchProductForms();
        this.props.fetchProductGrade();
        this.props.fetchProductConditions();
        this.props.fetchOrigin();
        */
    }

    /*
    componentWillUnmount() {
        this.props.resetForm('forms.productOffering');
    }
    */

    setProductMapping(mapping) {
        this.setState({selectedProductMapping: mapping, productID: mapping.product.id}, () => {
            let inputs = {
                indexName: this.state.selectedProductMapping.product.casIndexName,
                casNumber: this.state.selectedProductMapping.product.casNumber,
                productName: this.state.selectedProductMapping.productName,
                productNumber: this.state.selectedProductMapping.productNumber,
                chemicalName: this.state.selectedProductMapping.product.chemicalName,
                packaging:{
                    unit: this.state.selectedProductMapping.packaging.unit.id,
                    packagingType: this.state.selectedProductMapping.packaging.packagingType.id,
                    size: this.state.selectedProductMapping.packaging.size
                }
            };
            this.props.setMapping(inputs);
        })
    }

    setSelectedProduct(product){
        this.setState({selectedProduct: product, productID: product.id}, () => {
            let inputs = {
                indexName: this.state.selectedProduct.casIndexName,
                casNumber: this.state.selectedProduct.casNumber,
                chemicalName: this.state.selectedProduct.chemicalName,
            };
            this.props.setMapping(inputs);
        })
    }

    addLot(lots){
        let productMapping = Object.assign({}, this.props.productMapping, {
            packaging: {...this.props.productMapping.packaging, amount: lots.pkgAmount},
        });
        if(!localStorage.getItem('productLots')){
            let values = [{...lots, ...productMapping, product: this.state.productID}];
            localStorage.setItem('productLots', JSON.stringify(values));
            this.setState({lots: values});
            this.props.addLotSaveOffering();

        }else{
            let newLots = JSON.parse(localStorage.getItem('productLots'));
            newLots.push({...lots, ...productMapping, product: this.state.productID});
            localStorage.setItem('productLots', JSON.stringify(newLots));
            this.setState({lots: newLots});
            this.props.addLotSaveOffering();
        }
    }

    removeLots(index){
        let newLots = JSON.parse(localStorage.getItem('productLots'));
        newLots.splice(index, 1);
        localStorage.setItem('productLots', JSON.stringify(newLots));
        this.setState({lots: newLots})
    }

    /*
    saveMapping(values){
        values = Object.assign({}, values, {
            product: this.state.productID
        });
        this.setState({save: true}, ()=>{
            this.props.saveMapping(values);
            setTimeout(function(){
                this.setState({save: false});
            }.bind(this),1000);
        });
    }

    renderProductMapping() {

        let button = this.state.save ? <button className='saved-productMapping'>SAVED</button> :
            <button className='save-productMapping'>Save Mapping</button>;

        // <Form model="forms.productMapping" onSubmit={(values)=>this.saveMapping(values)} >

        return (

            <div>
                <h4 className=''>PRODUCT MAPPING</h4>
                <div>
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
                                          onChange={this.props.measureHandler}
                                //defaultValue=""
                            />
                        </div>
                        <div className='group-item-wr'>
                            <Errors
                                className="form-error"
                                model=".packaging.unit"
                                show="touched"
                                messages={{
                                    required: messages.required,
                                }}
                            />
                            <label htmlFor=".productGrade">U/M</label>
                            <DropdownRedux opns={this.props.unitOfMeasurement} placeholder='Select'
                                           model=".packaging.unit"
                                           validators={{required}}
                                           dispatch={this.props.dispatch}
                                //defaultValue=""
                            />
                        </div>
                        <div className='group-item-wr'>
                            <Errors
                                className="form-error"
                                model=".packaging.packagingType"
                                show="touched"
                                messages={{
                                    required: messages.required,
                                }}
                            />
                            <label htmlFor=".productCondition">U/P</label>
                            <DropdownRedux opns={this.props.unitOfPackaging} placeholder='Select'
                                           model=".packaging.packagingType"
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
                </div>
            </div>
        );
    }

    minValidationHandler(e) {
        let assayMin = parseInt(e.target.value);
        let assayMax = parseInt(this.props.productOffering.assayMax);
        let newMinWarning;
        let newMaxWarning;

        if (assayMin > assayMax) {
            newMinWarning = 'Must be < or = Max'
        }

        if (assayMax && (assayMin < assayMax)) {
            newMaxWarning = null
        }

        this.setState({minWarning: newMinWarning, maxWarning: newMaxWarning})
    }

    maxValidationHandler(e) {
        let assayMax = parseInt(e.target.value);
        let assayMin = parseInt(this.props.productOffering.assayMin);
        let newMinWarning;
        let newMaxWarning;

        if (assayMin > assayMax) {
            newMaxWarning = 'Must be > or = Min'
        }

        if (assayMin && (assayMin < assayMax)) {
            newMinWarning = null
        }

        this.setState({maxWarning: newMaxWarning, minWarning: newMinWarning})
    }

    saveOffering(values) {

        if (!parseInt(this.props.productOffering.assayMin) && !parseInt(this.props.productOffering.assayMax)) {
            this.setState({minWarning: 'Required', maxWarning: 'Required'})
        }

        if (!this.state.minWarning && !this.state.maxWarning) {
            this.setState({save: true, firstValue: false});
            // this.props.addLot(values);
            this.addLot(values);
            this.props.resetForm('forms.productOffering'); // without manufacturer and origin
        }
    }

    renderProductOffering() {

        let lotNumber = !this.props.edit
            ? <div className='group-item-wr'>
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
                <label htmlFor=".lotNumber">Lot Number</label>
                <Control.text model=".lotNumber"
                              validators={{min: (val) => min(val, 0), isNumber, required}}
                              id=".lotNumber"/>
            </div>
            : null;

        let button = <button className='button big add-productOffering'>Add Lot</button>;

        // <Form model="forms.productOffering" onSubmit={(values) => this.saveOffering(values)}>
        // forms.addProductOffer
        return (
            <div>
                <h4 className=''>PRODUCT OFFERING</h4>
                <div>
                    <div>
                        <div className='group-item-wr'>
                            <Errors
                                className="form-error"
                                model=".manufacturer"
                                show="touched"
                                messages={{
                                    required: messages.required,
                                }}
                            />
                            <RemoteComboBoxRedux items={this.props.manufacturer}
                                                 api={(text) => this.props.fetchManufacturer(text)}
                                                 dataFetched={this.props.manufacturerFetched}
                                                 currentValue={this.props.edit ? this.props.productOffer.manufacturer.name : null}
                                                 className="manufacturer" limit={5} label="Manufacturer"
                                                 isFetching={this.props.isFetchingManufacturer}
                                                 saveObj={obj=>obj}
                                                 validators={{required}} dispatch={this.props.dispatch}
                                                 model=".manufacturer"
                                                 defaultValue={""}/>
                        </div>

                        <div className='group-item-wr'>
                            <Errors
                                className="form-error"
                                model=".origin"
                                show="touched"
                                messages={{
                                    required: messages.required,
                                }}
                            />
                            <RemoteComboBoxRedux items={this.props.originData}
                                                 dataFetched={this.props.originFetched}
                                                 api={(text) => this.props.fetchOrigin(text)}
                                                 className="origin" limit={5} label="Origin"
                                                 currentValue={this.props.edit ? this.props.productOffer.origin.name : null}
                                                 isFetching={this.props.isFetchingOrigin}
                                                 saveObj={obj=>obj}
                                                 validators={{required}}
                                                 dispatch={this.props.dispatch}
                                                 model=".origin"/>
                        </div>
                        <div className='group-item-wr'>
                            <Errors
                                className="form-error"
                                model=".productForm"
                                show="touched"
                                messages={{
                                    required: messages.required,
                                }}
                            />
                            <label htmlFor=".form">Form</label>
                            <DropdownRedux opns={this.props.productForms}
                                           placeholder='Select'
                                           model=".productForm"
                                           validators={{required}}
                                           dispatch={this.props.dispatch}
                                           defaultValue=""
                            />
                        </div>
                        <div className='group-item-wr'>
                            <Errors
                                className="form-error"
                                model=".name"
                                show="touched"
                            />
                            <label htmlFor=".tradeName">Trade Name</label>
                            <Control.text model=".tradeName"
                                          id=".tradeName"
                            />
                        </div>
                        <div>
                            <div className='group-item-wr'>
                                <Errors
                                    className="form-error"
                                    model=".assayMin"
                                    show="touched"
                                    messages={{
                                        required: messages.required,
                                        min: messages.min,
                                        isNumber: messages.isNumber,
                                        maxPercent: messages.maxPercent,

                                    }}
                                />
                                <label htmlFor=".assayMin">Assay Min %</label>
                                <Control.text model=".assayMin"
                                              onChange={this.minValidationHandler}
                                              type="number"
                                              id=".assayMin"
                                              validators={{
                                                  required,
                                                  isNumber,
                                                  min: (val) => min(val, 0),
                                                  maxPercent
                                              }}
                                />
                                <div class="warning">{this.state.minWarning}</div>
                            </div>
                            <div className='group-item-wr'>
                                <Errors
                                    className="form-error"
                                    model=".assayMax"
                                    show="touched"
                                    messages={{
                                        required: messages.required,
                                        min: messages.min,
                                        isNumber: messages.isNumber,
                                        maxPercent: messages.maxPercent,
                                    }}
                                />
                                <label htmlFor=".assayMax">Assay Max %</label>
                                <Control.text model=".assayMax"
                                              onChange={this.maxValidationHandler}
                                              type="number"
                                              id=".assayMax"
                                              validators={{
                                                  required,
                                                  isNumber,
                                                  min: (val) => min(val, 0),
                                                  maxPercent
                                              }}
                                />
                                <div class="warning">{this.state.maxWarning}</div>
                            </div>
                            <div className='group-item-wr'>
                                <Errors
                                    className="form-error"
                                    model=".productGrade"
                                    show="touched"
                                    messages={{
                                        required: messages.required,
                                    }}
                                />
                                <label htmlFor=".grade">Grade</label>
                                <DropdownRedux opns={this.props.productGrade} placeholder='Select'
                                               model=".productGrade"
                                               validators={{required}}
                                               dispatch={this.props.dispatch}
                                />
                            </div>
                            <div className='group-item-wr'>
                                <Errors
                                    className="form-error"
                                    model=".productCondition"
                                    show="touched"
                                    messages={{
                                        required: messages.required,
                                    }}
                                />
                                <label htmlFor=".condition">Condition</label>
                                <DropdownRedux opns={this.props.productConditions}
                                               placeholder='Select'
                                               model=".productCondition"
                                               validators={{required}}
                                               dispatch={this.props.dispatch}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="group-item-wr long">
                            <Tooltip className="notes" content="External notes are visible to other merchants."/>
                            <div className="notes-textarea">
                                <label htmlFor=".externalNotes">External notes</label>
                                <Control.textarea model=".externalNotes" id=".externalNotes" className="textarea"
                                                  placeholder="Enter notes here"/>
                            </div>
                        </div>
                        <div className="group-item-wr long">
                            <Tooltip className="notes" content="Internal notes are visible to you or other users of your company only."/>
                            <div className="notes-textarea">
                                <label htmlFor=".internalNotes">Internal Notes</label>
                                <Control.textarea model=".internalNotes" id=".internalNotes" className="textarea"
                                                  placeholder="Enter notes here"/>

                            </div>
                        </div>
                        <div>
                            <div className='group-item-wr'>
                                <Errors
                                    className="form-error"
                                    model=".pkgAmount"
                                    show="touched"
                                    messages={{
                                        required: messages.required,
                                        min: messages.min,
                                        isNumber: messages.isNumber
                                    }}
                                />
                                <label htmlFor=".pkgAmount">Total Packages</label>
                                <Control.text model=".pkgAmount"
                                              validators={{min: (val) => min(val, 0), isNumber, required}}
                                              id=".pkgAmount"
                                              onChange={this.props.totalPackagesHandler}
                                />
                            </div>
                            {lotNumber}

                            <div className='group-item-wr'>
                                <Errors model='forms.productOffering.creationDate'
                                        show="touched"
                                        messages={{required: 'Required'}}/>
                                <label htmlFor=".creationDate">MFG Date</label>
                                <DatepickerRedux placeholder={'test'}
                                                 maxDate={moment().subtract(1, "days")}
                                                 dispatch={this.props.dispatch}
                                                 onChange={(value) => console.log(value)}
                                                 model='forms.productOffering.creationDate'/>
                            </div>
                            <div className='group-item-wr'>
                                <label htmlFor=".expirationDate">Expiration Date</label>
                                <DatepickerRedux placeholder={'test'}
                                                 minDate={moment().add(1, "days")}
                                                 dispatch={this.props.dispatch}
                                                 onChange={(value) => console.log(value)}
                                                 model='forms.productOffering.expirationDate'/>
                            </div>
                            <div className='group-item-wr'>
                                {!this.props.edit ? button : null}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
    */

    render() {

        // {this.renderProductMapping()}
        // {this.renderProductOffering()}

        // <ProductMapping productID={this.state.productID} {...this.props} />
        // <ProductOffering addLot={(lots) => this.addLot(lots)} {...this.props} />

        return (
            <div>
                {!this.props.edit ?
                <React.Fragment>
                    <SearchProducts selectedMapping={this.state.selectedProductMapping}
                                    selectedProduct={this.state.selectedProduct}
                                    isVisible={true}
                                    onSelectProductMapping={mapping => this.setProductMapping(mapping)}
                                    onSelect={product => this.setSelectedProduct(product)}
                                    {...this.props}
                    />
                </React.Fragment> : null }
                <ProductMapping productID={this.state.productID} {...this.props} />
                <ProductOffering addLot={(lots) => this.addLot(lots)} {...this.props} />
                {!this.props.edit ?
                <AddedLots lots={this.state.lots} removeLot={(index) => this.removeLots(index)}/> : null }
                <AdditionalDocuments/>
            </div>
        );
    }
}

export default Chemical;