import React, {Component} from 'react';

export default class AddGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {open: !this.props.disable, disable: this.props.disable}
    }

    componentWillReceiveProps(nextProps){
        this.setState({open: !nextProps.disable, disable: nextProps.disable})
    }

    handleOpen(){
        if(!this.state.disable) this.setState({open: !this.state.open})
    }

    render() {
        let styleOpen = this.state.open ? ' open' : '';
        return (
            <div className="add-group">
                <div className={'header-group' + styleOpen} onClick={() => this.handleOpen()}>
                    <h1>{this.props.header}</h1>
                    {this.state.open ? <i className="icon fas fa-angle-down"/> : <i className="icon fas fa-angle-up"/>}
                </div>
                    <div className={'add-body' + styleOpen} > {this.props.component} </div>
            </div>
        );
    }
}
