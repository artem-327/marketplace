import { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Table, TableCell, TableHeaderCell, FormField, Message, Icon, Popup, Form } from 'semantic-ui-react'
import { Input, Button } from 'formik-semantic-ui-fixed-validation'
import { Formik, FieldArray } from 'formik'

import { FormattedMessage } from 'react-intl'

import {
  closePopup,
  getAlternativeCompanyGenericProductsNames,
  postNewCompanyGenericProductsAltName,
  updateCompanyGenericProductsAltName,
  deleteCompanyGenericProductsAltName
} from '../../actions'
import { getSafe } from '~/utils/functions'
import styled from 'styled-components'

const StyledModalContent = styled(Modal.Content)`
  max-height: calc(80vh - 10em);
  overflow-y: auto;
  overflow-x: hidden;
  padding: 30px;
`

const initialFormValues = {
  productAltNames: [{}]
}

const nameValidation = (index, val, vals) => {
  if (val.length >= 3) {
    // length is ok, check if name already exists
    if (vals.find((o, i) => o.alternativeName === val && i !== index)) {
      // name already exists
      return {
        color: 'red',
        description: <FormattedMessage id='settings.duplicateName' defaultMessage='Duplicate name!' />,
        canSave: false
      }
    } else {
      return {
        color: 'green',
        description: <FormattedMessage id='settings.clickToSave' defaultMessage='Click to save' />,
        canSave: true
      }
    }
  } else {
    //too short string
    return {
      color: 'red',
      description: <FormattedMessage id='settings.nameTooShort' defaultMessage='Name too short!' />,
      canSave: false
    }
  }
}

class EditAltNamesEchoProductPopup extends Component {
  state = {
    initialState: {
      productAltNames: []
    }
  }

  componentDidMount = async () => {
    this.props.popupValues && (await this.props.getAlternativeCompanyGenericProductsNames(this.props.popupValues.id))
    this.processFetchedData()
  }

  processFetchedData = () => {
    this.setState({
      ...this.state.initialState,
      initialState: {
        productAltNames: this.props.productAltNames.map(d => {
          return {
            ...d,
            color: 'grey',
            description: '',
            canSave: false
          }
        })
      }
    })
  }

  handleAddName = arrayHelpers => {
    arrayHelpers.insert(0, { id: null, alternativeName: '', color: 'grey', description: '', canSave: false })
  }

  handleDeleteName = async (productId, arrayHelpers, val, index) => {
    if (val.id === null) {
      arrayHelpers.remove(index)
    } else {
      await this.props.deleteCompanyGenericProductsAltName(productId, val.id)
      await this.processFetchedData()
    }
  }

  handleSaveName = async (productId, val, index) => {
    let name = val.alternativeName.trim()
    if (name.length < 3) return
    if (val.id === null) {
      // Create new name
      let value = { alternativeName: name }
      await this.props.postNewCompanyGenericProductsAltName(productId, value)
    } else {
      // Update name
      let value = { alternativeName: name }
      await this.props.updateCompanyGenericProductsAltName(productId, val.id, value)
    }
    await this.processFetchedData()
  }

  render() {
    const { closePopup, popupValues, loading } = this.props

    const { initialState } = this.state

    return (
      <Formik
        enableReinitialize
        initialValues={{ ...initialFormValues, ...initialState }}
        onReset={closePopup}
        onSubmit={() => {}}>
        {({ values, errors, setFieldValue }) => (
          <Modal closeIcon onClose={() => closePopup()} open centered={false}>
            <Modal.Header>
              <FormattedMessage id='settings.editProductAltNames' defaultMessage='Edit Product Alternative Names' />
            </Modal.Header>
            <Form loading={loading}>
              <StyledModalContent>
                <FieldArray
                  name='productAltNames'
                  render={arrayHelpers => (
                    <>
                      <Message attached='top' className='header-table-fields'>
                        <Button
                          type='button'
                          icon='plus'
                          color='blue'
                          size='small'
                          floated='right'
                          style={{ marginTop: '-0.5em' }}
                          onClick={() => this.handleAddName(arrayHelpers)}
                          data-test='settings_product_alt_name_add_btn'
                        />
                        {popupValues && `${popupValues.code} ${popupValues.name}`}
                      </Message>

                      <Table attached='bottom' className='table-fields'>
                        <Table.Header>
                          <Table.Row>
                            <TableHeaderCell>
                              <FormattedMessage id='settings.altName' defaultMessage='Alternative Name' />
                            </TableHeaderCell>
                            <TableHeaderCell width={1}>&nbsp;</TableHeaderCell>
                            <TableHeaderCell width={1}>&nbsp;</TableHeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {values && values.productAltNames.length
                            ? values.productAltNames.map((val, index, vals) => (
                                <Table.Row key={index}>
                                  <TableCell width={16}>
                                    <FormField data-test={`settings_product_alt_name_name_${index}_inp`}>
                                      <Input
                                        name={`productAltNames[${index}].alternativeName`}
                                        inputProps={{
                                          onChange: (e, d) => {
                                            const { color, description, canSave } = nameValidation(
                                              index,
                                              d.value.trim(),
                                              vals
                                            )
                                            setFieldValue(`productAltNames[${index}].color`, color)
                                            setFieldValue(`productAltNames[${index}].description`, description)
                                            setFieldValue(`productAltNames[${index}].canSave`, canSave)
                                          }
                                        }}
                                      />
                                    </FormField>
                                  </TableCell>
                                  <TableCell width={1}>
                                    {val.description ? (
                                      <Popup
                                        content={val.description}
                                        trigger={
                                          <Icon
                                            name='save outline'
                                            size='large'
                                            onClick={() => {
                                              if (val.canSave === true) {
                                                this.handleSaveName(popupValues.id, val, index)
                                                setFieldValue(`productAltNames[${index}].color`, 'grey')
                                                setFieldValue(`productAltNames[${index}].description`, '')
                                                setFieldValue(`productAltNames[${index}].canSave`, false)
                                              }
                                            }}
                                            color={val.color}
                                            data-test={`settings_product_alt_name_save_${index}_btn`}
                                          />
                                        }
                                      />
                                    ) : (
                                      <Icon
                                        name='save outline'
                                        size='large'
                                        onClick={() => {
                                          if (val.canSave === true) {
                                            this.handleSaveName(popupValues.id, val, index)
                                            setFieldValue(`productAltNames[${index}].color`, 'grey')
                                            setFieldValue(`productAltNames[${index}].description`, '')
                                            setFieldValue(`productAltNames[${index}].canSave`, false)
                                          }
                                        }}
                                        color={val.color}
                                        data-test={`settings_product_alt_name_save_${index}_btn`}
                                      />
                                    )}
                                  </TableCell>
                                  <TableCell width={1}>
                                    <Icon
                                      name='trash alternate outline'
                                      size='large'
                                      onClick={() => this.handleDeleteName(popupValues.id, arrayHelpers, val, index)}
                                      data-test={`settings_product_alt_name_delete_${index}_btn`}
                                    />
                                  </TableCell>
                                </Table.Row>
                              ))
                            : null}
                        </Table.Body>
                      </Table>
                    </>
                  )}
                />
              </StyledModalContent>
            </Form>
            <Modal.Actions>
              <div>
                <Button.Reset data-test='settings_product_alt_name_reset_btn'>
                  <FormattedMessage id='global.close' defaultMessage='Close'>
                    {text => text}
                  </FormattedMessage>
                </Button.Reset>
              </div>
            </Modal.Actions>
          </Modal>
        )}
      </Formik>
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  getAlternativeCompanyGenericProductsNames,
  postNewCompanyGenericProductsAltName,
  updateCompanyGenericProductsAltName,
  deleteCompanyGenericProductsAltName
}

const mapStateToProps = state => {
  return {
    popupValues: getSafe(() => state.productsAdmin.popupValues, ''),
    productAltNames: getSafe(() => state.productsAdmin.altEchoNamesRows, []),
    loading: getSafe(() => state.productsAdmin.loading, false)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAltNamesEchoProductPopup)
