import React, {Component} from 'react';
import './AddInventory.css'

class AddInventory extends Component {

    constructor(props){
        super(props);

    }

    // componentDidMount(){
    //     this.props.getProductType(this.props.match.params.productId).then(()=>{
    //         this.props.getCondition(this.props.product.productType)
    //         this.props.getSelect2(this.props.product.productType)
    //         this.props.getSelect3(this.props.product.productType)
    //         this.props.getSelect4(this.props.product.productType) //jednotlive select boxy na ktere navazeme EP
    //
    //     })
    // }

    componentWillMount(){
        this.props.getProduct();
    }

    productForm(id){
        this.props.productForm(id)
    }

    productCondition(id){
        this.props.productCondition(id)
    }

    packageType(id){
        this.props.packageType(id)
    }

    render() {
        console.log(this.props);
        return (
            <div>

            </div>
        );
    }
}
export default AddInventory;

