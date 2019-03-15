import React, {Component} from 'react';
import './filterTag.scss'
import PropTypes from "prop-types";

class FilterTag extends Component {

    packageName = [];
    gradeName= [];
    conditionName = [];
    formName = [];
    locationName = [];

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
            case 'assaylb': return 'Assay Min';
            case 'assayub': return 'Assay Max';
            case 'chemSearch': return 'Chemical search';
            case 'productAge': return 'Product Age';
            case 'frm': return 'Form';
            case 'loc': return 'Location';
            case 'cndt': return 'Condition';
            case 'grade': return 'Grade';
            default: return 'unknown';
        }
    }

    createPackageName(name){
        this.packageName.push(name);
    }

    pickPackageName(){
        this.packageName = [];
        let array = this.props.value;
        for (let i = 0; i < array.length; i++) {
            this.props.packagingTypes.map((info)=>{
                if((info.id).toString() === array[i]){
                    this.packageName.push(info.name);
                }
                return null;
            })
        }
    }

    pickGradeName(){
        this.gradeName = [];
        let array = this.props.value;

        for (let i = 0; i < array.length; i++) {
            this.props.productGradeTypes.map((info)=>{
                if((info.id).toString() === array[i]){
                    this.gradeName.push(info.name);
                }
                return null;
            })
        }
    }

    pickConditionName(){
        this.conditionName = [];
        let array = this.props.value;

        for (let i = 0; i < array.length; i++) {
            this.props.productConditions.map((info)=>{
                if((info.id).toString() === array[i]){
                    this.conditionName.push(info.name);
                }
                return null;
            })
        }
    }

    pickFormName(){
        this.formName = [];
        let array = this.props.value;
        for (let i = 0; i < array.length; i++) {
            this.props.productForms.map((info)=>{
                if((info.id).toString() === array[i]){
                    this.formName.push(info.name);
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
            case 'cndt':{
                this.pickConditionName();
                return this.conditionName.join(',');
            }
            case 'frm':{
                this.pickFormName();
                return this.formName.join(',');
            }
            case 'grade':{
                this.pickGradeName();
                return this.gradeName.join(',');
            }
            case 'loc':{
                return 'Location'
                // this.pickLocationName();
                // return this.locationName.join(',');
            }
            default: {
                return this.props.value;
            }
        }
    }
    render () {
        if(Array.isArray(this.props.value) && this.props.value.length === 0) return null;
        return (
            <div className="filterTag"><span>{this.checkName(this.props.name)}: {this.chooseFilter(this.props.name)}</span>
                <i onClick={()=>{this.props.resetForm('forms.filter.' + this.props.name);this.props.close()}} className="fas fa-times"> </i>
            </div>
    )}
}

FilterTag.propTypes = {
    name: PropTypes.string,
    value: PropTypes.any,
    close: PropTypes.func
};

export default FilterTag;