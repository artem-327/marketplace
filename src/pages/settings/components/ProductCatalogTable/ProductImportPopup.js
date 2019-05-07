import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Modal, Icon, Step } from 'semantic-ui-react'
import {
  closeImportPopup,
  getStoredCSV,
  postImportProductCSV
} from '../../actions'
import { Form, Button } from 'formik-semantic-ui'

import Upload from './Steps/UploadCSV'
import Map from './Steps/Map'
import Preview from './Steps/Preview'
import ConfirmationPage from './Steps/ConfirmationPage'

const steps = {
  upload: <Upload />,
  map: <Map />,
  preview: <Preview />,
  confirmation: <ConfirmationPage />
}

class ProductImportPopup extends Component {
  state = {
    currentStep: 'upload',
    isFinishUpload: false,
    isFinishMap: false
  }

  componentDidUpdate() {
    this.props.csvFileId && this.props.getStoredCSV(this.props.csvFileId)
  }

  render() {
    const { closeImportPopup, csvFileId, mappedDataHeaderCSV } = this.props
    const { currentStep, isFinishUpload, isFinishMap } = this.state

    console.log('mappedDataHeaderCSV', mappedDataHeaderCSV)
    return (
      <Modal open centered={false}>
        <Modal.Header>.CSV Mapping</Modal.Header>
        <Modal.Content>
          <Step.Group widths={3}>
            <Step active={currentStep === 'upload'} completed={isFinishUpload}>
              <Icon name="upload" />
              <Step.Content>
                <Step.Title>Upload</Step.Title>
              </Step.Content>
            </Step>

            <Step active={currentStep === 'map'} completed={isFinishMap}>
              <Icon name="table" />
              <Step.Content>
                <Step.Title>Map</Step.Title>
              </Step.Content>
            </Step>

            <Step active={currentStep === 'preview'}>
              <Icon name="eye" />
              <Step.Content>
                <Step.Title>Preview</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
          <Form onReset={closeImportPopup} onSubmit={closeImportPopup}>
            {steps[currentStep]}
            <div style={{ textAlign: 'right' }}>
              {/* <Button primary onClick={this.backHandler}>
                Back
              </Button> */}
              <Button.Reset>Cancel</Button.Reset>
              <Button
                primary
                onClick={this.submitHandler}
                disabled={!csvFileId}
              >
                {`${currentStep === 'preview' ? 'Save' : 'Next'}`}
              </Button>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }

  backHandler = () => {
    const { currentStep } = this.state

    switch (currentStep) {
      case 'map':
        this.setState({ currentStep: 'upload' })
        break
      case 'preview':
        this.setState({ currentStep: 'map' })
        break
    }
  }

  submitHandler = () => {
    const { mappedDataHeaderCSV, csvFileId } = this.props
    const { currentStep } = this.state

    switch (currentStep) {
      case 'upload':
        this.setState({ currentStep: 'map', isFinishUpload: true })
        break
      case 'map':
        this.setState({ currentStep: 'preview', isFinishMap: true })
        break
      case 'preview':
        this.props.postImportProductCSV(mappedDataHeaderCSV, csvFileId)
        this.setState({ currentStep: 'confirmation' })
        break
    }
  }
}

const mapDispatchToProps = {
  closeImportPopup,
  getStoredCSV,
  postImportProductCSV
}

const mapStateToProps = state => {
  return {
    csvFileId: state.settings.fileCSVId,
    mappedDataHeaderCSV: state.settings.dataHeaderCSV
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductImportPopup)
