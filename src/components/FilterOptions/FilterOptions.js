import React, {Component} from 'react';
import PropTypes from "prop-types";
import './filterOptions.css';
import classnames from 'classnames';

class FilterOptions extends Component {
    constructor(props) {
        super(props);
        this.setCurrentValue = this.setCurrentValue.bind(this);
        this.state = {
            currentValue: this.props.currentValue,
        };
    }

    setCurrentValue(val){
        this.setState({currentValue: val})
    }

    componentWillReceiveProps(nextProps){
        this.setState({currentValue: nextProps.currentValue})
    }

    // componentWillMount(){
    //     document.addEventListener('mousedown', this.handleClickOutside, false);
    // }
    //
    // componentWillUnmount(){
    //     document.removeEventListener('mousedown', this.handleClickOutside, false);
    // }
    //
    // handleClickOutside(e) {
    //     if (this.dropdownRef.current.contains(e.target)) return;
    //     this.setState({isOpen: false})
    // }

    render() {
        let {currentValue} = this.state;
        let opt = this.props.options.map((option, index)=>{
            return <div key={index + 'filOpt'} onClick={()=>{this.setCurrentValue(option.value)}}>{option.value}</div>
        });
        // let options = this.state.isOpen ?
        //     <ul className='dropdown-options'>
        //         {opt}
        //     </ul> : null;
        return (
            <div className='filOpt-wr'>
                <div className={'filOpt-body '}>
                    <div>{currentValue}<div className="circle"><a className="close" href="#" /></div></div>
                </div>
            </div>
        );
    }
}

FilterOptions.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
        })
    ).isRequired,
    currentValue: PropTypes.string,
    // placeholder: PropTypes.string
};


export default FilterOptions;
