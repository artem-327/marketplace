import { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Modal, Button, Grid, GridRow, GridColumn, Dimmer, Loader } from 'semantic-ui-react'
import { Input, TextArea } from 'formik-semantic-ui-fixed-validation'
import { Formik } from 'formik'
import styled from 'styled-components'
import * as Yup from 'yup'
import { errorMessages } from '~/constants/yupValidation'
import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import { getSafe, removeEmpty } from '~/utils/functions'
import { FormattedMessage, injectIntl } from 'react-intl'
import { downloadAttachment, addAttachment, updateAttachment, loadFile } from '~/modules/inventory/actions'
import UploadAttachment from '~/modules/inventory/components/upload/UploadAttachment'
import { UploadCloud } from 'react-feather'
import { object, bool } from 'prop-types'
import { createCompanyGenericProductRequest } from '../api'

const CustomButton = styled(Button)`
  color: #2599d5 !important;
  background-color: #ddf1fc !important;
  border: solid 1px #2599d5 !important;
  border-radius: 3px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`

const CustomHeader = styled.div`
  padding: 21px 30px;
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  font-size: 14px;
  font-weight: bold;
  color: #20273a;
  text-transform: uppercase;
`

const StyledUploadIcon = styled(UploadCloud)`
  width: 48px;
  height: 40px;
  object-fit: contain;
  color: #dee2e6;
`

const initialValues = {
  productName: '',
  notes: '',
  attachments: []
}

const formValidation = () =>
  Yup.object().shape({
    productName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage)
  })

class CompanyGenericProductRequestForm extends Component {
  state = {
    open: false,
    loading: false,
    attachments: []
  }

  submitForm = async ({ values }) => {
    this.setState({ loading: true })

    const body = {
      attachments: this.state.attachments.map(att => att.id),
      notes: values.notes,
      productName: values.productName
    }

    removeEmpty(body)
    if (!body.attachments.length) delete body.attachments

    try {
      await createCompanyGenericProductRequest(body)
    } catch (error) {
      console.error(error)
    } finally {
      this.setState({ loading: false, open: false, attachments: [] })
    }
  }

  render() {
    const {
      intl: { formatMessage },
      buttonCaption,
      headerCaption,
      asLink
    } = this.props

    const { attachments, loading } = this.state

    return (
      <>
        {asLink ? (
          <a href='#' onClick={() => this.setState({ open: true })}>
            {buttonCaption}
          </a>
        ) : (
          <CustomButton fluid type='button' onClick={() => this.setState({ open: true })}>
            {buttonCaption}
          </CustomButton>
        )}
        {this.state.open && (
          <Formik initialValues={initialValues} validationSchema={formValidation()} onSubmit={() => {}}>
            {formikProps => (
              <Modal
                centered={true}
                open={this.state.open}
                onClose={() => this.setState({ open: false, attachments: [] })}
                size='small'>
                <Dimmer inverted active={loading}>
                  <Loader />
                </Dimmer>

                <CustomHeader>
                  <Grid verticalAlign='middle'>
                    <GridRow>
                      <GridColumn>{headerCaption}</GridColumn>
                    </GridRow>
                  </Grid>
                </CustomHeader>

                <Modal.Content scrolling>
                  <Form style={{ padding: '0 9px 4px' }}>
                    <Grid>
                      <GridRow>
                        <GridColumn>
                          <Input
                            name='productName'
                            type='text'
                            label={<FormattedMessage id='global.productName' defaultMessage='Product Name' />}
                            inputProps={{
                              placeholder: formatMessage({
                                id: 'productCatalog.enterProductName',
                                defaultMessage: 'Enter Product Name:'
                              })
                            }}
                          />
                        </GridColumn>
                      </GridRow>
                      <GridRow>
                        <GridColumn>
                          <div style={{ marginBottom: '4px' }}>
                            <FormattedMessage
                              id='global.uploadASDSInfoSheet'
                              defaultMessage='Upload a SDS/Info Sheet'
                            />
                          </div>
                          <UploadAttachment
                            {...this.props}
                            name='attachments'
                            attachments={attachments}
                            type={'3'}
                            fileMaxSize={20}
                            onChange={file => {
                              let newAttachments = attachments.filter(att => att.id !== file.id)
                              newAttachments.push(file)
                              this.setState({ attachments: newAttachments })
                            }}
                            onRemoveFile={fileId => {
                              let newAttachments = attachments.filter(att => att.id !== fileId)
                              this.setState({ attachments: newAttachments })
                            }}
                            data-test='company_generic_product_request_create_attachments_drop'
                            emptyContent={
                              <div style={{ margin: '25px' }}>
                                <div>
                                  <StyledUploadIcon />
                                </div>
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
                              </div>
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
                        </GridColumn>
                      </GridRow>
                      <GridRow>
                        <GridColumn data-test='company_generic_product_request_create_notes_textarea'>
                          <TextArea
                            name='notes'
                            label={
                              <FormattedMessage id='global.notes' defaultMessage='Notes'>
                                {text => text}
                              </FormattedMessage>
                            }
                            inputProps={{
                              placeholder: formatMessage({
                                id: 'global.enterNotes',
                                defaultMessage: 'Enter notes'
                              })
                            }}
                          />
                        </GridColumn>
                      </GridRow>
                    </Grid>
                  </Form>
                </Modal.Content>

                <Modal.Actions>
                  <Button basic onClick={() => this.setState({ open: false, attachments: [] })}>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                  <Button
                    style={{ color: 'white', backgroundColor: '#2599d5' }}
                    onClick={() => {
                      formikProps.validateForm().then(err => {
                        const errors = Object.keys(err)
                        if (errors.length && errors[0] !== 'isCanceled') {
                          // Errors found
                          formikProps.submitForm() // to show errors
                        } else {
                          // No errors found
                          this.setState({ loadSidebar: true })
                          this.submitForm(formikProps)
                        }
                      })
                    }}>
                    <FormattedMessage id='global.save' defaultMessage='Save'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </Modal.Actions>
              </Modal>
            )}
          </Formik>
        )}
      </>
    )
  }
}

CompanyGenericProductRequestForm.propTypes = {
  buttonCaption: object,
  headerCaption: object,
  asLink: bool
}

CompanyGenericProductRequestForm.defaultProps = {
  buttonCaption: (
    <FormattedMessage id='global.uploadANewProduct' defaultMessage='Upload a new Product'>
      {text => text}
    </FormattedMessage>
  ),
  headerCaption: (
    <FormattedMessage id='global.uploadANewProduct' defaultMessage='Upload a new Product'>
      {text => text}
    </FormattedMessage>
  ),
  asLink: false
}

const mapDispatchToProps = { downloadAttachment, addAttachment, updateAttachment, loadFile }

export default injectIntl(connect(null, mapDispatchToProps)(CompanyGenericProductRequestForm))
