import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalContent, Accordion, Button, Icon, Grid, Dimmer, Loader } from 'semantic-ui-react'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { withToastManager } from 'react-toast-notifications'
import moment from 'moment'

import * as Actions from '../../actions'
import { downloadAttachment } from '~/modules/inventory/actions'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import { generateToastMarkup } from '~/utils/functions'

const ModalBody = styled(ModalContent)`
  padding: 1.5rem !important;
`

const InputCounterValue = styled(Form.Input)`
  width: fit-content;
`

const AccordionTitle = styled(Accordion.Title)`
  font-size: 1.12rem;
  line-height: 1.5;

  i.chevron {
    margin-right: 1rem;
    vertical-align: center;
  }
`

const initValues = {}

class SaleReviewCreditRequest extends React.Component {
  state = {
    counterValue: null,
    messageBuyer: '',
    counter: false,
    activeIndexes: []
  }

  componentDidMount() {
    const { creditRequestHistory } = this.props
    if (!creditRequestHistory) return
    let arrayIndexes = creditRequestHistory.map((r, i) => {
      return creditRequestHistory.length - 1 === i ? true : false
    })
    this.setState({ activeIndexes: arrayIndexes })
  }

  submitHandler = async (values, actions) => {
    const { closePopup, orderId, toastManager, creditCounter } = this.props
    const { counterValue, messageBuyer, attachments } = values

    try {
      const request = {
        amount: counterValue,
        message: messageBuyer
      }

      await creditCounter(orderId, request, attachments)
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage id='order.success' defaultMessage='Success' />,
          <FormattedMessage id='order.successfullySent' defaultMessage='Successfully sent' />
        ),
        {
          appearance: 'success'
        }
      )
      closePopup()
    } catch (e) {
      console.error(e)
    } finally {
      actions.setSubmitting(false)
    }
  }

  handleChange = (e, value, name, setFieldValue) => {
    e.preventDefault()
    this.setState({ [name]: value })
    setFieldValue(name, value)
  }

  acceptRequestCredit = async e => {
    e.preventDefault()
    const { closePopup, orderId, toastManager, acceptCredit } = this.props

    try {
      await creditAccept(orderId)
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage id='order.success' defaultMessage='Success' />,
          <FormattedMessage id='order.acceptedCredit' defaultMessage='Credit was accepted' />
        ),
        {
          appearance: 'success'
        }
      )
      closePopup()
    } catch (e) {
      console.error(e)
    }
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndexes } = this.state

    activeIndexes[index] = activeIndexes[index] ? false : true

    this.setState({ activeIndexes })
  }

  getMimeType = documentName => {
    const documentExtension = documentName.substr(documentName.lastIndexOf('.') + 1)

    switch (documentExtension) {
      case 'doc':
        return 'application/msword'
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      case 'ppt':
        return 'application/vnd.ms-powerpoint'
      case 'pptx':
        return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      case 'xls':
        return 'application/vnd.ms-excel'
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      case 'gif':
        return 'image/gif'
      case 'png':
        return 'image/png'
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg'
      case 'svg':
        return 'image/svg'
      case 'pdf':
        return 'application/pdf'
      case '7z':
        return 'application/x-7z-compressed'
      case 'zip':
        return 'application/zip'
      case 'tar':
        return 'application/x-tar'
      case 'rar':
        return 'application/x-rar-compressed'
      case 'xml':
        return 'application/xml'
      default:
        return 'text/plain'
    }
  }

  extractFileName = contentDispositionValue => {
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

  prepareLinkToAttachment = async attachmentId => {
    let downloadedFile = await this.props.downloadCreditRequestAttachments('sale', this.props.orderId, attachmentId)
    const fileName = this.extractFileName(downloadedFile.value.headers['content-disposition'])
    const mimeType = fileName && this.getMimeType(fileName)
    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)
    element.href = fileURL

    return element
  }

  downloadAttachment = async (documentName, attachmentId) => {
    const element = await this.prepareLinkToAttachment(attachmentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  render() {
    const {
      intl: { formatMessage },
      orderId,
      isSending,
      creditRequestHistory
    } = this.props

    console.log('creditRequestHistory====================================')
    console.log(creditRequestHistory)
    console.log('====================================')

    const { activeIndexes } = this.state

    return (
      <>
        <Modal closeIcon onClose={() => this.props.closePopup()} open={true} size='small'>
          <Dimmer active={isSending} inverted>
            <Loader />
          </Dimmer>
          <Modal.Header>
            <FormattedMessage id='order.saleReviewCreditRequestHeader' defaultMessage='REVIEW CREDIT REQUEST' />
          </Modal.Header>
          <ModalBody>
            <Modal.Description>
              <Form
                enableReinitialize
                validateOnChange={false}
                initialValues={{ ...initValues }}
                onSubmit={this.submitHandler}
                className='flex stretched'
                style={{ padding: '0' }}>
                {({ values, submitForm, setFieldValue, resetForm }) => {
                  return (
                    <>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            {creditRequestHistory &&
                            creditRequestHistory.length &&
                            creditRequestHistory[creditRequestHistory.length - 1].amount ? (
                              <strong style={{ fontSize: '16px' }}>
                                <FormattedMessage
                                  id='order.sellerRequesting'
                                  defaultMessage={'Seller is requesting a discount of $'}
                                />
                                {`${creditRequestHistory[creditRequestHistory.length - 1].amount}. `}
                                <FormattedMessage
                                  id='order.viewRequesting'
                                  defaultMessage={'Please view reasoning and images below.'}
                                />
                              </strong>
                            ) : null}
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={16}>
                            <strong style={{ textDecoration: 'underline', fontSize: '16px' }}>
                              <FormattedMessage id='order.messageningHistory' defaultMessage={'Messaging History: '} />
                            </strong>
                            {creditRequestHistory && creditRequestHistory.length ? (
                              <Accordion fluid>
                                {creditRequestHistory.map((reason, i) => {
                                  return (
                                    <div key={reason.id}>
                                      <AccordionTitle active={activeIndexes[i]} index={i} onClick={this.handleClick}>
                                        <Icon
                                          name={'chevron ' + (activeIndexes[i] ? 'down' : 'right')}
                                          size='small'
                                          color={activeIndexes[i] ? 'blue' : 'black'}
                                        />

                                        <span
                                          style={{
                                            fontStyle: 'italic',
                                            color: 'grey'
                                          }}>
                                          {reason.createdAt && `${moment(reason.createdAt).format('LLL')}: `}
                                        </span>
                                        <span style={{ fontStyle: 'italic', textDecoration: 'underline' }}>
                                          {` ${reason.message.substring(0, 20)}...`}
                                        </span>
                                      </AccordionTitle>
                                      <Accordion.Content active={activeIndexes[i]}>
                                        <Grid.Row style={{ paddingLeft: '26px' }}>
                                          <Grid.Column width={16}>{reason.message}</Grid.Column>
                                        </Grid.Row>
                                        <Grid.Row style={{ paddingLeft: '26px' }}>
                                          <Grid.Column width={16}>
                                            {reason.attachments && reason.attachments.length
                                              ? reason.attachments.map(attachment => {
                                                  return (
                                                    <Button
                                                      as='a'
                                                      onClick={() =>
                                                        this.downloadAttachment(attachment.fileName, attachment.id)
                                                      }>
                                                      <Icon name='download' />
                                                      {attachment.name}
                                                    </Button>
                                                  )
                                                })
                                              : null}
                                          </Grid.Column>
                                        </Grid.Row>
                                      </Accordion.Content>
                                    </div>
                                  )
                                })}
                              </Accordion>
                            ) : null}
                          </Grid.Column>
                        </Grid.Row>
                        <br /> <br />
                        {!this.state.counter ? (
                          <Grid.Row>
                            <Grid.Column width={10}></Grid.Column>
                            <Grid.Column floated='right' width={3}>
                              <Button
                                type='button'
                                basic
                                fluid
                                onClick={() => {
                                  this.setState({ counter: true })
                                }}>
                                <FormattedMessage id='global.counter' defaultMessage='Counter' tagName='span'>
                                  {text => text}
                                </FormattedMessage>
                              </Button>
                            </Grid.Column>
                            <Grid.Column floated='right' width={3}>
                              <Button color='blue' fluid type='button' onClick={this.acceptRequestCredit}>
                                <FormattedMessage id='global.accept' defaultMessage='Accept' tagName='span'>
                                  {text => text}
                                </FormattedMessage>
                              </Button>
                            </Grid.Column>
                          </Grid.Row>
                        ) : (
                          <>
                            <Grid.Row>
                              <Grid.Column width={16}>
                                <FormattedMessage
                                  id='order.sellerRequestingDetail'
                                  defaultMessage={
                                    'You have selected to Counter the credit request. Please fill in the counter details below.'
                                  }
                                />
                                <InputCounterValue
                                  onChange={(e, { value, name }) => this.handleChange(e, value, name, setFieldValue)}
                                  label={formatMessage({
                                    id: 'order.counterValue',
                                    defaultMessage: 'Counter Value:'
                                  })}
                                  name='counterValue'
                                  placeholder='$'
                                />
                                <Form.TextArea
                                  onChange={(e, { value, name }) => this.handleChange(e, value, name, setFieldValue)}
                                  name='messageBuyer'
                                  label={formatMessage({
                                    id: 'order.messageBuyer',
                                    defaultMessage: 'Message to Buyer:'
                                  })}
                                />
                                <UploadLot
                                  {...this.props}
                                  name='attachments'
                                  attachments={values.attachments}
                                  fileMaxSize={20}
                                  onChange={files => {
                                    files.map((file, i) => {
                                      setFieldValue(`attachments[${i}]`, file)
                                    })
                                    this.setState({ changedForm: true })
                                  }}
                                  data-test='settings_product_import_attachments'
                                  emptyContent={
                                    <label>
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
                                            <a>
                                              <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                            </a>
                                          )
                                        }}
                                      />
                                    </label>
                                  }
                                  uploadedContent={
                                    <label>
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
                                            <a>
                                              <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                            </a>
                                          )
                                        }}
                                      />
                                    </label>
                                  }
                                />
                              </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                              <Grid.Column width={6}></Grid.Column>
                              <Grid.Column floated='right' width={3}>
                                <Button
                                  basic
                                  fluid
                                  onClick={() => {
                                    resetForm()
                                    this.props.closePopup()
                                  }}>
                                  <FormattedMessage id='global.cancel' defaultMessage='Cancel' tagName='span'>
                                    {text => text}
                                  </FormattedMessage>
                                </Button>
                              </Grid.Column>
                              <Grid.Column floated='right' width={4}>
                                <Button
                                  type='button'
                                  basic
                                  fluid
                                  onClick={() => {
                                    this.setState({ counter: false })
                                  }}>
                                  <FormattedMessage
                                    id='global.returnReview'
                                    defaultMessage='Return to review'
                                    tagName='span'>
                                    {text => text}
                                  </FormattedMessage>
                                </Button>
                              </Grid.Column>
                              <Grid.Column floated='right' width={3}>
                                <Button color='blue' fluid type='submit'>
                                  <FormattedMessage id='global.send' defaultMessage='Send' tagName='span'>
                                    {text => text}
                                  </FormattedMessage>
                                </Button>
                              </Grid.Column>
                            </Grid.Row>
                          </>
                        )}
                      </Grid>
                    </>
                  )
                }}
              </Form>
            </Modal.Description>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

function mapStateToProps(state) {
  const { detail } = state.orders
  return {
    orderId: detail.id,
    isSending: state.orders.isSending,
    creditRequestHistory: detail.creditRequestHistory
  }
}

export default connect(mapStateToProps, { ...Actions, downloadAttachment })(
  withToastManager(injectIntl(SaleReviewCreditRequest))
)
