import React, {Component} from 'react';
import './AddInventory.css'
import AddForm from "./components/AddForm";
import AddGroup from './components/AddGroup';
import ProductOffering from "./components/SearchProducts/ProductOffering";

export default class AddInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: null
        }
    }

    render() {
        let disable = !this.state.selectedProduct;
        return(
        <div>
            <h1 className='header'>ADD INVENTORY</h1>
            {this.state.selectedProduct ? <p className='inventory-product'>
                Selected product: {this.state.selectedProduct.casNumber} {this.state.selectedProduct.primaryName}</p> : null}
            <AddGroup header='CHEMICAL' component={<SearchProducts onSelect={product => {this.setState({selectedProduct: product}, ()=>this.props.resetForm())}}/> }/>
            <AddForm product={this.state.selectedProduct} disable={disable} {...this.props}/>
        </div>)
    }
}
