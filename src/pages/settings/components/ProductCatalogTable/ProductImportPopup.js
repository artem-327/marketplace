import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Modal, Icon, Step } from 'semantic-ui-react'
import { closeImportPopup } from '../../actions'
import { Form, Button } from 'formik-semantic-ui'

import Upload from './Steps/UploadCSV'
import Map from './Steps/Map'
import Preview from './Steps/Preview'

const steps = {
  upload: <Upload />,
  map: <Map />,
  preview: <Preview />
}

class ProductImportPopup extends Component {
  state = {
    currentStep: 'upload',
    isFinishUpload: false,
    isFinishMap: false
  }

  render() {
    const { closeImportPopup } = this.props

    const { currentStep, isFinishUpload, isFinishMap } = this.state

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
              <Button.Reset>Cancel</Button.Reset>
              {currentStep === 'preview' ? (
                <Button.Submit>Save</Button.Submit>
              ) : (
                <Button primary onClick={this.submitHandler}>
                  Next
                </Button>
              )}
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }

  submitHandler = () => {
    const { currentStep } = this.state

    switch (currentStep) {
      case 'upload':
        this.setState({ currentStep: 'map', isFinishUpload: true })
        break
      case 'map':
        this.setState({ currentStep: 'preview', isFinishMap: true })
        break
    }
  }
}

const mapDispatchToProps = {
  closeImportPopup
}

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductImportPopup)
