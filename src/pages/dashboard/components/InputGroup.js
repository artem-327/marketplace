import React, {Component} from 'react';

export default class InputGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: "test",
            data: {
              header:"header"
            }
        }
    }

    componentWillMount(){

    }

    prepareInputsLocation() {
      return this.props.inputsLocation.map((i, index) => {
        return (
          <div key={index} >
            <label>{i.label}</label>
            <input type={i.type} name={i.name} defaultValue={i.value} />
          </div>
        )
      })
    }

    prepareInputsDetail() {
      return this.props.inputsDetail.map((i, index) => {
        return (
          <div key={index}>
            <label>{i.label}</label>
            <input type={i.type} name={i.name} defaultValue={i.value} />
          </div>
        )
      })
    }

    render() {
        return (
            <div className="input-group">
                <h1>{this.props.title}</h1>
                {this.prepareInputsLocation()}
                {this.prepareInputsDetail()}
            </div>
        );
    }
}
