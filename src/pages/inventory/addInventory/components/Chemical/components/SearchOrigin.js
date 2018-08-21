import React, {Component} from 'react';
import './SearchOrigin.css';
import debounce from "debounce";
import {actions} from "react-redux-form";

class SearchOrigin extends Component {

    constructor(props){
        super(props);
        this.searchOrigin = debounce(this.searchOrigin, 200);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.originRef = React.createRef();
        this.state = {
            fulltext: "",
            results_count: 5,
            results: [],
            hasSearched: false,
        }
    }

    componentWillMount(){
        this.props.fetchOrigin();
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside(e) {
        if (this.originRef.current.contains(e.target)) return;
        this.setState({mapOpen: false});
    }

    renderResults() {
        if(!this.state.hasSearched) return;
        if (this.state.results.length === 0) return  <div className={'origin-results'} style={{maxHeight: 44 * this.state.results_count}}><p className='origin-no-result'>No results</p></div>;
        let res = this.state.results.map(origin => (
            <div key={origin.id} className='search-origin-item' onClick={() => {this.setState({fulltext: origin.name, hasSearched: false}, ()=>{
                this.props.dispatch(actions.change('forms.productOffering.origin', origin.name));
            })}}>
                <span className='search-cas'>{origin.name}</span>
            </div>
        ));
        return <div className={'origin-results'} style={{maxHeight: 44* this.state.results_count}}>{res}</div>
    }

    handleChange(e) {
        this.setState({fulltext: e.target.value, hasSearched: true}, () => {
            this.props.dispatch(actions.change('forms.productOffering.origin', this.state.fulltext));
            if (this.state.fulltext.length > 0) this.searchOrigin();
        });
    }

    searchOrigin(){
        let results = [];
        for(let i = 0; i < this.props.originData.length; i++){
            if(this.props.originData[i].name.search(new RegExp(this.state.fulltext, "i")) !== -1){
                results.push(this.props.originData[i]);
            }
        }
        this.setState({results})
    }

    render() {
        let {fulltext} = this.state;
        let results = this.renderResults();
        return (
            <div>
                <div className='search-origin'>
                    <label>Origin</label>
                    <i className="fas fa-search search-icon" onClick={()=>{this.searchOrigin()}}/>
                    <input value={fulltext} onChange={(e) => this.handleChange(e)} placeholder='Search' ref={this.originRef}/>
                    {results}
                </div>
            </div>
        );
    }
}

export default SearchOrigin;