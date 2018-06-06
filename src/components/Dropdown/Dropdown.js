
// import {Translate} from 'react-localize-redux';
import React, {Component} from 'react';


class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            dropdownOpen: nextProps.dropdownOpen
        })
    }

    handleSubmit(inputs){
        console.log(inputs);
    }

    render(){
        let currentState = this.props.currentState || null ;
        let test = [];
        let options = test.map((option, index)=>{
            <div>{option.name}</div>
        });
        return (
            <div> {currentState || this.props.placeholder || 'zadejte hodnotu'}</div>

        )
    }
};


export default Dropdown;