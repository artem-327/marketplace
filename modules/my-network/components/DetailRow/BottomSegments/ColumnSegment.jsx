import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Grid, Button } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import { downloadAttachment } from '~/modules/inventory/actions'
import { Download } from 'react-feather'
import { getMimeType } from '../../../../../utils/functions'
//Styles
import { DivTitleBottomSegment, DivValue, GridColumnDetail, SegmentBottom } from '../DetailRow.style'
/**
 * Segment shows Legal, Marketing and Verified Data
 * @component
 */
const ColumnSegment = ({ data, titleId, blueValue, documents, downloadAttachment }) => {

  const onDownloadAttachment = async (documentName, documentId) => {
    const element = await prepareLinkToAttachment(documentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  const prepareLinkToAttachment = async documentId => {
    let downloadedFile = await downloadAttachment(documentId)
    const fileName = extractFileName(downloadedFile.value.headers['content-disposition'])
    const mimeType = fileName && getMimeType(fileName)
    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)
    element.href = fileURL

    return element
  }

  const extractFileName = contentDispositionValue => {
    var filename = ''
    if (contentDispositionValue && contentDispositionValue.indexOf('attachment') !== -1) {
      var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
      var matches = filenameRegex.exec(contentDispositionValue)
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, '')
      }
    }
    return filename
  }

  return (
    <SegmentBottom textAlign='left' style={{ marginTop: 0 }}>
      <Grid.Row>
        <GridColumnDetail>
          <DivTitleBottomSegment>
            <FormattedMessage
              id={`myNetworks.detailRow.${titleId}`}
              defaultMessage='Title'
              data-test='component-column-segment-title'
            />
          </DivTitleBottomSegment>
        </GridColumnDetail>
      </Grid.Row>

      {Object.keys(data).length ?
        Object.keys(data).map((key, i) => {
          if (key === 'document' && documents) {
            documents = documents['document'];
            return (
              <Grid.Row key={i} data-test='component-column-segment-row'>
                <GridColumnDetail>
                  <DivValue
                    $minHeight='19px'
                    fontSize='14px'
                    $color='#00c7f9'
                    lineHeight='1.42857'
                    data-test='component-column-segment-value'
                  >
                    <Button
                      style={{
                        color: '#00c7f9', fontWeight: 'bold',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                      onClick={() => onDownloadAttachment(documents.document_public_id, documents.attachmentId)}>
                      <FormattedMessage id="myNetworks.detailRow.w9download" defaultMessage="W-9 Download" />
                      <Download />
                    </Button>
                  </DivValue>
                </GridColumnDetail>
              </Grid.Row>
            )
          } else if (key !== 'document') {
            let docNameTemp = key.split('_')
            docNameTemp.map((t, i) => {
              docNameTemp[i] = t.charAt(0).toUpperCase() + t.slice(1);
            })
            const docName = docNameTemp.join(' ')

            let value = data[key]
            if (blueValue) {
              let valueTemp = value.toLowerCase()
              valueTemp = valueTemp.split('_')
              valueTemp.map((t, i) => {
                valueTemp[i] = t.charAt(0).toUpperCase() + t.slice(1);
              })
              value = valueTemp.join(' ')
            }

            return (
              <Grid.Row key={i} data-test='component-column-segment-row'>
                <GridColumnDetail>
                  <FormattedMessage id={`myNetworks.detailRow.${key}`} defaultMessage={docName} />
                  <DivValue
                    $minHeight='19px'
                    fontSize='14px'
                    $color={blueValue ? '#00c7f9' : null}
                    lineHeight='1.42857'
                    data-test='component-column-segment-value'
                  >{value}</DivValue>
                </GridColumnDetail>
              </Grid.Row>
            )
          }
        })
        :
        <Grid.Row data-test='component-column-segment-row'>
          <GridColumnDetail>
            <FormattedMessage
              id='myNetworks.detailRow.noFilesUploaded'
              defaultMessage='No files uploaded'
              data-test='component-column-segment-value'
            />
          </GridColumnDetail>
        </Grid.Row>
      }

    </SegmentBottom >
  )
}

ColumnSegment.propTypes = {
  titleId: PropTypes.string,
  blueValue: PropTypes.string,
  data: PropTypes.object,
  document: PropTypes.object,
}

ColumnSegment.defaultProps = {
  titleId: '',
  blueValue: '',
  data: {},
  document: null,
}

// export default ColumnSegment
export default connect(null, { downloadAttachment })(ColumnSegment)
