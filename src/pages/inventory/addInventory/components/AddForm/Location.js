import React, {Component} from 'react';
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";

export default class Location extends Component {

    constructor(props) {
        super(props);
        this.state = {
            location: 'saved',
            edit: false,
            warehouseIndex: '',
            street: '',
            city: '',
            state: '',
            zip: '',
            contact: '',
            phone: '',
            email: '',
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.warehouse !== this.props.warehouse && this.state.warehouseIndex !== ''){
            this.setState({
                street: this.props.warehouse[this.state.warehouseIndex].address,
                city: this.props.warehouse[this.state.warehouseIndex].city,
                state: this.props.warehouse[this.state.warehouseIndex].state,
            })
        }
    }

    handleInputs(value, name){
        this.setState({[name]: value})
    }

    setLocation(id){
        let index = 0;
        for (let i = 0; i < this.props.warehouse.length; i++){
            if(this.props.warehouse[i].id === id) {
                index = i;
                break;
            }
        }
        this.setState({
            warehouseIndex: index,
            street: this.props.warehouse[index].address,
            city: this.props.warehouse[index].city,
            state: this.props.warehouse[index].state,
        })
    }

    changeMode(e){
        e.preventDefault();
        this.setState({edit: !this.state.edit})
    }

    saveLocation(e, edit = !this.state.edit){
        e.preventDefault();
        let { street, city, state, zip, contact, phone, email } = this.state;
        console.log(street, city, state, zip, contact, phone, email);
        this.setState({edit: edit})
    }

    renderSavedLocation() {
        let button = this.state.edit ? <button onClick={(e)=>this.saveLocation(e)} className='edit-location'>Save</button> :
            <button className='edit-location' onClick={(e)=>this.changeMode(e)}>Edit</button>;
        let currentLocation = this.state.warehouseIndex !== '' ? this.props.warehouse[this.state.warehouseIndex].name: null
        return (
            <div>
                <div>
                    <div className='group-item-wr'>
                        <label>Warehouse</label>
                        <DropdownRedux
                            model="forms.addProductOffer.addProductOffer.location"
                            dispatch={this.props.dispatch}
                            opns={this.props.warehouse}
                            currentValue={currentLocation}
                            onChange={(id)=> this.setLocation(id)}
                            placeholder='Select Location'
                        />
                    </div>
                </div>
                <div>
                    <div className='group-item-wr'>
                        <label htmlFor="street">Street Address</label>
                        <input id="street"
                               disabled={!this.state.edit}
                               value={this.state.street}
                               onChange={(e)=>{this.handleInputs(e.target.value, 'street')}}/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="city">City</label>
                        <input id="city"
                               disabled={!this.state.edit}
                               value={this.state.city}
                               onChange={(e)=>{this.handleInputs(e.target.value, 'city')}}/>
                    </div>
                    <div className='group-item-wr'>
                        <label>State</label>
                        <input id="state"
                               disabled={!this.state.edit}
                               value={this.state.state}
                               onChange={(e)=>{this.handleInputs(e.target.value, 'state')}}/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="zip">Zip Code</label>
                        <input id="zip"
                               disabled={!this.state.edit}
                               value={this.state.zip}
                               onChange={(e)=>{this.handleInputs(e.target.value, 'zip')}}
                               type="number"/>
                    </div>
                </div>
                <div>
                    <div className='group-item-wr'>
                        <label htmlFor="contact">Contact Name</label>
                        <input id="contact"
                               disabled={!this.state.edit}
                               value={this.state.contact}
                               onChange={(e)=>{this.handleInputs(e.target.value, 'contact')}}/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="number">Phone Number</label>
                        <input id="number"
                               disabled={!this.state.edit}
                               value={this.state.phone}
                               onChange={(e)=>{this.handleInputs(e.target.value, 'phone')}}/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="email">E-Mail</label>
                        <input id="email"
                               disabled={!this.state.edit}
                               value={this.state.email}
                               onChange={(e)=>{this.handleInputs(e.target.value, 'email')}}/>
                        {button}
                    </div>
                </div>
            </div>
        )
    }

    renderNewLocation() {
        let button = <button onClick={(e)=>this.saveLocation(e, false)} className='edit-location'>Save</button>
        return (
            <div>
                <div>
                    <div className='group-item-wr'>
                        <label htmlFor="street">Street Address</label>
                        <input id="street"
                               value={this.state.street}
                               onChange={(e)=>{this.handleInputs(e.target.value, 'street')}}/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="city">City</label>
                        <input id="city"
                               value={this.state.city}
                               onChange={(e)=>{this.handleInputs(e.target.value, 'city')}}/>
                    </div>
                    <div className='group-item-wr'>
                        <label>State</label>
                        <input id="state"
                               value={this.state.state}
                               onChange={(e)=>{this.handleInputs(e.target.value, 'state')}}/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="zip">Zip Code</label>
                        <input id="zip"
                               value={this.state.zip}
                               onChange={(e)=>{this.handleInputs(e.target.value, 'zip')}}
                               type="number"/>
                    </div>
                </div>
                <div>
                    <div className='group-item-wr'>
                        <label htmlFor="contact">Contact Name</label>
                        <input id="contact"
                               value={this.state.contact}
                               onChange={(e)=>{this.handleInputs(e.target.value, 'contact')}}/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="number">Phone Number</label>
                        <input id="number"
                               value={this.state.phone}
                               onChange={(e)=>{this.handleInputs(e.target.value, 'phone')}}/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor="email">E-Mail</label>
                        <input id="email"
                               value={this.state.email}
                               onChange={(e)=>{this.handleInputs(e.target.value, 'email')}}/>
                        {button}
                    </div>
                </div>
            </div>
        )
    }

    changeLocation(loc){
        if(loc === 'saved'){
            if(this.props.warehouseIndex === ''){
                this.setState({
                    street: '',
                    city: '',
                    state: '',
                    location: 'saved'
                })
            }else{
                this.setState({
                    street: this.props.warehouse[this.state.warehouseIndex].address,
                    city: this.props.warehouse[this.state.warehouseIndex].city,
                    state: this.props.warehouse[this.state.warehouseIndex].state,
                    location: 'saved'
                })
            }
        }else{
            this.setState({
                street: '',
                city: '',
                state: '',
                location: 'new'
            })
        }

    }

    render() {
        let location = this.state.location === "saved" ? this.renderSavedLocation() : this.renderNewLocation()
        return (
            <div className='location-wr'>
                <div className={'location-submenu ' + this.state.location}>
                    <div className='saved' onClick={()=>this.changeLocation('saved')}>SAVED LOCATIONS</div>
                    <div className='new' onClick={()=>this.changeLocation('new')}>NEW LOCATION</div>
                </div>
                {location}
            </div>
        );
    }
}
