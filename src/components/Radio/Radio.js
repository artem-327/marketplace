import React, {Component} from 'react';
import './radioButton.css';
import PropTypes from "prop-types";

class Radio extends Component {
    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            checked: this.props.checked
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({checked: nextProps.checked})
    }

    handleChange(event){
        let value = event.target.value;
        this.setState({checked: value}, ()=>{
            if(this.props.onChange) this.props.onChange(value);
        });

    }

    renderRadio(opt){
        return opt.map((radio, index)=>{
            return <label className="radioButton" key={index}><p>{radio.label}</p>
                <input type="radio" onChange={this.handleChange} name={this.props.name} value={radio.value} checked={radio.value === this.state.checked}/>
                <span className={"radiomark " + (this.props.className || '')}> </span>
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
    className: PropTypes.string,
    onChange: PropTypes.func
};

export default Radio;




