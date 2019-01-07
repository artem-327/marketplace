import React, {Component} from 'react';
import {Errors} from 'react-redux-form';
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import {messages, required} from "../../../../../utils/validation";
import classnames from "classnames";
import "./Location.css"

export default class Location extends Component {

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
            this.setState({
                warehouseIndex: this.props.productOffer.warehouse.id,
                street: this.props.productOffer.warehouse.address.streetAddress,
                city: this.props.productOffer.warehouse.address.city,
                state: this.props.productOffer.warehouse.address.province.baseLocation.id,
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
            state: 1,//this.props.warehouse[index].address.province.baseLocation.id,
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

    validateForms() {
        if (this.state.street === '' || this.state.city === '' || this.state.state === '' || this.state.zip === '' || this.state.contact === '' || this.state.phone === '' || this.state.email === '') {
            return false;
        }
        else if (!this.validateEmail()) {
            return false;
        }
        return true;
    }

    saveLocation(e) {
        e.preventDefault();
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
                        <label>Warehouse</label>
                            <DropdownRedux
                                model="forms.addProductOffer.warehouse"
                                dispatch={this.props.dispatch}
                                opns={this.props.warehouse}
                                defaultValue={this.state.warehouseIndex}
                                validators={{required}}
                                onChange={(value) => this.setLocation(value)}
                                placeholder='Select Location'
                            />
                    </div>
                </div>
                    <React.Fragment>
                        <div>
                            <div className='group-item-wr'>
                                {(this.state.isSubmitted && this.state.street === '') ?
                                    <div className='warehouse-val'><span>Required</span></div> : null}
                                <label htmlFor="street">Street Address</label>
                                <input id="street"
                                       disabled={!this.state.edit}
                                       value={this.state.street}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'street')
                                       }}/>
                            </div>
                            <div className='group-item-wr'>
                                {(this.state.isSubmitted && this.state.city === '') ?
                                    <div className='warehouse-val'><span>Required</span></div> : null}
                                <label htmlFor="city">City</label>
                                <input id="city"
                                       disabled={!this.state.edit}
                                       value={this.state.city}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'city')
                                       }}/>
                            </div>
                            <div className='group-item-wr'>
                                {(this.state.isSubmitted && this.state.state === '') ?
                                    <div className='warehouse-val'><span>Required</span></div> : null}
                                <label>State</label>
                                <Dropdown opns={this.props.locations.map((item)=>{
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
                                    <div className='warehouse-val'><span>Required</span></div> : null}
                                <label htmlFor="zip">Zip Code</label>
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
                                    <div className='warehouse-val'><span>Required</span></div> : null}
                                <label htmlFor="contact">Contact Name</label>
                                <input id="contact"
                                       disabled={!this.state.edit}
                                       value={this.state.contact}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'contact')
                                       }}/>
                            </div>
                            <div className='group-item-wr'>
                                {(this.state.isSubmitted && this.state.phone === '') ?
                                    <div className='warehouse-val'><span>Required</span></div> : null}
                                <label htmlFor="number">Phone Number</label>
                                <input id="number"
                                       disabled={!this.state.edit}
                                       value={this.state.phone}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'phone')
                                       }}/>
                            </div>
                            <div className='group-item-wr'>
                                {(this.state.isSubmitted && this.state.email === '') ?
                                    <div className='warehouse-val'><span>Required</span></div> : null}
                                {(this.state.isSubmitted && !this.validateEmail()) ?
                                    <div className='warehouse-val'><span>Invalid E-mail</span></div> : null}
                                <label htmlFor="email">E-Mail</label>
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
        let button = <button onClick={(e) => this.saveLocation(e, false)} className='edit-location'>Save</button>
        return (
            <div>
                <div>
                    <div className='group-item-wr'>
                        {(this.state.isSubmitted && this.state.warehouseName === '') ?
                            <div className='warehouse-val'><span>Required</span></div> : null}
                        <label htmlFor="street">Warehouse Name</label>
                        <input id="name"
                               value={this.state.warehouseName}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'warehouseName')
                               }}
                        />
                    </div>
                    <div className='group-item-wr'>
                        {(this.state.isSubmitted && this.state.street === '') ?
                            <div className='warehouse-val'><span>Required</span></div> : null}
                        <label htmlFor="street">Street Address</label>
                        <input id="street"
                               value={this.state.street}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'street')
                               }}/>
                    </div>
                    <div className='group-item-wr'>
                        {(this.state.isSubmitted && this.state.city === '') ?
                            <div className='warehouse-val'><span>Required</span></div> : null}
                        <label htmlFor="city">City</label>
                        <input id="city"
                               value={this.state.city}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'city')
                               }}/>
                    </div>
                    <div className='group-item-wr'>
                        {(this.state.isSubmitted && this.state.state === '') ?
                            <div className='warehouse-val'><span>Required</span></div> : null}
                        <label>State</label>
                        <Dropdown opns={this.props.locations.map((item)=>{
                                            if(item.province) return ({id: item.province.id, name: item.province.name});
                                            if(item.country) return ({id: item.country.id, name: item.country.name});
                                            return {id: 0, name: 'no province or country'}
                                        })}
                                        onChange={(value) => {
                                            this.handleInputs(value, 'state')
                                        }}/>
                    </div>
                    <div className='group-item-wr'>
                        {(this.state.isSubmitted && this.state.zip === '') ?
                            <div className='warehouse-val'><span>Required</span></div> : null}
                        <label htmlFor="zip">Zip Code</label>
                        <input id="zip"
                               type="number"
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
                            <div className='warehouse-val'><span>Required</span></div> : null}
                        <label htmlFor="contact">Contact Name</label>
                        <input id="contact"
                               value={this.state.contact}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'contact')
                               }}/>
                    </div>
                    <div className='group-item-wr'>
                    {(this.state.isSubmitted && this.state.phone === '') ?
                            <div className='warehouse-val'><span>Required</span></div> : null}
                        <label htmlFor="number">Phone Number</label>
                        <input id="number"
                               value={this.state.phone}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'phone')
                               }}/>
                    </div>
                    <div className='group-item-wr'>
                        {(this.state.isSubmitted && this.state.email === '') ?
                            <div className='warehouse-val'><span>Required</span></div> : null}
                        {(this.state.isSubmitted && !this.validateEmail()) ?
                            <div className='warehouse-val'><span>Invalid E-mail</span></div> : null}
                        <label htmlFor="email">E-Mail</label>
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
                    state: this.props.warehouse[index].address.province.baseLocation.id,
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
                        <div className='saved' onClick={() => this.changeLocation('saved')}>SAVED WAREHOUSE</div>
                        <div className='new' onClick={() => this.changeLocation('new')}>NEW WAREHOUSE</div>
                    </div> : null
                }
                {location}
            </div>
        );
    }
}
