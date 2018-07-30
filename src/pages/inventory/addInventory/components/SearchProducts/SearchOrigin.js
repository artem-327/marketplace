import React, {Component} from 'react';
import './SearchOrigin.css';
import debounce from "debounce";

class SearchOrigin extends Component {

    constructor(props){
        super(props);
        this.searchOrigin = debounce(this.searchOrigin, 200);
        this.state = {
            fulltext: "",
            results_count: 10
        }
    }

    renderResults() {
        if (!this.props.searchedOrigin || this.props.searchedOrigin.length === 0) return <p className='search-status'>No results</p>;
        return this.props.searchedOrigin.map(product => (
            <div key={product.id} className='search-origin-item' onClick={() => this.props.onSelect(product)}>
                <span className='search-cas'>{product.casNumber}</span>
                {product.primaryName}
            </div>
        ));
    }

    handleChange(e) {
        this.setState({fulltext: e.target.value}, () => {
            if (this.state.fulltext.length > 0) this.searchOrigin();
        });
    }

    searchOrigin(){
        this.props.searchOrigin(this.state.fulltext);
    }

    render() {
        let {fulltext} = this.state;
        return (
            <div>
                <div className='search-origin'>
                    <label>Origin</label>
                    <i className="fas fa-search search-icon" onClick={()=>{this.searchOrigin()}}/>
                    <input value={fulltext} onChange={(e) => this.handleChange(e)} placeholder='Search'/>
                </div>
            </div>
        );
    }
}

export default SearchOrigin;