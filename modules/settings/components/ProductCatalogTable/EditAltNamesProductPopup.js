import React from 'react'
import { connect } from 'react-redux'
import Router from "next/router"
import {
  Modal,
  Table, TableCell, TableHeaderCell,
  FormField,
  Message,
  Icon,
  Popup
} from "semantic-ui-react";
import { Form, Input, Button } from "formik-semantic-ui";
import { FieldArray } from 'formik'

import {withToastManager} from "react-toast-notifications";

import {
  closePopup,
  getProductAltNames,
  postNewProductAltName,
  updateProductAltName,
  deleteProductAltName,
} from "../../actions";


const initialFormValues = {
  productAltNames: [{}]
}

const nameValidation = (index, val, vals) => {
  if (val.length >= 3) {
    // length is ok, check if name already exists
    if (vals.find((o, i) => o.tradeName === val && i !== index)) {
      // name already exists
      return {color: 'red', description: 'Duplicate name!', canSave: false}
    }
    else {
      return {color: 'green', description: 'Click to save', canSave: true}
    }
  }
  else {  //too short string
    return {color: 'red', description: 'Name too short!', canSave: false}
  }
}

class EditAltNamesProductPopup extends React.Component {
  state = {
    initialState: {
      productAltNames: []
    }
  }

  componentDidMount = async () => {
    await this.props.getProductAltNames(this.props.popupValues.id)
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
            canSave: false,
          }})
      }
    })
  }

  handleAddName = (arrayHelpers) => {
    arrayHelpers.insert(0, {product: null, tradeName: '', color: 'grey', description: '', canSave: false})
  }

  handleDeleteName = async (productId, arrayHelpers, val, index) => {
    if (val.product === null) {
      arrayHelpers.remove(index)
    }
    else {
      await this.props.deleteProductAltName(productId, val.product)
      await this.processFetchedData()
    }
  }

  handleSaveName = async (productId, val, index) => {
    let name = val.tradeName.trim()
    if (name.length < 3) return
    if (val.product === null) {  // Create new name
      let value = {casProduct: productId, tradeName: name}
      await this.props.postNewProductAltName(productId, value)
    }
    else {                  // Update name
      let value = {tradeName: name}
      await this.props.updateProductAltName(productId, val.product, value)
    }
    await this.processFetchedData()
  }

  render() {
    const {
      closePopup,
      popupValues
    } = this.props

    const {
      initialState
    } = this.state

    return (

      <Modal open centered={false}>
        <Modal.Header>Edit Product Alternative Names</Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={{...initialFormValues, ...initialState}}
            onReset={closePopup}
          >
            {({ values, setFieldValue }) => (
              <>
                <FieldArray name="productAltNames"
                  render={arrayHelpers => (
                    <>
                      <Message attached='top' className='header-table-fields'>
                        <Button type='button' icon='plus' color='blue' size='small' floated='right' style={{marginTop: '-0.5em'}}
                                onClick={() => this.handleAddName(arrayHelpers)}
                                data-test='settings_product_alt_name_add_btn'/>
                        {`${popupValues.productCode} ${popupValues.productName}`}
                      </Message>

                      <Table attached='bottom' className='table-fields'>
                        <Table.Header>
                          <Table.Row>
                            <TableHeaderCell>Alternative Name</TableHeaderCell>
                            <TableHeaderCell width={1}>&nbsp;</TableHeaderCell>
                            <TableHeaderCell width={1}>&nbsp;</TableHeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {values && values.productAltNames.length ? values.productAltNames.map((val, index, vals) => (
                            <Table.Row key={index}>
                              <TableCell width={16}>
                                <FormField data-test={`settings_product_alt_name_name_${index}_inp`}>
                                  <Input name={`productAltNames[${index}].tradeName`}
                                         inputProps={{
                                           onChange: (e, d) => {
                                             const {color, description, canSave} = nameValidation(index, d.value.trim(), vals)
                                             setFieldValue(`productAltNames[${index}].color`, color)
                                             setFieldValue(`productAltNames[${index}].description`, description)
                                             setFieldValue(`productAltNames[${index}].canSave`, canSave)
                                           }
                                         }}
                                  />
                                </FormField>
                              </TableCell>
                              <TableCell width={1}>{val.description ? (
                                <Popup content={val.description}
                                       trigger={<Icon name='save outline'
                                                      size='large'
                                                      onClick={() => {if (val.canSave === true) {
                                                        this.handleSaveName(popupValues.id, val, index)
                                                        setFieldValue(`productAltNames[${index}].color`, 'grey')
                                                        setFieldValue(`productAltNames[${index}].description`, '')
                                                        setFieldValue(`productAltNames[${index}].canSave`, false)
                                                      }}}
                                                      color={val.color}
                                                      data-test={`settings_product_alt_name_save_${index}_btn`}/>}
                                />
                              ) : (
                                <Icon name='save outline'
                                      size='large'
                                      onClick={() => {if (val.canSave === true) {
                                        this.handleSaveName(popupValues.id, val, index)
                                        setFieldValue(`productAltNames[${index}].color`, 'grey')
                                        setFieldValue(`productAltNames[${index}].description`, '')
                                        setFieldValue(`productAltNames[${index}].canSave`, false)
                                      }}}
                                      color={val.color}
                                      data-test={`settings_product_alt_name_save_${index}_btn`}/>
                              )}</TableCell>
                              <TableCell width={1}><Icon name='trash alternate outline' size='large'
                                                         onClick={() => this.handleDeleteName(popupValues.id, arrayHelpers, val, index)}
                                                         data-test={`settings_product_alt_name_delete_${index}_btn`}/></TableCell>
                            </Table.Row>
                          )) : ''
                          }
                        </Table.Body>
                      </Table>
                    </>
                  )}
                />
                <div style={{ textAlign: 'right' }}>
                  <Button.Reset data-test='settings_product_alt_name_reset_btn'>Close</Button.Reset>
                </div>
              </>
            )}
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  getProductAltNames,
  postNewProductAltName,
  updateProductAltName,
  deleteProductAltName,
}

const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues,
    productAltNames: state.settings.productAltNames,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(EditAltNamesProductPopup))