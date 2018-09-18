import React, {Component} from 'react';
import {required} from "../../../../utils/validation";
import RemoteComboBox from "../../../../components/ComboBox/RemoteComboBox";

class AddCompany extends Component {

    constructor(props){
        super(props);
        this.state = {
            addMode: false,
            text: "",
            location: {}
        }
    }

    render() {
        let addMode = this.props.addMode || this.state.addMode;
        return (
            <div className="admin-add">
                {addMode ?
                    <div className="admin-add-input office">
                        <input placeholder="Office name" onChange={(e)=>this.setState({text: e.target.value})} value={this.state.text}/>
                        <RemoteComboBox items={this.props.locations}
                             api={(text) => this.props.fetchLocation(text)}
                             limit={5} placeholder="Location"
                             className="location-admin-add"
                             isFetching={this.props.isFetchingLocation}
                             getObject={(location)=>this.setState({location: location})}
                             validators={{required}} />
                        <button onClick={()=>this.props.addItem({name: this.state.text, location: this.state.location})}>Add</button>
                    </div>
                    :
                    <p onClick={()=>this.props.changeMode(true) || this.setState({add: true})}>{this.props.text}</p>
                }
            </div>
        )
    }
}

export default AddCompany;