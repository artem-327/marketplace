import React,{Component} from 'react';
import './AddedLots.css';
import AddedLot from './AddedLot';

class AddedLots extends Component {

    removeLots(index){
        this.props.removeLot(index)
    }

    renderLots(){
        return this.props.lots.map((value,index)=>{
            return <AddedLot position={index + 1} lot={value} removeLots={()=>this.removeLots(index)} key={index}/>
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