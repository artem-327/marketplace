import React from 'react'
import { connect } from 'react-redux'

import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup } from '~/utils/functions'
import { Modal, FormGroup } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from "react-intl";
import { Button, Form } from "formik-semantic-ui";
import { closeUploadDocumentsPopup } from "../../actions";
import Router from "next/dist/client/router";
import UploadLot from '~/modules/inventory/components/upload/UploadLot'

class BankAccountsUploadDocPopup extends React.Component {

  submitHandler = async (values, { setSubmitting }) => {
    const { toastManager } = this.props

    //! ! console.log('BankAccountsUploadDocPopup - submitHandler - values - ', values)
    try {
      //! ! TODO await ... endpoint call

      toastManager.add(generateToastMarkup(
        <FormattedMessage id='notifications.bankAccountDocumentUpload.header' />,
        <FormattedMessage id='notifications.bankAccountDocumentUpload.content' />
        ), { appearance: 'success' }
      )
      this.props.closeUploadDocumentsPopup()
    }
    catch { }
    finally { setSubmitting(false) }
  }

  getInitialFormValues = () => {
    let initialValues = {
      attachments: [],
      expirationDate: '',
      attachmentType: '',
    }
    return initialValues
  }

  render() {
    const {
      closeUploadDocumentsPopup,
      intl: { formatMessage }
    } = this.props

    return (
      <Modal open centered={false}>
        <Modal.Header>
          <FormattedMessage id='settings.tables.bankAccounts.uploadDoc' defaultMessage='Upload Documents' />
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={this.getInitialFormValues()}
            onReset={closeUploadDocumentsPopup}
            onSubmit={this.submitHandler}
            // validateOnChange={false}
            validateOnBlur={false}
          >
            {({ values, setFieldValue }) => {
              return (
                <>
                  <UploadLot {...this.props}
                    attachments={values.attachments}
                    edit={''}
                    name='attachments'
                    type={values.attachmentType ? '' + values.attachmentType : 'Unspecified'}
                    expiration={values.expirationDate ? values.expirationDate + 'T00:00:00Z' : ''}
                    unspecifiedTypes={['Unspecified']}
                    fileMaxSize={20}
                    onChange={(files) => setFieldValue(
                     `attachments[${values.attachments && values.attachments.length ? values.attachments.length : 0}]`,
                     {
                       id: files.id,
                       name: files.name
                     }
                    )}
                    data-test='settings_bank_account_upload_doc_import_attachments'
                    emptyContent={(
                     <label>
                       <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop to add file here'} />
                       <br />
                       <FormattedMessage id='addInventory.dragDropOr'
                         defaultMessage={'or {link} to select from computer'}
                         values={{
                           link: (
                             <a>
                               <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                             </a>
                           )
                         }} />
                     </label>
                    )}
                    uploadedContent={(
                     <label>
                       <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop to add file here'} />
                       <br />
                       <FormattedMessage id='addInventory.dragDropOr'
                         defaultMessage={'or {link} to select from computer'}
                         values={{
                           link: (
                             <a>
                               <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                             </a>
                           )
                         }} />
                     </label>
                    )}
                  />

                  <div style={{ textAlign: 'right' }}>
                    <Button.Reset onClick={closeUploadDocumentsPopup} data-test='settings_bank_account_upload_doc_popup_reset_btn'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{(text) => text}</FormattedMessage>
                    </Button.Reset>
                    <Button.Submit data-test='settings_bank_account_upload_doc_popup_submit_btn'>
                      <FormattedMessage id='global.save' defaultMessage='Save'>{(text) => text}</FormattedMessage>
                    </Button.Submit>
                  </div>
                </>
              )}
            }
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closeUploadDocumentsPopup,
}
const mapStateToProps = state => {
  return {
    currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
      state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
  }
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(BankAccountsUploadDocPopup)))