import React from 'react'
import { connect } from 'react-redux'

import {Modal, FormGroup, Header, Dropdown as SDropdown, FormField, Search} from 'semantic-ui-react'

import { closeAddPopup, postNewCasProductRequest, updateCasProductRequest, getUnNumbersByString } from '../../actions'
import { Form, Input, Button, Dropdown, Field  } from 'formik-semantic-ui'
import * as Yup from 'yup'
import debounce from "lodash/debounce";
import escapeRegExp from "lodash/escapeRegExp";
import filter from "lodash/filter";

const initialFormValues = {
  'casIndexName':   '',
  'casNumber':      '',
  'chemicalName':   '',
  'hazardClassesId':  [],
  'packagingGroupId': '',
}

const formValidation = Yup.object().shape({
  casIndexName: Yup.string().trim().min(3, "Too short").required("Required"),
  casNumber: Yup.string().trim().min(3, "Too short").required("Required"),
  chemicalName: Yup.string().trim().min(3, "Too short").required("Required"),
})

class AddEditCasProductsPopup extends React.Component {
  state = {
    packagingGroups: [],
    hazardClasses: [],
    isUnLoading: false,
    unNumber: null,
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
      ...this.state,
      packagingGroups,
      hazardClasses
    })
  }

  componentWillMount() {
    this.initCollections()
  }

  handleSearchUnNumber = debounce((e, { value }) => {
    this.setState({ isUnLoading: true, unNumber: value })

    this.props.getUnNumbersByString(value)

    setTimeout(() => {
      const re = new RegExp(escapeRegExp(this.state.unNumber), 'i')
      const isMatch = result => re.test(result.unNumberCode)

      this.setState({
        isUnLoading: false,
        unNumbers: filter(this.handleUnNumber(), isMatch) // ! ! ???
      })
    }, 300)
  }, 500)

  handleUnNumber = () => {
    return this.props.unNumbersFiltered.map(unNumber => ({
      unNumberCode: unNumber.unNumberCode
    }))
  }

  handleUnNumberSelect = (e, { result }) => {
    this.setState({unNumber: result})
  }

  render() {
    const {
      closeAddPopup,
      currentTab,
      popupValues,
      config,
      postNewCasProductRequest,
      updateCasProductRequest,
      //unNumbersFiltered,
      reloadFilter
    } = this.props

    const {
      hazardClasses,
      packagingGroups,
      isUnLoading,
    } = this.state


    const unNumber = popupValues ? popupValues.unNumber : null
    const unNumbersFiltered = this.props.unNumbersFiltered && this.props.unNumbersFiltered.length ? this.props.unNumbersFiltered : (unNumber ? [unNumber] : [])

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
              const unNumberId = this.state.unNumber ? this.state.unNumber.id :
                  (popupValues && popupValues.unNumber) ? popupValues.unNumber.id : null
              const data = {
                casIndexName: values.casIndexName.trim(),
                casNumber: values.casNumber.trim(),
                chemicalName: values.chemicalName.trim(),
                ...(unNumberId !== null && { unNumber: unNumberId }),
                ...(values.packagingGroupId !== '' && { packagingGroup: values.packagingGroupId }),
                ...(values.hazardClassesId.length && { hazardClasses: values.hazardClassesId }),
              }
              if (popupValues) updateCasProductRequest(popupValues.id, data, reloadFilter)
              else postNewCasProductRequest(data, reloadFilter)
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
                  <FormField>
                    <label>{config.display.columns[3].title}</label>
                    <Search
                        loading={isUnLoading}
                        onResultSelect={this.handleUnNumberSelect}
                        onSearchChange={this.handleSearchUnNumber}
                        results={unNumbersFiltered}
                        defaultValue={popupValues && popupValues.unNumberCode ? popupValues.unNumberCode : ''}
                    />
                  </FormField>
                </FormGroup>
                <FormGroup widths="equal">
                  <Dropdown
                    name="packagingGroupId"
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
                    name="hazardClassesId"
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

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab]
  return {
    config: cfg,
    currentTab: state.admin.currentTab,
    packagingGroups: state.admin.packagingGroups,
    hazardClasses: state.admin.hazardClasses,
    popupValues: state.admin.popupValues,
    // reloadFilter is used to reload CAS Product list after Edit / Add new CAS Product
    reloadFilter: {props: {
        currentTab: state.admin.currentTab,
        casListDataRequest: state.admin.casListDataRequest},
      value: state.admin.filterValue},
    unNumbersFiltered: state.admin.unNumbersFiltered.map(d => {
        return {
          id: d.id,
          title: d.unNumberCode,
          description: d.description
        }}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditCasProductsPopup)