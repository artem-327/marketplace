/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import {getSafe} from "~/utils/functions"
import { FormattedUnit } from '~/components/formatted-messages'

import { Button, Modal, FormGroup } from 'semantic-ui-react'
import { Form, Input, Checkbox } from 'formik-semantic-ui-fixed-validation'

// Styles
import { ModalStyled, LabelBlueText } from './ShippingInformation.styles'

//Services
import { getInitValues, validationSchema } from './ShippingInformation.services'

const ShippingInformation = props => {
  const [openModal, setOpenModal] = useState(false)

  const {
    item,
    intl: { formatMessage }
  } = props

  return (
    <ModalStyled
      open={openModal}
      size='tiny'
      onOpen={() => setOpenModal(true)}
      onClose={() => {
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
            onSubmit={() => {}}
            children={() => {
              return (
                <>
                  <FormGroup widths='equal'>
                    <Input
                      fieldProps={{
                        'data-test': 'shopping_cart_unNumber_inp'
                      }}
                      inputProps={{ readOnly: true }}
                      name='unNumber'
                      label={formatMessage({ id: 'global.unNumber', defaultMessage: 'UN Number' })}
                    />
                    <Input
                      fieldProps={{
                        'data-test': 'shopping_cart_packagingGroup_inp'
                      }}
                      inputProps={{ readOnly: true }}
                      name='packagingGroup'
                      label={formatMessage({ id: 'cart.packagingGroup', defaultMessage: 'Packaging Group' })}
                    />
                  </FormGroup>
                  <FormGroup widths='equal'>
                    <Input
                      inputProps={{ readOnly: true }}
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
                      inputProps={{ readOnly: true }}
                      name='freightClass'
                      label={formatMessage({ id: 'cart.freightClass', defaultMessage: 'Freight Class' })}
                    />
                  </FormGroup>
                  <FormGroup widths='2'>
                    <Input
                      label={
                        <FormattedMessage id='cart.nmfcNumber' defaultMessage='NMFC Number'>
                          {text => text}
                        </FormattedMessage>
                      }
                      fieldProps={{
                        'data-test': 'shopping_cart_nmfcNumber_inp'
                      }}
                      inputProps={{ readOnly: true }}
                      name='nmfcNumber'
                    />
                  </FormGroup>
                  <FormGroup widths='2'>
                    <Checkbox
                      inputProps={{
                        disabled: true,
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
            onClick={e => setOpenModal(false)}
            data-test='shopping_cart_hazmat_cancel'>
            <FormattedMessage id='global.close' defaultMessage='Close'>
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

export default withToastManager(injectIntl(ShippingInformation))