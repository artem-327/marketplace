import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup, Header } from 'semantic-ui-react'

import { closeAddPopup, postNewRequest } from '../../actions'
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
  render() {
    const {
      closeAddPopup,
      currentTab,
      config,
      //postNewRequest
    } = this.props

    const unNumbers = this.props.unNumbers.map(d => {
      return {
        key: d.id,
        text: d.unNumberCode,
        value: d.id,
        content: <Header content={d.unNumberCode} subheader={d.description} />,
      }
    })

    const packagingGroups = this.props.packagingGroups.map(d => {
      return {
        key: d.id,
        text: d.groupCode,
        value: d.id,
        content: <Header content={d.groupCode} subheader={d.description} />,
      }
    })

    const hazardClasses = this.props.hazardClasses.map(d => {
      return {
        key: d.id,
        text: d.classCode,
        value: d.id,
        content: <Header content={d.classCode} subheader={d.description} />,
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
              //<Input type='text' label={config.display.columns[3].title} name="unNumber" />

            }}
          >
            <FormGroup widths="equal">
              <Input type='text' label={config.display.columns[0].title} name="casIndexName" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type='text' label={config.display.columns[1].title} name="casNumber" />
              <Input type='text' label={config.display.columns[2].title} name="chemicalName" />
            </FormGroup>
            <FormGroup widths="equal">
              <Dropdown
                name="unNumber"
                label={config.display.columns[3].title} options={unNumbers}
                inputProps={{
                  selection: true,
                  search: true,
                  placeholder: 'Choose an option',
                }}
              />
            </FormGroup>
            <FormGroup widths="equal">
              <Dropdown
                name="packagingGroup"
                label={config.display.columns[4].title} options={packagingGroups}
                inputProps={{
                  selection: true,
                  search: true,
                  placeholder: 'Choose an option',
                }}
              />
            </FormGroup>
            <FormGroup widths="equal">
              <Dropdown
                name="hazardClasses"
                label={config.display.columns[5].title}
                options={hazardClasses}
                inputProps={{
                  placeholder: 'Choose an option',
                  multiple: true,
                  selection: true,
                  search: true,
                }}
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
  closeAddPopup,
  //postNewRequest
};

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab];
  return {
    config: cfg,
    currentTab: state.admin.currentTab,
    packagingGroups: state.admin.packagingGroups,
    unNumbers: state.admin.unNumbers,
    hazardClasses: state.admin.hazardClasses,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPopupCasProducts)