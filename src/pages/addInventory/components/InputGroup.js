import React, {Component} from 'react';

export default class InputGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {

    }

    prepareInputs() {
        return this.props.inputs.map((input, index) => {
            return (
                <div key={index}>
                    {input.label}
                    {input.component}
                </div>
            )
        })
    }

    render() {
        return (
            <div className="input-group">
                <h1>{this.props.header}</h1>
                {this.prepareInputs()}
            </div>
        );
    }
}
