import React, {Component} from 'react';
import PropTypes from "prop-types";
import './dropdown.scss';
import classnames from 'classnames';
import ArrowDown from '../../images/inv-filter/dropdown-close.png';
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
            if(this.props.onChange) this.props.onChange(id);
        })
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.redux){
            let cv = nextProps.currentValue ? nextProps.currentValue : '';
            const opnsLength = nextProps.opns ? nextProps.opns.length : 0;
            for(let i = 0; i < opnsLength; i++){
                if(nextProps.opns[i].id === nextProps.value){
                    cv = nextProps.opns[i].name || nextProps.opns[i].warehouseName;
                    break;
                }
            }
            this.setState({currentValue: cv, isOpen: false})
        }
        else if(nextProps.currentValue){
            this.setState({currentValue: nextProps.currentValue, isOpen: false})
        }
    }

    componentDidMount(){
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
        if(this.props.disabled) return;
        return opt.map((option, index)=>{
            return <li key={index + 'dropdown'} onClick={()=>{this.setCurrentValue(option.id, option.name || option.warehouseName)}} data-test={`Dropdown_index_${index}_set`}>{option.name || option.warehouseName}</li>
        });
    }

    toggleDropdown(){
        if(this.props.disabled) return;
        this.setState({isOpen: !this.state.isOpen})
    }

    render() {
        const arrow = !this.state.isOpen ? <img alt="up" src={ArrowDown}/> : <img alt="up" src={ArrowUp}/>;

        let {currentValue, isOpen} = this.state;
        let isSelected = false;
        const opnsLength = this.props.opns ? this.props.opns.length : 0;
        for (let i = 0; i < opnsLength; i++) {
            if (this.props.opns[i].id === this.props.value) {
                isSelected = true;
                break;
            }
        }
        let options = this.state.isOpen ?
            <ul className='dropdown-options' style={{maxHeight: 39*this.state.results_count}}>
                {this.renderDropdown(this.props.opns)}
            </ul> : null;
        return (
            <div className='dropdown-wr' ref={this.dropdownRef} >
                <div className={
                    'dropdown-trigger '
                    + classnames(
                        {
                            'disabled' : this.props.disabled,
                            'open' : isOpen,
                            'selected' : isSelected
                        }
                        )
                }
                     onClick={()=>this.toggleDropdown()}
                     data-test='Dropdown_toggle_dropdown'>
                    <div className="dropdown-current-placeholder">{currentValue || this.props.placeholder || 'Select'}{arrow}</div>
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
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
};


export default Dropdown;




