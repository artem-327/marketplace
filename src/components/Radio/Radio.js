import React, {Component} from 'react';
import './radioButton.css';
import PropTypes from "prop-types";

class Radio extends Component {
    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        console.log(e.target.value);
    }

    renderRadio(opt){
        return opt.map((radio, index)=>{
            return <label className="radioButton" key={index}><p>{radio.label}</p>
                    <input type="radio" onClick={(e)=>{this.handleChange(e)}} name={this.props.name} value={radio.value} defaultChecked={radio.value === this.props.checked}/>
                    <span className="checkmark"></span>
                    </label>
        });
    }

    render () {
        let radios = this.renderRadio(this.props.opns);
        return (
            <div>
                {radios}
            </div>
        )
    }
}

Radio.propTypes = {
    opns: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOf(PropTypes.string, PropTypes.number, PropTypes.bool),
            label: PropTypes.string,
        })
    ).isRequired,
    name: PropTypes.string,
    checked: PropTypes.PropTypes.oneOf(PropTypes.string, PropTypes.number, PropTypes.bool),
    css: PropTypes.string
};

export default Radio;




