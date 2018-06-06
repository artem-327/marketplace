import React, {Component} from 'react';
import PropTypes from "prop-types";

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.setCurrentValue = this.setCurrentValue.bind(this);
        this.state = {
            isOpen: false,
            currentValue: this.props.currentValue,
        };
    }

    setCurrentValue(val){
        this.setState({currentValue: val, isOpen: false})
    }

    componentWillReceiveProps(nextProps){
        this.setState({currentValue: nextProps.currentValue, isOpen: false})
    }

    render() {
        let {currentValue} = this.state;
        let opt = this.props.options.map((option, index)=>{
            return <li key={index + 'dropdown'} onClick={()=>{this.setCurrentValue(option.value)}}>{option.value}</li>
        });
        let options = this.state.isOpen ?
            <ul className='dropdown-options'>
                {opt}
            </ul> : null;
        return (
            <div className='dropdown-wr'>
                <div className='dropdown-trigger' onClick={()=>{this.setState({isOpen: !this.state.isOpen})}}>
                    <span>{currentValue || this.props.placeholder || 'Select Option'}</span>
                </div>
                {options}
            </div>
        );
    }
};

Dropdown.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
        })
    ).isRequired,
    currentValue: PropTypes.string,
    placeholder: PropTypes.string
};


export default Dropdown;