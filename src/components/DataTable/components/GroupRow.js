import React, {Component} from 'react';
import PropTypes from "prop-types";
import Row from "./Row";

class GroupRow extends Component {

    render() {
        return (
            <React.Fragment>
            <tr className="product" onClick={() => console.log()}>
                <td >
                    <span className="product-casnumber">{this.props.group}</span>
                </td>
            </tr>
            {this.props.rows.map((row, index) => (<Row data={row} key={index}/>))}
            </React.Fragment>
        )

    }
}

GroupRow.propTypes = {

};

export default GroupRow;
