import React, {Component} from 'react';

export default class RecentProducts extends Component {

    componentDidMount(){
        this.props.fetchRecentAddedProducts()
    }

    renderRecentProducts() {
        return this.props.recentProducts.map((product, index)=>{
            return <div key={index} className='recent-product' onClick={()=>{this.props.setProduct(this.props.recentProducts[index])}}>
                {product.primaryName}
            </div>
        });
    }

    render() {
        return <div>{this.renderRecentProducts()}</div>
    }
}
