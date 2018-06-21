import React, {Component} from 'react';
import './SearchProducts.css';
import debounce from "debounce";
import Spinner from '../../../../../components/Spinner/Spinner';

class SearchProducts extends Component {

    constructor(props){
        super(props);
        this.searchProducts = debounce(this.searchProducts, 200);
        this.state = {
            fulltext: "",
        }
    }

    renderResults() {
        if (!this.props.searchedProducts || this.props.searchedProducts.length === 0) return <p className='search-status'>No results</p>;
        return this.props.searchedProducts.map(product => (
            <div key={product.id} className='search-product-item' onClick={() => this.props.onSelect(product)}>
                <span className='search-cas'>{product.casNumber}</span>
                {product.primaryName}
            </div>
        ));
    }

    handleChange(e) {
        this.setState({fulltext: e.target.value}, () => {
            if (this.state.fulltext.length > 1)  this.searchProducts();
        });
    }

    searchProducts(){
        this.props.searchProducts(this.state.fulltext);
    }

    render() {
        let {fulltext} = this.state;
        let results = this.props.isSearching ? <p className='search-status'><Spinner/></p> : this.renderResults();
        return (
            <div>
                <div className='search-products'>
                    <input value={fulltext} onChange={(e) => this.handleChange(e)} placeholder='Type to find products'/>
                    <button onClick={()=>{this.searchProducts()}}>Search</button>
                </div>
                <div className='search-results'>
                    {results}
                </div>
            </div>
        );
    }
}

export default SearchProducts;