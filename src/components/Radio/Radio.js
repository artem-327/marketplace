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
                    <span className={"radiomark " + (this.props.style || '')}></span>
                    </label>
        });
    }

    render () {
        return (
            <div>
                {this.renderRadio(this.props.opns)}
            </div>
        )
    }
}

Radio.propTypes = {
    opns: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
            label: PropTypes.string,
        })
    ).isRequired,
    name: PropTypes.string,
    checked: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    style: PropTypes.string
};

export default Radio;




