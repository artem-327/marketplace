import PropTypes from 'prop-types'
import { AlertCircle } from 'react-feather'
import { FormattedMessage, injectIntl } from 'react-intl'
//Services
import { getSafe } from '../../../../../../utils/functions'
//Components
import DocumentTab from '../../../../../../components/document-tab'
//Styles
import {
  MenuCustom,
  DivInTitleCustom,
  DivContentCustom,
  DivTitleCustom,
  DivRectangle,
  HighSegmentCustom
} from './Warehouses.style'
/**
 * @category Settings - Locations - Warehouses
 * @component
 */
const WarehousesFormCertificates = ({ formikProps, helperProps }) => {
  const {
    removeAttachmentLinkToBranch,
    removeAttachment,
    addAttachment,
    loadFile,
    sidebarValues,
    attachmentFiles,
    setAttachmentFiles
  } = helperProps
  const { setFieldValue, values } = formikProps
  return (
    <>
      {getSafe(() => sidebarValues.attachments.length, false) &&
      getSafe(() => sidebarValues.deliveryAddress.address.country.name, false) === 'USA' ? (
        <DivRectangle>
          <DivTitleCustom>
            <AlertCircle color='orange' size={24} />
            <DivInTitleCustom>
              <FormattedMessage
                id='settings.warehouse.certificates.message.title'
                defaultMessage='This state/province already has certificate documents uploaded'>
                {text => text}
              </FormattedMessage>
            </DivInTitleCustom>
          </DivTitleCustom>
          <DivContentCustom>
            <FormattedMessage
              id='settings.warehouse.certificates.message.content'
              defaultMessage='If you want to update the documents, you will replace all existing certificates for warehouses in this state.'>
              {text => text}
            </FormattedMessage>
          </DivContentCustom>
        </DivRectangle>
      ) : null}
      <DocumentTab
        listDocumentTypes={[
          { key: 14, text: 'Resale Certificate', value: 14 },
          { key: 13, text: 'Sales Tax Exemption Certificate', value: 13 }
        ]}
        documentTypeIds={[13, 14]}
        lockedFileTypes={true}
        values={values}
        setFieldValue={setFieldValue}
        setFieldNameAttachments='attachments'
        dropdownName='documentType'
        removeAttachmentLink={removeAttachmentLinkToBranch}
        removeAttachment={removeAttachment}
        addAttachment={addAttachment}
        loadFile={loadFile}
        changedForm={files => setAttachmentFiles(attachmentFiles.concat(files))}
        idForm={getSafe(() => sidebarValues.id, 0)}
        attachmentFiles={attachmentFiles}
        removeAttachmentFromUpload={id => {
          const newAttachmentFiles = attachmentFiles.filter(attachment => attachment.id !== id)
          setAttachmentFiles(newAttachmentFiles)
        }}
      />
    </>
  )
}

WarehousesFormCertificates.propTypes = {
  formikProps: PropTypes.object,
  helperProps: {
    removeAttachmentLinkToBranch: PropTypes.func,
    removeAttachment: PropTypes.func,
    addAttachment: PropTypes.func,
    loadFile: PropTypes.func,
    setAttachmentFiles: PropTypes.func,
    attachmentFiles: PropTypes.func,
    sidebarValues: PropTypes.object
  }
}

WarehousesFormCertificates.defaultProps = {
  formikProps: null,
  helperProps: null
}

export default WarehousesFormCertificates
