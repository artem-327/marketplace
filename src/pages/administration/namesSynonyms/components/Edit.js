import React, {Component} from 'react';
import InputEdit from "../../../../components/InputEdit/InputEdit";

class NamesSynonyms extends Component {
    constructor(props){
        super(props);
        this.state = {
            primaryName: "",
            alternativeNames: []
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({alternativeNames: nextProps.alternativeNames});
        if(nextProps.selectedProduct) {
            this.setState({
                primaryName: nextProps.selectedProduct.chemicalName,
            })
        }
    }

    saveNewName(text, index){
        let newAlternativeNames = this.state.alternativeNames.slice();
        newAlternativeNames[index].alternativeName = text;
        this.setState({alternativeNames: newAlternativeNames})
    }

    render(){
        return this.props.selectedProduct ?
            <div className="edit">
                <h2>Edit Primary name and synonyms</h2>
                <h3>Primary Name</h3>
                <InputEdit value={this.state.primaryName} onSave={(text) => this.setState({primaryName: text})}/>
                <h3>Synonyms</h3>
                <ul className="synonyms-list">
                {this.state.alternativeNames.map((item, index)=>{
                    return <InputEdit key={item.id} value={item.alternativeName} onSave={(text) => this.saveNewName(text, index)}/>
                })}
                </ul>
                <button className="button">Save</button>
            </div> : null

    }
}

export default NamesSynonyms;