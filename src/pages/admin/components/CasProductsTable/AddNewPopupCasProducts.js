import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import { closeAddPopup, getHazardClassesDataRequest, getPackagingGroupsDataRequest, postNewRequest } from '../../actions'
import { Form, Input, Button, Dropdown, Field  } from 'formik-semantic-ui'
import * as Yup from 'yup'

const initialFormValues = {
  'casIndexName':   '',
  'casNumber':      '',
  'chemicalName':   '',
  'unNumber':       '',
  'hazardClasses':  [],
  'packagingGroup': '',
}

const formValidation = Yup.object().shape({
  casIndexName: Yup.string().min(1, "Too short").required("Required"),
  casNumber: Yup.string().min(1, "Too short").required("Required"),
})

class AddNewPopupCasProducts extends React.Component {
  componentDidMount() {
    this.props.getHazardClassesDataRequest();
    this.props.getPackagingGroupsDataRequest();
  }

  render() {
    const {
      closeAddPopup,
      currentTab,
      config,
      //postNewRequest
    } = this.props

    const packagingGroups = this.props.packagingGroups.map(d => {
      return {
        key: d.id,
        text: d.groupCode + ' - ' + d.description,
        value: d.id,
      }
    })

    const hazardClasses = this.props.hazardClasses.map(d => {
      return {
        key: d.id,
        text: d.classCode + ' - ' + d.description,
        value: d.id,
      }
    })

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
              //<Dropdown label={config.display.columns[4].title} options={packagingGroups} name="packagingGroup" />
            }}
          >
            <FormGroup widths="equal">
              <Input type='text' label={config.display.columns[0].title} name="casIndexName" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type='text' label={config.display.columns[1].title} name="casNumber" />
              <Input type='text' label={config.display.columns[2].title} name="chemicalName" />
              <Input type='text' label={config.display.columns[3].title} name="unNumber" />
            </FormGroup>
            <FormGroup widths="equal">
              <Dropdown
                name="packagingGroup" label={config.display.columns[4].title} options={packagingGroups}
              />
            </FormGroup>
            <FormGroup widths="equal">
              <Dropdown
                name="hazardClasses"
                label={config.display.columns[5].title} options={hazardClasses}
                multiple
                selection
              />
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
  getPackagingGroupsDataRequest,
  closeAddPopup,
  //postNewRequest
};

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab];
  return {
    config: cfg,
    currentTab: state.admin.currentTab,
    packagingGroups: state.admin.packagingGroups,
    hazardClasses: state.admin.hazardClasses,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPopupCasProducts)