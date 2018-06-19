import React, {Component} from 'react';

export default class AddGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {open: true}
    }


    render() {
        let styleOpen = this.state.open ? ' open' : '';
        return (
            <div className="add-group">
                <div className={'header' + styleOpen} onClick={() => this.setState({open: !this.state.open})}>
                    <h1>{this.props.header}</h1>
                    {this.state.open ? <i className="icon fas fa-angle-down"/> : <i className="icon fas fa-angle-up"/>}
                </div>
                    {this.state.open ? <div className='add-body'> {this.props.component} </div>: null}
            </div>
        );
    }
}
