import React, {Component} from 'react';
import './AddInventory.css'
import AddForm from "./components/AddForm";
import AddGroup from './components/AddGroup';
import Chemical from "./components/Chemical";

export default class AddInventory extends Component {
    render() {
        return(
        <div>
            <h1 className='header'>ADD INVENTORY</h1>
            <AddGroup header='CHEMICAL' component={<Chemical resetForm={this.props.resetForm}/>}/>
            <AddForm {...this.props}/>
        </div>)
    }
}
