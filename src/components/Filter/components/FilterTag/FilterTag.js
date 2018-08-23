import React, {Component} from 'react';
import './filterTag.css'
import PropTypes from "prop-types";
import { actions } from 'react-redux-form';

class FilterTag extends Component {

    packageName = [];

    checkName(name){
        switch(name){
            case 'search': return 'Chemical name';
            case 'qntylb': return 'From Quantity';
            case 'qntyub': return 'To Quantity';
            case 'prclb': return 'From Price';
            case 'prcub': return 'To Price';
            case 'pckgs': return 'Package type';
            case 'chemSearch': return 'Chemical search';
            case 'productAge': return 'Product Age';
            case 'loc': return 'Location';
            default: return 'unknown';
        }
    }

    createPackageName(name){
        this.packageName.push(name);
    }

    pickPackageName(){
        this.packageName = [];
        var array = this.props.value.split(',');

        for (let i = 0; i < array.length; i++) {
            this.props.packageTypes.map((info)=>{
                if((info.id).toString() === array[i]){
                    this.packageName.push(info.name);
                }
                return null;
            })
        }
        
    }

    chooseFilter(name){
        switch(name){
            case 'pckgs':{
                this.pickPackageName();
                return this.packageName.join(',');
            }
            default: {
                return this.props.value;
            }
        }
    }

    render () {
        return (
            <div className="filterTag"><span>{this.checkName(this.props.name)}: {this.chooseFilter(this.props.name)}</span>
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