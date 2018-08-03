import React, {Component} from 'react';
import './radioButton.css';
import PropTypes from "prop-types";
import { Control } from 'react-redux-form';

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
        this.setState({checked: value}, ()=>{
        
            if(this.props.onChange)
                this.props.onChange(value);
                
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
        /*
        let custom = null;
        if (this.props.productAgeModel){
           if(this.state.checked === "10000"){
            custom = <div><Control.text type={"text"} model={"forms.filter.data.productAgeCustom"} placeholder={"months"}/></div>
           }
           else { 
               if(this.props.handleCustom("forms.filter.data.productAgeCustom") != null){
                    
                    this.props.handleCustom("forms.filter.data.productAgeCustom");
                    custom = null;
                }
            }
            
        }*/
        let custom = null;
        
        //if (this.props.productAgeModel){
           if(this.state.checked === "10000"){

                custom = <div><Control.text type={"text"} model={"form.filter.data.productAgeCustom"} placeholder={"months"}/></div>
           }
           else if(this.props.productAgeCustomModel != null) { 
                this.props.handleCustom("form.filter.data.productAgeCustom", null);
            }
            
        //}
        return (
            <div>
                
                {this.renderRadio(this.props.opns)}
                {custom}
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




