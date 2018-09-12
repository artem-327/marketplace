import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ThreeDotsMenu.css';
import {withRouter} from 'react-router-dom';
class ThreeDotsMenu extends Component {

    renderLinks() {
        if (!this.props.links) return;
        let links = this.props.links.map((link, index) => {
            return <li key={index} onClick={()=>{this.props.history.push(link.url)}}>
                {link.label}
            </li>
        });
        return <span className="submenu-links">{links}</span>;
    };
    render () {
        return (
            <ul className="three-dots-menu">
            {this.renderLinks()}
            </ul>
        )
    }
}


ThreeDotsMenu.propTypes = {
    isOpen: PropTypes.bool,
    links: PropTypes.array,

};

export default withRouter(ThreeDotsMenu);