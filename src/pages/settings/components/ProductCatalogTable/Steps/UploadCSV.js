import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Dropzone from 'react-dropzone'
import { Grid, Dropdown, Label } from 'semantic-ui-react'

import { uploadCSVFile } from '../../../actions'

class UploadCSV extends Component {
  state = {
    uploadedFile: null,
    hasError: false
  }

  render() {
    const { uploadedFile, hasError } = this.state

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
      ${uploadedFile &&
        `
        border: 3px dashed #4cd137;
        background-color: #f1fcef;
      `}
      ${hasError &&
        `
        border: 3px dashed #f44336;
        background-color: #ffebee;
      `}
    `

    return (
      <Grid centered padded>
        <Grid.Row>
          <StyledDropzone
            onDrop={this.onDrop}
            accept="text/csv"
            multiple={false}
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
                    <p style={{ color: 'red' }}>Invalid type file</p>
                  </Grid.Column>
                </Grid.Row>
              )}
            </Grid>
          </StyledDropzone>
        </Grid.Row>
        {/* <Grid.Row>Select Mapping Type</Grid.Row>
        <Grid.Row>
          <Dropdown placeholder="Selected Type" selection />
        </Grid.Row> */}
      </Grid>
    )
  }

  onDrop = acceptedFiles => {
    console.log(acceptedFiles)
    this.setState({ uploadedFile: acceptedFiles[0] })
    if (acceptedFiles.length !== 0) {
      this.props.uploadCSVFile(acceptedFiles[0])
      this.setState({ uploadedFile: acceptedFiles[0], hasError: false })
    } else {
      this.setState({ uploadedFile: null, hasError: true })
    }
  }
}

const mapDispatchToProps = {
  uploadCSVFile
}

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadCSV)
