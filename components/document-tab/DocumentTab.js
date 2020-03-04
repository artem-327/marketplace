import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { withToastManager } from 'react-toast-notifications'
import {
  Sidebar,
  Segment,
  Dimmer,
  Loader,
  Tab,
  Menu,
  Grid,
  GridRow,
  GridColumn,
  Header,
  Icon,
  Popup,
  FormField,
  Button as ButtonSemantic
} from 'semantic-ui-react'

import UploadLot from '~modules/inventory/components/upload/UploadLot'
import ProdexGrid from '~/components/table'
import { getSafe, generateToastMarkup, uniqueArrayByKey } from '~/utils/functions'
import { AttachmentManager } from '~/modules/attachments'

const CustomDropdown = styled(Dropdown)`
  .ui.selection.dropdown.active {
    z-index: 602;
  }
`

const CloceIcon = styled(Icon)`
  position: absolute;
  top: -10px;
  right: -10px;
`

export const DivIcon = styled.div`
  display: block;
  height: 20px;
  position: relative;
`

class DocumentTab extends Component {
  state = {
    openUploadLot: false,
    documentType: 1
  }

  //TODO
  attachDocumentsManager = (newDocuments, values, setFieldValue) => {
    const docArray = uniqueArrayByKey(values.documents.attachments.concat(newDocuments), 'id')
    setFieldValue(`documents.attachments`, docArray)
    this.setState({ changedForm: true })
  }

  handleChange = (e, name, value) => {
    this.setState({ openUploadLot: true, documentType: value })
  }

  render() {
    const { listDocumentTypes, onChangeDropdown, rows, values, setFieldValue } = this.props

    return (
      <Grid>
        <GridRow>
          {listDocumentTypes.length ? (
            <GridColumn width={8}>
              <FormattedMessage id='global.uploadDocument' defaultMessage='Upload document: '>
                {text => text}
              </FormattedMessage>
              <CustomDropdown
                name='documents.documentType'
                closeOnChange
                options={listDocumentTypes}
                inputProps={{
                  placeholder: (
                    <FormattedMessage id='global.documentType.choose' defaultMessage='Choose document type' />
                  ),
                  onChange: (e, { name, value }) => {
                    this.handleChange(e, name, value)
                    if (onChangeDropdown) {
                      onChangeDropdown()
                    }
                  }
                }}
              />
            </GridColumn>
          ) : null}

          <GridColumn width={8}>
            <FormattedMessage id='global.existingDocuments' defaultMessage='Existing documents: '>
              {text => text}
            </FormattedMessage>
            <AttachmentManager
              asModal
              //TODO
              returnSelectedRows={rows => this.attachDocumentsManager(rows, values, setFieldValue)}
            />
          </GridColumn>
        </GridRow>
        {values.documents.documentType && this.state.openUploadLot ? (
          <GridRow>
            <GridColumn>
              <UploadLot
                {...this.props}
                header={
                  <DivIcon
                    onClick={() =>
                      this.setState(prevState => ({
                        openUploadLot: !prevState.openUploadLot
                      }))
                    }>
                    <CloceIcon name='close' color='grey' />
                  </DivIcon>
                }
                hideAttachments
                edit={getSafe(() => sidebarValues.id, 0)}
                attachments={values.documents.attachments}
                name='documents.attachments'
                type={this.state.documentType}
                filesLimit={1}
                fileMaxSize={20}
                onChange={files => {
                  this.attachDocumentsUploadLot(files, values, setFieldValue)
                }}
                data-test='new_inventory_attachments_drop'
                emptyContent={
                  <>
                    {formatMessage({ id: 'addInventory.dragDrop' })}
                    <br />
                    <FormattedMessage
                      id='addInventory.dragDropOr'
                      defaultMessage={'or {link} to select from computer'}
                      values={{
                        link: (
                          <a>
                            <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                          </a>
                        )
                      }}
                    />
                  </>
                }
                uploadedContent={
                  <label>
                    <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop to add file here'} />
                    <br />
                    <FormattedMessage
                      id='addInventory.dragDropOr'
                      defaultMessage={'or {link} to select from computer'}
                      values={{
                        link: (
                          <a>
                            <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                          </a>
                        )
                      }}
                    />
                  </label>
                }
              />
            </GridColumn>
          </GridRow>
        ) : null}
        {values.documents.attachments && (
          <GridRow>
            <GridColumn>
              <ProdexGrid
                virtual={false}
                tableName='inventory_documents'
                onTableReady={() => {}}
                columns={columns}
                normalWidth={false}
                rows={values.documents.attachments
                  .map(row => ({
                    ...row,
                    documentTypeName: row.documentType && row.documentType.name
                  }))
                  .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))}
                rowActions={[
                  {
                    text: (
                      <FormattedMessage id='global.unlink' defaultMessage='Unlink'>
                        {text => text}
                      </FormattedMessage>
                    ),
                    callback: async row => {
                      try {
                        if (row.linked) {
                          const unlinkResponse = await this.props.removeAttachmentLink(false, sidebarValues.id, row.id)
                          toastManager.add(
                            generateToastMarkup(
                              <FormattedMessage id='addInventory.success' defaultMessage='Success' />,
                              <FormattedMessage
                                id='addInventory.unlinkeAttachment'
                                defaultMessage='Attachment was successfully unlinked.'
                              />
                            ),
                            {
                              appearance: 'success'
                            }
                          )
                          if (unlinkResponse.value.data.lastLink) {
                            confirm(
                              formatMessage({
                                id: 'confirm.attachments.delete.title',
                                defaultMessage: 'Delete Attachment'
                              }),
                              formatMessage(
                                {
                                  id: 'confirm.attachments.delete.content',
                                  defaultMessage: `Do you want to delete file ${row.name}?`
                                },
                                { fileName: row.name }
                              )
                            ).then(
                              async () => {
                                // confirm
                                try {
                                  await this.props.removeAttachment(row.id)
                                  toastManager.add(
                                    generateToastMarkup(
                                      <FormattedMessage
                                        id='notifications.attachments.deleted.header'
                                        defaultMessage='File Deleted'
                                      />,
                                      <FormattedMessage
                                        id='notifications.attachments.deleted.content'
                                        defaultMessage={`File ${row.name} successfully deleted.`}
                                        values={{ fileName: row.name }}
                                      />
                                    ),
                                    {
                                      appearance: 'success'
                                    }
                                  )
                                } catch (e) {
                                  console.error(e)
                                }
                              },
                              () => {
                                // cancel
                              }
                            )
                          }
                        }
                        setFieldValue(
                          `documents.attachments`,
                          values.documents.attachments.filter(o => o.id !== row.id)
                        )
                      } catch (e) {
                        console.error(e)
                      }
                    }
                  }
                ]}
              />
            </GridColumn>
          </GridRow>
        )}
      </Grid>
    )
  }
}

export default injectIntl(DocumentTab)
