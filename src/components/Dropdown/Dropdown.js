
// import {Translate} from 'react-localize-redux';
import React, {Component} from 'react';
import './dropdown.css';


class Dropdown extends Component {
    constructor(props) {
        super(props);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.state = {
            options: this.groupOptionValues(this.props.optionValues)
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            options: this.groupOptionValues(nextProps.optionValues)
        });
    }

    groupOptionValues(optionValues) {
        return optionValues.reduce((carry, option) => {
            (carry[option.option.id] = carry[option.option.id] || {...option.option, visible: true, optionValues: []}).optionValues.push(option);
            return carry;
        }, {});
    }

    toggleDropdown(optionId){
        this.setState({
            options: {
                ...this.state.options,
                [optionId]:{
                    ...this.state.options[optionId],
                    visible: !this.state.options[optionId].visible
                }
            }
        })
    }

    // handleSubmit(inputs){
    //     console.log(inputs);
    // }

    render(){
        // let currentState = this.props.currentState || null ;
        // let test = [];
        // let options = test.map((option, index)=>{
        //     <div>{option.name}</div>
        // });
    //     return (
    //         <div> {currentState || this.props.placeholder || 'zadejte hodnotu'}</div>
    //
    //     )
    // }
        console.log(this.state.options);
        return (
            <div className="App">
                <table className="option-values">
                    <thead>
                    <tr>
                        <th><input type="dropdown" /></th>
                        {/*<th>{currentState || this.props.placeholder || 'zadejte hodnotu'}</th>*/}
                        <th>'zadejte hodnotu'</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.values(this.state.options).reduce((rows, option) => {
                        rows.push(
                            <tr className="option" key={'m' + option.name} onClick={() => {this.toggleDropdown(option.id)}}>
                                <td>
                                    <span><a href="#">{option.id}</a></span>
                                    <span className="product-name">{option.name}</span>
                                </td>
                                <td colSpan="3">
                                    {option.visible ? <i className="icon fas fa-angle-down"/> : <i className="icon fas fa-angle-up"/>}
                                </td>
                            </tr>
                        );
                        option.visible ?
                            option.optionValues.forEach((option) => {
                                rows.push(
                                    <tr className="option-values" key={'m' + option.id}>
                                        <td>{option.name}</td>
                                    </tr>
                                )
                            }) : null;
                        return rows;
                    }, [])}
                    </tbody>
                </table>
            </div>
        );
    }

};


export default Dropdown;
