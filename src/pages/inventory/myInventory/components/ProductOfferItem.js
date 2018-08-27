import React, {Component} from 'react';
import './ProductOffers.css';
import classnames from "classnames";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import ThreeDots from "../../../../components/ThreeDots/ThreeDots";
import BroadcastRule from "./BroadcastRule";

class ProductOfferItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            productOffersSelection: []
        }
    }

    render () {
        const {offer} = this.props;
        return (
            <React.Fragment>
            <tr className="product-offer">
                <td><Checkbox onChange={(value) => {console.log(value)}}/></td>
                <td onClick={()=>{this.setState({isOpen: !this.state.isOpen, productOffersSelection: [offer.id]})}}><ThreeDots className='small'/></td>
                <td className="capitalize">{offer.product.casIndexName}</td>
                <td>{offer.packaging.amount}</td>
                <td>{offer.packaging.container.name}</td>
                <td>{offer.packaging.capacity}</td>
                <td>{parseInt(offer.packaging.amount, 10) * parseInt(offer.packaging.capacity, 10)}</td>
                <td>{offer.pricing.cost}</td>
                <td>{offer.pricing.price}</td>
                <td>{offer.name}</td>
                <td>{offer.manufacturer}</td>
                <td>{offer.productCondition.name}</td>
                <td>unknown</td>
                <td><span className={'broadcast-mark' + classnames({' open' : this.props.brActive})}> </span></td>
                <td> </td>
            </tr>
            <tr>
                <td colSpan="15">
                    <BroadcastRule
                        submitRules={this.props.submitRules}
                        addPopup={this.props.addPopup}
                        closeRules={() => this.setState({isOpen: false})}
                        removePopup={this.props.removePopup}
                        getProductOffers={this.props.getProductOffers}
                        targetGroups={this.props.targetGroups}
                        selections={this.props.selections}
                        setFilter={(type) => this.props.setFilter(type)}
                        currentSelected={this.props.currentSelected}
                        productOffersSelection={this.state.productOffersSelection}
                        setActiveBroadcastButton={active => this.props.setActiveBroadcastButton(active)}
                        visible={this.state.isOpen}
                    />
                </td>
            </tr>
            </React.Fragment>
        )
    }
}


export default ProductOfferItem;