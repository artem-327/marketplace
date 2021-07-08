import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { GridColumn, GridRow } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment/moment'
//Services
import { downloadFile } from '../ListingDetail.services'
import { getSafe } from '../../../../../../utils/functions'
import { getLocaleDateFormat } from '../../../../../../components/date-format'
//Actions
import { downloadAttachment } from '../../../../../inventory/actions'
//Styles
import {
  DivTableWrapper,
  GridStyledDocuments,
  DivFlexRow,
  IconFileText,
  IconDownload,
  DivDocumentsColumn,
  DivGreyHeader,
  DivCentered,
  DivNormalText
} from '../ListingDetail.styles'

const DocumentsTab = props => {
  const { row } = props
  const attachments = row.attachments

  return (
    <DivTableWrapper>
      <GridStyledDocuments>
        {attachments.map((file, index) => (
          <GridRow key={index}>
            <GridColumn width={16}>
              <DivFlexRow>
                <DivCentered>
                  <IconFileText size={18} />
                </DivCentered>
                <DivDocumentsColumn>
                  <DivGreyHeader>
                    <FormattedMessage id={`sharedListings.detailRow.fileName`} defaultMessage='File Name' />
                  </DivGreyHeader>
                  <DivNormalText>{file.name}</DivNormalText>
                </DivDocumentsColumn>
              </DivFlexRow>
              <DivFlexRow>
                <DivDocumentsColumn value='width: 200px;'>
                  <DivGreyHeader>
                    <FormattedMessage id={`sharedListings.detailRow.docType`} defaultMessage='Doc. Type' />
                  </DivGreyHeader>
                  <DivNormalText>{getSafe(() => file.documentType.name, '')}</DivNormalText>
                </DivDocumentsColumn>
                <DivDocumentsColumn value='width: 100px;'>
                  <DivGreyHeader>
                    <FormattedMessage id={`sharedListings.detailRow.expDate`} defaultMessage='Exp. Date' />
                  </DivGreyHeader>
                  <DivNormalText>
                    {file.expirationDate ? moment(file.expirationDate).format(getLocaleDateFormat()) : 'N/A'}
                  </DivNormalText>
                </DivDocumentsColumn>
                <DivCentered>
                  <IconDownload size={18} onClick={() => downloadFile(file.name, file.id, props)} />
                </DivCentered>
              </DivFlexRow>
            </GridColumn>
          </GridRow>
        ))}
      </GridStyledDocuments>
    </DivTableWrapper>
  )
}

DocumentsTab.propTypes = {}

export default connect(null, { downloadAttachment })(DocumentsTab)
