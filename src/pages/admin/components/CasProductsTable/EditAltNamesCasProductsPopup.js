import React from 'react'
import { connect } from 'react-redux'

import {
  Modal,
  Table, TableCell, TableHeaderCell,
  FormGroup,
  Header,
  Dropdown as SDropdown,
  FormField,
  Message,
  Icon,
} from 'semantic-ui-react'
import { FieldArray } from 'formik'

import {
  closeEditPopup,
  getAlternativeProductNames,
  postNewProductName,
  updateProductName,
  deleteProductName,
} from '../../actions'
import { Form, Input, Button, Dropdown, Field } from 'formik-semantic-ui'
import * as Yup from 'yup'

const initialFormValues = {
  casAlternativeNames: [{}]
}


const formValidation = Yup.object().shape({
  //casIndexName: Yup.string().min(3, "Too short").required("Required"),
})

const nameValidation = (index, val, vals) => {
  if (val.length >= 3) {
    // length is ok, check if name already exists
    if (vals.find((o, i) => o.alternativeName === val && i !== index)) {
      // name already exists
      return {color: 'red', description: 'Duplicated name!', canSave: false}
    }
    else {
      return {color: 'green', description: 'Click to save', canSave: true}
    }
  }
  else {  //too short string
    return {color: 'red', description: 'Name too short!', canSave: false}
  }
}

class EditAltNamesCasProductsPopup extends React.Component {
  state = {
    initialState: {
      casAlternativeNames: []
    }
  }

  componentDidMount = async () => {
    await this.props.getAlternativeProductNames(this.props.popupValues.data.id)
    this.setState({
      ...this.state.initialState,
      initialState: {
        casAlternativeNames: this.props.altCasNamesRows.map(d => {
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
    arrayHelpers.insert(0, {id: null, alternativeName: '', color: 'grey', description: '', canSave: false})
  }

  handleDeleteName = (productId, arrayHelpers, val, index) => {
    if (val.id === null) {
      arrayHelpers.remove(index)
    }
    else {
      this.props.deleteProductName(productId, val.id)
      arrayHelpers.remove(index)
    }
  }

  handleSaveName = (productId, val, index) => {
    if (val.alternativeName.length < 3) return
    if (val.id === null) {  // Create new name
      let value = {casProduct: productId, alternativeName: val.alternativeName}
      this.props.postNewProductName(productId, value)
    }
    else {                  // Update name
      let value = {alternativeName: val.alternativeName}
      this.props.updateProductName(productId, val.id, value)
    }
  }

  render() {
    const {
      closeEditPopup,
      currentTab,
      popupValues,
      altCasNamesRows,
      config,
    } = this.props

    const {
      initialState
    } = this.state

    return (
      <Modal open centered={false}>
        <Modal.Header>Edit {config.addEditText2}</Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={{...initialFormValues, ...initialState}}
            validationSchema={formValidation}
            onReset={closeEditPopup}
          >
            {({ values, errors, setFieldValue }) => (
              <>
                <FieldArray name="casAlternativeNames"
                            render={arrayHelpers => (

                    <>
                      <Message attached='top' className='header-table-fields'>
                        <Button type='button' icon='plus' color='blue' size='small' floated='right' style={{marginTop: '-0.5em'}}
                                onClick={() => this.handleAddName(arrayHelpers)}/>
                        {`CAS Product Name: ${popupValues.data.casIndexName}`}
                      </Message>

                      <Table attached='bottom' className='table-fields'>
                        <Table.Header>
                          <Table.Row>
                            <TableHeaderCell width={1}>&nbsp;</TableHeaderCell>
                            <TableHeaderCell width={1}>&nbsp;</TableHeaderCell>
                            <TableHeaderCell>Alternative Name</TableHeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {values && values.casAlternativeNames.length ? values.casAlternativeNames.map((val, index, vals) => (
                            <Table.Row key={index}>
                              <TableCell width={1}><Icon name='trash alternate outline' size='large'
                                                         onClick={() => this.handleDeleteName(popupValues.data.id, arrayHelpers, val, index)} /></TableCell>
                              <TableCell width={1}><Icon name='save outline' size='large'
                                                         onClick={() => {if (val.canSave === true) {
                                                           this.handleSaveName(popupValues.data.id, val, index)
                                                           setFieldValue(`casAlternativeNames[${index}].color`, 'grey')
                                                           setFieldValue(`casAlternativeNames[${index}].description`, '')
                                                           setFieldValue(`casAlternativeNames[${index}].canSave`, false)
                                                         }}}
                                                         color={val.color}
                                                         title={val.description}
                              /></TableCell>
                              <TableCell width={16}>
                                <FormField>
                                  <Input name={`casAlternativeNames[${index}].alternativeName`}
                                         inputProps={{
                                           onChange: (e, d) => {
                                             const {color, description, canSave} = nameValidation(index, d.value, vals)
                                             setFieldValue(`casAlternativeNames[${index}].color`, color)
                                             setFieldValue(`casAlternativeNames[${index}].description`, description)
                                             setFieldValue(`casAlternativeNames[${index}].canSave`, canSave)
                                           }
                                         }}
                                  />
                                </FormField>
                              </TableCell>
                            </Table.Row>
                          )) : ''
                          }
                        </Table.Body>
                      </Table>
                    </>
                  )}
                />
                <div style={{ textAlign: 'right' }}>
                  <Button.Reset>Close</Button.Reset>
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
  closeEditPopup,
  getAlternativeProductNames,
  postNewProductName,
  updateProductName,
  deleteProductName,
}

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab]
  return {
    config: cfg,
    currentTab: state.admin.currentTab,
    popupValues: state.admin.popupValues,
    altCasNamesRows: state.admin.altCasNamesRows,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAltNamesCasProductsPopup)