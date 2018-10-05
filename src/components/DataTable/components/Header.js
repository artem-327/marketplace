import React, {Component} from 'react';
import PropTypes from "prop-types";

class Header extends Component {


    render() {
        return (
            <thead>
                <tr>
                    {this.props.header.map((item) => {
                        return <th>{item.name}</th>
                    })}
                </tr>
            </thead>
        )

    }
}

Header.propTypes = {};

export default Header;
