import React, {Component} from 'react';
import dropdown from '../../../../images/inv-filter/dropdown.png'
import dropdownClose from '../../../../images/inv-filter/dropdown-close.png'

export default class AddGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: !this.props.disable,
            disable: this.props.disable
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            open: !nextProps.disable,
            disable: nextProps.disable
        })
    }

    handleOpen(){
        if(!this.state.disable) this.setState({open: !this.state.open})
    }

    render() {
        let styleOpen = this.state.open ? ' open' : '';
        return (
            <div className="add-group">
                <div className={'header-group' + styleOpen} onClick={() => this.handleOpen()}>

                    {this.state.open ? <img src={dropdown} alt='drop'/> : <img src={dropdownClose} alt='drop-close' />}
                    <h1>{this.props.header}</h1>
                </div>
                    <div className={'add-body' + styleOpen} > {this.props.component} </div>
            </div>
        );
    }
}
