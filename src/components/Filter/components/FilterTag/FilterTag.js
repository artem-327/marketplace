import React, {Component} from 'react';
import './filterTag.css'
import PropTypes from "prop-types";

class FilterTag extends Component {

    checkName(name){
        switch(name){
            case 'search': return 'Chemical name / CAS #';
            case 'qntylb': return 'From Quantity';
            case 'qntyub': return 'To Quantity';
            case 'prclb': return 'From Price';
            case 'prcub': return 'To Price';
            case 'pckgs': return '';


            default: return 'unknown';
        }
    }

    render () {
        return (
            <div className="filterTag">{this.checkName(this.props.name)}: {this.props.value}<i onClick={()=>this.props.close()} class="fas fa-times"></i></div>
    )}
}

FilterTag.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    close: PropTypes.func
};

export default FilterTag;