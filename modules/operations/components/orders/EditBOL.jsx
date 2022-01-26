/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'

import { getSafe } from '~/utils/functions'
import {
  Form,
  Accordion,
  Tab,
  Menu,
  Grid,
  GridColumn,
  GridRow,
  Dimmer,
  Loader
} from 'semantic-ui-react'

// Components
import { Formik } from 'formik'
import { FormattedPhone } from '../../../../components/formatted-messages/'
import { Button, Input } from 'formik-semantic-ui-fixed-validation'
import ErrorFocus from '../../../../components/error-focus'
import { PhoneNumber } from '../../../phoneNumber'
import BasicButton from '../../../../components/buttons/BasicButton'
import BOLContent from './BOLContent'

// Actions
import * as Actions from '../../actions'

// Styles
import {
  TabDetailRow,
  TabPane,
  DivButtonsSection
} from './EditBOL.styles'
import {
  OrderSegment,
  OrderList,
  OrderAccordion,
  AccordionTitle,
  Chevron,
  GridData,
  GridDataColumn,
  StyledTable,
  TableRowData,
  GridDataColumnTrackingID,
  StyledModal,
  TopRow,
  StyledHeader,
  ButtonCancel
} from '../../styles'

// Services
import { getInitialValues, SubmitHandler } from './EditBOL.services'

const EditBOL = props => {
  const {
    intl: { formatMessage },
    orderBolUpdating,
    order
  } = props

  const [isBolEditing, setIsBolEditing] = useState(true) // ! ! false
  const [tabs, setTabs] = useState([])
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {

    console.log('!!!!!!!!!! EditBOL componentDidMount props', props)
  }, [])

  useEffect(() => {
    const { order } = props
    setIsBolEditing(true) // ! ! false
    let newTabs = []
    !!order.buyBillOfLading && newTabs.push('buyBillOfLading')
    !!order.sellBillOfLading && newTabs.push('sellBillOfLading')
    !!order.carrierBillOfLading && newTabs.push('carrierBillOfLading')
    setActiveTab(0)
    setTabs(newTabs)

    console.log('!!!!!!!!!! EditBOL didupdate props.order', props.order)
    console.log('!!!!!!!!!! EditBOL didupdate newTabs', newTabs)

  }, [props.order.id])

  const activeBol = tabs[activeTab] ? order[tabs[activeTab]] : null
  console.log('!!!!!!!!!! aaaaa activeBol', activeBol)

  return (
    <Formik
      initialValues={getInitialValues(activeBol)}
      enableReinitialize
      validationSchema={{}}
      onSubmit={(values, actions) => {}}
    >
      {formikProps => {
        const {
          values,
          setFieldValue,
          setFieldTouched,
          validateForm,
          submitForm,
          touched,
          isSubmitting,
          handleSubmit,
          errors
        } = formikProps

        const panes = tabs.map((tabName, index) => ({
          menuItem: (
            <Menu.Item
              key={tabName}
              onClick={e => {
                validateForm().then(err => {
                  const errors = Object.keys(err)
                  if (errors.length && errors[0] !== 'isCanceled') {
                    // Edited, Errors found
                    submitForm() // to show errors
                  } else {
                    // Edited, Errors not found, try to save

                    // ! ! test jestli data touched -> ulozit nebo discard?
                    setActiveTab(index)
                  }
                })
              }}
            >
              <FormattedMessage id={`operations.editBol.${tabName}`} defaultMessage={tabName} />
            </Menu.Item>
          )
          , render: () => (
            <TabPane key={tabName} attached={false}>
              <BOLContent
                bolName={tabName}
                bol={order[tabName]}
                formikProps={formikProps}
              />
              <DivButtonsSection>
                <div></div>
                <div>
                  <BasicButton onClick={() => setIsBolEditing(false)}>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
                  </BasicButton>
                  <BasicButton
                    disabled={isSubmitting}
                    data-test='settings_product_popup_submit_btn'
                    onClick={() => {
                      formikProps.validateForm().then(err => {
                        const errors = Object.keys(err)
                        if (errors.length && errors[0] !== 'isCanceled') {
                          // Errors found
                          formikProps.submitForm() // to show errors
                        } else {
                          // No errors found
                          console.log('!!!!!!!!!! aaaaa Save', values)
                          //setLoadSidebar(true)
                          SubmitHandler(formikProps.values, formikProps, props, tabs[activeTab])
                        }
                      })
                    }}>
                    <FormattedMessage id='global.save' defaultMessage='Save' />
                  </BasicButton>
                </div>
              </DivButtonsSection>
            </TabPane>
          )
        }))

        if (!isBolEditing) {
          return (
            <BasicButton
              disabled={false}
              onClick={() => setIsBolEditing(true)}
            >
              <FormattedMessage id='operations.orders.detail.editBol' defaultMessage='Edit BOL' />
            </BasicButton>
          )
        } else {
        return (
          <>
            <Dimmer inverted active={orderBolUpdating}>
              <Loader />
            </Dimmer>
            <AccordionTitle
              active={true}
              index={0}
              onClick={() => setIsBolEditing(false)}
              data-test='orders_detail_edit_bol'>
              <Chevron />
              <FormattedMessage id='operations.orders.detail.editBol' defaultMessage='Edit BOL' />
            </AccordionTitle>
            <Accordion.Content active={true}>
              <Form>
                <TabDetailRow
                  menu={{ secondary: true, pointing: true }}
                  activeIndex={activeTab}
                  panes={panes}
                />
              </Form>
            </Accordion.Content>
          </>
        )}
      }}
    </Formik>
  )
}

function mapStateToProps(store, props) {
  return {
    orderBolUpdating: store.operations.orderBolUpdating,

  }
}

export default injectIntl(connect(mapStateToProps, Actions)(EditBOL))