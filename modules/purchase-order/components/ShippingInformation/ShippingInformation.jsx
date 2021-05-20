/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import {getSafe} from "~/utils/functions"
import { FormattedUnit } from '~/components/formatted-messages'

import { Header, Button, Modal, FormGroup } from 'semantic-ui-react'
import { Form, Input, Checkbox, Dropdown } from 'formik-semantic-ui-fixed-validation'

// Styles
import { ModalStyled, LabelBlueText } from './ShippingInformation.styles'

//Services
import {
  onHazmatPopup,
  getInitValues,
  validationSchema,
  handleUnNumberChange,
  handleSearchNmfcNumberChange,
  handleSubmit
} from './ShippingInformation.services'

import {
  getPackagingGroupsDataRequest,
  getHazardClassesDataRequest,
  getUnNumbersByString,
  addUnNumber
} from '~/modules/admin/actions'
import { getCart } from '~/modules/purchase-order/actions'
import { getNmfcNumbersByString, addNmfcNumber } from '~/modules/settings/actions'

const ShippingInformation = props => {
  let handleSubmitFcn
  const [openModal, setOpenModal] = useState(false)
  const [edittingHazmatInfo, setEdittingHazmatInfo] = useState(false)
  const [loadCartRequired, setLoadCartRequired] = useState(false)
  const [nmfcNumberInitOptions, setNmfcNumberInitOptions] = useState([])
  const [unNumberInitOptions, setUnNumberInitOptions] = useState([])

  const {
    item,
    intl: { formatMessage },
    hazardClasses,
    hazardClassesLoading,
    packagingGroups,
    packagingGroupsLoading,
    unNumbersFiltered,
    unNumbersFetching,
    nmfcNumbersFetching,
    nmfcNumbersFiltered
  } = props

  let disabled = !edittingHazmatInfo
  let unNumberOptions = [...unNumberInitOptions, ...unNumbersFiltered].filter(
    (v, i, a) => a.findIndex(t => t.key === v.key) === i
  )
  let nmfcNumberOptions = [...nmfcNumberInitOptions, ...nmfcNumbersFiltered].filter(
    (v, i, a) => a.findIndex(t => t.key === v.key) === i
  )

  return (
    <ModalStyled
      open={openModal}
      size='tiny'
      onOpen={() => {
        try {
          if (hazardClasses.length === 0) props.getHazardClassesDataRequest()
          if (packagingGroups.length === 0) props.getPackagingGroupsDataRequest()
        } catch (e) {
          console.error(e)
        }
        onHazmatPopup(item, setNmfcNumberInitOptions, setUnNumberInitOptions, setOpenModal)}
      }
      onClose={() => {
        if (loadCartRequired) props.getCart()
        setEdittingHazmatInfo(false)
        setLoadCartRequired(false)
        setOpenModal(false)
      }}
      trigger={
        <LabelBlueText>
          <FormattedMessage id='global.view' defaultMessage='View'>{text => text}</FormattedMessage>
        </LabelBlueText>
      }>
      <>
        <Modal.Header>
          <FormattedMessage id='cart.shippingInfo' defaultMessage='Shipping Information' />
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={getInitValues(item)}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={(values, formikProps) =>
              handleSubmit(values, formikProps, props, setEdittingHazmatInfo, setLoadCartRequired, setOpenModal)}
            children={({ submitForm }) => {
              handleSubmitFcn = submitForm
              return (
                <>
                  <FormGroup widths='equal'>
                    <Dropdown
                      options={unNumberOptions}
                      fieldProps={{
                        'data-test': 'shopping_cart_unNumber_inp'
                      }}
                      inputProps={{
                        loading: unNumbersFetching,
                        disabled,
                        clearable: true,
                        search: true,
                        selection: true,
                        onSearchChange: (e, data) => handleUnNumberChange(e, data, props),
                        style: { background: disabled ? '#dee2e6' : null }
                      }}
                      name='unNumber'
                      label={formatMessage({ id: 'global.unNumber', defaultMessage: 'UN Number' })}
                    />
                    <Dropdown
                      options={packagingGroups.map(grp => ({
                        key: grp.id,
                        value: grp.id,
                        text: grp.groupCode
                      }))}
                      fieldProps={{
                        'data-test': 'shopping_cart_packagingGroup_inp'
                      }}
                      inputProps={{
                        disabled,
                        loading: packagingGroupsLoading,
                        clearable: true,
                        selection: true,
                        search: true,
                        style: { background: disabled ? '#dee2e6' : null }
                      }}
                      name='packagingGroup'
                      label={formatMessage({ id: 'cart.packagingGroup', defaultMessage: 'Packaging Group' })}
                    />
                  </FormGroup>
                  <FormGroup widths='equal'>
                    <Dropdown
                      options={hazardClasses.map(hazardClass => ({
                        key: hazardClass.id,
                        value: hazardClass.id,
                        text: `${hazardClass.classCode} - ${hazardClass.description}`
                      }))}
                      inputProps={{
                        disabled,
                        loading: hazardClassesLoading,
                        search: true,
                        clearable: true,
                        style: { background: disabled ? '#dee2e6' : null }
                      }}
                      fieldProps={{
                        'data-test': 'shopping_cart_hazardClass_inp'
                      }}
                      name='hazardClass'
                      label={formatMessage({ id: 'cart.hazardClass', defaultMessage: 'Hazard Class' })}
                    />
                    <Input
                      fieldProps={{
                        'data-test': 'shopping_cart_freightClass_inp'
                      }}
                      inputProps={{ disabled, style: { background: disabled ? '#dee2e6' : null } }}
                      name='freightClass'
                      label={formatMessage({ id: 'cart.freightClass', defaultMessage: 'Freight Class' })}
                    />
                  </FormGroup>
                  <FormGroup widths='2'>
                    <Dropdown
                      label={
                        <FormattedMessage id='cart.nmfcNumber' defaultMessage='NMFC Number'>
                          {text => text}
                        </FormattedMessage>
                      }
                      options={nmfcNumberOptions}
                      fieldProps={{
                        'data-test': 'shopping_cart_nmfcNumber_inp'
                      }}
                      inputProps={{
                        disabled,
                        style: { background: disabled ? '#dee2e6' : null },
                        fluid: true,
                        search: val => val,
                        clearable: true,
                        selection: true,
                        loading: nmfcNumbersFetching,
                        onSearchChange: (_, { searchQuery }) => handleSearchNmfcNumberChange(searchQuery, props)
                      }}
                      name='nmfcNumber'
                    />
                  </FormGroup>
                  <FormGroup widths='2'>
                    <Checkbox
                      inputProps={{
                        disabled,
                        'data-test': 'shopping_cart_stackable_chckb'
                      }}
                      name='stackable'
                      label={formatMessage({ id: 'cart.stackable', defaultMessage: 'Stackable' })}
                    />
                  </FormGroup>
                </>
              )
            }}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button
            type='button'
            basic
            onClick={e => {
              setEdittingHazmatInfo(false)
              setOpenModal(false)
            }}
            data-test='shopping_cart_hazmat_cancel'>
            <FormattedMessage id='global.close' defaultMessage='Close'>
              {text => text}
            </FormattedMessage>
          </Button>
          <Button
            type='button'
            color='blue'
            onClick={() => {
              if (edittingHazmatInfo) handleSubmitFcn()
              else  setEdittingHazmatInfo(!edittingHazmatInfo)
            }}
            data-test='shopping_cart_hazmat'>
            <FormattedMessage id={`global.${edittingHazmatInfo ? 'save' : 'edit'}`}>
              {text => text}
            </FormattedMessage>
          </Button>
        </Modal.Actions>
      </>
    </ModalStyled>
  )
}

ShippingInformation.propTypes = {
  itemsCount: PropTypes.number
}

ShippingInformation.defaultProps = {
  itemsCount: 0
}

function mapStateToProps(store) {
  const {
    packagingGroups,
    hazardClasses,
    unNumbersFiltered,
    unNumbersFetching,
    hazardClassesLoading,
    packagingGroupsLoading
  } = store.admin
  const { nmfcNumbersFetching, nmfcNumbersFiltered } = store.settings

  return {
    packagingGroups,
    packagingGroupsLoading,
    hazardClasses,
    hazardClassesLoading,
    unNumbersFiltered: unNumbersFiltered.map(d => {
      return {
        key: d.id,
        text: d.unNumberCode,
        value: d.id,
        content: <Header content={d.unNumberCode} subheader={d.description} style={{ fontSize: '1em' }} />
      }
    }),
    unNumbersFetching,
    nmfcNumbersFetching,
    nmfcNumbersFiltered: nmfcNumbersFiltered.map(d => {
      return {
        key: d.id,
        text: d.code,
        value: d.id,
        content: <Header content={d.code} subheader={d.description} style={{ fontSize: '1em' }} />
      }
    })
  }
}

export default withToastManager(injectIntl(connect(mapStateToProps, {
  getHazardClassesDataRequest,
  getPackagingGroupsDataRequest,
  getUnNumbersByString,
  addUnNumber,
  getNmfcNumbersByString,
  addNmfcNumber,
  getCart
})(ShippingInformation)))