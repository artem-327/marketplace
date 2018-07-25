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
            case 'pckgs':{ 
                this.pickPackageName();
                return 'Package type';}
            default: return 'unknown';
        }
    }

    createPackageName(name){
        this.packageName.push(name);
    }

    pickPackageName(){
        this.packageName = [];
        var array = this.props.value.split(',');
        this.props.packageTypes.map((info, index)=>{
            
            if(info.id.toString() === array[index]){
                //console.log(info.name, array[index], info.id, index);
                this.packageName.push(info.name);
            }
        })
    }

    render () {
        return (
            <div className="filterTag"><span>{this.checkName(this.props.name)}: {this.packageName.join(',')}</span>
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