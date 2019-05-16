import React, { Component } from "react"
import { connect } from "react-redux"
import styled from "styled-components"

import { Modal, Icon, Step, ModalContent, Button } from "semantic-ui-react"

import {
  closeImportPopup,
  getStoredCSV,
  postImportProductCSV,
  clearDataOfCSV,
  closeImportPopupCancel,
  postImportProductOfferCSV
} from "../../actions"

import Upload from "./Steps/UploadCSV"
import Map from "./Steps/Map"
import Preview from "./Steps/Preview"
import ConfirmationPage from "./Steps/ConfirmationPage"

const StyledModal = styled(ModalContent)`
  height: 500px;
  overflow: auto;
`

class ProductImportPopup extends Component {
  state = {
    currentStep: "upload",
    isFinishUpload: false,
    isFinishMap: false,
    isFinishPreview: false
  }

  componentDidUpdate(prevProps) {
    if (this.props.csvFileId !== prevProps.csvFileId && this.props.csvFileId) {
      this.props.getStoredCSV(this.props.csvFileId)
    }
  }

  toUpload = () => {
    this.setState({
      currentStep: "upload",
      isFinishUpload: false,
      isFinishMap: false,
      isFinishPreview: false
    })
    this.props.clearDataOfCSV()
  }

  steps = {
    upload: <Upload />,
    map: (
      <Map productOffer={this.props.productOffer && this.props.productOffer} />
    ),
    preview: (
      <Preview
        productOffer={this.props.productOffer && this.props.productOffer}
      />
    ),
    confirmation: <ConfirmationPage toUpload={this.toUpload} />
  }

  render() {
    const { closeImportPopup, csvFileId, closeImportPopupCancel } = this.props
    const {
      currentStep,
      isFinishUpload,
      isFinishMap,
      isFinishPreview
    } = this.state

    return (
      <Modal open centered={false}>
        <Modal.Header>.CSV Mapping</Modal.Header>
        <StyledModal>
          <Step.Group widths={3}>
            <Step active={currentStep === "upload"} completed={isFinishUpload}>
              <Icon name="upload" />
              <Step.Content>
                <Step.Title>Upload</Step.Title>
              </Step.Content>
            </Step>

            <Step active={currentStep === "map"} completed={isFinishMap}>
              <Icon name="table" />
              <Step.Content>
                <Step.Title>Map</Step.Title>
              </Step.Content>
            </Step>

            <Step
              active={currentStep === "preview"}
              completed={isFinishPreview}
            >
              <Icon name="eye" />
              <Step.Content>
                <Step.Title>Preview</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
          {this.steps[currentStep]}
        </StyledModal>
        <Modal.Actions>
          {currentStep !== "confirmation" && (
            <div style={{ textAlign: "right" }}>
              <Button basic onClick={closeImportPopupCancel}>
                Cancel
              </Button>
              <Button
                primary
                onClick={this.submitHandler}
                disabled={!csvFileId}
              >
                {`${currentStep === "preview" ? "Save" : "Next"}`}
              </Button>
            </div>
          )}
        </Modal.Actions>
      </Modal>
    )
  }

  submitHandler = () => {
    const { mappedDataHeaderCSV, csvFileId } = this.props
    const { currentStep } = this.state

    switch (currentStep) {
      case "upload":
        this.setState({ currentStep: "map", isFinishUpload: true })
        break
      case "map":
        this.setState({ currentStep: "preview", isFinishMap: true })
        break
      case "preview":
        this.props.productOffer
          ? this.props.postImportProductOfferCSV(mappedDataHeaderCSV, csvFileId)
          : this.props.postImportProductCSV(mappedDataHeaderCSV, csvFileId)

        this.setState({ currentStep: "confirmation", isFinishPreview: true })
        break
    }
  }
}

const mapDispatchToProps = {
  closeImportPopup,
  getStoredCSV,
  postImportProductCSV,
  clearDataOfCSV,
  closeImportPopupCancel,
  postImportProductOfferCSV
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
