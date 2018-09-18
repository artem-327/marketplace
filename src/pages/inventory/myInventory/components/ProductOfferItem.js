import React, {Component} from 'react';
import './ProductOffers.css';
import classnames from "classnames";
import Checkbox from "../../../../components/Checkbox/Checkbox";
import ThreeDots from "../../../../components/ThreeDots/ThreeDots";
import BroadcastRule from "./BroadcastRule";
import ThreeDotsMenu from "../../../../components/ThreeDots/ThreeDotsMenu";

class ProductOfferItem extends Component {
    constructor(props) {
        super(props);
        this.broadcastRef = React.createRef();
        this.threeDotsRef = React.createRef();
        this.handleClickOutsideBr = this.handleClickOutsideBr.bind(this);
        this.state = {
            isOpen: false,
            trDotsOpen: false,
            productOffersSelection: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({trDotsOpen:nextProps.trDotsOpen});
    }
    componentWillMount(){
        document.addEventListener('mousedown', this.handleClickOutsideBr, false);
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClickOutsideBr, false);
    }

    handleClickOutsideBr(e) {
        if (this.broadcastRef.current.contains(e.target) || this.threeDotsRef.current.contains(e.target)) return;
        this.setState({isOpen: false})
    }

    render () {
        const {offer} = this.props;
        const trDotsMenuActive = this.state.trDotsOpen ? {borderBottom: '4px solid #289ada'} : null;
        const dotsMenuLinks =
            [
                {
                    action: ()=>console.log('edit'),
                    label: 'Edit Listing',
                },
                {
                    action: ()=>console.log('BR'),
                    label: 'Custom Broadcast'
                },
                {
                    action: ()=>console.log('delete'),
                    label: 'Delete Listing'
                }
            ];
        return (
            <React.Fragment>
            <tr className="product-offer">
                <td><Checkbox inputClass='input-myInv' className='mark-myInv small' onChange={(value) => {console.log(value)}}/></td>
                <td style={trDotsMenuActive} ref={this.threeDotsRef} onClick={()=> this.setState({trDotsOpen: !this.state.trDotsOpen})}>
                    <ThreeDots className={'small'+ classnames({" active": (this.state.trDotsOpen)})}/>
                    <ThreeDotsMenu links={dotsMenuLinks} isOpen={this.state.trDotsOpen}/>
                </td>
                <td className="capitalize">{offer.product.casIndexName}</td>
                <td>{offer.packaging.amount.formatNumber()}</td>
                <td>{offer.packaging.container.name}</td>
                <td>{offer.packaging.capacity}</td>
                <td>{(parseInt(offer.packaging.amount, 10) * parseInt(offer.packaging.capacity, 10)).formatNumber()}</td>
                <td>$ {offer.pricing.cost.formatMoney(2)}</td>
                <td>$ {offer.pricing.price.formatMoney(2)}</td>
                <td>{offer.name}</td>
                <td>{offer.manufacturer}</td>
                <td>{offer.productCondition.name}</td>
                <td>Unknown</td>
                <td><span className={'broadcast-mark' + classnames({' open' : this.props.brActive})}> </span></td>
                <td> </td>
            </tr>
            <tr>
                <td colSpan="15">
                    <BroadcastRule
                        brRef={this.broadcastRef}
                        submitRules={this.props.submitRules}
                        addPopup={this.props.addPopup}
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