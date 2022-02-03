/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import {
  Form,
  Grid,
  GridColumn,
  GridRow,
  Dimmer,
  Loader
} from 'semantic-ui-react'

// Components
import { Formik } from 'formik'
import { Button, Input } from 'formik-semantic-ui-fixed-validation'
import ErrorFocus from '../../../../components/error-focus'
import { getSafe } from '../../../../utils/functions'

// Actions
import * as Actions from '../../actions'

// Styles
import { GridData, GridDataColumn } from '../Detail.styles'

// Services
import { SubmitBOL } from './EditBOL.services'

const EditBOL = props => {
  const {
    intl: { formatMessage },
    isEditing,
    popupValues,
    orderBolUpdating,
    isOrderBuyType
  } = props

  const keyColumn = 5
  const valColumn = 16 - keyColumn

  return (
    <Formik
      initialValues={popupValues}
      validationSchema={{}}
      onSubmit={(values, actions) => SubmitBOL(values, actions, props)}
    >
      {formikProps => {
        const { isSubmitting, handleSubmit } = formikProps

        return (
          <Form>
            {
              isEditing
                ? (
                  <>
                    <Dimmer inverted active={orderBolUpdating}>
                      <Loader />
                    </Dimmer>
                    <Grid divided='horizontally'>
                      <GridRow columns={2}>
                        <GridColumn>
                          <GridData columns={2}>
                            <GridDataColumn width={keyColumn} className='key edit'>
                              <FormattedMessage id='order.bol.contactName' defaultMessage='Contact Name'/>
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>
                              <Input
                                name='contactName'
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'global.enterName',
                                    defaultMessage: 'Enter Name'
                                  })
                                }}
                              />
                            </GridDataColumn>
                            <GridDataColumn width={keyColumn} className='key edit'>
                              <FormattedMessage id='order.bol.phoneNumber' defaultMessage='Phone Number'/>
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>
                              <Input
                                name='phoneNumber'
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'global.phonePlaceholder',
                                    defaultMessage: '000 000 0000'
                                  })
                                }}
                              />
                            </GridDataColumn>
                            <GridDataColumn width={keyColumn} className='key edit'>
                              <FormattedMessage id='order.bol.faxNumber' defaultMessage='Fax Number'/>
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>
                              <Input
                                name='faxNumber'
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'global.phonePlaceholder',
                                    defaultMessage: '000 000 0000'
                                  })
                                }}
                              />
                            </GridDataColumn>
                            <GridDataColumn width={keyColumn} className='key edit'>
                              <FormattedMessage id='order.bol.referenceInformation' defaultMessage='Reference Information'/>
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>
                              <Input
                                name='referenceInformation'
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'global.enterText',
                                    defaultMessage: 'Enter Text'
                                  })
                                }}
                              />
                            </GridDataColumn>
                            <GridDataColumn width={keyColumn} className='key edit'>
                              <FormattedMessage id='order.bol.stopNotes' defaultMessage='Stop Notes'/>
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>
                              <Input
                                name='stopNotes'
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'global.enterText',
                                    defaultMessage: 'Enter Text'
                                  })
                                }}
                              />
                            </GridDataColumn>
                          </GridData>
                        </GridColumn>

                        <GridColumn>
                          <GridData columns={2}>
                            <GridDataColumn width={keyColumn} className='key edit'>
                              <FormattedMessage id='order.bol.specialInstructions' defaultMessage='Special Instructions'/>
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>
                              <Input
                                name='specialInstructions'
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'global.enterText',
                                    defaultMessage: 'Enter Text'
                                  })
                                }}
                              />
                            </GridDataColumn>
                            <GridDataColumn width={keyColumn} className='key edit'>
                              {isOrderBuyType
                                ? (<FormattedMessage id='order.bol.deliveryNo' defaultMessage='Delivery #'/>)
                                : (<FormattedMessage id='order.bol.pickUpNo' defaultMessage='Pick Up #'/>)
                              }
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>
                              <Input
                                name='pickupDeliveryNo'
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'global.enterText',
                                    defaultMessage: 'Enter Text'
                                  })
                                }}
                              />
                            </GridDataColumn>
                            <GridDataColumn width={keyColumn} className='key edit'>
                              <FormattedMessage id='order.bol.locType' defaultMessage='Loc Type'/>
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>
                              <Input
                                name='locType'
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'global.enterText',
                                    defaultMessage: 'Enter Text'
                                  })
                                }}
                              />
                            </GridDataColumn>
                            <GridDataColumn width={keyColumn} className='key edit'>
                              <FormattedMessage id='order.bol.specialServices' defaultMessage='Special Services'/>
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>
                              <Input
                                name='specialServices'
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'global.enterText',
                                    defaultMessage: 'Enter Text'
                                  })
                                }}
                              />
                            </GridDataColumn>
                          </GridData>
                        </GridColumn>
                      </GridRow>
                    </Grid>
                    <div style={{ textAlign: 'right', padding: '10px 26.5px 0' }}>
                      <Button.Submit
                        disabled={isSubmitting}
                        onClick={handleSubmit}
                        data-test='orders_detail_bol_submit_btn'
                      >
                        <FormattedMessage id='global.save' defaultMessage='Save'>
                          {text => text}
                        </FormattedMessage>
                      </Button.Submit>
                    </div>
                  </>
                ) : (
                  <Grid divided='horizontally'>
                    <GridRow columns={2}>
                      <GridColumn>
                        <GridData columns={2}>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.bol.contactName' defaultMessage='Contact Name'/>
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{props.popupValues.contactName}</GridDataColumn>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.bol.phoneNumber' defaultMessage='Phone Number'/>
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{props.popupValues.phoneNumber}</GridDataColumn>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.bol.faxNumber' defaultMessage='Fax Number'/>
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{props.popupValues.faxNumber}</GridDataColumn>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.bol.referenceInformation' defaultMessage='Reference Information'/>
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{props.popupValues.referenceInformation}</GridDataColumn>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.bol.stopNotes' defaultMessage='Stop Notes'/>
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{props.popupValues.stopNotes}</GridDataColumn>
                        </GridData>
                      </GridColumn>
                      <GridColumn>
                        <GridData columns={2}>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.bol.specialInstructions' defaultMessage='Special Instructions'/>
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{props.popupValues.specialInstructions}</GridDataColumn>
                          <GridDataColumn width={keyColumn} className='key'>
                            {isOrderBuyType
                              ? (<FormattedMessage id='order.bol.deliveryNo' defaultMessage='Delivery #'/>)
                              : (<FormattedMessage id='order.bol.pickUpNo' defaultMessage='Pick Up #'/>)
                            }
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{props.popupValues.pickupDeliveryNo}</GridDataColumn>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.bol.locType' defaultMessage='Loc Type'/>
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{props.popupValues.locType}</GridDataColumn>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.bol.specialServices' defaultMessage='Special Services'/>
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{props.popupValues.specialServices}</GridDataColumn>
                        </GridData>
                      </GridColumn>
                    </GridRow>
                  </Grid>
                )
            }
            <ErrorFocus />
          </Form>
        )
      }}
    </Formik>
  )
}

EditBOL.propTypes = {
  orderId: PropTypes.bool,
  bol: PropTypes.object,
  isEditing: PropTypes.bool,
  isOrderBuyType: PropTypes.bool,
  onSave: PropTypes.func
}

EditBOL.defaultProps = {
  orderId: 0,
  bol: {},
  isEditing: false,
  isOrderBuyType: false,
  onSave: () => { }
}

function mapStateToProps(store, props) {
  const { isOrderBuyType, bol } = props
  return {
    orderBolUpdating: store.orders.orderBolUpdating,
    popupValues: {
      ...bol,
      ...(isOrderBuyType
          ? {
            contactName: getSafe(() => bol.destinationContactName, ''),
            phoneNumber: getSafe(() => bol.destinationPhoneNo, ''),
            faxNumber: getSafe(() => bol.destinationFaxNo, ''),
            stopNotes: getSafe(() => bol.destinationStopNotes, ''),
            pickupDeliveryNo: getSafe(() => bol.consigneeInstructionsDeliveryNo, ''),
            locType: getSafe(() => bol.consigneeInstructionsLocType, ''),
            specialServices: getSafe(() => bol.consigneeInstructionsSpecialServices, '')
          }
          : {
            contactName: getSafe(() => bol.pickupContactName, ''),
            phoneNumber: getSafe(() => bol.pickupPhoneNo, ''),
            faxNumber: getSafe(() => bol.pickupFaxNo, ''),
            stopNotes: getSafe(() => bol.pickupStopNotes, ''),
            pickupDeliveryNo: getSafe(() => bol.shipperInstructionsPickupNo, ''),
            locType: getSafe(() => bol.shipperInstructionsLocType, ''),
            specialServices: getSafe(() => bol.shipperInstructionsSpecialServices, '')
          }
        ),
      referenceInformation: getSafe(() => bol.referenceInformation, ''),
      specialInstructions: getSafe(() => bol.specialInstructions, '')
    }
  }
}

export default injectIntl(connect(mapStateToProps, Actions)(EditBOL))