import React, {Component} from 'react';
import './threeDots.css';
import PropTypes from "prop-types";

class ThreeDots extends Component {
    constructor(props) {
        super(props);
        // this.handleChange = this.handleChange.bind(this);
    }

// handleChange(e){
//     console.log(e.target.value);

    renderThree(opt) {
        return opt.map((dots, index) => {
            return <label className="threeDots" key={index}>
                <div>{dots.label}</div>
                <span className={"threeDots " + (this.props.className || '')}></span>
            </label>
        });
    }

    render() {
        return (
            <div>
                {this.renderThree(this.props.opns)}
            </div>
        )
    }
}

ThreeDots.propTypes = {
    opns: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
            label: PropTypes.string,
        })
    ).isRequired,
    name: PropTypes.string,
    checked: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    className: PropTypes.string
};

export default ThreeDots;