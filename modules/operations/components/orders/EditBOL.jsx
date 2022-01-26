/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import moment from 'moment/moment'
import { Form, Accordion, Menu, Dimmer, Loader } from 'semantic-ui-react'

// Components
import { Formik } from 'formik'
import ErrorFocus from '../../../../components/error-focus'
import BasicButton from '../../../../components/buttons/BasicButton'
import BOLContent from './BOLContent'
import { getSafe } from '../../../../utils/functions'

// Actions
import * as Actions from '../../actions'

// Styles
import { TabDetailRow, TabPane, DivButtonsSection, BolButtonWrapper } from './EditBOL.styles'
import { AccordionTitle, Chevron } from '../../styles'

// Services
import { validationSchema, getInitialValues, SubmitHandler, SubmitCarrierHandler } from './EditBOL.services'

const EditBOL = props => {
  const {
    intl: { formatMessage },
    orderBolUpdating,
    order
  } = props

  const [isBolEditing, setIsBolEditing] = useState(false)
  const [tabs, setTabs] = useState([])
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const { order } = props
    setIsBolEditing(false)
    let newTabs = []
    !!order.buyBillOfLading && newTabs.push('buyBillOfLading')
    !!order.sellBillOfLading && newTabs.push('sellBillOfLading')
    !!order.carrierBillOfLading && newTabs.push('carrierBillOfLading')
    setActiveTab(0)
    setTabs(newTabs)
  }, [props.order.id])

  const activeBol = tabs[activeTab] ? order[tabs[activeTab]] : null

  const canBeEditedBol =
    order && (
      (
        !order.buySellBillOfLadingProcessed &&
        order.buySellBillOfLadingEditableUntil && moment(order.buySellBillOfLadingEditableUntil).isAfter(moment())
      ) ||
      (
        !order.carrierBillOfLadingProcessed &&
        order.carrierBillOfLadingEditableUntil && moment(order.carrierBillOfLadingEditableUntil).isAfter(moment())
      )
    )

  return (
    <Formik
      initialValues={getInitialValues(activeBol)}
      enableReinitialize
      validationSchema={validationSchema()}
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

                    // test jestli data touched -> ulozit nebo discard?
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
                <div>{/* Download button https://xd.adobe.com/view/105dd0f5-3669-4d7f-b00f-cf61ef5c2d68-450e/ */}</div>
                <div>
                  <BasicButton onClick={() => setIsBolEditing(false)}>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
                  </BasicButton>
                  <BasicButton
                    background='#069efc !important'
                    textcolor='#ffffff !important'
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
                          SubmitHandler(formikProps.values, formikProps, props, tabs[activeTab])
                        }
                      })
                    }}>
                    <FormattedMessage id='global.save' defaultMessage='Save' />
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
                          const valuesToSubmit = tabs[activeTab] === 'carrierBillOfLading'
                            ? formikProps.values
                            : getInitialValues(order.carrierBillOfLading)

                          SubmitCarrierHandler(valuesToSubmit, formikProps, props)
                        }
                      })
                    }}>
                    <FormattedMessage id='global.submit' defaultMessage='Submit' />
                  </BasicButton>
                </div>
              </DivButtonsSection>
            </TabPane>
          )
        }))

        if (!isBolEditing) {
          return (
            <BolButtonWrapper>
              <BasicButton
                background={canBeEditedBol ? '#069efc !important' : '#d2d2d2 !important'}
                textcolor={'#ffffff !important'}
                disabled={!canBeEditedBol}
                onClick={() => setIsBolEditing(true)}>
                <FormattedMessage id='operations.orders.detail.editBol' defaultMessage='Edit BOL' />
              </BasicButton>
            </BolButtonWrapper>
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