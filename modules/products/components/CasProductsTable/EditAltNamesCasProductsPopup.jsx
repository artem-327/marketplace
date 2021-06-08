import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Modal,
  Table,
  TableCell,
  TableHeaderCell,
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
// Hooks
import { usePrevious } from '../../../../hooks'
// Services
import { nameValidation } from '../../services'
// Styles
import { StyledModalContent } from '../../styles'

/**
 * @Component
 * @category Products - Components / CasProductsTable / EditAltNamesCasProductsPopup
 */
const EditAltNamesCasProductsPopup = props => {
  const [initialState, setInitialState] = useState({
    casAlternativeNames: []
  })

  const prevAltCasNamesRows = usePrevious(props.altCasNamesRows)

  useEffect(() => {
    const init = async () => {
      await props.getAlternativeProductNames(props.popupValues.data.id)      
    }
    init()
  }, [])

  useEffect(() => {
    processFetchedData()
  }, [props.altCasNamesRows])

  /**
   * Fetch Data
   * @category Products - Add/Edit CAS Products Alt Names
   * @method
   */
  const processFetchedData = () => {
    if(prevAltCasNamesRows !== props.altCasNamesRows) {
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
  }

  /**
   * Add Alt Name
   * @category Products - Add/Edit CAS Products Alt Names
   * @method
   */
  const handleAddName = arrayHelpers => {
    arrayHelpers.insert(0, { id: null, alternativeName: '', color: 'grey', description: '', canSave: false })
  }

  /**
   * Delete Alt Name
   * @category Products - Add/Edit CAS Products Alt Names
   * @method
   */
  const handleDeleteName = async (productId, arrayHelpers, val, index) => {
    if (val.id === null) {
      arrayHelpers.remove(index)
    } else {
      await props.deleteProductName(productId, val.id)
      await processFetchedData()
    }
  }

  /**
   * Save Alt Names
   * @category Products - Add/Edit CAS Products Alt Names
   * @method
   */
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
      initialValues={{ ...initialState }}
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
                                          style={{cursor: 'pointer'}}
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
                                      style={{cursor: 'pointer'}}
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
                                    style={{cursor: 'pointer'}}
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
                <FormattedMessage id='global.close' defaultMessage='Close' />
              </Button.Reset>
            </div>
          </Modal.Actions>
        </Modal>
      )}
    </Formik>
  )
}

EditAltNamesCasProductsPopup.propTypes = {
  closeEditPopup: PropTypes.func,
  getAlternativeProductNames: PropTypes.func,
  postNewProductName: PropTypes.func,
  updateProductName: PropTypes.func,
  deleteProductName: PropTypes.func,
  popupValues: PropTypes.object,
  altCasNamesRows: PropTypes.array,
  loading: PropTypes.bool
}

EditAltNamesCasProductsPopup.defaultProps = {
  closeEditPopup: () => {},
  getAlternativeProductNames: () => {},
  postNewProductName: () => {},
  updateProductName: () => {},
  deleteProductName: () => {},
  popupValues: {},
  altCasNamesRows: [],
  loading: false
}

export default EditAltNamesCasProductsPopup
