import { Component } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { Dimmer, Loader, Menu } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { X as XIcon, ChevronDown } from 'react-feather'
import { Store } from '@material-ui/icons'

//Actions
import {
  closeSidebar,
  putEditWarehouse,
  postNewWarehouseRequest,
  getProvinces,
  getAddressSearch,
  removeAttachmentLinkToBranch,
  removeAttachment,
  addAttachment,
  loadFile,
  setAttachmentFiles
} from '../../../../actions'
//Services
import { formValidation, getInitialFormValues, submitHandler } from './Warehouses.services'
import { getSafe, removeEmpty } from '../../../../../../utils/functions'
//Components
import WarehousesFormEdit from './WarehousesFormEdit'
import WarehousesFormCertificates from './WarehousesFormCertificates'
import { withDatagrid } from '../../../../../datagrid'
import ErrorFocus from '../../../../../../components/error-focus'
//Actions
import { chatWidgetVerticalMoved } from '../../../../../chatWidget/actions'
//Components
import BasicButton from '../../../../../../components/buttons/BasicButton'
//Styles
import { MenuCustom, HighSegmentCustom } from './Warehouses.style'
import {
  SidebarFlex,
  DivFlexContent,
  SegmentCustomContent,
  DivBottomSidebar,
  DimmerSidebarOpend,
  DivIconChevronDown,
  DivHeader,
  FormCustom
} from '../../Locations.styles'

class WarehousesSidebar extends Component {
  state = {
    editTab: 0,
    loadSidebar: false
  }
  componentDidMount() {
    const { sidebarValues, getProvinces, openTab } = this.props
    sidebarValues && sidebarValues.hasProvinces && getProvinces(sidebarValues.countryId)
    openTab && this.setState({ editTab: this.props.openTab })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.openTab !== this.props.openTab) {
      this.setState({ editTab: this.props.openTab })
    }
  }

  tabChanged = index => {
    this.setState({ editTab: index })
  }

  getContent = formikProps => {
    let { editTab } = this.state
    const {
      intl,
      removeAttachmentLinkToBranch,
      removeAttachment,
      addAttachment,
      loadFile,
      sidebarValues,
      attachmentFiles,
      setAttachmentFiles
    } = this.props
    switch (editTab) {
      case 0: {
        // Edit
        return <WarehousesFormEdit intl={intl} sidebarValues={sidebarValues} formikProps={formikProps} />
      }

      case 1: {
        // Certificates
        return (
          <WarehousesFormCertificates
            formikProps={formikProps}
            helperProps={{
              removeAttachmentLinkToBranch,
              removeAttachment,
              addAttachment,
              loadFile,
              sidebarValues,
              attachmentFiles,
              setAttachmentFiles
            }}
          />
        )
      }

      default:
        return null
    }
  }

  render() {
    const {
      closeSidebar,
      sidebarValues,
      isOpenSidebar,
      openGlobalAddForm,
      loading,
      intl: { formatMessage },
      chatWidgetVerticalMoved,
      attachmentFiles,
      setAttachmentFiles,
      postNewWarehouseRequest,
      putEditWarehouse,
      datagrid
    } = this.props

    const { editTab } = this.state

    let initialValues = getInitialFormValues(sidebarValues)

    const tabs = [
      sidebarValues
        ? { text: { id: 'sidebar.edit', defaultMessage: 'EDIT' }, key: 'edit' }
        : { text: { id: 'sidebar.addNew', defaultMessage: 'ADD NEW' }, key: 'addNew' },
      { text: { id: 'sidebar.certificates', defaultMessage: 'CERTIFICATES' }, key: 'certificates' }
    ]

    return (
      <Formik
        initialValues={initialValues}
        validationSchema={formValidation()}
        enableReinitialize
        onReset={() => {
          if (openGlobalAddForm) {
            openGlobalAddForm('')
          } else {
            closeSidebar()
            chatWidgetVerticalMoved(false)
          }
        }}
        onSubmit={this.submitHandler}
        loading={loading}>
        {formikProps => (
          <>
            <FormCustom autoComplete='off'>
              <DimmerSidebarOpend
                active={isOpenSidebar}
                onClickOutside={() => {
                  closeSidebar()
                  chatWidgetVerticalMoved(false)
                }}
                page></DimmerSidebarOpend>
              <SidebarFlex visible={true} width='very wide' inverted direction='bottom' animation='overlay'>
                <div>
                  <Dimmer inverted active={loading}>
                    <Loader />
                  </Dimmer>
                  <HighSegmentCustom basic className={openGlobalAddForm ? 'add-form' : ''}>
                    {openGlobalAddForm ? (
                      <>
                        <div>
                          <span>
                            <FormattedMessage id='createMenu.addWarehouse' defaultMessage='Add Warehouse' />
                          </span>
                          <Store className='title-icon' />
                        </div>
                        <div style={{ position: 'absolute', right: '20px' }}>
                          <XIcon onClick={() => openGlobalAddForm('')} className='close-icon' />
                        </div>
                      </>
                    ) : (
                      <MenuCustom pointing secondary>
                        {tabs.map((tab, i) => (
                          <Menu.Item
                            key={tab.key}
                            onClick={() => this.tabChanged(i)}
                            active={editTab === i}
                            disabled={tab.key === 'certificates' && !formikProps.values.branchId}>
                            {formatMessage(tab.text)}
                          </Menu.Item>
                        ))}
                        <DivIconChevronDown
                          onClick={() => {
                            closeSidebar()
                            chatWidgetVerticalMoved(false)
                          }}>
                          <ChevronDown />
                        </DivIconChevronDown>
                      </MenuCustom>
                    )}
                  </HighSegmentCustom>
                </div>
                <DivFlexContent style={{ padding: '16px' }}>
                  <SegmentCustomContent basic>{this.getContent(formikProps)}</SegmentCustomContent>
                </DivFlexContent>
                <DivBottomSidebar>
                  {!openGlobalAddForm && (
                    <BasicButton
                      noborder
                      onClick={() => {
                        closeSidebar()
                        chatWidgetVerticalMoved(false)
                      }}
                      data-test='settings_warehouse_popup_reset_btn'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                        {text => text}
                      </FormattedMessage>
                    </BasicButton>
                  )}
                  <BasicButton
                    onClick={() => {
                      formikProps.validateForm().then(async err => {
                        const errors = Object.keys(err)
                        if (errors.length && errors[0] !== 'isCanceled') {
                          // Errors found
                          formikProps.submitForm() // to show errors
                        } else {
                          // No errors found
                          await submitHandler(formikProps.values, {
                            setSubmitting: formikProps.setSubmitting,
                            sidebarValues,
                            putEditWarehouse,
                            postNewWarehouseRequest,
                            openGlobalAddForm,
                            attachmentFiles,
                            setAttachmentFiles,
                            datagrid
                          })
                          await chatWidgetVerticalMoved(false)
                        }
                      })
                    }}
                    data-test='settings_warehouse_popup_submit_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save'>
                      {text => text}
                    </FormattedMessage>
                  </BasicButton>
                </DivBottomSidebar>
              </SidebarFlex>
              <ErrorFocus />
            </FormCustom>
          </>
        )}
      </Formik>
    )
  }
}

const mapDispatchToProps = {
  postNewWarehouseRequest,
  putEditWarehouse,
  closeSidebar,
  getProvinces,
  getAddressSearch,
  removeAttachmentLinkToBranch,
  removeAttachment,
  addAttachment,
  loadFile,
  chatWidgetVerticalMoved,
  setAttachmentFiles
}

const mapStateToProps = state => {
  return {
    hasProvinces: state.settings.sidebarValues ? state.settings.sidebarValues.hasProvinces : false,
    sidebarValues: state.settings.sidebarValues,
    country: state.settings.country,
    countries: state.settings.countries,
    provincesDropDown: state.settings.provincesDropDown,
    company: getSafe(() => state.auth.identity.company.id, null),
    isOpenSidebar: state.settings.isOpenSidebar,
    loading: state.settings.loading,
    openTab: state.settings.openTab,
    attachmentFiles: state.settings.attachmentFiles
  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, mapDispatchToProps)(WarehousesSidebar)))
