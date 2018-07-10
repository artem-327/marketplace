import React, {Component} from 'react';
import './filterTag.css'
import PropTypes from "prop-types";
import { actions } from 'react-redux-form';

class FilterTag extends Component {

    checkName(name){
        switch(name){
            case 'search': return 'Chemical name';
            case 'qntylb': return 'From Quantity';
            case 'qntyub': return 'To Quantity';
            case 'prclb': return 'From Price';
            case 'prcub': return 'To Price';
            case 'pckgs': return 'Package type';
            default: return 'unknown';
        }
    }

    render () {
        return (
            <div className="filterTag"><span>{this.checkName(this.props.name)}: {this.props.value}</span>
                <i onClick={()=>{this.props.dispatch(actions.change('forms.filter.data.' + this.props.name, ''));this.props.close()}} className="fas fa-times"> </i>
            </div>
    )}
}

FilterTag.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    close: PropTypes.func
};

export default FilterTag;