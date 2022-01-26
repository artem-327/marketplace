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
import { FormattedPhone } from '../../../../components/formatted-messages/'
import { Button, Input } from 'formik-semantic-ui-fixed-validation'
import ErrorFocus from '../../../../components/error-focus'
import { PhoneNumber } from '../../../phoneNumber'
import { getSafe } from '../../../../utils/functions'

// Actions
import * as Actions from '../../actions'

// Styles
import { GridData, GridDataColumn } from '../Detail.styles'

// Services
import { formValidation, SubmitBOL } from './EditBOL.services'

const EditBOL = props => {
  const {
    intl: { formatMessage },
    isEditing,
    popupValues,
    orderBolUpdating
  } = props

  const keyColumn = 5
  const valColumn = 16 - keyColumn

  return (
    <Formik
      initialValues={popupValues}
      validationSchema={formValidation()}
      onSubmit={(values, actions) => SubmitBOL(values, actions, props)}
    >
      {formikProps => {
        const {
          values,
          setFieldValue,
          setFieldTouched,
          touched,
          isSubmitting,
          handleSubmit,
          errors
        } = formikProps

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
                              <PhoneNumber
                                name='phoneNumber'
                                values={values}
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                                errors={errors}
                                touched={touched}
                                isSubmitting={isSubmitting}
                                label={null}
                                placeholder={formatMessage({
                                  id: 'global.phonePlaceholder',
                                  defaultMessage: '000 000 0000'
                                })}
                                clearable={true}
                              />
                            </GridDataColumn>
                            <GridDataColumn width={keyColumn} className='key edit'>
                              <FormattedMessage id='order.bol.faxNumber' defaultMessage='Fax Number'/>
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>
                              <PhoneNumber
                                name='faxNumber'
                                values={values}
                                setFieldValue={setFieldValue}
                                setFieldTouched={setFieldTouched}
                                errors={errors}
                                touched={touched}
                                isSubmitting={isSubmitting}
                                label={null}
                                placeholder={formatMessage({
                                  id: 'global.phonePlaceholder',
                                  defaultMessage: '000 000 0000'
                                })}
                                clearable={true}
                              />
                            </GridDataColumn>
                          </GridData>
                        </GridColumn>
                        <GridColumn>
                          <GridData columns={2}>
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
                           {/* Specified in design but not accepted by Patch endpoint, DT-2515
                            <GridDataColumn width={keyColumn} className='key edit'>
                              <FormattedMessage id='order.bol.shipperInstructions' defaultMessage='Shipper Instructions'/>
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>
                              <Input
                                name='shipperInstructions'
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'global.enterText',
                                    defaultMessage: 'Enter Text'
                                  })
                                }}
                              />
                            </GridDataColumn>
                            <GridDataColumn width={keyColumn} className='key edit'>
                              <FormattedMessage id='order.bol.consigneeInstructions' defaultMessage='Consignee Instructions'/>
                            </GridDataColumn>
                            <GridDataColumn width={valColumn}>
                              <Input
                                name='consigneeInstructions'
                                inputProps={{
                                  placeholder: formatMessage({
                                    id: 'global.enterText',
                                    defaultMessage: 'Enter Text'
                                  })
                                }}
                              />
                            </GridDataColumn>
                            */}
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
                          <GridDataColumn width={valColumn}>
                            <FormattedPhone value={props.popupValues.phoneNumber} />
                          </GridDataColumn>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.bol.faxNumber' defaultMessage='Fax Number'/>
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>
                            <FormattedPhone value={props.popupValues.faxNumber} />
                          </GridDataColumn>
                        </GridData>
                      </GridColumn>
                      <GridColumn>
                        <GridData columns={2}>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.bol.referenceInformation' defaultMessage='Reference Information'/>
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{props.popupValues.referenceInformation}</GridDataColumn>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.bol.stopNotes' defaultMessage='Stop Notes'/>
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{props.popupValues.stopNotes}</GridDataColumn>
                          {/* Specified in design but not accepted by Patch endpoint, DT-2515
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.bol.shipperInstructions' defaultMessage='Shipper Instructions'/>
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{props.popupValues.shipperInstructions}</GridDataColumn>
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.bol.consigneeInstructions' defaultMessage='Consignee Instructions'/>
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{props.popupValues.consigneeInstructions}</GridDataColumn>
                          */}
                          <GridDataColumn width={keyColumn} className='key'>
                            <FormattedMessage id='order.bol.specialInstructions' defaultMessage='Special Instructions'/>
                          </GridDataColumn>
                          <GridDataColumn width={valColumn}>{props.popupValues.specialInstructions}</GridDataColumn>
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
      ...(isOrderBuyType
          ? {
            contactName: getSafe(() => bol.destinationContactName, ''),
            phoneNumber: getSafe(() => bol.destinationPhoneNo, ''),
            faxNumber: getSafe(() => bol.destinationFaxNo, ''),
            stopNotes: getSafe(() => bol.destinationStopNotes, '')
          }
          : {
            contactName: getSafe(() => bol.pickupContactName, ''),
            phoneNumber: getSafe(() => bol.pickupPhoneNo, ''),
            faxNumber: getSafe(() => bol.pickupFaxNo, ''),
            stopNotes: getSafe(() => bol.pickupStopNotes, '')
          }
        ),
      referenceInformation: getSafe(() => bol.referenceInformation, ''),
      specialInstructions: getSafe(() => bol.specialInstructions, '')
      /* Specified in design but not accepted by Patch endpoint, DT-2515
      shipperInstructions: getSafe(() => bol.shipperInstructionsSpecialServices, ''),
      consigneeInstructions: getSafe(() => bol.consigneeInstructionsSpecialServices, ''),
      */
    }
  }
}

export default injectIntl(connect(mapStateToProps, Actions)(EditBOL))