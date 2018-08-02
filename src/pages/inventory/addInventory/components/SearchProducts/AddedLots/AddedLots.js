import React,{Component} from 'react';
import './AddedLots.css';
import AddedLot from './AddedLot';

class AddedLots extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product:[
                
            ]
        }
    }

    removeLots(lotId){
        let removeProduct = this.state.product.filter((value,index)=>{
            return index !== lotId})
        this.setState({product: removeProduct});
    }

    renderLots(){
        console.log("!!!!", this.props.selectedProduct);
        return this.state.product.map((value,index)=>{
            return <AddedLot lot={value} removeLots={() => this.removeLots(index)} key={index} info={this.props.selectedProduct} mapping={this.props.mapping}/>
        });
    }

    componentWillReceiveProps(nextProps){
        
        if(Object.keys(nextProps.mapping).length === 0) return;
        this.setState({product:[...this.state.product, nextProps.lots]},()=>console.log(this.state.product));
    }

    render(){
        
        return (
        <div className='lots-container'>
                <div className='lots-header'>
                    ADDED LOTS
                </div>
                {this.renderLots()}
        </div>
        )
    }
}

export default AddedLots;