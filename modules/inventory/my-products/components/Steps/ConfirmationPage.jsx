import { Fragment } from 'react'
import { Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
// Styles
import { StyledButton } from '../../../styles'

/**
 * ConfirmationPage Component
 * @category Inventory - My Products
 * @components
 */
const ConfirmationPage = props => {
  const createReport = result => {
    if (!result) return
    const clientMessage = result.clientMessage
    const recordCount = result.recordCount || 0
    const recordsCreated = result.recordsCreated || 0
    const recordsUpdated = result.recordsUpdated || 0
    const recordsFailed = result.recordsFailed || 0

    const status = recordsFailed ? 'SomeFailed' : 'Success'

    return clientMessage ? (
      <Fragment>
        <Grid.Row>
          <FormattedMessage id='settings.importFailed' defaultMessage='Import Failed' />
        </Grid.Row>
        <Grid.Row>{clientMessage}</Grid.Row>
      </Fragment>
    ) : (
      <Fragment>
        <Grid.Row style={{ 'padding-bottom': '1.25rem' }}>
          <FormattedMessage
            id={`settings.import${status}`}
            defaultMessage={ status === 'Failed' ? 'Import Failed' : status === 'SomeFailed' ? 'Some lines failed during import' : 'Import success' }
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
                defaultMessage={`Error at line ${error.lineNumber}: ${error.cause}`}
                values={{
                  lineNumber: error.lineNumber,
                  errorCause: error.cause
                }}
              />
            </Grid.Row>
          ))}
        <Grid.Row></Grid.Row>
      </Fragment>
    )
  }

  const { csvImportError, reloadFilter, productOffer, companyGenericProduct, companies } = props

  const titleViewMap = productOffer
    ? 'MyInventory'
    : companyGenericProduct
    ? 'Products'
    : companies
    ? 'Companies'
    : 'Company Products'

  return (
    <Grid centered padded>
      {createReport(csvImportError)}
      <Grid.Row>
        <StyledButton
          basic
          primary
          onClick={() => props.closeImportPopup(reloadFilter)}
          data-test='settings_product_close_import'>
          <FormattedMessage id={`settings.view${titleViewMap}`} defaultMessage={`View ${titleViewMap}`} />
        </StyledButton>
      </Grid.Row>
      <Grid.Row>
        <StyledButton primary onClick={props.toUpload} data-test='settings_product_to_upload'>
          <FormattedMessage id='settings.uploadMore' defaultMessage='Upload more files' />
        </StyledButton>
      </Grid.Row>
    </Grid>
  )
}

export default ConfirmationPage
