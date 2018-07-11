import React, {Component} from 'react';
import PropTypes from "prop-types";
import './dropdown.css';
import classnames from 'classnames';
import ArrowUp from '../../images/inv-filter/dropdown.png';

class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.setCurrentValue = this.setCurrentValue.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.dropdownRef = React.createRef();
        this.state = {
            isOpen: false,
            currentValue: this.props.currentValue,
            results_count: 5
        };
    }

    setCurrentValue(id, val){
        this.setState({currentValue: val, isOpen: false}, ()=>{
            if(this.props.onCustomChange) this.props.onCustomChange(id);
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.redux){
            let cv = nextProps.value;
            for(let i = 0; i < nextProps.opns.length; i++){
                if(nextProps.opns[i].id === nextProps.value){
                    cv = nextProps.opns[i].name;
                    break;
                }
            }
            this.setState({currentValue: cv, isOpen: false})
        }
        else if(nextProps.currentValue){
            this.setState({currentValue: nextProps.currentValue, isOpen: false})
        }
    }

    componentWillMount(){
        document.addEventListener('mousedown', this.handleClickOutside, false);
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClickOutside, false);
    }

    handleClickOutside(e) {
        if (this.dropdownRef.current.contains(e.target)) return;
        this.setState({isOpen: false})
    }

    renderDropdown(opt){
        if(this.props.disable) return;
        return opt.map((option, index)=>{
            return <li key={index + 'dropdown'} onClick={()=>{this.setCurrentValue(option.id, option.name)}}>{option.name}</li>
        });
    }

    render() {
        let {currentValue, isOpen} = this.state;
        let options = this.state.isOpen ?
            <ul className='dropdown-options' style={{maxHeight: 39*this.state.results_count}}>
                {this.renderDropdown(this.props.opns)}
            </ul> : null;
        return (
            <div className='dropdown-wr' ref={this.dropdownRef} >
                <div className={'dropdown-trigger ' + classnames({'open' : isOpen})} onClick={()=>{this.setState({isOpen: !this.state.isOpen})}}>
                    <div>{currentValue || this.props.placeholder || 'Select Option'}<img alt="up" src={ArrowUp} /></div>
                </div>
                {options}
            </div>
        );
    }
}

Dropdown.propTypes = {
    opns: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
        })
    ).isRequired,
    currentValue: PropTypes.string,
    placeholder: PropTypes.string,
    onCustomChange: PropTypes.func,
    disable: PropTypes.bool,
};


export default Dropdown;




