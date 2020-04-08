import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Grid, Button } from 'semantic-ui-react'

import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import Router from 'next/dist/client/router'

import { closeImportPopup } from '../../../actions'

const StyledButton = styled(Button)`
  width: 200px;
`

class ConfirmationPage extends Component {
  createReport = result => {
    if (!result) return
    const clientMessage = result.clientMessage
    const recordCount = result.recordCount || 0
    const recordsCreated = result.recordsCreated || 0
    const recordsUpdated = result.recordsUpdated || 0
    const recordsFailed = result.recordsFailed || 0

    const status = recordsFailed ? 'SomeFailed' : 'Success'

    return clientMessage ? (
      <React.Fragment>
        <Grid.Row>
          <FormattedMessage id='settings.importFailed' defaultMessage='Import Failed' />
        </Grid.Row>
        <Grid.Row>{clientMessage}</Grid.Row>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Grid.Row style={{ 'padding-bottom': '1.25rem' }}>
          <FormattedMessage
            id={`settings.import${status}`}
            defaultMessage={
              status === 'Failed'
                ? 'Import Failed'
                : status === 'SomeFailed'
                ? 'Some lines failed during import'
                : 'Import success'
            }
          />
        </Grid.Row>

        <Grid.Row style={{ 'padding-top': '0.25rem', 'padding-bottom': '0.25rem' }}>
          <FormattedMessage
            id='settings.importRecordCount'
            defaultMessage={`Record lines found in imported file: ${recordCount}`}
            values={{ value: recordCount }}
          />
        </Grid.Row>

        <Grid.Row style={{ 'padding-top': '0.25rem', 'padding-bottom': '0.25rem' }}>
          <FormattedMessage
            id='settings.importRecordsCreated'
            defaultMessage={`Records created successfully: ${recordsCreated}`}
            values={{ value: recordsCreated }}
          />
        </Grid.Row>

        <Grid.Row style={{ 'padding-top': '0.25rem', 'padding-bottom': '0.25rem' }}>
          <FormattedMessage
            id='settings.importRecordsUpdated'
            defaultMessage={`Records updated successfully: ${recordsUpdated}`}
            values={{ value: recordsUpdated }}
          />
        </Grid.Row>

        <Grid.Row style={{ 'padding-top': '0.25rem', 'padding-bottom': '1.25rem' }}>
          <FormattedMessage
            id='settings.importRecordsFailed'
            defaultMessage={`Records import failed: ${recordsFailed}`}
            values={{ value: recordsFailed }}
          />
        </Grid.Row>

        {result &&
          result.failureReports &&
          result.failureReports.map((error, i) => (
            <Grid.Row key={i} style={{ 'padding-top': '0.25rem', 'padding-bottom': '0.25rem' }}>
              <FormattedMessage
                id='import.errorAtLine'
                defaultMessage={`Error at line ${error.csvLineNumber}: ${error.cause}`}
                values={{
                  lineNumber: error.csvLineNumber,
                  errorCause: error.cause
                }}
              />
            </Grid.Row>
          ))}
        <Grid.Row></Grid.Row>
      </React.Fragment>
    )
  }

  render() {
    const { csvImportError, reloadFilter } = this.props
    const titleViewMap = this.props.productOffer ? 'MyInventory' : this.props.echoProduct ? 'Products' : 'Companies'

    return (
      <Grid centered padded>
        {this.createReport(csvImportError)}
        <Grid.Row>
          <StyledButton
            basic
            primary
            onClick={() => this.props.closeImportPopup(reloadFilter)}
            data-test='settings_product_close_import'>
            <FormattedMessage id={`settings.view${titleViewMap}`} defaultMessage={`View ${titleViewMap}`} />
          </StyledButton>
        </Grid.Row>
        <Grid.Row>
          <StyledButton primary onClick={this.props.toUpload} data-test='settings_product_to_upload'>
            <FormattedMessage id='settings.uploadMore' defaultMessage='Upload more files' />
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
    csvImportError: state.settings.csvImportError,
    reloadFilter: {
      props: {
        currentTab:
          Router && Router.router
            ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type)
            : state.settings.tabsNames[0],
        productsFilter: state.settings.productsFilter
      },
      value: state.settings.filterValue
    },
    productCatalogUnmappedValue: state.settings.productCatalogUnmappedValue
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationPage)
