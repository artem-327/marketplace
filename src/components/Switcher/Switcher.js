import React, {Component} from 'react';
import './Switcher.css';

class Switcher extends Component {
    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            
        }
    }

    componentWillMount(){
        let checked = this.props.value;
        console.log(this.props.value);
        this.setState({checked});
    }

    componentWillReceiveProps(nextProps){
        let checked = nextProps.value;
        this.setState({checked:checked});
    }

    handleChange(){
        this.setState({checked:!this.state.checked})
        
        if(this.props.onChange)
                this.props.onChange(this.state.checked);
    }

    renderSwitcher(){
        
       return <div className="switch-container"> 
                <label className="switch">
                    <input type="checkbox" onChange={this.handleChange} checked={this.state.checked}/>
                    <span className="slider"></span>
                </label>
            </div>
    }


    render(){
        return (
            <div className="switch-container">
                {this.renderSwitcher()}
            </div>
        )
    }

}

export default Switcher;




