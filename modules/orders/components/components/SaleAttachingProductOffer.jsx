import { useEffect, useState } from 'react'
import {
  Modal,
  Dimmer,
  Loader,
  Menu
} from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Form } from 'formik-semantic-ui-fixed-validation'
import { withToastManager } from 'react-toast-notifications'
// Services
import { getSafe, generateToastMarkup } from '../../../../utils/functions'
import confirm from '../../../../components/Confirmable/confirm'
import { initValues, renderTab } from './SaleAttachingProductOffer.services'
// Styles
import { ModalBody, TabMenu } from '../../styles'

//TODO
const SaleAttachingProductOffer = props => {
  const [state, setState] = useState({
    activeTab: 0,
    allocated: [],
    sumAllocated: [],
    sumAvailable: [],
    available: [],
    poLots: [],
    sumPkgTotal: [],
    totalPkgAmount: 0,
    loadingGroupedProductOffer: false
  })

  let setFieldValue

  useEffect(() => {
    const init = async () => {
      setState({ ...state, loadingGroupedProductOffer: true })
      const { getGroupedProductOffers, orderId, orderItemsId, orderItems } = props
      try {
        if (orderItemsId.length) await getGroupedProductOffers(orderId, orderItemsId)
        getSafe(() => orderItems, []).forEach((item, tabIndex) => {
          if (!item.attachments.length) return
          else
            item.attachments.forEach((attachment, index) =>
              setFieldValue(`tab[${tabIndex}].groupedOffer[${index}].attachments[0]`, {
                id: attachment.id,
                name: attachment.name,
                linked: true,
                isToOrderItem: true
              })
            )
        })
      } catch (error) {
        console.error(error)
      } finally {
        setState({ ...state, loadingGroupedProductOffer: false })
      }
    }

    init()

    const unmount = () => {
      try {
        props.getSaleOrder(props.orderId)
        props.clearGroupedProductOffer()
      } catch (error) {
        console.error(error)
      }
    }

    return unmount
  }, [])

  useEffect(() => {
    if(getSafe(() => props.groupedProductOffers.length, 0) > 0) {
      let sumAvailable = []
      let sumPkgTotal = []
      let available = []
      let sumAllocated = []
      let allocated = []
      let totalPkgAmount = 0
      props.groupedProductOffers.forEach((offers, index) => {
        if (offers && !offers.length) return
        const pkgAmount = props.productOffersPkgAmount.get(offers[0] && offers[0].parentOffer)

        if (pkgAmount) {
          sumAvailable.push(pkgAmount)
          totalPkgAmount += pkgAmount
        }

        const sumPkgAllocated = offers.reduce(function (sum, offer) {
          return sum + offer.pkgAllocated
        }, 0)
        sumAllocated.push(0)
        const pkgAvailable = offers.map(offer => offer.pkgAvailable)
        available.push(pkgAvailable)

        const cfPkgTotal = offers.reduce(function (sum, offer) {
          return sum + offer.cfPkgTotal
        }, 0)
        sumPkgTotal.push(cfPkgTotal)

        offers.forEach((offer, i) => {
          if (offer && offer.attachments && offer.attachments.length) {
            setFieldValue(`tab[${index}].groupedOffer[${i}].attachments[0]`, {
              id: offer.attachments[0].id,
              name: offer.attachments[0].name,
              linked: true,
              isToOrderItem: true
            })
          }
        })

        const pkgAllocated = offers.map(offer => offer.pkgAllocated)
        allocated.push(pkgAllocated)
        setState({
          ...state,
          sumAvailable,
          sumAllocated,
          available,
          sumPkgTotal,
          allocated,
          totalPkgAmount
        })
      })
    }
  }, [getSafe(() => props.groupedProductOffers.length, 0)])

  
  const {
    intl: { formatMessage },
    closePopup,
    groupedProductOffers,
    toastManager,
    orderId,
    orderItemsId
  } = props

  return (
    <Modal closeIcon onClose={() => closePopup()} open={true}>
      <Dimmer active={state.loadingGroupedProductOffer} inverted>
        <Loader />
      </Dimmer>
      <Modal.Header>
        <FormattedMessage id='order.saleAttachingProductOffer' defaultMessage='ATTACHING PRODUCT OFFER' />
      </Modal.Header>
      <ModalBody>
        <Modal.Description>
          <Form
            enableReinitialize
            validateOnChange={false}
            initialValues={{ ...initValues }}
            onSubmit={(values, actions) => {
              // check that all tabs have selected at least one item
              let missingSelected = true
              if (values && values.tab && values.tab.length) {
                values.tab.forEach(tab => {
                  if (tab && tab.groupedOffer && tab.groupedOffer.length) {
                    tab.groupedOffer.forEach(offer => {
                      if (offer && offer.selected) {
                        missingSelected = false
                        return
                      }
                    })
                  } else {
                    return
                  }
                })
              }

              if (missingSelected) {
                toastManager.add(
                  generateToastMarkup(
                    <FormattedMessage id='errors.noSelected.header' defaultMessage='No Selected' />,
                    <FormattedMessage
                      id='errors.noSelected.content'
                      defaultMessage='Please check that all order items have selected at least one.'
                    />
                  ),
                  {
                    appearance: 'error'
                  }
                )
                actions.setSubmitting(false)
                return false
              }
              // check if any selected and allocated lot is without file
              let missingFile = false
              if (values && values.tab && values.tab.length) {
                values.tab.forEach(tab => {
                  if (tab && tab.groupedOffer && tab.groupedOffer.length) {
                    tab.groupedOffer.forEach(offer => {
                      if (offer && offer.selected && (!offer.attachments || !offer.attachments.length)) {
                        missingFile = true
                      }
                    })
                  }
                })
              }

              let isSumInTabsCorrect = true
              if (values && values.tab && values.tab.length) {
                values.tab.forEach((tab, index) => {
                  if (state.sumAllocated[index] !== state.sumAvailable[index]) {
                    isSumInTabsCorrect = false
                    return
                  }
                })
              }

              if (!isSumInTabsCorrect) {
                toastManager.add(
                  generateToastMarkup(
                    <FormattedMessage
                      id='order.detail.error.incorect.packages.header'
                      defaultMessage='Incorrect allocated packages'
                    />,
                    <FormattedMessage
                      id='order.detail.error.incorect.packages.content'
                      defaultMessage='Please, check all Order Item tabs and allocate correctly amount packages.'
                      values={{ id: orderId }}
                    />
                  ),
                  {
                    appearance: 'error'
                  }
                )
                actions.setSubmitting(false)
                return
              }

              const request = []
              if (values && values.tab && values.tab.length) {
                values.tab.forEach(tab => {
                  const tabRequest = []
                  if (tab && tab.groupedOffer && tab.groupedOffer.length) {
                    tab.groupedOffer.forEach(offer => {
                      if (offer && offer.selected && offer.allocated) {
                        tabRequest.push({
                          pkgAmount: parseInt(offer.allocated),
                          productOffer: parseInt(offer.id)
                        })
                      }
                    })
                  }
                  if (tabRequest.length) {
                    request.push(tabRequest)
                  }
                })
              }
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
                    if (orderItemsId.length > 1) {
                      orderItemsId.forEach(async (item, index) => {
                        await props
                          .patchAssignProductOffers(orderId, item, request[index])
                          .then(r => {
                            actions.setSubmitting(false)
                            props.closePopup()
                          })
                          .catch(e => {
                            actions.setSubmitting(false)
                          })
                      })
                    } else {
                      await props
                        .patchAssignProductOffers(orderId, orderItemsId[0], request[0])
                        .then(r => {
                          actions.setSubmitting(false)
                          props.closePopup()
                        })
                        .catch(e => {
                          actions.setSubmitting(false)
                        })
                    }
                  },
                  () => {
                    // cancel
                    actions.setSubmitting(false)
                  }
                )
              } else {
                if (orderItemsId.length > 1) {
                  orderItemsId.forEach(async (item, index) => {
                    await props
                      .patchAssignProductOffers(orderId, item, request[index])
                      .then(r => {
                        actions.setSubmitting(false)
                        props.closePopup()
                      })
                      .catch(e => {
                        actions.setSubmitting(false)
                      })
                  })
                } else {
                  props
                    .patchAssignProductOffers(orderId, orderItemsId[0], request[0])
                    .then(r => {
                      actions.setSubmitting(false)
                      props.closePopup()
                    })
                    .catch(e => {
                      actions.setSubmitting(false)
                    })
                }
              }
            }}
            className='flex stretched'
            style={{ padding: '0' }}>
            {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => {
              setFieldValue = setFieldValue
              const panes = groupedProductOffers.map((offers, index) => {
                return {
                  menuItem: (
                    <Menu.Item
                      key={`orderItem${index}`}
                      onClick={(e, { index }) => {
                        validateForm()
                          .then(r => {
                            // stop when errors found on current tab
                            if (Object.keys(r).length && getSafe(() => !!r.tab[state.activeTab], false)) {
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
                      data-test={`order_grouped_offers_tab${index}`}>
                      <FormattedMessage
                        id='order.groupedOffer.orderItem'
                        defaultMessage='Order Item {num}'
                        values={{ num: index + 1 }}
                      />
                    </Menu.Item>
                  ),
                  pane: () => renderTab(index, offers, setFieldValue, values, props, state, setState)
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
  )
}

export default withToastManager(injectIntl(SaleAttachingProductOffer))
