import React, {Component} from 'react';
import './ComboBox.css';
import debounce from "debounce";
import PropTypes from "prop-types";
import {DEBOUNCE_TIME} from "../../utils/constants";
import Spinner from "../Spinner/Spinner";

class RemoteComboBox extends Component {
    constructor(props) {
        super(props);
        this.filterData = debounce(this.filterData, DEBOUNCE_TIME);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.comboRef = React.createRef();
        this.state = {
            fulltext: "",
            isOpen: false,
            results_count: this.props.limit,
            hasSearched: false,
        }
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentDidMount() {
        if (this.props.currentValue) {
            this.setState({fulltext: this.props.currentValue}, () => {
                if (this.props.onChange) this.props.onChange(this.state.fulltext);
            })
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside(e) {
        if (this.comboRef.current.contains(e.target)) return;
        this.setState({isOpen: false});
    }

    renderResults() {
        if (!this.state.hasSearched || !this.state.isOpen) return;
        if(this.props.isFetching) return <div className="combo-results"><Spinner /></div>;
        if (this.props.items.length === 0) return <div className={'combo-results'}
                                                       style={{maxHeight: 44 * this.state.results_count}}><p
            className='combo-no-result'>No results</p></div>;
        let res = this.props.items.map((combo, index) => (
            <div key={index + combo.id} className='combo-item' onClick={() => {
                this.setState({fulltext: this.props.displayName ? this.props.displayName(combo) : (combo[this.props.displayAttr] || combo.name), hasSearched: false}, () => {
                    if (this.props.onChange) this.props.onChange(this.props.saveObj ? this.props.saveObj(combo) : this.state.fulltext);
                    if (this.props.getObject) this.props.getObject(combo);
                })
            }}>
                <span className='combo-cas'>
                    {this.props.displayName ? this.props.displayName(combo) : (combo[this.props.displayAttr] || combo.name)}
                </span>

            </div>
        ));
        return <div className={'combo-results'} style={{maxHeight: 44 * this.state.results_count}}>{res}</div>
    }

    handleChange(e) {
        this.setState({fulltext: e.target.value, hasSearched: true, isOpen: true}, () => {
            if (this.state.fulltext.length > 0) this.filterData();
        });
    }

    filterData() {
        this.props.api(this.state.fulltext);
    }

    render() {
        let {fulltext} = this.state;
        let results = this.renderResults();
        return (
            <div className={'comboBox ' + this.props.className} ref={this.comboRef}>
                <label>{this.props.label}</label>
                <i className="fas fa-search combo-icon"/>
                <input value={fulltext} onChange={(e) => this.handleChange(e)} disabled={this.props.disabled || false}
                       placeholder={this.props.placeholder || "Search"}/>
                {results}
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
    getObject: PropTypes.func,
    api: PropTypes.func,
    className: PropTypes.string,
    limit: PropTypes.number,
    label: PropTypes.string,
    currentValue: PropTypes.string,
    isFetching: PropTypes.bool,
    displayAttr: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};

export default RemoteComboBox;