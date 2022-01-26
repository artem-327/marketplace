/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import moment from 'moment'
import { DeleteForever } from '@material-ui/icons'

import { getSafe } from '~/utils/functions'
import {
  Form,
  Accordion,
  Tab,
  Menu,
  Grid,
  GridColumn,
  GridRow,
  Checkbox,
  Dimmer,
  Loader,
  Table
} from 'semantic-ui-react'

// Components
import { Formik, FieldArray } from 'formik'
import { FormattedPhone } from '../../../../components/formatted-messages/'
import { Button, Input, Dropdown, TextArea } from 'formik-semantic-ui-fixed-validation'
import ErrorFocus from '../../../../components/error-focus'
import { PhoneNumber } from '../../../phoneNumber'
import BasicButton from '../../../../components/buttons/BasicButton'
import { AddressForm } from '../../../address-form'
import { DateInput } from '../../../../components/custom-formik'

// Actions
import * as Actions from '../../actions'

// Styles
import {
  GridBol,
  DivTitleSection,
  GreySegment,
  TableCarrier,
  DivPLusIcon
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
//import { formValidation, SubmitBOL } from './EditBOL.services'

const BOLContent = props => {
  // ! ! ? const prevVariable = usePrevious(props.variable)
  const [tmp, set] = useState(false)

  const {
    intl: { formatMessage },
    formikProps
  } = props

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

  // Similar to call componentDidMount:
  useEffect(() => {

    console.log('!!!!!!!!!! BOLContent bolName', props.bolName)
    console.log('!!!!!!!!!! BOLContent bol', props.bol)

  }, [])  // If [] is empty then is similar as componentDidMount.


  // This useEffect is used similar as componentDidUpdate
  // Could by used in previous (above) useEffect, but this approach is more clear
  useEffect(() => {

  }, [/* variableName */])


  console.log('!!!!!!!!!! aaaaa values', values)

  return (
    <GridBol>
      <GridRow columns={2}>
        <GridColumn>
          <GridBol>
            <GridRow>
              <GridColumn>
                <DivTitleSection>
                  <FormattedMessage id='operations.editBol.pickUpLocationInformation' defaultMessage='Pick Up Location Information' />
                </DivTitleSection>
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn>
                <Input
                  name='pickupName'
                  label={formatMessage({ id: 'operations.editBol.name', defaultMessage: 'Name' })}
                  inputProps={{
                    placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                  }}
                />
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn>
                <AddressForm
                  prefix={'pickupAddress'}
                  noBorder
                  required={false}
                  setFieldValue={setFieldValue}
                  values={values}
                  displayHeader={false}
                  bacgroundColor={'#ffffff; !important'}
                />
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn>
                <Input
                  name='pickupContactName'
                  label={formatMessage({ id: 'operations.editBol.contactName', defaultMessage: 'Contact Name' })}
                  inputProps={{
                    placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                  }}
                />
              </GridColumn>
            </GridRow>
            <GridRow columns={2}>
              <GridColumn>
                <PhoneNumber
                  name='pickupPhoneNo'
                  values={values}
                  label={<FormattedMessage id='global.phoneNo' defaultMessage='Phone No.' />}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  errors={errors}
                  touched={touched}
                  isSubmitting={isSubmitting}
                />
              </GridColumn>
              <GridColumn>
                <PhoneNumber
                  name='pickupFaxNo'
                  values={values}
                  label={<FormattedMessage id='global.faxNo' defaultMessage='Fax No.' />}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  errors={errors}
                  touched={touched}
                  isSubmitting={isSubmitting}
                />
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn>
                <Input
                  name='pickupStopNotes'
                  label={formatMessage({ id: 'operations.editBol.stopNotes', defaultMessage: 'Stop Notes' })}
                  inputProps={{
                    placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                  }}
                />
              </GridColumn>
            </GridRow>
          </GridBol>
        </GridColumn>

        <GridColumn>
          <GridBol>
            <GridRow>
              <GridColumn>
                <DivTitleSection>
                  <FormattedMessage id='operations.editBol.destinationLocationInformation' defaultMessage='Destination Location Information' />
                </DivTitleSection>
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn>
                <Input
                  name='destinationName'
                  label={formatMessage({ id: 'operations.editBol.name', defaultMessage: 'Name' })}
                  inputProps={{
                    placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                  }}
                />
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn>
                <AddressForm
                  prefix={'destinationAddress'}
                  noBorder
                  required={false}
                  setFieldValue={setFieldValue}
                  values={values}
                  displayHeader={false}
                  bacgroundColor={'#ffffff; !important'}
                />
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn>
                <Input
                  name='destinationContactName'
                  label={formatMessage({ id: 'operations.editBol.contactName', defaultMessage: 'Contact Name' })}
                  inputProps={{
                    placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                  }}
                />
              </GridColumn>
            </GridRow>
            <GridRow columns={2}>
              <GridColumn>
                <PhoneNumber
                  name='destinationPhoneNo'
                  values={values}
                  label={<FormattedMessage id='operations.editBol.phoneNo' defaultMessage='Phone No.' />}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  errors={errors}
                  touched={touched}
                  isSubmitting={isSubmitting}
                />
              </GridColumn>
              <GridColumn>
                <PhoneNumber
                  name='destinationFaxNo'
                  values={values}
                  label={<FormattedMessage id='operations.editBol.faxNo' defaultMessage='Fax No.' />}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                  errors={errors}
                  touched={touched}
                  isSubmitting={isSubmitting}
                />
              </GridColumn>
            </GridRow>
            <GridRow>
              <GridColumn>
                <Input
                  name='destinationStopNotes'
                  label={formatMessage({ id: 'operations.editBol.stopNotes', defaultMessage: 'Stop Notes' })}
                  inputProps={{
                    placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                  }}
                />
              </GridColumn>
            </GridRow>
          </GridBol>
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn>
          <DivTitleSection>
            <FormattedMessage id='operations.editBol.carrier' defaultMessage='Carrier' />
          </DivTitleSection>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <Input
            name='carrierName'
            label={formatMessage({ id: 'operations.editBol.carrier', defaultMessage: 'Carrier' })}
            inputProps={{
              placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
            }}
          />
        </GridColumn>
      </GridRow>
      <GridRow columns={3}>
        <GridColumn>
          <Input
            name='carrierProNo'
            label={formatMessage({ id: 'operations.editBol.proNumber', defaultMessage: 'Pro #' })}
            inputProps={{
              placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
            }}
          />
        </GridColumn>
        <GridColumn>
          <Input
            name='bluepalletPoNo'
            label={formatMessage({ id: 'operations.editBol.bluePalletPONum', defaultMessage: 'BluePallet PO #' })}
            inputProps={{
              placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
            }}
          />
        </GridColumn>
        <GridColumn>
          <Input
            name='shipperRefNo'
            label={formatMessage({ id: 'operations.editBol.shipperRefNo', defaultMessage: 'Shipper Ref #' })}
            inputProps={{
              placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
            }}
          />
        </GridColumn>
      </GridRow>
      <GridRow columns={3}>
        <GridColumn>
          <Input
            name='customerBolNo'
            label={formatMessage({ id: 'operations.editBol.customerBolNo', defaultMessage: 'Customer BOL No.' })}
            inputProps={{
              placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
            }}
          />
        </GridColumn>
        <GridColumn>
          <PhoneNumber
            name='pickupTerminalPhoneNo'
            values={values}
            label={<FormattedMessage id='operations.editBol.originTerminalPhone' defaultMessage='Origin Terminal (Phone)' />}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            errors={errors}
            touched={touched}
            isSubmitting={isSubmitting}
          />
        </GridColumn>
        <GridColumn>
          <PhoneNumber
            name='destinationTerminalPhoneNo'
            values={values}
            label={<FormattedMessage id='operations.editBol.destinationTerminalPhone' defaultMessage='Destination Terminal (Phone)' />}
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            errors={errors}
            touched={touched}
            isSubmitting={isSubmitting}
          />
        </GridColumn>
      </GridRow>
      <GridRow columns={4}>
        <GridColumn>
          <DateInput
            inputProps={{
              minDate: moment(),
              fluid: true,
              clearable: true
            }}
            label={
              <FormattedMessage
                id='operations.editBol.pickupDate'
                defaultMessage='Pick Up Date'
              />
            }
            name='pickupDate'
          />
        </GridColumn>
        <GridColumn>
          <Input
            name='estTransitDays'
            label={formatMessage({ id: 'operations.editBol.estTransitDays', defaultMessage: 'Est. Transit Days' })}
            inputProps={{
              placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
            }}
          />
        </GridColumn>
        <GridColumn>
          <Input
            name='trailerNo'
            label={formatMessage({ id: 'operations.editBol.trailerNo', defaultMessage: 'Trailer #' })}
            inputProps={{
              placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
            }}
          />
        </GridColumn>
        <GridColumn>
          <Input
            name='sealNo'
            label={formatMessage({ id: 'operations.editBol.sealNo', defaultMessage: 'seal #' })}
            inputProps={{
              placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
            }}
          />
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn>
          <DivTitleSection>
            <FormattedMessage id='operations.editBol.referenceInformation' defaultMessage='Reference Information' />
          </DivTitleSection>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <TextArea
            name='referenceInformation'
            label={formatMessage({ id: 'operations.editBol.enterReferenceInformation', defaultMessage: 'Enter Reference Information' })}
            inputProps={{
              placeholder: formatMessage({
                id: 'operations.editBol.typeHere',
                defaultMessage: 'Type here'
              })
            }}
          />
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn>
          <DivTitleSection>
            <FormattedMessage id='operations.editBol.thirdPartyFreightChargesBillTo' defaultMessage='Third Party Freight Charges Bill To' />
          </DivTitleSection>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <Input
            name='billToName'
            label={formatMessage({ id: 'operations.editBol.name', defaultMessage: 'Name' })}
            inputProps={{
              placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
            }}
          />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <AddressForm
            prefix={'billTo'}
            noBorder
            required={false}
            setFieldValue={setFieldValue}
            values={values}
            displayHeader={false}
            bacgroundColor={'#ffffff; !important'}
          />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <FormattedMessage id='operations.editBol.freightChargeTerms' defaultMessage='Freight Charge Terms' />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <Checkbox
            style={{ marginRight: '30px' }}
            label={formatMessage({ id: 'operations.editBol.prepaid', defaultMessage: 'Prepaid' })}
            checked={values?.freightChargeTerms === 'PREPAID'}
            onChange={(e, { checked }) => {
              if (checked) setFieldValue('freightChargeTerms', 'PREPAID')
              else setFieldValue('freightChargeTerms', '')
            }}
          />
          <Checkbox
            style={{ marginRight: '30px' }}
            label={formatMessage({ id: 'operations.editBol.collect', defaultMessage: 'Collect' })}
            checked={values?.freightChargeTerms === 'COLLECT'}
            onChange={(e, { checked }) => {
              if (checked) setFieldValue('freightChargeTerms', 'COLLECT')
              else setFieldValue('freightChargeTerms', '')
            }}
          />
          <Checkbox
            style={{ marginRight: '30px' }}
            label={formatMessage({ id: 'operations.editBol.thirdParty', defaultMessage: '3rd Party' })}
            checked={values?.freightChargeTerms === 'THIRD_PARTY'}
            onChange={(e, { checked }) => {
              if (checked) setFieldValue('freightChargeTerms', 'THIRD_PARTY')
              else setFieldValue('freightChargeTerms', '')
            }}
          />
        </GridColumn>
      </GridRow>
      <GridRow columns={4}>
        <GridColumn>
          <Input
            name='carrierAccountNo'
            label={formatMessage({ id: 'operations.editBol.carrierAccountNo', defaultMessage: 'Carrier Acct #' })}
            inputProps={{
              placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
            }}
          />
        </GridColumn>
        <GridColumn>
          <Input
            name='quoteId'
            label={formatMessage({ id: 'operations.editBol.quoteId', defaultMessage: 'aaaaaaa' })}
            inputProps={{
              placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
            }}
          />
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn>
          <FormattedMessage id='operations.editBol.instructions' defaultMessage='Instructions' />
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <GreySegment>
            <GridBol>
              <GridRow>
                <GridColumn>
                  <TextArea
                    name='specialInstructions'
                    label={formatMessage({ id: 'operations.editBol.specialInstructions', defaultMessage: 'Special Instructions' })}
                    inputProps={{
                      placeholder: formatMessage({
                        id: 'global.placeholder.notes',
                        defaultMessage: 'Type here'
                      })
                    }}
                  />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn>
                  <DivTitleSection>
                    <FormattedMessage id='operations.editBol.lTLOrPartialOnly' defaultMessage='LTL or Partial Only' />
                  </DivTitleSection>
                </GridColumn>
              </GridRow>
              <GridRow columns={4}>
                <GridColumn>
                  <Input
                    name='palletCount'
                    label={formatMessage({ id: 'operations.editBol.numOfPalletes', defaultMessage: '# of Palletes' })}
                    inputProps={{
                      placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                    }}
                  />
                </GridColumn>
                <GridColumn>
                  <Input
                    name='palletType'
                    label={formatMessage({ id: 'operations.editBol.palletType', defaultMessage: 'Pallet Type' })}
                    inputProps={{
                      placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                    }}
                  />
                </GridColumn>
                <GridColumn>
                  <Input
                    name='skidSpot'
                    label={formatMessage({ id: 'operations.editBol.skidSpot', defaultMessage: 'Skid Spot' })}
                    inputProps={{
                      placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                    }}
                  />
                </GridColumn>
                <GridColumn>
                  <Dropdown
                    name='stackable'
                    label={formatMessage({ id: 'operations.editBol.stackable', defaultMessage: 'Stackable' })}
                    options={[
                      { key: 0, text: 'No', value: false },
                      { key: 1, text: 'Yes', value: true }
                    ]}
                    inputProps={{
                      selection: true,
                      clearable: true
                    }}
                  />
                </GridColumn>
              </GridRow>


              <GridRow>
                <GridColumn>
                  <FormattedMessage id='operations.editBol.palletDimensions' defaultMessage='Pallet Dimensions' />
                </GridColumn>
              </GridRow>
              <GridRow columns={8}>
                <GridColumn>
                  <Input
                    name='palletLength'
                    inputProps={{
                      label: 'L',
                      labelPosition: 'left',
                      placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                    }}
                  />
                </GridColumn>
                <GridColumn>
                  <Input
                    name='palletWidth'
                    inputProps={{
                      label: 'W',
                      labelPosition: 'left',
                      placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                    }}
                  />
                </GridColumn>
                <GridColumn>
                  <Input
                    name='palletHeight'
                    inputProps={{
                      label: 'H',
                      labelPosition: 'left',
                      placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                    }}
                  />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn>
                  <DivTitleSection>
                    <FormattedMessage id='operations.editBol.shipperInstructions' defaultMessage='Shipper Instructions' />
                  </DivTitleSection>
                </GridColumn>
              </GridRow>
              <GridRow columns={3}>
                <GridColumn>
                  <Input
                    name='shipperInstructionsPickupNo'
                    label={formatMessage({ id: 'operations.editBol.pickUpNo', defaultMessage: 'Pick Up #' })}
                    inputProps={{
                      placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                    }}
                  />
                </GridColumn>
                <GridColumn>
                  <Input
                    name='shipperInstructionsLocType	'
                    label={formatMessage({ id: 'operations.editBol.locType', defaultMessage: 'Loc Type' })}
                    inputProps={{
                      placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                    }}
                  />
                </GridColumn>
                <GridColumn>
                  <Input
                    name='shipperInstructionsSpecialServices'
                    label={formatMessage({ id: 'operations.editBol.specialServices', defaultMessage: 'Special Services' })}
                    inputProps={{
                      placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                    }}
                  />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn>
                  <DivTitleSection>
                    <FormattedMessage id='operations.editBol.consigneeInstructions' defaultMessage='Carrier Information' />
                  </DivTitleSection>
                </GridColumn>
              </GridRow>
              <GridRow columns={3}>
                <GridColumn>
                  <Input
                    name='consigneeInstructionsDeliveryNo'
                    label={formatMessage({ id: 'operations.editBol.deliveryNo', defaultMessage: 'Delivery #' })}
                    inputProps={{
                      placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                    }}
                  />
                </GridColumn>
                <GridColumn>
                  <Input
                    name='consigneeInstructionsLocType'
                    label={formatMessage({ id: 'operations.editBol.locType', defaultMessage: 'Loc Type' })}
                    inputProps={{
                      placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                    }}
                  />
                </GridColumn>
                <GridColumn>
                  <Input
                    name='consigneeInstructionsSpecialServices'
                    label={formatMessage({ id: 'operations.editBol.specialServices', defaultMessage: 'Special Services' })}
                    inputProps={{
                      placeholder: formatMessage({ id: 'operations.editBol.enterValue', defaultMessage: 'Enter Value' })
                    }}
                  />
                </GridColumn>
              </GridRow>
            </GridBol>
          </GreySegment>
        </GridColumn>
      </GridRow>

      <GridRow>
        <GridColumn>
          <DivTitleSection>
            <FormattedMessage id='operations.editBol.carrierInformation' defaultMessage='Carrier Information' />
          </DivTitleSection>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          {values?.items?.length && (
            <TableCarrier celled padded textAlign='center'>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan='2'>Packaging Unit</Table.HeaderCell>
                  <Table.HeaderCell colSpan='2'>Handling Unit</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2'>Weight</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2'>HM</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2'>OD</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2'>Commodity Description</Table.HeaderCell>
                  <Table.HeaderCell colSpan='2'>LTL Only</Table.HeaderCell>
                  <Table.HeaderCell rowSpan='2' />
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>QTY</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>Qty</Table.HeaderCell>
                  <Table.HeaderCell>Type</Table.HeaderCell>
                  <Table.HeaderCell>NMFC#</Table.HeaderCell>
                  <Table.HeaderCell>CLASS</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <FieldArray
                  name='items'
                  render={arrayHelpers => (
                    <>
                      {values.items.map((item, index) => {
                        return (
                          <Table.Row>
                            <Table.Cell>
                              <Input
                                type='number'
                                name={`items[${index}].packagingQty`}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Input
                                type='text'
                                name={`items[${index}].packagingType`}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Input
                                type='number'
                                name={`items[${index}].handlingUnitQty`}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Input
                                type='text'
                                name={`items[${index}].handlingUnitType`}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Input
                                type='number'
                                name={`items[${index}].weight`}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Dropdown
                                name={`items[${index}].hazardous`}
                                options={[
                                  { key: 0, text: 'No', value: false },
                                  { key: 1, text: 'Yes', value: true }
                                ]}
                                inputProps={{
                                  selection: true,
                                  clearable: true
                                }}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Dropdown
                                name={`items[${index}].od`}
                                options={[
                                  { key: 0, text: 'No', value: false },
                                  { key: 1, text: 'Yes', value: true }
                                ]}
                                inputProps={{
                                  selection: true,
                                  clearable: true
                                }}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Input
                                type='text'
                                name={`items[${index}].commodityDescription`}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Input
                                type='text'
                                name={`items[${index}].nmfcNo`}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Input
                                type='text'
                                name={`items[${index}].hazardClass`}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <DeleteForever
                                onClick={() => arrayHelpers.remove(index)}
                                className='title-icon'
                                style={{ fontSize: '28px', color: '#f16844', cursor: 'pointer' }}
                              />
                            </Table.Cell>
                          </Table.Row>
                        )
                      })}
                    </>
                  )}
                />
              </Table.Body>
            </TableCarrier>
          )}
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn>
          <DivPLusIcon
            onClick={() => {
              let newItems = values.items.slice()
              newItems.push({
                commodityDescription: '',
                handlingUnitQty: '',
                handlingUnitType: '',
                hazardClass: '',
                hazardous: '',
                nmfcNo: '',
                od: '',
                packagingQty: '',
                packagingType: '',
                weight: ''
              })
              setFieldValue('items', newItems)
            }}
          >+</DivPLusIcon>
        </GridColumn>
      </GridRow>
    </GridBol>
  )
}

BOLContent.propTypes = {

}

BOLContent.defaultProps = {

}

function mapStateToProps(store) {
  return {

  }
}

export default injectIntl(connect(mapStateToProps, Actions)(BOLContent))