import React, {Component} from 'react';
import Filter from './components/Filter'
import addInventoryImage from "../../../images/add-inventorty.png"
import './addInventory.css'



class AddInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            counterActivated: false,
            statsRef:{},
            selectedOption: '',
        }
    }

    handleChange = (selectedOption) => {
        if(selectedOption === '' || selectedOption === null){
            this.setState({ selectedOption: '' });
        }else {
            this.setState({selectedOption: selectedOption});
        }
        console.log(this.state.selectedOption);
    };

    render() {
        let addForm =<div/>;
        if(this.state.selectedOption !== '') {
            addForm =  <div>saddasdasd</div>;
       }
       else{
            addForm = <img alt="add-inventory" src={addInventoryImage}/>;
       }

        return (
            <div className="AddInventory">
                <Filter  onChange={(value)=>{this.handleChange(value)}}/>
                {addForm}
            </div>
        );
    }
}

export default AddInventory;

