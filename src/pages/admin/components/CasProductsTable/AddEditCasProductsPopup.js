import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup, Header, Dropdown as SDropdown, FormField } from 'semantic-ui-react'

import { closeAddPopup, postNewCasProductRequest, updateCasProductRequest } from '../../actions'
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
  casIndexName: Yup.string().min(3, "Too short").required("Required"),
  casNumber: Yup.string().min(3, "Too short").required("Required"),
  chemicalName: Yup.string().min(3, "Too short").required("Required"),
})

class AddEditCasProductsPopup extends React.Component {

  state = {
    unNumbers: [],
    unNumbersReduced: [],
    packagingGroups: [],
    hazardClasses: []
  }

  initCollections = () => {
    const unNumbers = this.props.unNumbers.map(d => {
      return {
        key: d.id,
        text: d.unNumberCode,
        value: d.id,
        dataSearch: d.unNumberCode + ' ' + d.description,
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


    this.setState({
      unNumbers,
      packagingGroups,
      hazardClasses
    })
  }

  filterUnNumbers = (list, query) => {
    const unNumbersReduced = this.state.unNumbers.filter(({dataSearch}) => dataSearch.indexOf(query) > 1).map(({dataSearch, ...item}) => item)
    setTimeout(() => this.setState({unNumbersReduced}), 1)
    return unNumbersReduced
  }

  componentWillMount() {
    this.initCollections()
  }

  render() {
    const {
      closeAddPopup,
      currentTab,
      popupValues,
      config,
      postNewCasProductRequest,
      updateCasProductRequest
    } = this.props

    const {
      unNumbers,
      hazardClasses,
      packagingGroups
    } = this.state

    return (
      <Modal open centered={false}>
        <Modal.Header>Add {config.addEditText}</Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={{...initialFormValues, ...popupValues}}
            // validationSchema={formValidation}
            validateOnBlur={false}
            validateOnChange={false}
            onReset={closeAddPopup}
            onSubmit={(values, actions) => {
              const data = {
                casIndexName: values.casIndexName,
                casNumber: values.casNumber,
                chemicalName: values.chemicalName,
                ...(values.unNumber !== '' && { unNumber: values.unNumber }),
                ...(values.packagingGroup !== '' && { packagingGroup: values.packagingGroup }),
                ...(values.hazardClasses.length && { hazardClasses: values.hazardClasses }),
              }
              console.log('xxxxxxxxxxx AddEditCasProductsPopup - submit data - ', data);
              if (popupValues) updateCasProductRequest(popupValues.id, data)
              else postNewCasProductRequest(data)
            }}
          >
            {(props) => { return (
              <>
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
                    fast
                    label={config.display.columns[3].title}
                    options={this.state.unNumbersReduced}
                    inputProps={{
                      selection: true,
                      search: this.filterUnNumbers,
                      placeholder: 'Search for UN Number (type at least 3 characters)',
                      minCharacters: 3,
                      clearable: true
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
              </>
            )}}

          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closeAddPopup,
  postNewCasProductRequest,
  updateCasProductRequest,
};

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab]
  return {
    config: cfg,
    currentTab: state.admin.currentTab,
    packagingGroups: state.admin.packagingGroups,
    unNumbers: state.admin.unNumbers,
    hazardClasses: state.admin.hazardClasses,
    popupValues: state.admin.popupValues,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditCasProductsPopup)