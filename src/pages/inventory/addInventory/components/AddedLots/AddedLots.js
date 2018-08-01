import React,{Component} from 'react';
import './AddedLots.css';
import AddedLot from './AddedLot';

class AddedLots extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product:[
                {  
                    id:1,
                    name:"Zajac",
                    CAS_Number:"1314-12-2"
                },
                {  
                    id:2,
                    name:"Medved",
                    CAS_Number:"1314-12-3"
                },
                {  
                    id:3,
                    name:"orol",
                    CAS_Number:"1314-12-4"
                },
                {  
                    id:4,
                    name:"Kon",
                    CAS_Number:"1314-12-5"
                },
                {  
                    id:5,
                    name:"Macka",
                    CAS_Number:"1314-12-6"
                }
            ]
        }
    }

    removeLots(lotId){
        let removeProduct = this.state.product.filter((value)=>{
            return value.id !== lotId})
        this.setState({product: removeProduct});
    }

    renderLots(){
        return this.state.product.map((value,index)=>{
            return <AddedLot lot={value} removeLots={lotId => this.removeLots(lotId)} key={index}/>
        });
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