import React, {Component} from 'react';
import {Errors} from 'react-redux-form';
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import {messages, required} from "../../../../../utils/validation";
import classnames from "classnames";
import "./Location.css"
import {FormattedMessage, injectIntl} from 'react-intl';
import RemoteComboBoxRedux from "../../../../../components/ComboBox/RemoteComboBoxRedux";
import RemoteComboBox from "../../../../../components/ComboBox/RemoteComboBox";
import {checkToken} from "../../../../../utils/auth";

class Location extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: 'saved',
            edit: false,
            warehouseIndex: '',
            warehouseName: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            contact: '',
            phone: '',
            email: '',
            isSubmitted: false,
        }
    }

    componentDidMount() {
        this.setInitialValue()
    }

    setInitialValue() {
        if (this.props.edit) {
            console.log(this.props.productOffer.warehouse);
            this.setState({
                warehouseIndex: this.props.productOffer.warehouse.id,
                street: this.props.productOffer.warehouse.address.streetAddress,
                city: this.props.productOffer.warehouse.address.city,
                state: this.props.productOffer.warehouse.address.province.id,
                contact: this.props.productOffer.warehouse.contact.name,
                phone: this.props.productOffer.warehouse.contact.phone,
                email: this.props.productOffer.warehouse.contact.email,
                zip: this.props.productOffer.warehouse.address.zip.zip,
            })
        }
    }

    handleInputs(value, name) {
        this.setState({[name]: value})
    }

    setLocation = (value) => {
        let index;

        for(let i = 0; i < this.props.warehouse.length; i++) {
            if(this.props.warehouse[i].id === value) {
                index = i;
            }
        }

        this.setState({
            edit: false,
            warehouseIndex: value,
            warehouseName: this.props.warehouse[index].name,
            street: this.props.warehouse[index].address.streetAddress,
            city: this.props.warehouse[index].address.city,
            state: (typeof this.props.warehouse[index].address.province !== 'undefined' ?
                this.props.warehouse[index].address.province.id
                : 1),
                /* TODO: modify it if there will be added something else (country/region id) */
            contact: this.props.warehouse[index].contact.name,
            phone: this.props.warehouse[index].contact.phone,
            email: this.props.warehouse[index].contact.email,
            zip: this.props.warehouse[index].address.zip.zip,
        })
    }

    changeMode(e) {
        e.preventDefault();
        if (this.state.warehouseIndex === '') return;
        this.setState({edit: !this.state.edit})
    }

    validateEmail() {
        if (this.state.email === "") return true;
        let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let test = re.test(String(this.state.email).toLowerCase());
        return test;
    }

    validateZip() {
        if (this.state.zip === "") return true;
        let reUSA = /^(\d{5}([\-]\d{4})?)$/i;
        let reCanada = /^([A-Z][0-9][A-Z] [0-9][A-Z][0-9])$/;
        let test = reUSA.test(String(this.state.zip)) || reCanada.test(String(this.state.zip));
        return test;
    }

    validateForms() {
        if (this.state.street === '' || this.state.city === '' || this.state.state === '' || this.state.zip === '' || this.state.contact === '' || this.state.phone === '' || this.state.email === '') {
            return false;
        }
        else if (!this.validateEmail() && !this.validateZip()) {
            return false;
        }
        return true;
    }

    saveLocation(e) {
        e.preventDefault();

        if (checkToken(this.props)) return;

        let {warehouseName, street, city, state, zip, contact, phone, email} = this.state;

        this.setState({isSubmitted: true})

        if (!this.validateForms()) return;

        this.props.saveWarehouse(warehouseName, street, city, state, contact, phone, email, zip).then(() => {
            this.props.fetchWarehouses().then(() => {
                this.setState({edit: false}, () => this.changeLocation('saved'))
            })
        });
    }

    updateLocation(e) {
        e.preventDefault();
        let {warehouseIndex, warehouseName, street, city, state, zip, contact, phone, email} = this.state;

        this.setState({isSubmitted: true})

        if (!this.validateForms()) return;

        this.props.updateWarehouse(warehouseIndex, warehouseName, street, city, state, contact, phone, email, zip).then(() => {
            this.props.fetchWarehouses().then(() => {
                this.setState({edit: false})
            })
        });
    }

    getCurrentItemById(id){
        if (id === '') return 'Select';
        for (let i = 0; i < this.props.locations.length; i++) {
            if (this.props.locations[i].province && id === this.props.locations[i].province.id) {
                return this.props.locations[i].province.name
            }
        }
        return 'error'
    }

    renderSavedLocation() {
        const disabled = this.state.warehouseIndex === '';
        const button = this.state.edit ?
            <button onClick={(e) => this.updateLocation(e)} className='edit-location'>Save</button> :
            <button className={'edit-location' + classnames({" disabled": (disabled)})}
                    onClick={(e) => this.changeMode(e)}>Edit</button>;

        const { formatMessage } = this.props.intl;

        return (
            <div>
                <div>
                    <div className='group-item-wr'>
                        <Errors
                            className="form-error"
                            model="forms.addProductOffer.warehouse"
                            show="touched"
                            messages={{
                                required: messages.required,
                            }}
                        />
                        <label>
                            <FormattedMessage
                                id='addInventory.location.warehouse'
                                defaultMessage='Warehouse'
                            />
                        </label>
                            <DropdownRedux
                                model="forms.addProductOffer.warehouse"
                                dispatch={this.props.dispatch}
                                opns={this.props.warehouse}
                                // defaultValue={this.state.warehouseIndex}
                                validators={{required}}
                                onChange={(value) => this.setLocation(value)}
                                placeholder={formatMessage({
                                    id: 'global.selectLocation',
                                    defaultMessage: 'Select Location'
                                })}
                            />
                    </div>
                </div>
                    <React.Fragment>
                        <div>
                            <div className='group-item-wr'>
                                {(this.state.isSubmitted && this.state.street === '') ?
                                    <div className='warehouse-val'>
                                        <span>
                                            <FormattedMessage
                                                id='addInventory.required'
                                                defaultMessage='Required'
                                            />
                                        </span>
                                    </div>
                                    : null}
                                <label htmlFor="street">
                                    <FormattedMessage
                                        id='addInventory.streetAddress'
                                        defaultMessage='Street Address'
                                    />
                                </label>
                                <input id="street"
                                       disabled={!this.state.edit}
                                       value={this.state.street}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'street')
                                       }}/>
                            </div>
                            <div className='group-item-wr'>
                                {(this.state.isSubmitted && this.state.city === '') ?
                                    <div className='warehouse-val'>
                                        <span>
                                            <FormattedMessage
                                                id='addInventory.required'
                                                defaultMessage='Required'
                                            />
                                        </span>
                                    </div>
                                    : null}
                                <label htmlFor="city">
                                    <FormattedMessage
                                        id='global.city'
                                        defaultMessage='City'
                                    />
                                </label>
                                <input id="city"
                                       disabled={!this.state.edit}
                                       value={this.state.city}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'city')
                                       }}/>
                            </div>
                            <div className='group-item-wr'>
                                {(this.state.isSubmitted && this.state.state === '') ?
                                    <div className='warehouse-val'>
                                        <span>
                                            <FormattedMessage
                                                id='addInventory.required'
                                                defaultMessage='Required'
                                            />
                                        </span>
                                    </div>
                                    : null}
                                <label>
                                    <FormattedMessage
                                        id='global.state'
                                        defaultMessage='State'
                                    />
                                </label>
                                <Dropdown
                                    opns={this.props.locations.map((item)=>{
                                            if(item.province) return ({id: item.province.id, name: item.province.name});
                                            if(item.country) return ({id: item.country.id, name: item.country.name});
                                            return {id: 0, name: 'no province or country'}
                                        })}
                                    disabled={!this.state.edit}
                                    currentValue={this.getCurrentItemById(this.state.state)}
                                    onChange={(value) => {
                                            this.handleInputs(value, 'state')
                                        }}/>
                            </div>
                            <div className='group-item-wr'>
                                {(this.state.isSubmitted && this.state.zip === '') ?
                                    <div className='warehouse-val'>
                                        <span>
                                            <FormattedMessage
                                                id='addInventory.required'
                                                defaultMessage='Required'
                                            />
                                        </span>
                                    </div>
                                    : null}
                                <label htmlFor="zip">
                                        <FormattedMessage
                                            id='addInventory.zipCode'
                                            defaultMessage='Zip Code'
                                        />
                                </label>
                                <input id="zip"
                                       disabled={!this.state.edit}
                                       value={this.state.zip}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'zip')
                                       }}
                                       type="number"/>
                            </div>
                        </div>
                        <div>
                            <div className='group-item-wr'>
                                {(this.state.isSubmitted && this.state.contact === '') ?
                                    <div className='warehouse-val'>
                                        <span>
                                            <FormattedMessage
                                                id='addInventory.required'
                                                defaultMessage='Required'
                                            />
                                        </span>
                                    </div>
                                    : null}
                                <label htmlFor="contact">
                                    <FormattedMessage
                                        id='addInventory.contactName'
                                        defaultMessage='Contact Name'
                                    />
                                </label>
                                <input id="contact"
                                       disabled={!this.state.edit}
                                       value={this.state.contact}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'contact')
                                       }}/>
                            </div>
                            <div className='group-item-wr'>
                                {(this.state.isSubmitted && this.state.phone === '') ?
                                    <div className='warehouse-val'>
                                        <span>
                                            <FormattedMessage
                                                id='addInventory.required'
                                                defaultMessage='Required'
                                            />
                                        </span>
                                    </div>
                                    : null}
                                <label htmlFor="number">
                                    <FormattedMessage
                                        id='global.phoneNumber'
                                        defaultMessage='Phone Number'
                                    />
                                </label>
                                <input id="number"
                                       disabled={!this.state.edit}
                                       value={this.state.phone}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'phone')
                                       }}/>
                            </div>
                            <div className='group-item-wr'>
                                {(this.state.isSubmitted && this.state.email === '') ?
                                    <div className='warehouse-val'>
                                        <span>
                                            <FormattedMessage
                                                id='addInventory.required'
                                                defaultMessage='Required'
                                            />
                                        </span>
                                    </div>
                                    : null}
                                {(this.state.isSubmitted && !this.validateEmail()) ?
                                    <div className='warehouse-val'>
                                        <span>
                                            <FormattedMessage
                                                id='addInventory.invalidEmail'
                                                defaultMessage='Invalid E-mail'
                                            />
                                        </span>
                                    </div> : null}
                                <label htmlFor="email">
                                    <FormattedMessage
                                        id='global.email'
                                        defaultMessage='E-mail'
                                    />
                                </label>
                                <input id="email"
                                       disabled={!this.state.edit}
                                       value={this.state.email}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'email')
                                       }}/>
                            </div>

                            {!this.props.edit && button}

                        </div>
                    </React.Fragment>
            </div>
        )
    }

    renderNewLocation() {

        const { formatMessage } = this.props.intl;

        let button =
            <button onClick={(e) => this.saveLocation(e, false)} className='edit-location'>
                <FormattedMessage
                    id='addInventory.save'
                    defaultMessage='Save'
                />
            </button>
        return (
            <div>
                <div>
                    <div className='group-item-wr'>
                        {(this.state.isSubmitted && this.state.warehouseName === '') ?
                            <div className='warehouse-val'>
                                <span className="warehouse-val-fm">
                                    <FormattedMessage
                                        id='addInventory.required'
                                        defaultMessage='Required'
                                    />
                                </span>
                            </div>
                            : null}
                        <label htmlFor="street">
                            <FormattedMessage
                                id='addInventory.warehouseName'
                                defaultMessage='Warehouse Name'
                            />
                        </label>
                        <input id="name"
                               value={this.state.warehouseName}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'warehouseName')
                               }}
                        />
                    </div>
                    <div className='group-item-wr'>
                        {(this.state.isSubmitted && this.state.street === '') ?
                            <div className='warehouse-val'>
                                <span className="warehouse-val-fm">
                                    <FormattedMessage
                                        id='addInventory.required'
                                        defaultMessage='Required'
                                    />
                                </span>
                            </div>
                            : null}
                        <label htmlFor="street">
                            <FormattedMessage
                                id='addInventory.streetAddress'
                                defaultMessage='Street Address'
                            />
                        </label>
                        <input id="street"
                               value={this.state.street}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'street')
                               }}/>
                    </div>
                    <div className='group-item-wr'>
                        {(this.state.isSubmitted && this.state.city === '') ?
                            <div className='warehouse-val'>
                                <span className="warehouse-val-fm">
                                    <FormattedMessage
                                        id='addInventory.required'
                                        defaultMessage='Required'
                                    />
                                </span>
                            </div>
                            : null}
                        <label htmlFor="city">City</label>
                        <input id="city"
                               value={this.state.city}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'city')
                               }}/>
                    </div>
                    <div className='group-item-wr'>
                        {(this.state.isSubmitted && this.state.state === '') ?
                            <div className='warehouse-val'>
                                <span className="warehouse-val-fm">
                                    <FormattedMessage
                                        id='addInventory.required'
                                        defaultMessage='Required'
                                    />
                                </span>
                            </div>
                            : null}
                        <RemoteComboBox id="state-search" scroll={0}
                                        items={this.props.filterLocations}
                                        api={(text) => this.props.fetchFilterLocations(text)}
                                        dataFetched={this.props.locationsFetched}
                                        isFetching={this.props.filterLocationsFetching}
                                        className="cas-search"
                                        limit={5}
                                        placeholder={formatMessage({
                                            id: 'global.state',
                                            defaultMessage: 'State'
                                        })}
                                        label={formatMessage({
                                            id: 'global.state',
                                            defaultMessage: 'State'
                                        })}
                                        /*
                                        displayName={(location) => (
                                            location.country ?
                                                location.country.name : location.province.name
                                        )}
                                        */
                                        validators={{required}}
                                        onChange={ (value) => this.setState({state : value})}
                                        displayName={(location) => {
                                            if (location.country) return location.country.name;
                                            else if (location.province) return location.province.name;
                                            else return "undefined";
                                        }} />
                    </div>
                    <div className='group-item-wr'>
                        {(this.state.isSubmitted && this.state.zip === '') ?
                            <div className='warehouse-val'>
                                <span className="warehouse-val-fm">
                                    <FormattedMessage
                                        id='addInventory.required'
                                        defaultMessage='Required'
                                    />
                                </span>
                            </div>
                            : null}
                        {(this.state.isSubmitted && !this.validateZip()) ?
                            <div className='warehouse-val'><span>Invalid Zip code</span></div> : null}
                        <label htmlFor="zip">
                            <FormattedMessage
                                id='addInventory.zipCode'
                                defaultMessage='Zip Code'
                            />
                        </label>
                        <input id="zip"
                               value={this.state.zip}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'zip')
                               }}
                               />
                    </div>
                </div>
                <div>
                    <div className='group-item-wr'>
                    {(this.state.isSubmitted && this.state.contact === '') ?
                            <div className='warehouse-val'>
                                <span className="warehouse-val-fm">
                                    <FormattedMessage
                                        id='addInventory.required'
                                        defaultMessage='Required'
                                    />
                                </span>
                            </div>
                        : null}
                        <label htmlFor="contact">
                            <FormattedMessage
                                id='addInventory.contactName'
                                defaultMessage='Contact Name'
                            />
                        </label>
                        <input id="contact"
                               value={this.state.contact}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'contact')
                               }}/>
                    </div>
                    <div className='group-item-wr'>
                    {(this.state.isSubmitted && this.state.phone === '') ?
                            <div className='warehouse-val'>
                                <span className="warehouse-val-fm">
                                    <FormattedMessage
                                        id='addInventory.required'
                                        defaultMessage='Required'
                                    />
                                </span>
                            </div>
                        : null}
                        <label htmlFor="number">
                            <FormattedMessage
                                id='global.phoneNumber'
                                defaultMessage='Phone Number'
                            />
                        </label>
                        <input id="number"
                               value={this.state.phone}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'phone')
                               }}/>
                    </div>
                    <div className='group-item-wr'>
                        {(this.state.isSubmitted && this.state.email === '') ?
                            <div className='warehouse-val'>
                                <span className="warehouse-val-fm">
                                    <FormattedMessage
                                        id='addInventory.required'
                                        defaultMessage='Required'
                                    />
                                </span>
                            </div>
                            : null}
                        {(this.state.isSubmitted && !this.validateEmail()) ?
                            <div className='warehouse-val'>
                                <span className="warehouse-val-fm">
                                    <FormattedMessage
                                        id='addInventory.invalidEmail'
                                        defaultMessage='Invalid E-mail'
                                    />
                                </span>
                            </div>
                            : null}
                        <label htmlFor="email">
                            <FormattedMessage
                                id='global.email'
                                defaultMessage='E-mail'
                            />
                        </label>
                        <input id="email"
                               value={this.state.email}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'email')
                               }}/>
                    </div>
                    {button}
                </div>
            </div>
        )
    }

    changeLocation(loc) {
        if (loc === 'saved') {
            if (this.state.warehouseIndex === '') {
                this.setState({
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                    contact: '',
                    phone: '',
                    email: '',
                    location: 'saved'
                })
             } 
             
            else {
                let index;

                for(let i = 0; i < this.props.warehouse.length; i++) {
                    if(this.props.warehouse[i].id === this.state.warehouseIndex) {
                        index = i;
                    }
                }

                this.setState({
                    street: this.props.warehouse[index].address.streetAddress,
                    city: this.props.warehouse[index].address.city,
                    state: this.props.warehouse[index].address.province.id,
                    contact: this.props.warehouse[index].contact.name,
                    phone: this.props.warehouse[index].contact.phone,
                    email: this.props.warehouse[index].contact.email,
                    zip: this.props.warehouse[index].address.zip.zip,
                    location: 'saved'
                })
            }

        } else {
            this.setState({
                isSubmitted: false,
                warehouseName: '',
                street: '',
                city: '',
                state: '',
                zip: '',
                contact: '',
                phone: '',
                email: '',
                location: 'new'
            })
        }

    }

    render() {
        //console.log(this.props)

        const location = this.state.location === "saved" ? this.renderSavedLocation() : this.renderNewLocation();
        return (
            <div className='location-wr'>
                {!this.props.edit ?
                    <div className={'location-submenu ' + this.state.location}>
                        <div
                            className='saved'
                            onClick={() => this.changeLocation('saved')}>
                            <FormattedMessage
                                id='addInventory.savedWarehouse'
                                defaultMessage='SAVED WAREHOUSE'
                            />
                        </div>
                        <div
                            className='new'
                            onClick={() => this.changeLocation('new')}>
                            <FormattedMessage
                                id='addInventory.newWarehouse'
                                defaultMessage='NEW WAREHOUSE'
                            />
                        </div>
                    </div> : null
                }
                {location}
            </div>
        );
    }
}

export default injectIntl(Location);