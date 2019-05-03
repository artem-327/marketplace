import React, { Component } from 'react'
import { connect } from 'react-redux'

import Dropzone from 'react-dropzone'
import { Grid, Icon, GridRow, GridColumn } from 'semantic-ui-react'

class UploadCSV extends Component {
  state = {
    uploadedFile: null
  }

  render() {
    const { uploadedFile } = this.state
    console.log(uploadedFile)
    return (
      <Grid centered padded>
        <Dropzone onDrop={this.onDrop} accept="text/csv" multiple="false">
          Drag and drop or browse computer to upload your .csv file
          {uploadedFile && uploadedFile.name}
        </Dropzone>
      </Grid>
    )
  }

  onDrop = acceptedFiles => {
    console.log(acceptedFiles)
    this.setState({ uploadedFile: acceptedFiles[0] })
  }
}

const mapDispatchToProps = {}

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadCSV)
