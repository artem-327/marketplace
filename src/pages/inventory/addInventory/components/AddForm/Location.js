import React, {Component} from 'react';
import {Errors} from 'react-redux-form';
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import {messages, required} from "../../../../../utils/validation";
import classnames from "classnames";

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

    componentWillReceiveProps(nextProps) {
        if (nextProps.warehouse !== this.props.warehouse && this.state.warehouseIndex !== '') {
            this.setState({
                street: nextProps.warehouse[this.state.warehouseIndex].address,
                city: nextProps.warehouse[this.state.warehouseIndex].city,
                state: nextProps.warehouse[this.state.warehouseIndex].location.id,
                contact: nextProps.warehouse[this.state.warehouseIndex].contactName,
                phone: nextProps.warehouse[this.state.warehouseIndex].contactNumber,
                email: nextProps.warehouse[this.state.warehouseIndex].contactEmail,
                zip: nextProps.warehouse[this.state.warehouseIndex].zip,
            })
        }
    }

    handleInputs(value, name) {
        this.setState({[name]: value})
    }

    setLocation = id => {
        let index = 0;
        for (let i = 0; i < this.props.warehouse.length; i++) {
            if (this.props.warehouse[i].id === id) {
                index = i;
                break;
            }
        }
        this.setState({
            warehouseIndex: index,
            street: this.props.warehouse[index].address,
            city: this.props.warehouse[index].city,
            state: this.props.warehouse[index].location.id,
            contact: this.props.warehouse[index].contactName,
            phone: this.props.warehouse[index].contactNumber,
            email: this.props.warehouse[index].contactEmail,
            zip: this.props.warehouse[index].zip,
        })
    }

    changeMode(e) {
        e.preventDefault();
        if (this.state.warehouseIndex === '') return;
        this.setState({edit: !this.state.edit})
    }

    validateEmail() {
        if (this.state.email === "") return true;
        let re = /^\S+@\S+$/;
        let test = re.test(String(this.state.email).toLowerCase());
        return test;
    }

    validateForms() {
        if (this.state.street === '' || this.state.city === '' || this.state.state === '' || this.state.zip === '') {
            return false;
        }
        else if (!this.validateEmail()) {
            this.props.addMessage("Bad email address format.");
            return false;
        }
        return true;
    }

    saveLocation(e, edit = !this.state.edit) {
        e.preventDefault();
        this.setState({isSubmitted: true});
        let {warehouseName, street, city, state, zip, contact, phone, email} = this.state;
        if (!this.validateForms()) return;
        this.props.saveWarehouse(warehouseName, street, city, state, contact, phone, email, zip).then(() => {
            this.props.fetchWarehouses().then(() => {
                this.setState({edit: edit}, () => this.changeLocation('saved'))
            })
        });
    }

    updateLocation(e) {
        e.preventDefault();
        let {street, city, state, zip, contact, phone, email} = this.state;
        if (!this.validateForms()) return;
        this.props.updateWarehouse(this.props.warehouse[this.state.warehouseIndex].id, this.props.warehouse[this.state.warehouseIndex].name, street, city, state, contact, phone, email, zip).then(() => {
            this.props.fetchWarehouses().then(() => {
                this.setState({edit: false})
            })
        });
    }

    getCurrentValueById(id, opns) {
        if (id === '') return 'Select';
        for (let i = 0; i < opns.length; i++) {
            if (id === opns[i].id) {
                return opns[i].name
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
        const currentLocation = this.state.warehouseIndex !== '' ? this.props.warehouse[this.state.warehouseIndex].name : null;
        return (
                <div>
                    <Errors
                        className="form-error"
                        model="forms.addProductOffer.warehouse"
                        show="touched"
                        messages={{
                            required: messages.required,
                        }}
                    />
                    <div className='group-item-wr'>
                        <label>Warehouse</label>
                            <DropdownRedux
                                model="forms.addProductOffer.warehouse"
                                dispatch={this.props.dispatch}
                                opns={this.props.warehouse}
                                currentValue={currentLocation}
                                validators={{required}}
                                onChange={(id) => this.setLocation(id)}
                                placeholder='Select Location'
                            />
                    </div>
                </div>
                    <React.Fragment>
                        <div>
                            <div className='group-item-wr'>
                                <label htmlFor="street">Street Address</label>
                                <input id="street"
                                       disabled={!this.state.edit}
                                       value={this.state.street}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'street')
                                       }}/>
                            </div>
                            <div className='group-item-wr'>
                                <label htmlFor="city">City</label>
                                <input id="city"
                                       disabled={!this.state.edit}
                                       value={this.state.city}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'city')
                                       }}/>
                            </div>
                            <div className='group-item-wr'>
                                <label>State</label>
                                <Dropdown opns={this.props.locations}
                                          disabled={!this.state.edit}
                                          currentValue={this.getCurrentValueById(this.state.state, this.props.locations)}
                                          onChange={(value) => {
                                              this.handleInputs(value, 'state')
                                          }}/>
                            </div>
                            <div className='group-item-wr'>
                                <label htmlFor="zip">Zip Code</label>
                                <input id="zip"
                                       disabled={!this.state.edit}
                                       value={this.state.zip}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'zip')
                                       }}
                                       type="text"/>
                            </div>
                        </div>
                        <div>
                            <div className='group-item-wr'>
                                <label htmlFor="contact">Contact Name</label>
                                <input id="contact"
                                       disabled={!this.state.edit}
                                       value={this.state.contact}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'contact')
                                       }}/>
                            </div>
                            <div className='group-item-wr'>
                                <label htmlFor="number">Phone Number</label>
                                <input id="number"
                                       disabled={!this.state.edit}
                                       value={this.state.phone}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'phone')
                                       }}/>
                            </div>
                            <div className='group-item-wr'>
                                <label htmlFor="email">E-Mail</label>
                                <input id="email"
                                       disabled={!this.state.edit}
                                       value={this.state.email}
                                       onChange={(e) => {
                                           this.handleInputs(e.target.value, 'email')
                                       }}/>
                                {!this.props.edit && button}
                            </div>
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
                        <label htmlFor="street">Warehouse Name</label>
                        <input id="name"
                               value={this.state.warehouseName}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'warehouseName')
                               }}
                        />
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="street">Street Address</label>
                        <input id="street"
                               value={this.state.street}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'street')
                               }}/>
                        {(this.state.isSubmitted && this.state.street === '') ?
                            <div className='warehouse-val'><span>Required</span></div> : null}
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="city">City</label>
                        <input id="city"
                               value={this.state.city}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'city')
                               }}/>
                        {(this.state.isSubmitted && this.state.city === '') ?
                            <div className='warehouse-val'><span>Required</span></div> : null}
                    </div>
                    <div className='group-item-wr'>
                        <label>State</label>
                        <Dropdown opns={this.props.locations}
                                  currentValue={this.getCurrentValueById(this.state.state, this.props.locations)}
                                  onChange={(value) => {
                                      this.handleInputs(value, 'state')
                                  }}/>
                        {(this.state.isSubmitted && this.getCurrentValueById(this.state.state, this.props.locations) === 'Select') ?
                            <div className='warehouse-val'><span>Required</span></div> : null}
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="zip">Zip Code</label>
                        <input id="zip"
                               value={this.state.zip}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'zip')
                               }}
                               type="number"/>
                        {(this.state.isSubmitted && this.state.zip === '') ?
                            <div className='warehouse-val'><span>Required</span></div> : null}
                    </div>
                </div>
                <div>
                    <div className='group-item-wr'>
                        <label htmlFor="contact">Contact Name</label>
                        <input id="contact"
                               value={this.state.contact}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'contact')
                               }}/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="number">Phone Number</label>
                        <input id="number"
                               value={this.state.phone}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'phone')
                               }}/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="email">E-Mail</label>
                        <input id="email"
                               value={this.state.email}
                               onChange={(e) => {
                                   this.handleInputs(e.target.value, 'email')
                               }}/>
                        {button}
                    </div>
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
            } else {
                this.setState({
                    street: this.props.warehouse[this.state.warehouseIndex].address,
                    city: this.props.warehouse[this.state.warehouseIndex].city,
                    state: this.props.warehouse[this.state.warehouseIndex].location.id,
                    contact: this.props.warehouse[this.state.warehouseIndex].contactName,
                    phone: this.props.warehouse[this.state.warehouseIndex].contactNumber,
                    email: this.props.warehouse[this.state.warehouseIndex].contactEmail,
                    zip: this.props.warehouse[this.state.warehouseIndex].zip,
                    location: 'saved'
                })
            }
        } else {
            this.setState({
                street: '',
                city: '',
                state: '',
                zip: '',
                contact: '',
                phone: '',
                email: '',
                warehouseName: '',
                location: 'new'
            })
        }

    }

    render() {
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
