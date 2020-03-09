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
import { Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Form } from 'semantic-ui-react'
import { FastField, Field, getIn } from 'formik'
import { withDatagrid } from '~/modules/datagrid'

import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import ProdexGrid from '~/components/table'
import { getSafe, generateToastMarkup, uniqueArrayByKey } from '~/utils/functions'
import { AttachmentManager } from '~/modules/attachments'

const CustomDropdown = styled(Dropdown)`
  &.selection.dropdown {
    z-index: 610 !important;
    white-space: nowrap;
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

export const CustomProdexGrid = styled(ProdexGrid)`
  .dTOnmz {
    z-index: 9 !important;
  }
`

const columns = [
  {
    name: 'name',
    title: (
      <FormattedMessage id='global.name' defaultMessage='Name'>
        {text => text}
      </FormattedMessage>
    ),
    width: 200
  },
  {
    name: 'documentTypeName',
    title: (
      <FormattedMessage id='global.docType' defaultMessage='Document Type'>
        {text => text}
      </FormattedMessage>
    ),
    width: 200
  }
]

class DocumentTab extends Component {
  state = {
    openUploadLot: false,
    documentType: 1
  }

  attachDocumentsManager = (newDocuments, values, setFieldValue, setFieldNameAttachments, changedForm) => {
    const docArray = uniqueArrayByKey(values.attachments.concat(newDocuments), 'id')
    setFieldNameAttachments && setFieldValue(setFieldNameAttachments, docArray)
    changedForm && changedForm()
  }

  attachDocumentsUploadLot = (newDocument, values, setFieldValue, setFieldNameAttachments, changedForm) => {
    const docArray = uniqueArrayByKey(values.attachments.concat([newDocument]), 'id')
    setFieldNameAttachments && setFieldValue(setFieldNameAttachments, docArray)
    changedForm && changedForm()
  }

  handleChange = (e, name, value) => {
    this.setState({ openUploadLot: true, documentType: value })
  }

  render() {
    const {
      listDocumentTypes,
      onChangeDropdown, //missing must test
      values,
      setFieldValue,
      setFieldNameAttachments,
      changedForm, //missing must test
      idForm, // missing must test
      tableName,
      removeAttachmentLink,
      removeAttachment,
      addAttachment,
      loadFile,
      intl: { formatMessage }
    } = this.props

    return (
      <Grid>
        <GridRow>
          {listDocumentTypes.length ? (
            <GridColumn width={8}>
              <FormattedMessage id='global.uploadDocument' defaultMessage='Upload document: '>
                {text => text}
              </FormattedMessage>
              <CustomDropdown
                name='documentType'
                closeOnChange
                options={listDocumentTypes}
                inputProps={{
                  placeholder: (
                    <FormattedMessage id='global.documentType.choose' defaultMessage='Choose document type' />
                  ),
                  onChange: (e, { name, value }) => {
                    this.handleChange(e, name, value)
                    typeof onChangeDropdown === 'function' && onChangeDropdown()
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
              returnSelectedRows={rows =>
                this.attachDocumentsManager(rows, values, setFieldValue, setFieldNameAttachments, changedForm)
              }
            />
          </GridColumn>
        </GridRow>
        {this.state.openUploadLot ? (
          <GridRow>
            <GridColumn>
              <UploadLot
                addAttachment={addAttachment}
                loadFile={loadFile}
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
                id={'field_input_documents.documentType'}
                hideAttachments
                edit={getSafe(() => idForm, 0)} //sidebarValues.id
                attachments={values.attachments}
                name={setFieldNameAttachments}
                type={this.state.documentType}
                filesLimit={1}
                fileMaxSize={20}
                onChange={files => {
                  this.attachDocumentsUploadLot(files, values, setFieldValue, setFieldNameAttachments, changedForm)
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
        <GridRow>
          <GridColumn>
            <ProdexGrid
              virtual={false}
              tableName={tableName} //'inventory_documents'
              onTableReady={() => {}}
              columns={columns}
              normalWidth={false}
              rows={
                getSafe(() => values.attachments.length, false)
                  ? values.attachments
                      .map(row => {
                        return {
                          ...row,
                          documentTypeName: row.documentType && row.documentType.name
                        }
                      })
                      .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
                  : []
              }
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
                        const unlinkResponse = await removeAttachmentLink(false, idForm, row.id)
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
                                await removeAttachment(row.id)
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
                        setFieldNameAttachments,
                        values.attachments.filter(o => o.id !== row.id)
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
      </Grid>
    )
  }
}

export default withDatagrid(injectIntl(DocumentTab))
