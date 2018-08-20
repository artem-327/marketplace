import React, {Component} from 'react';
import './SearchProducts.css';
import debounce from "debounce";
import Spinner from '../../../../../../components/Spinner/Spinner';

class SearchProducts extends Component {

    constructor(props){
        super(props);
        this.searchProductsCas = debounce(this.searchProductsCas, 200);
        this.searchProductsName = debounce(this.searchProductsName, 200);
        this.mapProducts = debounce(this.mapProducts, 200);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.searchRef = React.createRef();
        this.mapRef = React.createRef();
        this.state = {
            searchOpen: false,
            mapOpen: false,
            fulltextSearchCas: "",
            fulltextSearchName: "",
            fulltextMap: "",
            results_count: 10,
        }
    }

    componentWillMount(){
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside(e) {
        if(!this.state.searchOpen && !this.state.mapOpen) return;
        if (this.searchRef.current.contains(e.target)){
            this.setState({mapOpen: false});
            return;
        }
        if (this.mapRef.current.contains(e.target)){
            this.setState({searchOpen: false});
            return;
        }
        this.setState({searchOpen: false, mapOpen: false});
    }

    renderResults() {
        if (!this.props.searchedProducts || this.props.searchedProducts.length === 0 || !this.state.searchOpen) return null;
        return this.props.searchedProducts.slice(0, 5).map((product, index) => (
            <div key={index + 'search'} className='search-status' style={{maxHeight: 50 * this.state.results_count}}>
                <div className='search-product-item' onClick={() => {this.setState({fulltextSearchCas: product.casNumber, fulltextSearchName:product.chemicalName, searchOpen: false}, ()=>{
                    this.props.onSelect(product)
                })}}>
                    <span className='search-cas'>{product.casNumber}</span>
                    <span>{product.chemicalName}</span>
                </div>
            </div>
        ))};

    renderResultsMap() {
            if (!this.props.mappedProducts || this.props.mappedProducts.length === 0 || !this.state.mapOpen) return null;
            return this.props.mappedProducts.slice(0, 5).map((productTemplate, index) => (
                <div key={index + 'map'} className='search-status' style={{maxHeight: 50 * this.state.results_count}}>
                    <div className='search-product-item' onClick={() => {this.setState({fulltextMap: productTemplate.productName, mapOpen: false}, () => {
                        this.props.onSelectProductMapping(productTemplate)
                    })}} >
                        {console.log(productTemplate)}
                        <span className='search-cas'>{productTemplate.productName}</span>
                    </div>
                </div>
        ))};

    handleChangeSearch(e) {
        this.setState({fulltextSearchCas: e.target.value, fulltextSearchName:e.target.value,  searchOpen: true}, () => {
            if (this.state.fulltextSearchCas.length > 0 || this.state.fulltextSearchName.length > 0) this.searchProductsCas();
            if (this.state.fulltextSearchCas.length > 0 || this.state.fulltextSearchName.length > 0) this.searchProductsName();
        });
    }

    handleChangeMap(e) {
        this.setState({fulltextMap: e.target.value, mapOpen: true}, () => {
            if (this.state.fulltextMap.length > 0) this.mapProducts();
        });
    }

    searchProductsCas(){
        this.props.searchProducts(this.state.fulltextSearchCas);
    }
    searchProductsName(){
        this.props.searchProducts(this.state.fulltextSearchName);
    }
    mapProducts(){
        this.props.mapProducts(this.state.fulltextMap);
    }

    render() {
        console.log(this.props.fulltextSearchName);
        let {fulltextSearchCas, fulltextSearchName, fulltextMap} = this.state;
        let results = this.props.isSearching ? <div className='search-loading'><Spinner/></div> : <div className='result-container'>{this.renderResults()}</div>;
        let resultsMap = this.props.isMapping ? <div className='search-loading'><Spinner/></div> : <div className='result-container'>{this.renderResultsMap()}</div>;
        return (
            <div>
                <h6>CHEMICAL SEARCH</h6>
                <div className='search-map-products' ref={this.searchRef} >
                    <label>CAS Search</label>
                    <i className="fas fa-search search-icon" onClick={()=>{this.searchProductsCas(); this.searchProductsName();}}/>
                    <input value={fulltextSearchCas} onChange={(e) => this.handleChangeSearch(e)} placeholder='Search'/>
                    {results}
                </div>
                <div className='search-map-products' ref={this.mapRef}>
                    <label>Mapped Products Search</label>
                    <i className="fas fa-search search-icon" onClick={()=>{this.mapProducts()}}/>
                    <input value={fulltextMap} onChange={(e) => this.handleChangeMap(e)} placeholder='Search by Product Name or Product Number'/>
                    {resultsMap}
                </div>
            </div>
        );
    }
}

export default SearchProducts;