import React, {Component} from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import Dropzone from 'react-dropzone'
import {Grid, Segment, Header, Icon, Form} from 'semantic-ui-react'
import {FormattedMessage} from 'react-intl'

import {uploadCSVFile} from '../../../actions'

const StyledDropzone = styled(Dropzone)`
  display: flex;
  border: 2px dashed #2599d5;
  width: 300px;
  height: 300px;
  cursor: pointer;
  &:hover {
    border: 2px dashed #2599d5;
    background-color: #eef7fc;
  }
  ${props =>
    props.uploaded &&
    `
        border: 2px dashed #4cd137;
        background-color: #f1fcef;
      `}
  ${props =>
    props.error &&
    `
        border: 2px dashed #f44336;
        background-color: #ffebee;
      `}
`

const StyledSegment = styled(Segment)`
  margin: 0 !important;
  background: transparent !important;
  border: none !important;
`

class UploadCSV extends Component {
  state = {
    uploadedFile: null,
    hasError: false
  }

  render() {
    const {uploadedFile, hasError} = this.state

    return (
      <Grid centered padded>
        <Grid.Row>
          <Form>
            <StyledDropzone
              onDrop={this.onDrop}
              accept={['.csv', '.xlsx']}
              multiple={false}
              uploaded={uploadedFile}
              error={hasError ? 'true' : undefined}>
              <StyledSegment placeholder>
                <Header icon>
                  <Icon name='file' className='csv' />
                  <FormattedMessage
                    id='settings.dragAndDrop'
                    defaultMessage='Drag and drop or browse computer to upload your .csv file'
                  />
                </Header>
                <Segment.Inline>
                  {uploadedFile && uploadedFile.name}
                  {hasError && (
                    <p style={{color: 'red'}}>
                      <FormattedMessage id='settings.invalidFileType' defaultMessage='Invalid file type' />{' '}
                    </p>
                  )}
                </Segment.Inline>
              </StyledSegment>
            </StyledDropzone>
          </Form>
        </Grid.Row>
      </Grid>
    )
  }

  onDrop = acceptedFiles => {
    if (acceptedFiles.length !== 0) {
      this.props.uploadCSVFile(acceptedFiles[0])
      this.setState({uploadedFile: acceptedFiles[0], hasError: false})
    } else {
      this.setState({uploadedFile: null, hasError: true})
    }
  }
}

const mapDispatchToProps = {
  uploadCSVFile
}

export default connect(null, mapDispatchToProps)(UploadCSV)
