import React, {Component} from 'react';
import './AddInventory.css'
import SearchProducts from "./components/SearchProducts";
import AddForm from "./components/AddForm";
import AddGroup from './components/AddGroup';

export default class AddInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: null
        }
    }

    render() {
        return(
        <div>
            <h1 className='header'>ADD INVENTORY</h1>
            <AddGroup
                header='CHEMICAL'
                component={<SearchProducts onSelect={product => this.setState({selectedProduct: product})}/>}/>
            <AddForm product={this.state.selectedProduct}{...this.props}/>
        </div>)
    }
}
