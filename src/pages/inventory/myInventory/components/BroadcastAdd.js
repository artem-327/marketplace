import React, {Component} from 'react';

class BroadcastAdd extends Component {

    constructor(props){
        
        super(props)
        this.submitRules = this.submitRules.bind(this);
        this.state = {
            name: "",
            fulfilled: "Set Rules",
            brActive: false,
        }
    }

    handleInput(name, value){
        this.setState({[name]: value})
    }
    brActive () {
        this.props.brActive(this.state.brActive)
    }
    submitRules(){
        
        this.props.submitRules({name: this.state.name, subjects: this.props.subjects, targets: this.props.targets}).then(()=>{
            this.setState({fulfilled: "Success", brActive: true}, ()=>{
                setTimeout(function () {
                    this.setState({fulfilled: "Set Rules"},() => {this.props.removePopup(); this.props.getProductOffers()});
                  }.bind(this), 2000)
        })
    })}

    render() {
        this.props.active(this.state.brActive);
        return (
            <div className='br-rules-add'>
                <label>Rules name</label>
                <input name="name" value={this.state.name} onChange={(e)=>this.handleInput("name", e.target.value)} /><br />
                <button className="button green" onClick={()=>this.submitRules()}>{this.state.fulfilled}</button>
            </div>
        );
    }
}
export default BroadcastAdd;