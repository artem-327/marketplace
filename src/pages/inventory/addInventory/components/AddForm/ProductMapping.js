import React, {Component} from 'react';
import DropdownRedux from "../../../../../components/Dropdown/DropdownRedux";

export default class ProductMapping extends Component {
    render() {
        return (

            <div>
                <h6 className=''>PRODUCT MAPPING</h6>

                <label>CAS Index Name</label>
                <input className='input-label'></input>
                <label>CAS Number</label>
                <input className='input-label'></input>
                <label>Chemical Name</label>
                <input className='input-label'></input>
                <label>Product Name</label>
                <input className='input-label'></input>
                <label>Product Number</label>
                <input className='input-label'></input>
                <label>Measurement</label>
                <input className='input-label'></input>
                <div className='group-item-wr'>
                <label htmlFor=".productGrade">Grade</label>
                <DropdownRedux opns={this.props.grade} placeholder='Select'
                               model="forms.addProductOffer.addProductOffer.productGrade"
                               dispatch={this.props.dispatch}/>
                </div>
                <div className='group-item-wr'>
                <label htmlFor=".productCondition">Condition</label>
                <DropdownRedux opns={this.props.productConditions} placeholder='Select'
                               model="forms.addProductOffer.addProductOffer.productCondition"
                               dispatch={this.props.dispatch}/>
                </div>
            </div>
        );
    }
}
