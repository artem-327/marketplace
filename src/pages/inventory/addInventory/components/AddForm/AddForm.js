import React, {Component} from 'react';
import AddGroup from '../AddGroup'
import {Form} from 'react-redux-form';
import Pricing from './Pricing';
import Location from './Location';
import classnames from 'classnames';
import Attachment from "../Upload/Attachment";


export default class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedProduct: {}
        }
    }

    componentWillMount(){
        this.props.fetchWarehouse();
        this.props.fetchLocations();
    }

    componentWillUnmount(){
        this.props.resetForm('forms.addProductOffer');
    }

    addProductOffer(inputs){
        if(localStorage.getItem('productLots')){
            let lots = JSON.parse(localStorage.getItem('productLots'));
            this.addLot(lots, inputs, 0)
        }
        else {
            this.props.addMessage('You must add lot first.')
        }
    }

    addLot(lots, inputs, index){
        if(index === lots.length){
            if(index === 0) return;
            localStorage.removeItem('productLots');
            this.props.history.push("/inventory/my-inventory");
            return;
        }
        let params = Object.assign({}, inputs, {
                merchantVisibility: (inputs.merchantVisibility || false),
                ...lots[index]
        });
        this.props.addProductOffer(params).then(() => {
            this.addLot(lots, inputs, ++index);
        })
    }

    render() {
        return (
            <div className={classnames('add-inventory', {'disable' : this.props.disable})} >
                <Form model="forms.addProductOffer" onSubmit={(inputs) => this.addProductOffer(inputs)}>
                    <AddGroup header='PRICING' disable={this.props.disable} component = {<Pricing {...this.props}/>} />
                    <AddGroup header='WAREHOUSE' disable={this.props.disable} component = {<Location {...this.props}/>} />
                    {/*<AddGroup header='ATTACHMENTS' disable={this.props.disable} component = {<Attachment {...this.props}/>}/>*/}
                    <button disabled={this.props.disable}
                            className={classnames('button add-inventory big', {'disabled' : this.props.disable})}>
                        Add Product Offer
                    </button>
                </Form>
            </div> )
    }
}
