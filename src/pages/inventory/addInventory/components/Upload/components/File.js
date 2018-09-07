import React, {Component} from 'react';
import './file.css'
import PropTypes from "prop-types";

class File extends Component {

    render () {
        return (
            <div id={this.props.name} className="file">
                <i className="close" onClick={()=>this.props.onRemove()} />
                {this.props.name}
            </div>
        )}
}

File.propTypes = {
    name: PropTypes.string,
    close: PropTypes.func,
    onRemove: PropTypes.func,
};

export default File;