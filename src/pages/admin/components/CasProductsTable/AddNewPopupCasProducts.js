import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeAddPopup, getHazardClassesDataRequest, postNewRequest } from '../../actions'
import { Form, Input, Button } from 'formik-semantic-ui'
import * as Yup from 'yup'

const initialFormValues = {
  'casIndexName':   '',
  'casNumber':      '',
  'chemicalName':   '',
  'packagingGroup': '',
  'unNumber':       '',
  'hazardClasses':  '',
}

const formValidation = Yup.object().shape({
  casIndexName: Yup.string().min(1, "Too short").required("Required"),
  casNumber: Yup.string().min(1, "Too short").required("Required"),
})

class AddNewPopupCasProducts extends React.Component {
  componentDidMount() {
    this.props.getHazardClassesDataRequest();
  }

  render() {
    const {
      closeAddPopup,
      currentTab,
      config,
      //postNewRequest
    } = this.props

    return (
      <Modal open centered={false}>
        <Modal.Header>Add { config.addEditText }</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialFormValues}
            validationSchema={formValidation}
            onReset={closeAddPopup}
            onSubmit={(values, actions) => {
              /*let data = {
                [config.edit[0].name]: values.val0
              }*/
              console.log('xxxxxxxxxxx AddNewPopupCasProducts - submit values - ', values);
              //postNewRequest(config, data)
            }}
          >
            <FormGroup widths="equal">
              <Input type='text' label={config.display.columns[0].title} name="casIndexName" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type='text' label={config.display.columns[1].title} name="casNumber" />
              <Input type='text' label={config.display.columns[2].title} name="chemicalName" />
              <Input type='text' label={config.display.columns[3].title} name="packagingGroup" />
              <Input type='text' label={config.display.columns[4].title} name="unNumber" />
            </FormGroup>

            <div style={{ textAlign: 'right' }}>
              <Button.Reset>Cancel</Button.Reset>
              <Button.Submit>Save</Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )



  }
}

const mapDispatchToProps = {
  getHazardClassesDataRequest,
  closeAddPopup,
  //postNewRequest
};

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab];
  return {
    config: cfg,
    currentTab: state.admin.currentTab,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPopupCasProducts)