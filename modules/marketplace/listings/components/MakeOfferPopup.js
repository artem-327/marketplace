import React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import {
  Modal,
  Dimmer,
  Loader,
  Grid,
  GridRow,
  GridColumn,
  Checkbox,
  FormField,
  FormGroup,
  Segment
} from 'semantic-ui-react'

import { Field as FormikField } from 'formik'
import * as Yup from 'yup'
import { FormattedMessage, injectIntl } from 'react-intl'
import { errorMessages } from '~/constants/yupValidation'
import { currencyId } from '~/constants/index'
import styled from 'styled-components'
import { Required } from '~/components/constants/layout'
import { withDatagrid } from '~/modules/datagrid'
import { removeEmpty } from '~/utils/functions'
import confirm from '~/src/components/Confirmable/confirm'
import { uniqueArrayByKey } from '~/utils/functions'
import get from 'lodash/get'
import { getSafe } from '~/utils/functions'
import ErrorFocus from '~/components/error-focus'
import { X as XIcon } from 'react-feather'

const CustomForm = styled(Form)`
  flex-grow: 0 !important;
`

const HighSegment = styled.div`
  padding: 1.071428571em 2.142857143em;
  font-size: 14px;
  font-weight: 500;
  color: #20273a;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 -1px 0 0 #dee2e6;
  background-color: #ffffff;
  text-transform: uppercase;  
  display: flex;
  flex-direction: row;

  svg {
    font-size: 18px;
    vertical-align: middle;
  }
  
  svg.title-icon {
    margin-left: 15px;
    color: #cecfd4;
  }
  
  svg.close-icon {
    right: 0;
    position: absolute;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`

const BottomButtons = styled.div`
  display: inline-block;
  position: relative;
  overflow: visible;
  margin: 0;
  box-shadow: 0 -1px 3px 0 rgba(0, 0, 0, 0.06), inset 0 1px 0 0 #dee2e6;
  padding: 10px 25px;
  text-align: right;

  .ui.button {
    height: 40px;
    border-radius: 3px;
    font-weight: 500;
    color: #848893;
    margin: 0 5px;
    align-items: center;

    &.light {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.06);
      border: solid 1px #dee2e6;
      background-color: #ffffff;
      color: #848893;
      &:hover {
        background-color: #f8f9fb;
        color: #20273a;
      }
      &:active {
        background-color: #edeef2;
        color: #20273a;
      }
    }
    &.secondary {
      color: #ffffff;
      background-color: #2599d5;
      &:hover {
        background-color: #188ec9;
      }
      &:active {
        background-color: #0d82bc;
      }
    }
  }

  .ui.modal & {
    margin: 30px -1.5rem -1.5rem;
    border-top: 1px solid #dee2e6;
    box-shadow: 0 0 0 0 transparent;
  }
`


const initValues = {
  priceOffer: '',
  message: ''
}

const formValidation = () =>
  Yup.object().shape({
    priceOffer: Yup.string().trim().required(errorMessages.requiredMessage),
    message: Yup.string().trim().required(errorMessages.requiredMessage)
  })

class MakeOfferPopup extends React.Component {
  state = {
  }

  getInitialFormValues = () => {
    const { popupValues } = this.props
    return popupValues
      ? {
        priceOffer: 32,
        message: 'test init message'
      }
      : initValues
  }

  submitOffer = async (values, actions, closeOnSubmit = true) => {
    const { closePopup } = this.props

    const data = {
      priceOffer: values.priceOffer,
      message: values.message
    }

    removeEmpty(data)

    try {
      console.log('!!!!!!!!!! submitOffer values', values)
      console.log('!!!!!!!!!! submitOffer data', data)
      closePopup()
    } catch (e) {
      console.error(e)
    }
    actions.setSubmitting(false)
  }

  render() {
    const {
      intl: { formatMessage },
      popupValues,
      closePopup,
      isSending
    } = this.props

    return (
      <CustomForm
        autoComplete='off'
        enableReinitialize
        initialValues={this.getInitialFormValues()}
        validationSchema={formValidation()}
        onSubmit={this.submitOffer}>
        {formikProps => {
          let { values, setFieldValue, setFieldTouched, errors, touched, isSubmitting } = formikProps

          return (
            <>
              <Modal closeIcon onClose={closePopup} open={true} size='large'>
                <Dimmer active={isSending} inverted>
                  <Loader />
                </Dimmer>
                <Modal.Header>
                  <FormattedMessage id='marketplace.makeAnOffer' defaultMessage='Make an Offer' />
                </Modal.Header>

                <Modal.Content scrolling>

                  bla bla

                </Modal.Content>
                <Modal.Actions>
                  <Button
                    size='large'
                    inputProps={{ type: 'button' }}
                    onClick={closePopup}
                    data-test='inventory_quick_edit_pricing_popup_cancel_btn'>
                    {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
                  </Button>
                  <Button.Submit
                    primary
                    size='large'
                    type='button'
                    data-test='inventory_quick_edit_pricing_popup_save_btn'>
                    {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                  </Button.Submit>
                </Modal.Actions>
              </Modal>
              <ErrorFocus />
            </>
          )
        }}
      </CustomForm>
    )
  }
}

function mapStateToProps(store) {
  return {
    ...store.marketplace
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(MakeOfferPopup)))