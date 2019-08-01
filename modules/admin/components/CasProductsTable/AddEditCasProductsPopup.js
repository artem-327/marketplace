import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup, Header, Dropdown as SDropdown, FormField, Search } from 'semantic-ui-react'

import { closeAddPopup, postNewCasProductRequest, updateCasProductRequest, getUnNumbersByString } from '../../actions'
import { Form, Input, Button, Dropdown, Field } from 'formik-semantic-ui'
import * as Yup from 'yup'
import debounce from 'lodash/debounce'
import escapeRegExp from 'lodash/escapeRegExp'
import filter from 'lodash/filter'

import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup } from '~/utils/functions'
import { FormattedMessage } from 'react-intl'

import { errorMessages } from '~/constants/yupValidation'

const initialFormValues = {
  'casIndexName': '',
  'casNumber': '',
  'chemicalName': '',
  'hazardClassesId': [],
  'packagingGroupId': '',
}

const formValidation = Yup.object().shape({
  casIndexName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
  casNumber: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
  chemicalName: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage)
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
    this.setState({ unNumber: result })
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
      reloadFilter,
      toastManager
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
        <Modal.Header>{<FormattedMessage id={`global.${popupValues ? 'edit' : 'add'}`} />} {config.addEditText}</Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={{ ...initialFormValues, ...popupValues }}
            validationSchema={formValidation}
            validateOnBlur={false}
            validateOnChange={false}
            onReset={closeAddPopup}
            onSubmit={async (values, { setSubmitting }) => {
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
              if (popupValues) await updateCasProductRequest(popupValues.id, data, reloadFilter)
              else await postNewCasProductRequest(data, reloadFilter)

              let status = popupValues ? 'casProductUpdated' : 'casProductCreated'

              toastManager.add(generateToastMarkup(
                <FormattedMessage id={`notifications.${status}.header`} />,
                <FormattedMessage id={`notifications.${status}.content`} values={{ name: values.casIndexName }} />
              ), {
                appearance: 'success'
              })


              setSubmitting(false)

            }}
          >
            {(props) => {
              return (
                <>
                  <FormGroup widths='equal' data-test='admin_popup_cas_casIndexName_inp'>
                    <Input type='text' label={config.display.columns[0].title} name='casIndexName' />
                  </FormGroup>
                  <FormGroup widths='equal' data-test='admin_popup_cas_casNumber_inp'>
                    <Input type='text' label={config.display.columns[1].title} name='casNumber' />
                    <Input type='text' label={config.display.columns[2].title} name='chemicalName' />
                  </FormGroup>
                  <FormGroup widths='equal'>
                    <FormField>
                      <label>{config.display.columns[3].title}</label>
                      <Search
                        loading={isUnLoading}
                        onResultSelect={this.handleUnNumberSelect}
                        onSearchChange={this.handleSearchUnNumber}
                        results={unNumbersFiltered}
                        defaultValue={popupValues && popupValues.unNumberCode ? popupValues.unNumberCode : ''}
                        data-test='admin_popup_cas_unNumber_inp'
                      />
                    </FormField>
                  </FormGroup>
                  <FormGroup widths='equal'>
                    <Dropdown
                      name='packagingGroupId'
                      label={config.display.columns[4].title} options={packagingGroups}
                      inputProps={{
                        selection: true,
                        search: true,
                        placeholder: <FormattedMessage id='global.chooseOption' defaultMessage='Choose an option' />,
                        clearable: true,
                        'data-test': 'admin_popup_cas_package_drpdn',
                      }}
                    />
                  </FormGroup>
                  <FormGroup widths='equal'>
                    <Dropdown
                      name='hazardClassesId'
                      label={config.display.columns[5].title}
                      options={hazardClasses}
                      inputProps={{
                        placeholder: <FormattedMessage id='global.chooseOption' defaultMessage='Choose an option' />,
                        multiple: true,
                        selection: true,
                        search: true,
                        'data-test': 'admin_popup_cas_hazard_drpdn',
                      }}
                    />
                  </FormGroup>
                  <div style={{ textAlign: 'right' }}>
                    <Button.Reset data-test='admin_popup_cas_cancel_btn'><FormattedMessage id='global.cancel' defaultMessage='Cancel' /></Button.Reset>
                    <Button.Submit data-test='admin_popup_cas_save_btn'><FormattedMessage id='global.save' defaultMessage='Save' /></Button.Submit>
                  </div>
                </>
              )
            }}

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
}

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab]
  return {
    config: cfg,
    currentTab: state.admin.currentTab,
    packagingGroups: state.admin.packagingGroups,
    hazardClasses: state.admin.hazardClasses,
    popupValues: state.admin.popupValues,
    // reloadFilter is used to reload CAS Product list after Edit / Add new CAS Product
    reloadFilter: {
      props: {
        currentTab: state.admin.currentTab,
        casListDataRequest: state.admin.casListDataRequest
      },
      value: state.admin.filterValue
    },
    unNumbersFiltered: state.admin.unNumbersFiltered.map(d => {
      return {
        id: d.id,
        title: d.unNumberCode,
        description: d.description
      }
    }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(AddEditCasProductsPopup))