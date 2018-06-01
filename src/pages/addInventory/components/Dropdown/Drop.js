import React, {Component} from 'react';
import {Translate} from 'react-localize-redux';
import PropTypes from 'prop-types';
import {Control, Form} from 'react-redux-form';
import dropdown from '../../../../images/inv-filter/dropdown.png'
import dropdownClose from '../../../../images/inv-filter/dropdown-close.png'
import '../../../../app.css';

class Drop extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    renderInputs() {

        return this.props.inputs.map((input, index) => {
            switch(input.type){
                case 'checkbox':{
                    return (
                        <div key={index} className="input-checkbox">
                            <label key={index} htmlFor={input.model}>
                                {input.label}
                                <Control.checkbox model={input.model} id={input.model}/>
                                <span className="checkmark">  </span>
                            </label>
                        </div>
                    )
                }
                case 'text':{
                    return (
                        <div key={index} className='input-text'>
                            <div>
                            <label className="input-text" htmlFor={input.model}>{input.label}</label>
                            </div>
                            <Control.text model={input.model} id={input.model} placeholder='put some text here'/>
                        </div>
                    )
                }
                case 'dropdown' :{
                    return (
                        <div key={index} className='input-select'>
                            <label htmlFor={input.model}>{input.label}</label>
                            <Control.select model={input.model} id={input.model}>
                                <option value="red">red</option>
                                <option value="green">green</option>
                                <option value="blue">blue</option>
                            </Control.select>
                        </div>
                    )
                }

            }
        })
    }

    render() {
        return (
            <div><br/>
                <div className="header" onClick={() => {
                    this.setState(this.state.open)
                }}>
                    {this.props.header}
                </div>
                {this.renderInputs()}
            </div>
        );
    }
}

Drop.propTypes = {
    inputs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            model: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
        })
    )
};


export default Drop;