import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Table, TableCell, TableHeaderCell, FormField, Message, Icon, Popup, Form } from 'semantic-ui-react'
import { Input, Button } from 'formik-semantic-ui-fixed-validation'
import { Formik, FieldArray } from 'formik'
import { FormattedMessage } from 'react-intl'
// Hooks
import { usePrevious } from '../../../../hooks'
// Services
import { nameValidation } from '../../services'
// Styles
import { StyledModalContent } from '../../styles'

/**
 * @Component
 * @category Products - Components / ProductCatalogTable / EditAltNamesEchoProductPopup
 */
const EditAltNamesEchoProductPopup = props => {
  const [initialState, setInitialState] = useState({
    productAltNames: []
  })

  const prevProductAltNames = usePrevious(props.productAltNames)

  useEffect(() => {
    const init = async () => {
      props.popupValues && (await props.getAlternativeCompanyGenericProductsNames(props.popupValues.id))
    }
    init()
  }, [])

  useEffect(() => {
    processFetchedData()
  }, [props.productAltNames])

  /**
   * Fetch Data
   * @category Products - Add/Edit Product Catalog Alt Names
   * @method
   */
  const processFetchedData = () => {
    if(prevProductAltNames !== props.productAltNames) {
      setInitialState({
        productAltNames: props.productAltNames.map(d => {
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
   * Add Ald Name
   * @category Products - Add/Edit Product Catalog Alt Names
   * @method
   */
  const handleAddName = arrayHelpers => {
    arrayHelpers.insert(0, { id: null, alternativeName: '', color: 'grey', description: '', canSave: false })
  }

  /**
   * Delete Alt Name
   * @category Products - Add/Edit Product Catalog Alt Names
   * @method
   */
  const handleDeleteName = async (productId, arrayHelpers, val, index, setSubmitting) => {
    setSubmitting(true)
    try {
      if (val.id === null) {
        arrayHelpers.remove(index)
      } else {
        await props.deleteCompanyGenericProductsAltName(productId, val.id)
        await processFetchedData()
      }
    } catch (e) {}
    setSubmitting(false)
  }

  /**
   * Save Alt Names
   * @category Products - Add/Edit Product Catalog Alt Names
   * @method
   */
  const handleSaveName = async (productId, val, index, setSubmitting) => {
    setSubmitting(true)
    let name = val.alternativeName.trim()
    if (name.length < 3) return

    try {
      if (val.id === null) {
        // Create new name
        let value = {alternativeName: name}
        await props.postNewCompanyGenericProductsAltName(productId, value)
      } else {
        // Update name
        let value = {alternativeName: name}
        await props.updateCompanyGenericProductsAltName(productId, val.id, value)
      }
      await processFetchedData()
    } catch (e) {}

    setSubmitting(false)
  }

  const { closePopup, popupValues, loading } = props

  return (
    <Formik
      enableReinitialize
      initialValues={initialState}
      onReset={closePopup}
      onSubmit={() => {}}>
      {({ values, errors, setFieldValue, isSubmitting, setSubmitting }) => (
        <Modal closeIcon onClose={() => closePopup()} open centered={false}>
          <Modal.Header>
            <FormattedMessage id='settings.editProductAltNames' defaultMessage='Edit Product Alternative Names' />
          </Modal.Header>
          <Form loading={loading || isSubmitting}>
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
                        onClick={() => handleAddName(arrayHelpers)}
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
                                          style={{cursor: 'pointer'}}
                                          onClick={() => {
                                            if (val.canSave === true) {
                                              handleSaveName(popupValues.id, val, index, setSubmitting)
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
                                      style={{cursor: 'pointer'}}
                                      onClick={() => {
                                        if (val.canSave === true) {
                                          handleSaveName(popupValues.id, val, index, setSubmitting)
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
                                    style={{cursor: 'pointer'}}
                                    onClick={() =>
                                      handleDeleteName(popupValues.id, arrayHelpers, val, index, setSubmitting)
                                    }
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
                <FormattedMessage id='global.close' defaultMessage='Close' />
              </Button.Reset>
            </div>
          </Modal.Actions>
        </Modal>
      )}
    </Formik>
  )
}

EditAltNamesEchoProductPopup.propTypes = {
  closePopup: PropTypes.func,
  getAlternativeCompanyGenericProductsNames: PropTypes.func,
  postNewCompanyGenericProductsAltName: PropTypes.func,
  updateCompanyGenericProductsAltName: PropTypes.func,
  deleteCompanyGenericProductsAltName: PropTypes.func,
  popupValues: PropTypes.object,
  productAltNames: PropTypes.array,
  loading: PropTypes.bool
}

EditAltNamesEchoProductPopup.defaultProps = {
  closePopup: () => {},
  getAlternativeCompanyGenericProductsNames: () => {},
  postNewCompanyGenericProductsAltName: () => {},
  updateCompanyGenericProductsAltName: () => {},
  deleteCompanyGenericProductsAltName: () => {},
  popupValues: {},
  productAltNames: [],
  loading: false
}

export default EditAltNamesEchoProductPopup
