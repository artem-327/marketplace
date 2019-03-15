import React, {Component} from 'react';
import './file.scss'
import PropTypes from "prop-types";

class File extends Component {

    render () {
        return (
            <React.Fragment>
            <span key={this.props.index} className={this.props.className}>
                <i className="close" onClick={()=>this.props.onRemove()} />
                {this.props.name}
            </span>
            </React.Fragment>
        )}
}

File.propTypes = {
    name: PropTypes.string,
    close: PropTypes.func,
    onRemove: PropTypes.func,
    className: PropTypes.string,
};

export default File;