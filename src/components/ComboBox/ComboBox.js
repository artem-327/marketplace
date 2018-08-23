import React, {Component} from 'react';
import './ComboBox.css';
import debounce from "debounce";
import PropTypes from "prop-types";

class ComboBox extends Component {
    constructor(props){
        super(props);
        this.filterData = debounce(this.filterData, 200);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.comboRef = React.createRef();
        this.state = {
            fulltext: "",
            isOpen: false,
            results_count: this.props.limit,
            results: [],
            hasSearched: false,
        }
    }

    componentWillMount(){
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentDidMount(){
        if(this.props.currentValue){
            this.setState({fulltext: this.props.currentValue}, ()=>{
                if(this.props.onChange) this.props.onChange(this.state.fulltext);
            })
        }
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside(e) {
        if (this.comboRef.current.contains(e.target)) return;
        this.setState({isOpen: false});
    }

    renderResults() {
        if(!this.state.hasSearched || !this.state.isOpen) return;
        if (this.state.results.length === 0) return  <div className={'combo-results'} style={{maxHeight: 44 * this.state.results_count}}><p className='combo-no-result'>No results</p></div>;
        let res = this.state.results.map(combo => (
            <div key={combo.id} className='combo-item' onClick={() => {this.setState({fulltext: combo.name, hasSearched: false}, ()=>{
                if(this.props.onChange) this.props.onChange(this.state.fulltext);
            })}}>
                <span className='combo-cas'>{combo.name}</span>
            </div>
        ));
        return <div className={'combo-results'} style={{maxHeight: 44* this.state.results_count}}>{res}</div>
    }

    handleChange(e) {
        this.setState({fulltext: e.target.value, hasSearched: true, isOpen: true}, () => {
            if (this.state.fulltext.length > 0) this.filterData();
        });
    }

    filterData(){
        let results = [];
        for(let i = 0; i < this.props.items.length; i++){
            if(this.props.items[i].name.search(new RegExp(this.state.fulltext, "i")) !== -1){
                results.push(this.props.items[i]);
            }
        }
        this.setState({results})
    }

    render() {
        let {fulltext} = this.state;
        let results = this.renderResults();
        return (
            <div ref={this.comboRef}>
                <div className={'comboBox ' + this.props.className}>
                    <label>{this.props.label}</label>
                    <i className="fas fa-search combo-icon" />
                    <input value={fulltext} onChange={(e) => this.handleChange(e)} disabled={this.props.disabled || false} placeholder={this.props.placeholder || "Search"}/>
                    {results}
                </div>
            </div>
        );
    }
}

ComboBox.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
        })
    ).isRequired,
    className: PropTypes.string,
    limit: PropTypes.number,
    label: PropTypes.string,
    currentValue: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};

export default ComboBox;