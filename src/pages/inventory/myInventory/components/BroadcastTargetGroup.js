import React, {Component} from 'react';
import BroadcastConfig from './BroadcastConfig'

class BroadcastTargetGroup extends Component {

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            target: [],
            groupSelected: 'include',
            filter: this.props.filter,
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.filter !== this.state.filter){
            this.setState({filter: nextProps.filter, target: [], groupSelected: 'include', isOpen: false,})
        }
    }

    handleChangeGroup(id, value){
        let newTarget = this.state.target.slice();
        if(value === 'include' || value === 'exclude'){
            newTarget = [];
            for(let i = 0; i < this.props.items.length; i++){
                newTarget.push({visibility: value === 'include', id: this.props.items[i].id})
            }
        }
        this.setState({
            groupSelected: value,
            target: newTarget
        })
    }

    handleChangeItem(id, value){
        for(let i = 0; i < this.state.target.length; i++){
            if(this.state.target[i].id === id){
                let newTarget = this.state.target.slice();
                newTarget[i].visibility = value === 'include';
                this.setState({target: newTarget});
                return;
            }
        }
        this.setState({target: [...this.state.target, {visibility: value === 'include', id}]})
    }

    checkItemValue(id){
        for(let i = 0; i < this.state.target.length; i++){
            if(this.state.target[i].id === id){
                if(this.state.target[i].visibility){
                    return 'include'
                }
                return 'exclude'
            }
        }
        return 'include'
    }

    renderItems(){
        return this.props.items.map((item, index) => {
            let value = this.state.groupSelected;
            if(value === 'custom'){
                value = this.checkItemValue(item.id)
            }
            return (<div key={index} className='br-item-header'>
                <div className='left-group'>
                    {item.name}
                </div>
                <BroadcastConfig item name={item.name + index} value={value} id={item.id} changeBrConfig={(id, value)=>this.handleChangeItem(id, value)}/>
                <div className='clearfix' > </div>
            </div>)
        })
    }

    checkGroupSelection(){

    }

    render() {
        return (
            <div>
               <div className='br-group-header' onClick={()=>this.setState({isOpen: !this.state.isOpen})}>
                   <div className='left-group'>
                       {this.state.isOpen ? <i className="icon fas fa-angle-up"/> : <i className="icon fas fa-angle-down"/>}
                       {this.props.name}
                       {!this.state.isOpen ? <span className='no-targets'>undefined / {this.props.items.length} Companies</span> : null}
                   </div>
                   <BroadcastConfig name={this.props.name} id={this.props.id} value={this.state.groupSelected} changeBrConfig={(id, value)=>this.handleChangeGroup(id, value)}/>
                   <div className='clearfix' > </div>
               </div>
                {this.state.isOpen ? this.renderItems() : null}
            </div>
        );
    }
}
export default BroadcastTargetGroup;