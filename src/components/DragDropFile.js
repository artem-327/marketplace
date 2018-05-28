import React from "react";
import PropTypes from "prop-types";

export default class DragDropFile extends React.Component {
    constructor(props) {
        super(props);
        this.onDrop = this.onDrop.bind(this);
    };

    static suppress(event) {
        event.stopPropagation();
        event.preventDefault();
    };

    onDrop(event) {
        DragDropFile.suppress();
        const files = event.dataTransfer.files;
        if (files && files[0]) this.props.handleFile(files[0]);
    };

    render() {
        return (
            <div onDrop={this.onDrop} onDragEnter={DragDropFile.suppress} onDragOver={DragDropFile.suppress}>
                {this.props.children}
            </div>
        );
    };
}

DragDropFile.propTypes = {
    handleFile: PropTypes.func.isRequired
};
