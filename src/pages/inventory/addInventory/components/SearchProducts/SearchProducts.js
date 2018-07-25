import React, {Component} from 'react';
import './SearchProducts.css';
import debounce from "debounce";
import Spinner from '../../../../../components/Spinner/Spinner';
import InfoLabel from "../AddForm/InfoLabel";


class SearchProducts extends Component {

    constructor(props){
        super(props);
        this.searchProducts = debounce(this.searchProducts, 200);
        this.mappedProducts = debounce(this.mappedProducts, 200);
        this.state = {
            fulltextSearch: "",
            fulltextMap: "",
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
        ))};
    renderResultsMap() {
            if (!this.props.mappedProducts || this.props.mappedProducts.length === 0) return <p className='search-status'>No results</p>;
            return this.props.mappedProducts.map(product => (
                <div>
                    <div key={product.id} className='search-product-item' onClick={() => this.props.onSelect(product)}>
                        <span className='search-cas'>{product.productName}</span>
                        {product.productNumber}
                    </div>
                </div>
        ))};


    handleChangeSearch(e) {
        this.setState({fulltextSearch: e.target.value}, () => {
            if (this.state.fulltextSearch.length > 0) this.searchProducts();
        });
    }
    handleChangeMap(e) {
        this.setState({fulltextMap: e.target.value}, () => {
            if (this.state.fulltextMap.length > 0) this.mappedProducts();
        });
    }

    searchProducts(){
        this.props.searchProducts(this.state.fulltextSearch);
    }
    mappedProducts(){
        this.props.mappedProducts(this.state.fulltextMap);
    }


    render() {

        let {fulltextSearch, fulltextMap} = this.state;
        let results = this.props.isSearching ? <div className='search-status'><Spinner/></div> : this.renderResults();
        let resultsMap = this.props.isSearching ? <div className='map-status'><Spinner/></div> : this.renderResultsMap();
        return (
            <div>
                <h6>CHEMICAL SEARCH</h6>
                <div className='search-products'>
                    <label>CAS Search</label>
                    <i className="fas fa-search search-icon" onClick={()=>{this.searchProducts()}}/>
                    <input value={fulltextSearch} onChange={(e) => this.handleChangeSearch(e)} placeholder='Search'/>

                    {results}
                </div>
                <div className='mapped-products'>
                    <label>Mapped Products Search</label>
                    <i className="fas fa-search search-icon" onClick={()=>{this.mappedProducts()}}/>
                    <input value={fulltextMap} onChange={(e) => this.handleChangeMap(e)} placeholder='Search by Product Name or Product Number'/>
                    {resultsMap}
                </div>
                <InfoLabel/>
                <div className='search-results' style={{maxHeight: 50*this.state.results_count}}>
                </div>
            </div>
        );
    }
}

export default SearchProducts;