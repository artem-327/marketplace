import React, {Component} from 'react';

class Search extends Component {

    renderResults(){
        if(!this.props.results || this.props.results.length === 0) return <p>No results</p>
        return this.props.results.map((result, index) => {
            return <div className='search-product-item'>{result.name}</div>
        })
    }

    render() {
        return (
            <div>
                <input className='search-products' />
                {this.renderResults()}
            </div>
        );
    }
}
export default Search;

