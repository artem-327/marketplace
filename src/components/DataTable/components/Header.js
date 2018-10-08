import React, {Component} from 'react';
import PropTypes from "prop-types";

class Header extends Component {


    render() {
        return (
            <thead>
            <tr >
                {this.props.data.map((item, index) => (
                    <th onClick={()=>this.props.sortFunc(item.name)} key={index}>{item.name}</th>
                ))}
            </tr>
            </thead>
        )

    }
}

Header.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
        })
    )
};

export default Header;
