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
    saveMapping(values){
        values = Object.assign({}, values, {
            product: this.props.productID
        });
        this.setState({save: true}, ()=>{
            this.props.saveMapping(values);
        });
    }

    render() {
        let button = this.state.save ? <button className='saved-productMapping'>SAVED</button> :
            <button className='save-productMapping'>Save Mapping</button>;
        return (

            <div>
                <h6 className=''>PRODUCT MAPPING</h6>
                <Form model="forms.products.productsMapping" onSubmit={(values)=>this.saveMapping(values)}>
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
                        <label htmlFor=".productName">Product Name</label>
                        <Control.text model=".productName"
                                      id=".productName"/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor=".productNumber">Product Number</label>
                        <Control.text model=".productNumber"
                                      id=".productNumber"/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor=".measurements">Measurement</label>
                        <Control.text model=".packaging.capacity"
                                      id=".measurements"/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor=".productGrade">U/M</label>
                        <DropdownRedux opns={this.props.unitOfMeasurement} placeholder='Select'
                                       model="forms.products.productsMapping.packaging.unit"
                                       dispatch={this.props.dispatch}/>
                    </div>
                    <div className='group-item-wr'>
                        <label htmlFor=".productCondition">U/P</label>
                        <DropdownRedux opns={this.props.unitOfPackaging} placeholder='Select'
                                       model="forms.products.productsMapping.packaging.container"
                                       dispatch={this.props.dispatch}/>
                    </div>
                    {button}
                </div>
                </Form>
            </div>
        );
    }
}


