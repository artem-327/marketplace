import React, {Component} from 'react';
import './filterTag.css'
import PropTypes from "prop-types";

class FilterTag extends Component {

    packageName = [];

    checkName(name){
        switch(name){
            case 'search': return 'Chemical name';
            case 'qntylb': return 'From Quantity';
            case 'qntyub': return 'To Quantity';
            case 'prclb': return 'From Price';
            case 'prcub': return 'To Price';
            case 'dtfr': return 'Expiration From';
            case 'dtto': return 'Expiration To';
            case 'pckgs': return 'Package type';
            case 'assmin': return 'Assay Min';
            case 'assmax': return 'Assay Max';
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
                <i onClick={()=>{this.props.resetForm('forms.filter.' + this.props.name);this.props.close()}} className="fas fa-times"> </i>
            </div>
    )}
}

FilterTag.propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    close: PropTypes.func
};

export default FilterTag;