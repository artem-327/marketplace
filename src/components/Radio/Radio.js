import React, {Component} from 'react';
import './radioButton.css';
import PropTypes from "prop-types";

class Radio extends Component {
    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {

        }
    }
    componentWillMount(){
        
        let checked = this.props.redux ? this.props.value : this.props.checked;
        
        this.setState({checked});
    }
    componentWillReceiveProps(nextProps){
        
        let checked = nextProps.redux ? nextProps.value : nextProps.checked;
        
        this.setState({checked});
    }

    handleChange(event){
        
        let value = event.target.value;
        console.log("Radio Handle change", event,"value ",value);
        console.log("Radio checked?: ",this.state.checked, this.props.checked);
        this.setState({checked: value}, ()=>{
            
            if(this.props.onCustomChange && this.props.onChange){
                console.log("Radio checked? IN: ",this.state.checked, this.props.checked);
                console.log("onCustomChange IN: ",this.props.onCustomChange);
                this.props.onCustomChange(value);
            }
            else if(this.props.onChange)
                this.props.onChange(value);
        });

    }
    renderRadio(opt){

        
        console.log('Checked prop:',this.props.checked);
        return opt.map((radio, index)=>{
            console.log("state:", this.state.checked); 
            console.log("radio value: ", radio.value);
            return <label className="radioButton" key={index}><p>{radio.label}</p>

                <input type="radio" onChange={this.handleChange} name={this.props.name} value={radio.value} checked={radio.value === this.state.checked}/>
                <span className={"radiomark " + (this.props.className || '')}> </span>
                
            </label>
        });
    }

    render () {
        console.log(this.props)
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




