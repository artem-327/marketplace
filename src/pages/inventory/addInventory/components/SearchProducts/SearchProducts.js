import React, {Component} from 'react';
import './SearchProducts.css';
import debounce from "debounce";
import Spinner from '../../../../../components/Spinner/Spinner';
import RecentProducts from "./components/RecentProducts";
import ProductOffering from "./ProductOffering";
import InfoLabel from "../AddForm/InfoLabel";
import ProductMapping from "./components/ProductMapping";

class SearchProducts extends Component {

    constructor(props){
        super(props);
        this.searchProducts = debounce(this.searchProducts, 200);
        this.mapProducts = debounce(this.mapProducts, 200);
        this.state = {
            isOpen: false,
            fulltextSearch: "",
            fulltextMap: "",
            results_count: 10
        }
    }

    renderResults() {
        if (!this.props.searchedProducts || this.props.searchedProducts.length === 0) return null;
        return this.props.searchedProducts.map(product => (
            <div className='search-status'>
            <div key={product.id} className='search-product-item' onClick={() => this.props.onSelect(product)}>
                <span className='search-cas'>{product.casNumber}</span>
                {product.casIndexName}
            </div>
            </div>
        ))};
    renderResultsMap() {
            if (!this.props.mappedProducts || this.props.mappedProducts.length === 0) return null;
            return this.props.mappedProducts.map(productTemplate => (
                <div className='search-status'>
                    <div key={productTemplate.chemical.id} className='search-product-item' onClick={() => this.props.onSelect(productTemplate)}>
                        <span className='search-cas'>{productTemplate.chemical.casNumber}</span>
                        {productTemplate.chemical.casIndexName}
                    </div>
                </div>
        ))};
    componentDidMount () {
        this.props.fetchProductForms();
        this.props.fetchProductGrade();
        this.props.fetchProductConditions();
    }
    handleChangeSearch(e) {
        this.setState({fulltextSearch: e.target.value}, () => {
            if (this.state.fulltextSearch.length > 0) this.searchProducts();
        });
    }
    handleChangeMap(e) {
        this.setState({fulltextMap: e.target.value}, () => {
            if (this.state.fulltextMap.length > 0) this.mapProducts();
        });
    }

    searchProducts(){
        this.props.searchProducts(this.state.fulltextSearch);
    }
    mapProducts(){
        this.props.mapProducts(this.state.fulltextMap);
    }


    render() {
        let {fulltextSearch, fulltextMap} = this.state;
        let results = this.props.isSearching ? <div className='search-status'><Spinner/></div> : this.renderResults();
        let resultsMap = this.props.isMapping ? <div className='map-status'><Spinner/></div> : this.renderResultsMap();
        return (
            <div>
                <h6>CHEMICAL SEARCH</h6>
                <div className='search-products'>
                    <label>CAS Search</label>
                    <i className="fas fa-search search-icon" onClick={()=>{this.searchProducts()}}/>
                    <input value={fulltextSearch} onChange={(e) => this.handleChangeSearch(e)} placeholder='Search'/>
                    {results}
                </div>
                <div className='map-products'>
                    <label>Mapped Products Search</label>
                    <i className="fas fa-search search-icon" onClick={()=>{this.mapProducts()}}/>
                    <input value={fulltextMap} onChange={(e) => this.handleChangeMap(e)} placeholder='Search by Product Name or Product Number'/>
                    {resultsMap}
                </div>
                <InfoLabel/>
                <ProductMapping  {...this.props}/>
                <div className='search-results' style={{maxHeight: 50*this.state.results_count}}>
                </div>
                <ProductOffering {...this.props}/>
            </div>
        );
    }
}

export default SearchProducts;