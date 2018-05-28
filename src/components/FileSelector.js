import React from "react";
import PropTypes from 'prop-types';

export default class FileSelector extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        const files = event.target.files;
        if (files && files[0]) this.props.handleFile(files[0]);
    };

    render() {
        return <input type="file" accept={this.props.accept} onChange={this.handleChange}/>
    };
}

FileSelector.propTypes = {
    handleFile: PropTypes.func.isRequired
};
