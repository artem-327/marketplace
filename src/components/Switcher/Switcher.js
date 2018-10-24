import React, {Component} from 'react';
import './Switcher.css';

class Switcher extends Component {

    componentWillMount(){
        let checked = this.props.value;
        this.setState({checked});
    }

    componentWillReceiveProps(nextProps){
        let checked = nextProps.value;
        this.setState({checked:checked});
    }

    handleChange = () => {
        this.setState({checked:!this.state.checked})
        if(this.props.onChange)
                this.props.onChange(this.state.checked);
    }

    render(){
        return (
            <div className="switch-container">
                <div className="switch-container"> 
                <label className="switch">
                    <input type="checkbox" onChange={this.handleChange} checked={this.state.checked}/>
                    <span className="slider round"></span>
                </label>
            </div>
            </div>
        )
    }
}

export default Switcher;




