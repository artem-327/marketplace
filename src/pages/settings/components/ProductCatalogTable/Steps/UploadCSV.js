import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import Dropzone from "react-dropzone";
import { Grid } from "semantic-ui-react";

import { uploadCSVFile } from "../../../actions";

const StyledDropzone = styled(Dropzone)`
  display: flex;
  border: 3px dashed #2599d5;
  width: 300px;
  height: 300px;
  cursor: pointer;
  &:hover {
    border: 3px dashed #2599d5;
    background-color: #eef7fc;
  }
  ${props =>
    props.uploaded &&
    `
        border: 3px dashed #4cd137;
        background-color: #f1fcef;
      `}
  ${props =>
    props.error
      ? `
        border: 3px dashed #f44336;
        background-color: #ffebee;
      `
      : undefined}
`;

class UploadCSV extends Component {
  state = {
    uploadedFile: null,
    hasError: false
  };

  render() {
    const { uploadedFile, hasError } = this.state;

    return (
      <Grid centered padded>
        <Grid.Row>
          <StyledDropzone
            onDrop={this.onDrop}
            accept="text/csv"
            multiple={false}
            uploaded={uploadedFile}
            error={hasError ? "true" : undefined}
          >
            <Grid>
              <Grid.Row verticalAlign="middle">
                <Grid.Column>
                  Drag and drop or browse computer to upload your .csv file
                </Grid.Column>
              </Grid.Row>
              {uploadedFile && (
                <Grid.Row verticalAlign="top">
                  <Grid.Column>{uploadedFile.name}</Grid.Column>
                </Grid.Row>
              )}
              {hasError && (
                <Grid.Row verticalAlign="top">
                  <Grid.Column>
                    <p style={{ color: "red" }}>Invalid type file</p>
                  </Grid.Column>
                </Grid.Row>
              )}
            </Grid>
          </StyledDropzone>
        </Grid.Row>
      </Grid>
    );
  }

  onDrop = acceptedFiles => {
    if (acceptedFiles.length !== 0) {
      this.props.uploadCSVFile(acceptedFiles[0]);
      this.setState({ uploadedFile: acceptedFiles[0], hasError: false });
    } else {
      this.setState({ uploadedFile: null, hasError: true });
    }
  };
}

const mapDispatchToProps = {
  uploadCSVFile
};

export default connect(
  null,
  mapDispatchToProps
)(UploadCSV);
