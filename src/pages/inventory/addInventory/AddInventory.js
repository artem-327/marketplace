import React, {Component} from 'react';
import './AddInventory.css'
import SearchProducts from "./components/SearchProducts";
import AddForm from "./components/AddForm";

export default class AddInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: null
        }
    }

    render() {
        return this.state.selectedProduct ? (
            <AddForm
            product={this.state.selectedProduct}
            />
        ) : (<SearchProducts
                onSelect={product => this.setState({selectedProduct: product})}
            />
        );
    }
}
