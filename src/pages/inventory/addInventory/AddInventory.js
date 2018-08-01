import React, {Component} from 'react';
import './AddInventory.css'
import AddForm from "./components/AddForm";
import AddGroup from './components/AddGroup';
import SearchProducts from "./components/SearchProducts";

export default class AddInventory extends Component {
    constructor(props) {
        super(props);
        this.setProductMapping = this.setProductMapping.bind(this);
        this.state = {
            selectedProduct: null,
            selectedProductMapping: null,
        }
    }

    setProductMapping(mapping){
        this.setState({selectedProductMapping: mapping}, ()=>{
            console.log(this.state.selectedProductMapping)
            let inputs = {
                indexName: this.state.selectedProductMapping.chemical.casIndexName,
                casNumber: this.state.selectedProductMapping.chemical.casNumber,
                chemicalName: 'undefined',
                productName: this.state.selectedProductMapping.name,
                productNumber: this.state.selectedProductMapping.code,
                measurements: 'undefined',
                UnitOfMeasurement: this.state.selectedProductMapping.packaging.unit.name,
                UnitOfPackaging: this.state.selectedProductMapping.packaging.container.name,
            }



            this.props.loadProductMapping(inputs);
        })
    }

    render() {
        let disable = !this.state.selectedProduct;
        return(
        <div>
            <h1 className='header'>ADD INVENTORY</h1>
            {this.state.selectedProduct ? <p className='inventory-product'>
                Selected product: {this.state.selectedProduct.casNumber} {this.state.selectedProduct.primaryName}</p> : null}
            <AddGroup header='CHEMICAL' component={<SearchProducts dispatch={this.props.dispatch}
                                                                   selectedMapping={this.state.selectedProductMapping}
                                                                   onSelectProductMapping={mapping => this.setProductMapping(mapping)}
                                                                   onSelect={product => {this.setState({selectedProduct: product}, ()=>this.props.resetForm())}}/> }/>
            <AddForm product={this.state.selectedProduct} disable={disable} {...this.props}/>
        </div>)
    }
}
