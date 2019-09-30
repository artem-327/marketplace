import React from 'react'
import { connect } from 'react-redux'

import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup } from '~/utils/functions'
import {Modal, Grid, GridRow, FormGroup, FormField} from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from "react-intl";
import {Button, Dropdown, Form} from "formik-semantic-ui-fixed-validation";
//import { closeUploadDocumentsPopup, getVerificationDocumentTypes } from "../../actions";
import * as Actions from '../../actions'
import Router from "next/dist/client/router";
import UploadVerifyFiles from './UploadVerifyFiles'

class BankAccountsUploadDocPopup extends React.Component {
  componentDidMount() {
    if (!this.props.verificationDocumentTypes.length)this.props.getVerificationDocumentTypes()
  }

  getInitialFormValues = () => {
    let initialValues = {
      attachments: [],
      attachmentType: '',
    }
    return initialValues
  }

  render() {
    const {
      closeUploadDocumentsPopup,
      verificationDocumentTypes,
      intl: { formatMessage }
    } = this.props

    return (
      <Modal closeIcon onClose={() => closeUploadDocumentsPopup()} open centered={false}>
        <Modal.Header>
          <FormattedMessage id='settings.tables.bankAccounts.uploadDoc' defaultMessage='Upload Documents' />
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={this.getInitialFormValues()}
            onReset={closeUploadDocumentsPopup}
            validateOnBlur={false}
          >
            {({ values, setFieldValue }) => {
              return (
                <>
                <Grid>

                  <FormField width={8}>
                    <label>
                      <FormattedMessage id='addInventory.documentType' defaultMessage={'Document Type'} />
                    </label>
                    <Dropdown name={`attachmentType`} options={verificationDocumentTypes} inputProps={{ 'data-test': 'new_inventory_doc_type_drpdn' }} />
                  </FormField>

                  <GridRow>
                    <UploadVerifyFiles {...this.props}
                      attachments={values.attachments}
                      name='attachments'
                      type={values.attachmentType}
                      unspecifiedTypes={['']}
                      fileMaxSize={10}
                      onChange={(files) => setFieldValue(
                       `attachments[${values.attachments && values.attachments.length ? values.attachments.length : 0}]`,
                       {
                         id: files.id,
                         name: files.name,
                         type: files.type
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
                  </GridRow>
                </Grid>
                  <div style={{ textAlign: 'right' }}>
                    <Button.Reset onClick={closeUploadDocumentsPopup} data-test='settings_bank_account_upload_doc_popup_close_btn'>
                      <FormattedMessage id='global.close' defaultMessage='Close'>{(text) => text}</FormattedMessage>
                    </Button.Reset>
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
  ...Actions
}
const mapStateToProps = state => {
  return {
    verificationDocumentTypes: state.settings.verificationDocumentTypes,
    currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
      state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
  }
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(BankAccountsUploadDocPopup)))