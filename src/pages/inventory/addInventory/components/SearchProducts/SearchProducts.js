import React, {Component} from 'react';
import './SearchProducts.css';
import debounce from "debounce";
import Spinner from '../../../../../components/Spinner/Spinner';
import InfoLabel from "../AddForm/InfoLabel";
import ProductMapping from "./components/ProductMapping";


class SearchProducts extends Component {

    constructor(props){
        super(props);
        this.searchProducts = debounce(this.searchProducts, 200);
        this.state = {
            fulltext: "",
            results_count: 10
        }
    }

    renderResults() {
        if (!this.props.searchedProducts || this.props.searchedProducts.length === 0) return <p className='search-status'>No results</p>;
        return this.props.searchedProducts.map(product => (
            <div>
            <div key={product.id} className='search-product-item' onClick={() => this.props.onSelect(product)}>
                <span className='search-cas'>{product.casNumber}</span>
                {product.primaryName}
            </div>
            </div>
        ));
    }


    handleChange(e) {
        this.setState({fulltext: e.target.value}, () => {
            if (this.state.fulltext.length > 0) this.searchProducts();
        });
    }

    searchProducts(){
        this.props.searchProducts(this.state.fulltext);
    }

    render() {
        let {fulltext} = this.state;
        let results = this.props.isSearching ? <div className='search-status'><Spinner/></div> : this.renderResults();
        return (
            <div>
                <h6>CHEMICAL SEARCH</h6>
                <div className='search-products'>
                    <label>CAS Search</label>
                    <i className="fas fa-search search-icon" onClick={()=>{this.searchProducts()}}/>
                    <input value={fulltext} onChange={(e) => this.handleChange(e)} placeholder='Search'/>
                </div>
                <div className='mapped-products'>
                    <label>Mapped Products Search</label>
                    <i className="fas fa-search search-icon" onClick={()=>{this.searchProducts()}}/>
                    <input value={fulltext} onChange={(e) => this.handleChange(e)} placeholder='Search by Product Name or Product Number'/>
                </div>
                <InfoLabel/>
                <ProductMapping  {...this.props}/>
                <div className='search-results' style={{maxHeight: 50*this.state.results_count}}>
                    {results}
                </div>
            </div>
        );
    }
}

export default SearchProducts;