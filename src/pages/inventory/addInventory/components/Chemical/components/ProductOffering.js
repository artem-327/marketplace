import React, {Component} from 'react';
import {Control, Form, Errors} from 'react-redux-form';
import DropdownRedux from "../../../../../../components/Dropdown/DropdownRedux";
import DatepickerRedux from "../../../../../../components/Datepicker/DatepickerRedux";
import './ProductOffering.css'
import {required, messages, min, isNumber, maxPercent} from "../../../../../../utils/validation";
import RemoteComboBoxRedux from "../../../../../../components/ComboBox/RemoteComboBoxRedux";
import Tooltip from "../../../../../../components/Tooltip/Tooltip";
import moment from 'moment';
import {FormattedMessage, injectIntl} from 'react-intl';
import {checkToken} from "../../../../../../utils/auth";

class ProductOffering extends Component {
    constructor(props) {
        super(props);
        this.state = {
            save: false,
            firstValue: true,
            minWarning: null,
            maxWarning: null
        }

        this.minValidationHandler = this.minValidationHandler.bind(this)
        this.maxValidationHandler = this.maxValidationHandler.bind(this)
    }

    componentDidMount() {
        this.props.fetchProductForms();
        this.props.fetchProductGrade();
        this.props.fetchProductConditions();
        this.props.fetchOrigin();
    }

    componentWillUnmount() {
        this.props.resetForm('forms.productOffering');
    }

    // validateMapping() {
    //     if (this.props.productMapping.indexName === '' || this.props.productMapping.casNumber === '' || this.props.productMapping.chemicalName === '' || this.props.productMapping.productName === '' || this.props.productMapping.productNumber === '' || this.props.productMapping.measurements === '' || this.props.productMapping.packaging.container === undefined || this.props.productMapping.packaging.unit === undefined) {
    //         return true;
    //     }
    // }

    saveOffering(values) {
        if (!parseInt(this.props.productOffering.assayMin) && !parseInt(this.props.productOffering.assayMax)) {
            this.setState({minWarning: 'Required', maxWarning: 'Required'})
        }
        /*
        if (this.validateMapping()) {
            this.props.addMessage("Please fill mapping forms before you add new lot.");
            return;
        }
        */

        if (checkToken(this.props)) return;

        if (!this.state.minWarning && !this.state.maxWarning) {
            this.setState({save: true, firstValue: false});
            this.props.addLot(values);
        }
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

        //console.log(e.target.value)
    }

    maxValidationHandler(e) {
        let assayMax = parseInt(e.target.value);
        let assayMin = parseInt(this.props.productOffering.assayMin);
        let newMinWarning;
        let newMaxWarning;

        //console.log(e.target.value)

       
        if (assayMin > assayMax) {
            newMaxWarning = 'Must be > or = Min'
        }

        if (assayMin && (assayMin < assayMax)) {
            newMinWarning = null
        }

        this.setState({maxWarning: newMaxWarning, minWarning: newMinWarning})
    }

    render() {

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
                <label htmlFor=".lotNumber">
                    <FormattedMessage
                        id='addInventory.lotNumber'
                        defaultMessage='Lot Number'
                    />
                </label>
                <Control.text model=".lotNumber"
                            validators={{min: (val) => min(val, 0), isNumber, required}}
                            id=".lotNumber"/>
                </div>
            : null;

        /*let button = this.state.save ? <button className='button big added-productOffering'>Added</button> :
            <button className='button big add-productOffering'>Add Lot</button>;*/

        let button =
            <button id="offering-btn" className='button big add-productOffering'>
                <FormattedMessage
                    id='addIventory.addLot'
                    defaultMessage='Add Lot'
                />
            </button>;

        const { formatMessage } = this.props.intl;

        return (
            <div>
                <h4>
                    <FormattedMessage
                        id='addInventory.productOffering'
                        defaultMessage='PRODUCT OFFERING'
                    />
                </h4>
                <Form model="forms.productOffering" onSubmit={(values) => this.saveOffering(values)}>
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
                            <RemoteComboBoxRedux
                                items={this.props.manufacturer}
                                api={(text) => this.props.fetchManufacturer(text)}
                                dataFetched={this.props.manufacturerFetched}
                                currentValue={this.props.edit ? this.props.productOffer.manufacturer.name : null}
                                className="manufacturer"
                                limit={5}
                                label={formatMessage({
                                    id: 'addInventory.manufacturer',
                                    defaultMessage: 'Manufacturer'
                                })}
                                placeholder={formatMessage({
                                    id: 'addInventory.search',
                                    defaultMessage: 'Search'
                                })}
                                isFetching={this.props.isFetchingManufacturer}
                                saveObj={obj=>obj}
                                validators={{required}}
                                dispatch={this.props.dispatch}
                                model="forms.productOffering.manufacturer"
                            />
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
                            <RemoteComboBoxRedux
                                items={this.props.originData}
                                dataFetched={this.props.originFetched}
                                api={(text) => this.props.fetchOrigin(text)}
                                className="origin"
                                limit={5}
                                label={formatMessage({
                                    id: 'addInventory.origin',
                                    defaultMessage: 'Origin'
                                })}
                                placeholder={formatMessage({
                                    id: 'addInventory.search',
                                    defaultMessage: 'Search'
                                })}
                                currentValue={this.props.edit ? this.props.productOffer.origin.name : null}
                                isFetching={this.props.isFetchingOrigin}
                                saveObj={obj=>obj}
                                validators={{required}}
                                dispatch={this.props.dispatch}
                                model="forms.productOffering.origin"
                            />
                        </div>
                        <div className='group-item-wr'>
                            <Errors
                                className="form-error"
                                model="forms.productOffering.productForm"
                                show="touched"
                                messages={{
                                    required: messages.required,
                                }}
                            />
                            <label htmlFor=".form">
                                <FormattedMessage
                                    id='dataTable.Form'
                                    defaultMessage='Form'
                                />
                            </label>
                            <DropdownRedux
                                opns={this.props.productForms}
                                placeholder={formatMessage({
                                    id: 'addInventory.select',
                                    defaultMessage: 'Select'
                                })}
                                model="forms.productOffering.productForm"
                                validators={{required}}
                                dispatch={this.props.dispatch}
                            />
                        </div>
                        <div className='group-item-wr'>
                            <Errors
                                className="form-error"
                                model=".name"
                                show="touched"
                            />
                            <label htmlFor=".tradeName">
                                <FormattedMessage
                                    id='dataTable.TradeName'
                                    defaultMessage='Trade Name'
                                />
                            </label>
                            <Control.text
                                model=".tradeName"
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
                                <label htmlFor=".assayMin">
                                    <FormattedMessage
                                        id='addInventory.assayMin'
                                        defaultMessage='Assay Min %'
                                    />
                                </label>
                                <Control.text
                                    model=".assayMin"
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
                                <label htmlFor=".assayMax">
                                    <FormattedMessage
                                        id='addInventory.assayMax'
                                        defaultMessage='Assay Max %'
                                    />
                                </label>
                                <Control.text
                                    model=".assayMax"
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
                                    model="forms.productOffering.productGrade"
                                    show="touched"
                                    messages={{
                                        required: messages.required,
                                    }}
                                />
                                <label htmlFor=".grade">
                                    <FormattedMessage
                                        id='filter.grade'
                                        defaultMessage='Grade'
                                    />
                                </label>
                                <DropdownRedux
                                    opns={this.props.productGrade}
                                    placeholder={formatMessage({
                                        id: 'addInventory.select',
                                        defaultMessage: 'Select'
                                    })}
                                    model="forms.productOffering.productGrade"
                                    validators={{required}}
                                    dispatch={this.props.dispatch}
                                />
                            </div>
                            <div className='group-item-wr'>
                                <Errors
                                    className="form-error"
                                    model="forms.productOffering.productCondition"
                                    show="touched"
                                    messages={{
                                        required: messages.required,
                                    }}
                                />
                                <label htmlFor=".condition">
                                    <FormattedMessage
                                        id='dataTable.condition'
                                        defaultMessage='Condition'
                                    />
                                </label>
                                <DropdownRedux
                                    opns={this.props.productConditions}
                                    placeholder={formatMessage({
                                        id: 'addInventory.select',
                                        defaultMessage: 'Select'
                                    })}
                                    model="forms.productOffering.productCondition"
                                    validators={{required}}
                                    dispatch={this.props.dispatch}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="group-item-wr long">
                            <Tooltip
                                className="notes"
                                content={formatMessage({
                                    id: 'addInventory.externalNotesTip',
                                    defaultMessage: 'External notes are visible to other merchants.'
                                })}/>
                            <div className="notes-textarea">
                                <label htmlFor=".externalNotes">
                                    <FormattedMessage
                                        id='addInventory.externalNotes'
                                        defaultMessage='External Notes'
                                    />
                                </label>
                                <Control.textarea
                                    model=".externalNotes"
                                    id=".externalNotes"
                                    className="textarea"
                                    placeholder={formatMessage({
                                        id: 'addInventory.notesPlaceholder',
                                        defaultMessage: 'Enter notes here'
                                    })}/>
                            </div>
                        </div>
                        <div className="group-item-wr long">
                            <Tooltip
                                className="notes"
                                content={formatMessage({
                                    id: 'addInventory.internalNotesTip',
                                    defaultMessage: 'Internal notes are visible to you or other users of your company only.'
                                })}
                            />
                            <div className="notes-textarea">
                                <label htmlFor=".internalNotes">
                                    <FormattedMessage
                                        id='addInventory.internalNotes'
                                        defaultMessage='Internal Notes'
                                    />
                                </label>
                                <Control.textarea
                                    model=".internalNotes"
                                    id=".internalNotes"
                                    className="textarea"
                                    placeholder={formatMessage({
                                        id: 'addInventory.notesPlaceholder',
                                        defaultMessage: 'Enter notes here'
                                    })}
                                />

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
                            <label htmlFor=".pkgAmount">
                                <FormattedMessage
                                    id='addInventory.totalPackages'
                                    defaultMessage='Total Packages'
                                />
                            </label>
                            <Control.text
                                model=".pkgAmount"
                                validators={{min: (val) => min(val, 0), isNumber, required}}
                                id=".pkgAmount"
                                onChange={this.props.totalPackagesHandler}
                            />
                        </div>
                        {lotNumber} {/*temporarily disabled until the data is available*/}

                        <div className='group-item-wr'>
                            <Errors
                                model='forms.productOffering.creationDate'
                                show="touched"
                                messages={{required: messages.required}}/>
                            <label htmlFor=".creationDate">
                                <FormattedMessage
                                    id='dataTable.MFGDate'
                                    defaultMessage='MFG Date'
                                />
                            </label>
                            <DatepickerRedux
                                placeholder={'test'}
                                maxDate={moment().subtract(1, "days")}
                                dispatch={this.props.dispatch}
                                onChange={(value) => console.log(value)}
                                model='forms.productOffering.creationDate'/>
                        </div>
                        <div className='group-item-wr'>
                            <label htmlFor=".expirationDate">
                                <FormattedMessage
                                    id='addInventory.expirationDate'
                                    defaultMessage='Expiration Date'
                                />
                            </label>
                            <DatepickerRedux
                                placeholder={'test'}
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
                </Form>
            </div>
        );
    }
}

export default injectIntl(ProductOffering);
