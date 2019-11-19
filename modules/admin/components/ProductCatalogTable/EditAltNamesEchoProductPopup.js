import React from 'react'
import {connect} from 'react-redux'
import {Modal, Table, TableCell, TableHeaderCell, FormField, Message, Icon, Popup} from 'semantic-ui-react'
import {Form, Input, Button} from 'formik-semantic-ui-fixed-validation'
import {FieldArray} from 'formik'

import {withToastManager} from 'react-toast-notifications'

import {FormattedMessage} from 'react-intl'

import {
  closePopup,
  getAlternativeEchoProductNames,
  postNewEchoProductAltName,
  updateEchoProductAltName,
  deleteEchoProductAltName
} from '../../actions'

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

class EditAltNamesEchoProductPopup extends React.Component {
  state = {
    initialState: {
      productAltNames: []
    }
  }

  componentDidMount = async () => {
    await this.props.getAlternativeEchoProductNames(this.props.popupValues.id)
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
    arrayHelpers.insert(0, {id: null, alternativeName: '', color: 'grey', description: '', canSave: false})
  }

  handleDeleteName = async (productId, arrayHelpers, val, index) => {
    if (val.id === null) {
      arrayHelpers.remove(index)
    } else {
      await this.props.deleteEchoProductAltName(productId, val.id)
      await this.processFetchedData()
    }
  }

  handleSaveName = async (productId, val, index) => {
    let name = val.alternativeName.trim()
    if (name.length < 3) return
    if (val.id === null) {
      // Create new name
      let value = {alternativeName: name}
      await this.props.postNewEchoProductAltName(productId, value)
    } else {
      // Update name
      let value = {alternativeName: name}
      await this.props.updateEchoProductAltName(productId, val.id, value)
    }
    await this.processFetchedData()
  }

  render() {
    const {closePopup, popupValues} = this.props

    const {initialState} = this.state

    return (
      <Modal closeIcon onClose={() => closePopup()} open centered={false}>
        <Modal.Header>
          <FormattedMessage id='settings.editProductAltNames' defaultMessage='Edit Product Alternative Names' />
        </Modal.Header>
        <Modal.Content>
          <Form enableReinitialize initialValues={{...initialFormValues, ...initialState}} onReset={closePopup}>
            {({values, setFieldValue}) => (
              <>
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
                          style={{marginTop: '-0.5em'}}
                          onClick={() => this.handleAddName(arrayHelpers)}
                          data-test='settings_product_alt_name_add_btn'
                        />
                        {`${popupValues.code} ${popupValues.name}`}
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
                                            const {color, description, canSave} = nameValidation(
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
                <div style={{textAlign: 'right'}}>
                  <Button.Reset data-test='settings_product_alt_name_reset_btn'>
                    <FormattedMessage id='global.close' defaultMessage='Close'>
                      {text => text}
                    </FormattedMessage>
                  </Button.Reset>
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
  getAlternativeEchoProductNames,
  postNewEchoProductAltName,
  updateEchoProductAltName,
  deleteEchoProductAltName
}

const mapStateToProps = state => {
  return {
    popupValues: state.admin.popupValues,
    productAltNames: state.admin.altEchoNamesRows
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditAltNamesEchoProductPopup))
