import React, {Component} from 'react';

class AddCompany extends Component {

    constructor(props){
        super(props);
        this.state = {
            addMode: false,
            text: ""
        }
    }

    render() {
        let addMode = this.props.addMode || this.state.addMode;
        return (
            <div className="admin-add">
                {addMode ?
                    <div className="admin-add-input">
                        <input onChange={(e)=>this.setState({text: e.target.value})} value={this.state.text}/>
                        <button onClick={()=>this.props.addItem(this.state.text)}>Add</button>
                    </div>
                    :
                    <p onClick={()=>this.props.changeMode(true) || this.setState({add: true})}>{this.props.text}</p>
                }
            </div>
        )
    }
}

export default AddCompany;