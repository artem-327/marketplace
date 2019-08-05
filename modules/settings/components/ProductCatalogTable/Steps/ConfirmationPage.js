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
  render() {
    const { csvImportError, reloadFilter } = this.props

    return (
      <Grid centered padded>
        {csvImportError &&
          (csvImportError.failedRecords.length > 0 ? (
            <React.Fragment>
              <Grid.Row><FormattedMessage id='settings.importFailed' defaultMessage='Import failed' />></Grid.Row>
              {csvImportError.failedRecords.map((error, i) => (
                <Grid.Row key={i}>{`In line ${error.csvLineNumber} error ${
                  error.cause
                  }`}</Grid.Row>
              ))}
            </React.Fragment>
          ) : (
              <Grid.Row><FormattedMessage id='settings.mappingSaved' defaultMessage='Your Mapping Saved Successfully!' /></Grid.Row>
            ))}

        <Grid.Row>
          <StyledButton basic primary onClick={() => this.props.closeImportPopup(reloadFilter)} data-test='settings_product_close_import'>
            <FormattedMessage
              id={`settings.view${this.props.productOffer ? 'MyInventory' : 'Product'}`}
              defaultMessage={`View ${this.props.productOffer ? 'My Inventory' : 'Products'}`} />
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
        currentTab: Router && Router.router ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
        productsFilter: state.settings.productsFilter
      },
      value: state.settings.filterValue
    },
    productCatalogUnmappedValue: state.settings.productCatalogUnmappedValue
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmationPage)
