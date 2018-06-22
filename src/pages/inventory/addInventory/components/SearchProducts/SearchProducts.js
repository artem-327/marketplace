import React, {Component} from 'react';
import './SearchProducts.css';
import debounce from "debounce";
import Spinner from '../../../../../components/Spinner/Spinner';
import RecentProducts from "./components/RecentProducts";

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
                <div className='search-products'>
                    <label>Chemical Name or CAS #</label>
                    <i className="fas fa-search search-icon" onClick={()=>{this.searchProducts()}}/>
                    <input value={fulltext} onChange={(e) => this.handleChange(e)} placeholder='Search'/>
                </div>
                <div className='recent-products'>
                    <RecentProducts setProduct={(product)=>this.props.onSelect(product)}
                                    recentProduct={this.props.recentProducts}/>
                </div>
                <div className='search-results'>
                    {results}
                </div>
            </div>
        );
    }
}

export default SearchProducts;