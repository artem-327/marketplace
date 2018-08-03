import React, {Component} from 'react';
import AddGroup from '../AddGroup'
import {Form} from 'react-redux-form';
import Pricing from './Pricing';
import Location from './Location';
import classnames from 'classnames';

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

    addProductOffer(inputs){
        if(localStorage.getItem('productLots')){
            let lots = JSON.parse(localStorage.getItem('productLots'));
            this.addLot(lots, inputs, 0)
        }
    }

    addLot(lots, inputs, index){
        if(index === lots.length){
            if(index === 0) return;
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
                <Form model="forms.addProductOffer.addProductOffer" onSubmit={(inputs) => this.addProductOffer(inputs)}>
                    <AddGroup header='PRICING' disable={this.props.disable} component = {<Pricing {...this.props}/>} />
                    <AddGroup header='LOCATION' disable={this.props.disable} component = {<Location {...this.props}/>} />
                    <button disabled={this.props.disable}
                            className={classnames('button add-inventory big', {'disabled' : this.props.disable})}>
                        ADD INVENTORY
                    </button>
                </Form>
            </div> )
    }
}
