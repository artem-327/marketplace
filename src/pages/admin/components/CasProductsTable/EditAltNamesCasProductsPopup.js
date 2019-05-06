import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup, Header, Dropdown as SDropdown, FormField } from 'semantic-ui-react'

import {
  closeEditPopup,
  getAlternativeProductNames,
} from '../../actions'
import { Form, Input, Button, Dropdown, Field  } from 'formik-semantic-ui'
import * as Yup from 'yup'

const initialFormValues = {
  'casIndexName':   '',
}

const formValidation = Yup.object().shape({
  casIndexName: Yup.string().min(3, "Too short").required("Required"),
})

class EditAltNamesCasProductsPopup extends React.Component {
  componentDidMount() {
    console.log('!!!!!!!!! props', this.props.popupValues.data.id)
    this.props.getAlternativeProductNames(this.props.popupValues.data.id)
  }

  render() {
    const {
      closeEditPopup,
      currentTab,
      popupValues,
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
            {(props) => { return (
              <>
                <FormGroup widths="equal">
                  <Input type='text' label={config.display.columns[0].title} name="casIndexName" />
                </FormGroup>

                <div style={{ textAlign: 'right' }}>
                  <Button.Reset>Cancel</Button.Reset>
                  <Button.Submit>Save</Button.Submit>
                </div>
              </>
            )}}

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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAltNamesCasProductsPopup)