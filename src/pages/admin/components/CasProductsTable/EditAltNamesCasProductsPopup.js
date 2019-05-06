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
} from '../../actions'
import { Form, Input, Button, Dropdown, Field } from 'formik-semantic-ui'
import * as Yup from 'yup'

const initialFormValues = {
  'casIndexName':   '',
}

const formValidation = Yup.object().shape({
  //casIndexName: Yup.string().min(3, "Too short").required("Required"),
})

class EditAltNamesCasProductsPopup extends React.Component {
  componentDidMount() {

    this.props.getAlternativeProductNames(this.props.popupValues.data.id)

  }

  render() {
    const {
      closeEditPopup,
      currentTab,
      popupValues,
      altCasNamesRows,
      config,
    } = this.props

    return (
      <Modal open centered={false}>
        <Modal.Header>Edit {config.addEditText2}</Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={{...initialFormValues, ...popupValues}}
            validationSchema={formValidation}
            validateOnBlur={false}
            validateOnChange={false}
            onReset={closeEditPopup}
            onSubmit={(values, actions) => {
              const data = {
                casIndexName: values.casIndexName,
              }
              //updateCasProductRequest(popupValues.id, data, reloadFilter)
            }}
          >
            <FieldArray name="casAlternativeNames"
                        render={arrayHelpers => (

                <>
                  <Message attached='top' className='header-table-fields'>
                    <Button type='button' icon='plus' color='blue' size='small' floated='right' style={{marginTop: '-0.5em'}} />
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
                      {altCasNamesRows && altCasNamesRows.length ? altCasNamesRows.map((alternativeName, index) => (
                        <Table.Row key={index}>
                          <TableCell width={1}><Icon name='trash alternate outline' size='large' /></TableCell>
                          <TableCell width={1}><Icon name='save outline' size='large' /></TableCell>
                          <TableCell width={8}>
                            <FormField>
                              <Input name={`casAlternativeNames.alternativeName`}

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
              <Button.Reset>Done</Button.Reset>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closeEditPopup,
  getAlternativeProductNames,
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