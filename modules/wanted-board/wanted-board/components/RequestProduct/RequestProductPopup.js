import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, Grid } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form, Input } from 'formik-semantic-ui-fixed-validation'
import { UploadCloud, XCircle } from 'react-feather'
import moment from 'moment'

//actions
import { closePopup, requestProduct } from '../../../actions'
import { downloadAttachment, removeAttachment } from '~/modules/inventory/actions'

//components
import { Required } from '~/components/constants/layout'
import UploadAttachment from '~/modules/inventory/components/upload/UploadAttachment'
import { getSafe, generateToastMarkup, uniqueArrayByKey } from '~/utils/functions'
import ProdexGrid from '~/components/table'
import { getLocaleDateFormat } from '~/components/date-format'
import confirm from '~/src/components/Confirmable/confirm'

//styles
import styled from 'styled-components'

const ButtonSubmit = styled(Button)`
  background-color: #2599d5 !important;
`

const ModalActionsButtons = styled(Modal.Actions)`
  justify-content: space-between !important;
  display: flex !important;
`

const CloseIcon = styled(XCircle)`
  position: absolute;
  top: -10px;
  right: -15px;
`

const DivIcon = styled.div`
  display: block;
  height: 10px;
  position: relative;
`

const CustomDiv = styled.div`
  padding: 1em;
`

const CustomA = styled.a`
  font-weight: bold;
  color: #2599d5;
`

const columns = [
  {
    name: 'name',
    title: (
      <FormattedMessage id='global.name' defaultMessage='Name'>
        {text => text}
      </FormattedMessage>
    ),
    width: 220
  },
  {
    name: 'date',
    title: (
      <FormattedMessage id='global.date' defaultMessage='Date'>
        {text => text}
      </FormattedMessage>
    ),
    width: 210
  }
]

class RequstProductPopup extends React.Component {
  attachDocumentsUploadAttachment = (newDocument, values, setFieldValue, setFieldNameAttachments, changedForm) => {
    const docArray = Array.isArray(newDocument)
      ? uniqueArrayByKey(values.attachments.concat(newDocument), 'id')
      : uniqueArrayByKey(values.attachments.concat([newDocument]), 'id')
    setFieldNameAttachments && setFieldValue(setFieldNameAttachments, docArray)
    if (changedForm) {
      Array.isArray(newDocument) ? changedForm(newDocument) : changedForm([newDocument])
    }
  }

  render() {
    const {
      closePopup,
      requestProduct,
      removeAttachment,
      intl: { formatMessage }
    } = this.props
    return (
      <Modal size='tiny' closeIcon onClose={closePopup} open={true}>
        <Modal.Header>
          <FormattedMessage id='wantedBoard.requestAnEchoProduct' defaultMessage='REQUEST AN ECHO PRODUCT' />
        </Modal.Header>
        <Modal.Content>
          <Form
            onSubmit={async (values, { setSubmitting }) => {
              //FIXME
              console.log('values====================================')
              console.log(values)
              console.log('====================================')
              try {
                await requestProduct(values.name, values.attachments)
              } catch (err) {
                console.error(err)
              }
              setSubmitting(false)
            }}
            initialValues={{
              name: '',
              attachments: []
            }}
            render={({ setFieldValue, values, submitForm, changedForm }) => {
              this.submitForm = submitForm

              return (
                <>
                  <Grid verticalAlign='middle'>
                    <Grid.Row>
                      <Grid.Column>
                        <Input
                          name='name'
                          label={
                            <>
                              <FormattedMessage id='requestProduct.name' defaultMessage='Echo Product Name'>
                                {text => text}
                              </FormattedMessage>
                              <Required />
                            </>
                          }
                          inputProps={{
                            type: 'text'
                          }}
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <FormattedMessage id='requestProduct.requiredDocuments' defaultMessage='Required Documents'>
                          {text => text}
                        </FormattedMessage>
                        <UploadAttachment
                          attachments={values.attachments}
                          hideAttachments
                          header={
                            <DivIcon
                              onClick={() =>
                                this.setState({
                                  openUploadAttachment: false
                                })
                              }>
                              <CloseIcon size='16' name='close' color='#dee2e6' />
                            </DivIcon>
                          }
                          setFieldNameAttachments='attachments'
                          fileMaxSize={20}
                          onChange={files => {
                            this.attachDocumentsUploadAttachment(
                              files,
                              values,
                              setFieldValue,
                              'attachments',
                              changedForm
                            )
                          }}
                          data-test='request_product_attachments_dnd'
                          emptyContent={
                            <CustomDiv>
                              <div>
                                <UploadCloud size='40' color='#dee2e6' />
                              </div>
                              <FormattedMessage
                                id='addInventory.dragDrop'
                                defaultMessage='Drag and drop to add file here'>
                                {text => text}
                              </FormattedMessage>
                              <br />

                              <FormattedMessage
                                id='addInventory.dragDropOr'
                                defaultMessage={'or {link} to select from computer'}
                                values={{
                                  link: (
                                    <CustomA>
                                      <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                    </CustomA>
                                  )
                                }}
                              />
                            </CustomDiv>
                          }
                          uploadedContent={
                            <CustomDiv>
                              <div>
                                <UploadCloud size='40' color='#dee2e6' />
                              </div>
                              <FormattedMessage
                                id='addInventory.dragDrop'
                                defaultMessage={'Drag and drop to add file here'}
                              />
                              <br />
                              <FormattedMessage
                                id='addInventory.dragDropOr'
                                defaultMessage={'or {link} to select from computer'}
                                values={{
                                  link: (
                                    <CustomA>
                                      <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                    </CustomA>
                                  )
                                }}
                              />
                            </CustomDiv>
                          }
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <ProdexGrid
                          removeFlexClass
                          tableName='request_product_attachment_documents'
                          onTableReady={() => {}}
                          columns={columns}
                          rows={
                            getSafe(() => values.attachments.length, false)
                              ? values.attachments
                                  .map(row => {
                                    return {
                                      ...row,
                                      id: row.lastModified,
                                      filename: row.name,
                                      name: row.name,
                                      date: moment().format(getLocaleDateFormat())
                                    }
                                  })
                                  .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
                              : []
                          }
                          rowActions={[
                            {
                              text: (
                                <FormattedMessage id='global.delete' defaultMessage='Delete'>
                                  {text => text}
                                </FormattedMessage>
                              ),
                              callback: async row => {
                                //FIXME
                                try {
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
                                      setFieldValue(
                                        'attachments',
                                        values.attachments.filter(o => o.lastModified !== row.id)
                                      )
                                    },
                                    () => {
                                      // cancel
                                    }
                                  )
                                } catch (e) {
                                  console.error(e)
                                }
                              }
                            }
                          ]}
                        />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </>
              )
            }}
          />
        </Modal.Content>

        <ModalActionsButtons>
          <Button basic type='button' onClick={closePopup}>
            <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span'>
              {text => text}
            </FormattedMessage>
          </Button>
          <ButtonSubmit primary type='submit' onClick={() => this.submitForm()}>
            <FormattedMessage id='wantedBoard.submit' defaultMessage='Submit' tagName='span'>
              {text => text}
            </FormattedMessage>
          </ButtonSubmit>
        </ModalActionsButtons>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({})
const mapDispatchToProps = {
  closePopup,
  removeAttachment,
  requestProduct
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(RequstProductPopup))
