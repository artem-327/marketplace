import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup, Header, Dropdown as SDropdown, FormField } from 'semantic-ui-react'

import { closeAddPopup, postNewCasProductRequest, updateCasProductRequest, getUnNumbersByString } from '../../actions'
import { Form, Input, Button, Dropdown, Field  } from 'formik-semantic-ui'
import * as Yup from 'yup'

const initialFormValues = {
  'casIndexName':   '',
  'casNumber':      '',
  'chemicalName':   '',
  'unNumberId':     '',
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
    packagingGroups: [],
    hazardClasses: []
  }

  initCollections = () => {
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
      packagingGroups,
      hazardClasses
    })
  }

  componentWillMount() {
    this.initCollections()
  }

  handleUnNumbers = (e, d) => {
    this.props.getUnNumbersByString(d.searchQuery)
  }

  render() {
    const {
      closeAddPopup,
      currentTab,
      popupValues,
      config,
      postNewCasProductRequest,
      updateCasProductRequest,
      unNumbersFiltered
    } = this.props

    const {
      hazardClasses,
      packagingGroups
    } = this.state

    return (
      <Modal open centered={false}>
        <Modal.Header>{popupValues ? ('Edit') : ('Add')} {config.addEditText}</Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={{...initialFormValues, ...popupValues}}
            validationSchema={formValidation}
            validateOnBlur={false}
            validateOnChange={false}
            onReset={closeAddPopup}
            onSubmit={(values, actions) => {
              const data = {
                casIndexName: values.casIndexName,
                casNumber: values.casNumber,
                chemicalName: values.chemicalName,
                ...(values.unNumberId !== '' && { unNumber: values.unNumberId }),
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
                    name="unNumberId"
                    //fast
                    label={config.display.columns[3].title}
                    options={unNumbersFiltered}
                    inputProps={{
                      selection: true,
                      //search: this.handleUnNumbers,
                      search: true,
                      placeholder: 'Search for UN Number...',
                      clearable: true,
                      onSearchChange: (e, d) => this.handleUnNumbers(e, d)
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
                      clearable: true
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
  getUnNumbersByString,
};

const transformUnNumbers = (unNumbersFiltered) => {
  const unNumbers = unNumbersFiltered.map(d => {
    return {
      key: d.id,
      text: d.unNumberCode,
      value: d.id,
      dataSearch: d.unNumberCode + ' ' + d.description,
      content: <Header content={d.unNumberCode} subheader={d.description} />,
    }
  })
  return unNumbers;
}

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab]
  return {
    config: cfg,
    currentTab: state.admin.currentTab,
    packagingGroups: state.admin.packagingGroups,
    hazardClasses: state.admin.hazardClasses,
    popupValues: state.admin.popupValues,
    unNumbersFiltered: transformUnNumbers(state.admin.unNumbersFiltered),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditCasProductsPopup)