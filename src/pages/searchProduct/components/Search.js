import React, {Component} from 'react';
import debounce from 'debounce';

class Search extends Component {

    constructor(props){
        super(props);
        this.searchRedirect = this.searchRedirect.bind(this);
        this.searchProducts = debounce(this.searchProducts, 200);
        this.state = {
            fulltext: "",
        }
    }

    renderResults() {
        if (!this.props.results || this.props.results.length === 0) return <p className='search-status'>No results</p>;
        return this.props.results.map((result, index) => (
            <div key={index + 'search'} className='search-product-item' onClick={() => this.searchRedirect(result.casNumber)}>
                {result.primaryName}
                <span className='search-cas'>{result.casNumber}</span>
            </div>
        ));
    }

    searchRedirect(cas) {
        this.props.history.push('/add-inventory/' + cas);
    }

    handleChange(e) {
        this.setState({fulltext: e.target.value}, () => {
            if (this.state.fulltext.length > 1)  this.searchProducts(this.state.fulltext);
        });
    }

    searchProducts(){
        this.props.searchProduct(this.state.fulltext);
    }

    render() {
        let {fulltext} = this.state;
        let results = this.props.isFetching ? <p className='search-status'>Loading ...</p> : this.renderResults();
        return (
            <div>
                <div className='search-products'>
                    <input value={fulltext} onChange={(e) => this.handleChange(e)} placeholder='Type to find products'/>
                    <button onClick={()=>{this.searchProducts(fulltext)}}>Search</button>
                </div>
                <div className='search-results'>
                    {results}
                </div>
            </div>
        );
    }
}

export default Search;

