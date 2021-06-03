import { useEffect, useState } from 'react'
import { Modal, Menu } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form } from 'formik-semantic-ui-fixed-validation'
// Services
import { getSafe } from '../../../../utils/functions'
import confirm from '../../../../components/Confirmable/confirm'
import {
  initValues,
  validationScheme,
  renderTab
} from './AssignLots.services'
// Styles
import { ModalBody, TabMenu, Subtitle } from '../../styles'

const AssignLots = props => {
  const [state, setState] = useState({
    activeTab: 0,
    allocated: [],
    poLots: []
  })

  useEffect(() => {
    const { orderItems } = props

    if (getSafe(() => orderItems.length, 0)) {
      let allocated = state.allocated
      let alreadyLoadedLots = []
      orderItems.forEach(orderItem => {
        const sumAllocated = orderItem.lots.reduce(function (sum, lot) {
          return sum + lot.amount
        }, 0)
        allocated.push(sumAllocated)
        if (!alreadyLoadedLots.includes(orderItem.productOffer)) {
          props.loadLotsToAssign(orderItem.productOffer)
          alreadyLoadedLots.push(orderItem.productOffer)
        }
      })
      setState({ ...state, allocated: allocated })
    }
  }, [])

  useEffect(() => {
    const availability = props.poLots.map(poLot => {
      return {
        id: poLot.id,
        lots: poLot.lots.map(lot => {
          return {
            id: lot.id,
            available: lot.available
          }
        })
      }
    })
    setState({ ...state, poLots: availability })
  }, [getSafe(() => props.poLots.length, 0)])


  const { orderId, orderItems, intl, poLots } = props

  let { formatMessage } = intl

  const tabLots = orderItems.map(orderItem => {
    const productOffer = poLots.find(po => po.id === orderItem.productOffer)
    return {
      orderItemId: orderItem.id,
      productOfferId: orderItem.productOffer,
      lots: getSafe(
        () =>
          productOffer.lots.map(lot => {
            const lotSelected = orderItem.lots.find(orderLot => orderLot.lotNumber === lot.lotNumber)
            return {
              ...lot,
              selected: lotSelected ? true : false,
              allocated: lotSelected ? lotSelected.amount : 0,
              amount: orderItem.amount
            }
          }),
        []
      )
    }
  })

  const lotsList = { tabLots }

  return (
    <>
      <Modal closeIcon onClose={() => props.closeAssignLots()} open={true}>
        <Modal.Header>
          <FormattedMessage id='order.actionRequired' defaultMessage='Action Required' />
          <Subtitle as='h4'>
            <FormattedMessage
              id='order.assignLots.subtitle'
              defaultMessage='Assign lots and upload C of A for Sales Order #'
            />
            {orderId}
          </Subtitle>
        </Modal.Header>
        <ModalBody>
          <Modal.Description>
            <Form
              enableReinitialize
              validateOnChange={false}
              initialValues={{ ...initValues, ...lotsList }}
              validationSchema={validationScheme}
              onSubmit={(values, actions) => {
                const tabLots = values.tabLots

                // check that all tabs have selected at least one lot
                const missingLots = values.tabLots.find(
                  tab => typeof tab.lots.find(lot => lot.selected) === 'undefined'
                )
                if (missingLots) {
                  actions.setSubmitting(false)
                  return false
                }

                // check if any selected and allocated lot is without file
                const missingFile = !!values.tabLots.find(tab =>
                  tab.lots.find(lot => lot.selected && lot.allocated && lot.attachments.length === 0)
                )

                const orderItemId = props.orderItems[state.activeTab].id

                // confirm to assign when missing attachment(s) for assigned lot(s)
                if (missingFile) {
                  confirm(
                    formatMessage({ id: 'confirm.missingCOfA.title', defaultMessage: 'Missing C of A' }),
                    formatMessage({
                      id: 'confirm.missingCOfA.content',
                      defaultMessage:
                        'You have allocated packages on lot without C of A document. Do you really want to proceed and assign lots?'
                    })
                  ).then(
                    async () => {
                      // confirm
                      await props
                        .assignLots(orderId, tabLots)
                        .then(r => {
                          actions.setSubmitting(false)
                          props.closeAssignLots()
                        })
                        .catch(e => {
                          actions.setSubmitting(false)
                        })
                    },
                    () => {
                      // cancel
                      actions.setSubmitting(false)
                    }
                  )
                } else {
                  props
                    .assignLots(orderId, tabLots)
                    .then(r => {
                      actions.setSubmitting(false)
                      props.closeAssignLots()
                    })
                    .catch(e => {
                      actions.setSubmitting(false)
                    })
                }
              }}
              className='flex stretched'
              style={{ padding: '0' }}>
              {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => {
                const panes = orderItems.map((orderItem, index) => {
                  return {
                    menuItem: (
                      <Menu.Item
                        key={`orderItem${index}`}
                        onClick={(e, { index }) => {
                          validateForm()
                            .then(r => {
                              // stop when errors found on current tab
                              if (Object.keys(r).length && getSafe(() => !!r.tabLots[state.activeTab], false)) {
                                submitForm() // show errors
                                return false
                              }

                              // if validation is correct - switch tabs
                              setState({ ...state, activeTab: index })
                            })
                            .catch(e => {
                              console.error('CATCH', e)
                            })
                        }}
                        data-test={`order_assign_lots_tab${index}`}>
                        <FormattedMessage
                          id='order.assignLots.orderItem'
                          defaultMessage='Order Item {num}'
                          values={{ num: index + 1 }}
                        />
                      </Menu.Item>
                    ),
                    pane: () => renderTab(index, orderItem, tabLots[index].lots, setFieldValue, values, props, state, setState)
                  }
                })
                return (
                  <TabMenu
                    menu={{ secondary: true, pointing: true }}
                    panes={panes}
                    renderActiveOnly={false}
                    activeIndex={state.activeTab}
                  />
                )
              }}
            </Form>
          </Modal.Description>
        </ModalBody>
      </Modal>
    </>
  )
}

export default injectIntl(AssignLots)
