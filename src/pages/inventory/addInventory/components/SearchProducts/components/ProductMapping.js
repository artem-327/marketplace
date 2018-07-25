import React, {Component} from 'react';
import {Control, Form} from 'react-redux-form';
import DropdownRedux from "../../../../../../components/Dropdown/DropdownRedux";

export default class ProductMapping extends Component {
    constructor(props){
        super(props);
        this.state = {
            save: false,
        }
    }

    componentDidMount () {
        this.props.getUnitOfMeasurement();
        this.props.getUnitOfPackaging();
    }

    saveMapping(e){
        e.preventDefault();
        if(this.state.warehouseIndex === '')return;
        this.setState({save: !this.state.save})
    }

    render() {
        let button = this.state.edit ? <button onClick={(e)=>this.updateLocation(e)} className='edit-productMapping saved'>Saved</button> :
            <button className='edit-productMapping' onClick={(e)=>this.saveMapping(e)}>Save Mapping</button>;
        return (

            <div>
                <h6 className=''>PRODUCT MAPPING</h6>
                <Form model="forms.addProductOffer.addProductOffer">
                <div>
                    <div className='group-item-wr'>
                        <label htmlFor=".indexName">CAS Index Name</label>
                        <Control.text model=".indexName"
                                      id=".indexName"/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor=".casNumber">CAS Number</label>
                        <Control.text model=".casNumber"
                                      id=".casNumber"/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor=".chemicalName">Chemical Name</label>
                        <Control.text model=".chemicalName"
                                      id=".chemicalName"/>
                    </div>
                </div>
                <div>
                    <div className='group-item-wr'>
                        <label htmlFor=".productNamess">Product Name</label>
                        <Control.text model=".productNames"
                                      id=".productNames"/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor=".productNumbers">Product Number</label>
                        <Control.text model=".productNumbers"
                                      id=".productNumbers"/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor=".measurements">Measurement</label>
                        <Control.text model=".measurements"
                                      id=".measurements"/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor=".productGrade">U/M</label>
                        <DropdownRedux opns={this.props.unitOfMeasurement} placeholder='Select'
                                       model="forms.addProductOffer.getUnitOfMeasurement"
                                       dispatch={this.props.dispatch}/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor=".productCondition">U/P</label>
                        <DropdownRedux opns={this.props.unitOfPackaging} placeholder='Select'
                                       model="forms.addProductOffer.getUnitOfPackaging"
                                       dispatch={this.props.dispatch}/>
                    </div>
                    {button}
                </div>
                </Form>
            </div>
        );
    }
}


