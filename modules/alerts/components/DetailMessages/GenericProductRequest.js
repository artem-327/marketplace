import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import * as Actions from '../../actions'
import { FileText } from 'react-feather'
import { downloadAttachment, downloadAttachmentPdf } from '~/modules/inventory/actions'
import { GridRow, GridColumn } from 'semantic-ui-react'
import { GridAttachments, RowDocument, DetailMessage, StyledGrid } from '../Alerts.styles'
import { downloadFile } from '../Alerts.services'

const GenericProductRequest = props => {
  const { row } = props
  const attachments = getSafe(() => row.info.attachments, [])

  return (
    <DetailMessage>
      <StyledGrid>
        <GridRow>
          <GridColumn width={16}>
            <FormattedMessage
              id='alerts.genericProductTmp'
              defaultMessage='{name} from {company} has requested to upload a new Company Generic Product. Please see the document attached. Once uploaded, click {here} to send a notification to the requester that the upload has been completed.'
              values={{
                name: <b>{getSafe(() => row.info.requestedBy.name, 'N/A')}</b>,
                company: <b>{getSafe(() => row.info.requestedBy.company.cfDisplayName, 'N/A')}</b>,
                here: (
                  <span style={{ color: '#2599d5', cursor: 'pointer' }} onClick={() => {}}>
                    <FormattedMessage id='alerts.here' defaultMessage='here' />
                  </span>
                )
              }}
            />
          </GridColumn>
        </GridRow>
        <GridRow style={{ paddingBottom: '0' }}>
          <GridColumn width={10}>
            <FormattedMessage id='alerts.attachments' defaultMessage='Attachments:' />
          </GridColumn>
        </GridRow>
        <GridAttachments>
          {attachments.map((att, index) => {
            return (
              <RowDocument key={index}>
                <GridColumn width={8} style={{ display: 'flex', alignItems: 'center' }}>
                  <FileText size='18' color='#20273a' />
                  <span style={{ marginLeft: '10px' }}>{att.name}</span>
                </GridColumn>
                <GridColumn width={3}>{/* file size */}</GridColumn>
                <GridColumn width={5} onClick={() => downloadFile(att.name, att.id, props.downloadAttachment)}>
                  <div style={{ color: '#2599d5', cursor: 'pointer', float: 'right', marginRight: '15px' }}>
                    <FormattedMessage id='global.download' defaultMessage='Download:' />
                  </div>
                </GridColumn>
              </RowDocument>
            )
          })}
        </GridAttachments>
      </StyledGrid>
    </DetailMessage>
  )
}

export default connect(null, { ...Actions, downloadAttachment, downloadAttachmentPdf })(
  injectIntl(withToastManager(GenericProductRequest))
)
