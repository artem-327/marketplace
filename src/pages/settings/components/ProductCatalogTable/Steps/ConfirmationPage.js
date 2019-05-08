import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid, Button } from 'semantic-ui-react'

import styled from 'styled-components'

import { closeImportPopup } from '../../../actions'

const StyledButton = styled(Button)`
  width: 200px;
`

class ConfirmationPage extends Component {
  render() {
    const { csvImportError } = this.props

    return (
      <Grid centered padded>
        {csvImportError &&
          (csvImportError.failedRecords.length > 0 ? (
            <React.Fragment>
              <Grid.Row>Import failed</Grid.Row>
              {csvImportError.failedRecords.map((error, i) => (
                <Grid.Row key={i}>{`In line ${error.csvLineNumber} error ${
                  error.cause
                }`}</Grid.Row>
              ))}
            </React.Fragment>
          ) : (
            <Grid.Row>Your Mapping Saved Successfully!</Grid.Row>
          ))}

        <Grid.Row>
          <StyledButton basic primary onClick={this.props.closeImportPopup}>
            View Products
          </StyledButton>
        </Grid.Row>
        <Grid.Row>
          <StyledButton primary onClick={() => this.props.toUpload()}>
            Upload more files
          </StyledButton>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapDispatchToProps = {
  closeImportPopup
}

const mapStateToProps = state => {
  return {
    csvImportError: state.settings.csvImportError
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationPage)
