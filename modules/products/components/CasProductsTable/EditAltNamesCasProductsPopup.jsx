import { useEffect, useState } from 'react'

import {
  Modal,
  Table,
  TableCell,
  TableHeaderCell,
  FormGroup,
  Header,
  Dropdown as SDropdown,
  FormField,
  Message,
  Icon,
  Popup,
  Form
} from 'semantic-ui-react'
import { FieldArray } from 'formik'
import { FormattedMessage } from 'react-intl'

import { Formik } from 'formik'
import { Input, Button, Dropdown, Field } from 'formik-semantic-ui-fixed-validation'
import { StyledModalContent } from '../../styles'

const initialFormValues = {
  casAlternativeNames: [{}]
}

const nameValidation = (index, val, vals) => {
  if (val.length >= 3) {
    // length is ok, check if name already exists
    if (vals.find((o, i) => o.alternativeName === val && i !== index)) {
      // name already exists
      return {
        color: 'red',
        description: <FormattedMessage id='admin.duplicateName' defaultMessage='Duplicate Name!' />,
        canSave: false
      }
    } else {
      return {
        color: 'green',
        description: <FormattedMessage id='admin.clickToSave' defaultMessage='Click to save!' />,
        canSave: true
      }
    }
  } else {
    //too short string
    return {
      color: 'red',
      description: <FormattedMessage id='admin.nameTooShort' defaultMessage='Name too short!' />,
      canSave: false
    }
  }
}

const EditAltNamesCasProductsPopup = props => {
  const [initialState, setInitialState] = useState({
    casAlternativeNames: []
  })

  useEffect(() => {
    const init = async () => {
      await props.getAlternativeProductNames(props.popupValues.data.id)
      processFetchedData()
    }

    init()
  }, [])

  const processFetchedData = () => {
    setInitialState({
      casAlternativeNames: props.altCasNamesRows.map(d => {
        return {
          ...d,
          color: 'grey',
          description: '',
          canSave: false
        }
      })
    })
  }

  const handleAddName = arrayHelpers => {
    arrayHelpers.insert(0, { id: null, alternativeName: '', color: 'grey', description: '', canSave: false })
  }

  const handleDeleteName = async (productId, arrayHelpers, val, index) => {
    if (val.id === null) {
      arrayHelpers.remove(index)
    } else {
      await props.deleteProductName(productId, val.id)
      await processFetchedData()
    }
  }

  const handleSaveName = async (productId, val, index) => {
    let name = val.alternativeName.trim()
    if (name.length < 3) return
    if (val.id === null) {
      // Create new name
      let value = { alternativeName: name }
      await props.postNewProductName(productId, value)
    } else {
      // Update name
      let value = { alternativeName: name }
      await props.updateProductName(productId, val.id, value)
    }
    await processFetchedData()
  }

  const { closeEditPopup, popupValues, loading } = props

  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialFormValues, ...initialState }}
      onReset={closeEditPopup}
      onSubmit={() => {}}>
      {({ values, errors, setFieldValue }) => (
        <Modal closeIcon onClose={() => closeEditPopup()} open centered={false}>
          <Modal.Header>
            <FormattedMessage id='admin.editAlternativeNames' defaultMessage='Edit Alternative Names' />
          </Modal.Header>
          <Form loading={loading}>
            <StyledModalContent>
              <FieldArray
                name='casAlternativeNames'
                render={arrayHelpers => (
                  <>
                    <Message attached='top' className='header-table-fields'>
                      <Button
                        type='button'
                        data-test='admin_popup_alt_cas_name_add_btn'
                        icon='plus'
                        color='blue'
                        size='small'
                        floated='right'
                        style={{ marginTop: '-0.5em' }}
                        onClick={() => handleAddName(arrayHelpers)}
                      />
                      {`${popupValues.data.casNumber} ${popupValues.data.casIndexName}`}
                    </Message>

                    <Table attached='bottom' className='table-fields'>
                      <Table.Header>
                        <Table.Row>
                          <TableHeaderCell>
                            <FormattedMessage id='admin.alternativeName' defaultMessage='Alternative Name' />
                          </TableHeaderCell>
                          <TableHeaderCell width={1}>&nbsp;</TableHeaderCell>
                          <TableHeaderCell width={1}>&nbsp;</TableHeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {values && values.casAlternativeNames.length
                          ? values.casAlternativeNames.map((val, index, vals) => (
                              <Table.Row key={index}>
                                <TableCell width={16}>
                                  <FormField data-test='admin_popup_alt_cas_name_inp'>
                                    <Input
                                      name={`casAlternativeNames[${index}].alternativeName`}
                                      inputProps={{
                                        onChange: (e, d) => {
                                          const { color, description, canSave } = nameValidation(
                                            index,
                                            d.value.trim(),
                                            vals
                                          )
                                          setFieldValue(`casAlternativeNames[${index}].color`, color)
                                          setFieldValue(`casAlternativeNames[${index}].description`, description)
                                          setFieldValue(`casAlternativeNames[${index}].canSave`, canSave)
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
                                          onClick={async () => {
                                            if (val.canSave === true) {
                                              try {
                                                await handleSaveName(popupValues.data.id, val, index)
                                                setFieldValue(`casAlternativeNames[${index}].color`, 'grey')
                                                setFieldValue(`casAlternativeNames[${index}].description`, '')
                                                setFieldValue(`casAlternativeNames[${index}].canSave`, false)
                                              } catch (err) {
                                                console.error(err)
                                              }
                                            }
                                          }}
                                          color={val.color}
                                          data-test={`admin_popup_alt_cas_name_${index}_save`}
                                        />
                                      }
                                    />
                                  ) : (
                                    <Icon
                                      name='save outline'
                                      size='large'
                                      onClick={async () => {
                                        if (val.canSave === true) {
                                          try {
                                            await handleSaveName(popupValues.data.id, val, index)
                                            setFieldValue(`casAlternativeNames[${index}].color`, 'grey')
                                            setFieldValue(`casAlternativeNames[${index}].description`, '')
                                            setFieldValue(`casAlternativeNames[${index}].canSave`, false)
                                          } catch (err) {
                                            console.error(err)
                                          }
                                        }
                                      }}
                                      color={val.color}
                                      data-test={`admin_popup_alt_cas_name_${index}_save`}
                                    />
                                  )}
                                </TableCell>
                                <TableCell width={1}>
                                  <Icon
                                    name='trash alternate outline'
                                    size='large'
                                    onClick={() =>
                                      handleDeleteName(popupValues.data.id, arrayHelpers, val, index)
                                    }
                                    data-test={`admin_popup_alt_cas_name_${index}_delete`}
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
              <Button.Reset data-test='admin_popup_alt_cas_name_close_btn'>
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

export default EditAltNamesCasProductsPopup
