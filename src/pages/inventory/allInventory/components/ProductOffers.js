import React, {Component} from 'react';
import './ProductOffers.css';
import moment from "moment";
import AddCart from '../../../cart/components/AddCart'
import {DATE_FORMAT} from "../../../../utils/constants";
import {getUnit} from "../../../../utils/functions";
import DataTable from "../../../../components/DataTable";

class ProductOffers extends Component {
  componentDidMount(){
      new Promise(resolve => {
          this.props.fetchMerchant(this.props.identity.data.id, resolve)
      }).then(() => {})
  }
  componentDidUpdate(){
    this.props.merchantDetail && this.props.fetchOffice(this.props.merchantDetail.office.id)
  }
//
    groupProductOffers(productOffers) {
        return productOffers.reduce((carry, offer) => {
            (carry[offer.product.id] = carry[offer.product.id] || {...offer.product, visible: true, productOffers: []}).productOffers.push(offer);
            return carry;
        }, {});
    }

   //TODO:: Add to cart
   addCart(id){
        this.props.addPopup(<AddCart id={id} history={this.props.history}/>)
   }

    render() {
        if(this.props.productOffers.length === 0) return null;
        let rows = Object.values(this.groupProductOffers(this.props.productOffers)).map((product) => {
            return {
                group: <React.Fragment><span className="product-casnumber">{product.casNumber}</span><span className="product-name capitalize">{product.casIndexName}</span></React.Fragment>,
                rows: product.productOffers.map((offer)=>{
                const unit = getUnit(offer.packaging.unit.name);
                const packageSize = offer.packaging.capacity;
                const packageUnit = offer.packaging.container.name;
                const itsOwnProduct = this.props.identity.data.email === offer.merchant.email
                return{
                    id: offer.id,
                    data: [!offer.anonymous ? offer.merchant.email : "Anonymous",
                        offer.packaging.amount.formatNumber(),
                        `${packageSize} ${unit} ${packageUnit}`,
                        (parseInt(offer.packaging.amount, 10) * parseInt(offer.packaging.capacity, 10)).formatNumber() + unit,
                        "$ " + offer.pricing.price.formatMoney(3),
                        offer.name,
                        offer.manufacturer.name,
                        offer.origin.name,
                        offer.expirationDate ? moment(offer.expirationDate).format(DATE_FORMAT) : 'none',
                        'Unknown',
                        offer.productCondition.name,
                        offer.productForm.name,
                        itsOwnProduct 
                        ? `${offer.warehouse.address.city}, ${offer.warehouse.address.province.name}`
                        : offer.warehouse.address.province.name,
                        <button className='info-button' onClick={()=>{this.addCart(offer.id)}}>INFO</button>]
                }})
            };
        });
        return (
            <div className="App ">
                <DataTable id="allInventoryTable"
                           sortFunc={(nameColumn) => console.log(nameColumn)}
                           headerInit={[{name: 'Merchant'}, {name: 'Available'}, {name: 'Packaging'}, {name: 'Quantity'}, {name: 'FOB Price'}, {name: 'Trade Name'}, {name: 'MFR.'}, {name: 'Origin'}, {name: 'Expiration'}, {name: 'Assay'}, {name: 'Condition'}, {name: 'Form'}, {name: 'Location'}, {name: null}]}
                           rows={rows}
                />
            </div>
        );
    }
}
export default ProductOffers;