import React, {Component} from 'react';
import './ComboBox.css';
import debounce from "debounce";
import PropTypes from "prop-types";

class RemoteComboBox extends Component {
    constructor(props){
        super(props);
        this.filterData = debounce(this.filterData, 200);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.comboRef = React.createRef();
        this.state = {
            fulltext: "",
            isOpen: false,
            results_count: 5,
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
        if (this.props.items.length === 0) return  <div className={'combo-results'} style={{maxHeight: 44 * this.state.results_count}}><p className='combo-no-result'>No results</p></div>;
        console.log(this.props.items);
        let res = this.props.items.map((combo, index) => (
            <div key={index + combo.id} className='combo-item' onClick={() => {this.setState({fulltext: (combo[this.props.displayAttr] || combo.name), hasSearched: false}, ()=>{
                if(this.props.onChange) this.props.onChange(this.state.fulltext);
            })}}>
                <span className='combo-cas'>{(combo[this.props.displayAttr] || combo.name)}</span>
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
        this.props.api(this.state.fulltext);
    }

    render() {
        let {fulltext} = this.state;
        let results = this.renderResults();
        return (
            <div ref={this.comboRef}>
                <div className='comboBox'>
                    <label>Origin</label>
                    <i className="fas fa-search combo-icon" />
                    <input value={fulltext} onChange={(e) => this.handleChange(e)} disabled={this.props.disabled || false} placeholder={this.props.placeholder || "Search"}/>
                    {results}
                </div>
            </div>
        );
    }
}

RemoteComboBox.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
        })
    ).isRequired,
    api: PropTypes.func,
    currentValue: PropTypes.string,
    displayAttr: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};

export default RemoteComboBox;