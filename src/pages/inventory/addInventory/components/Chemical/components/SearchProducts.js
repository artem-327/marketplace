import React, {Component} from 'react';
import './SearchProducts.css';
import debounce from "debounce";
import Spinner from '../../../../../../components/Spinner/Spinner';

class SearchProducts extends Component {

    constructor(props){
        super(props);
        this.searchProducts = debounce(this.searchProducts, 200);
        this.mapProducts = debounce(this.mapProducts, 200);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.searchRef = React.createRef();
        this.mapRef = React.createRef();
        this.state = {
            searchOpen: false,
            mapOpen: false,
            fulltextSearch: "",
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
        return this.props.searchedProducts.map((product, index) => (
            <div key={index + 'search'} className='search-status' style={{maxHeight: 50 * this.state.results_count}}>
                <div className='search-product-item' onClick={() => {this.setState({fulltextSearch: product.casNumber, searchOpen: false}, ()=>{
                    this.props.onSelect(product)
                })}}>
                    <span className='search-cas'>{product.casNumber}</span>
                </div>
            </div>
        ))};

    renderResultsMap() {
            if (!this.props.mappedProducts || this.props.mappedProducts.length === 0 || !this.state.mapOpen) return null;
            console.log(this.props.mappedProducts);
            return this.props.mappedProducts.map((productTemplate, index) => (
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
        this.setState({fulltextSearch: e.target.value, searchOpen: true}, () => {
            if (this.state.fulltextSearch.length > 0) this.searchProducts();
        });
    }

    handleChangeMap(e) {
        this.setState({fulltextMap: e.target.value, mapOpen: true}, () => {
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
        let results = this.props.isSearching ? <div className='search-status'><Spinner/></div> : <div className='result-container'>{this.renderResults()}</div>;
        let resultsMap = this.props.isMapping ? <div className='map-status'><Spinner/></div> : <div className='result-container'>{this.renderResultsMap()}</div>;
        return (
            <div>
                <h6>CHEMICAL SEARCH</h6>
                <div className='search-map-products' ref={this.searchRef} >
                    <label>CAS Search</label>
                    <i className="fas fa-search search-icon" onClick={()=>{this.searchProducts()}}/>
                    <input value={fulltextSearch} onChange={(e) => this.handleChangeSearch(e)} placeholder='Search'/>
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