import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ThreeDotsMenu.css';
class ThreeDotsMenu extends Component {

    renderLinks() {
        if (!this.props.links) return;
        let links = this.props.links.map((link, index) => {
            return <li key={index} onClick={()=>link.action(this.props.id, this.props.callback)}>
                {link.label}
            </li>
        });
        return <span className="submenu-links">{links}</span>;
    };
    render () {
        return this.props.isOpen ? <ul className="three-dots-menu">{this.renderLinks()}</ul> : null
    }

}


ThreeDotsMenu.propTypes = {
    isOpen: PropTypes.bool,
    links: PropTypes.array,
    id: PropTypes.any,
    callback: PropTypes.func
};

export default ThreeDotsMenu;