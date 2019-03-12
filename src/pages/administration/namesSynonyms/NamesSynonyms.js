import React, {Component} from 'react';
import './namesSynonyms.css';
import RemoteComboBox from "../../../components/ComboBox/RemoteComboBox";
import Edit from "./components/Edit";

class NamesSynonyms extends Component {
    constructor(props){
        super(props);
        this.state = {
            selected: null
        }
    }

    selectProduct(product){
        this.setState({selected: product});
        this.props.fetchAlternativeNames(product.id)
    }

    render(){
        return (
            <div className="names-synonyms">
                <h1 className='header'>Names and synonyms</h1>
                <RemoteComboBox 
                    items={this.props.searchedProducts} 
                    dataFetched={this.props.productsFetched}
                    api={(text) => this.props.searchProducts(text)}
                    limit={5} 
                    placeholder="Search product" 
                    isFetching={this.props.isSearching}
                    className="admin-search"
                    getObject={(product) => this.selectProduct(product)} displayAttr="chemicalName"
                />
                <Edit selectedProduct={this.state.selected} {...this.props}/>
            </div>
        )
    }
}

export default NamesSynonyms;