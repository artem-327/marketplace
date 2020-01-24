import React, { Component } from 'react'

import { GridColumn, Grid, GridRow } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Input, Checkbox as FormikCheckbox } from 'formik-semantic-ui-fixed-validation'
import { PhoneNumber } from '~/modules/phoneNumber'
import { LessPaddedRow } from '../constants/layout'
import Tooltip from '~/components/tooltip'

class Notifications extends Component {
  render() {
    let { intl, values, formikProps } = this.props
    const { formatMessage } = intl

    let disabled = !values.checkboxes.notificationEnabled

    return (
      <Grid verticalAlign='middle'>
        <LessPaddedRow>
          <GridColumn computer={13}>
            <label>
              {formatMessage({ id: 'filter.notifications.enable', defaultMessage: 'Enable Notifications:' })}
            </label>
          </GridColumn>
          <GridColumn computer={3}>
            <FormikCheckbox
              name='checkboxes.notificationEnabled'
              inputProps={{
                toggle: true,
                style: { marginBottom: '-4px' },
                'data-test': 'filter_notifications_enabled_chckb'
              }}
            />
          </GridColumn>
        </LessPaddedRow>


        <LessPaddedRow>
          <GridColumn computer={7}>
            <FormikCheckbox
              inputProps={{disabled, 'data-test': 'filter_notifications_notifyMail_chckb'}}
              name='checkboxes.notifyMail'
              label={formatMessage({id: 'filter.notifications.email', defaultMessage: 'Email Notifications:'})}
            />
          </GridColumn>
          <Tooltip
            disabled={!(values.checkboxes && values.checkboxes.notifyMail) || disabled}
            wide='very'
            offset='10px, 0'
            position='top center'
            trigger={
              <GridColumn computer={9} data-test='filter_notifications_email_inp'>
                <Input
                  fluid
                  fieldProps={{disabled: !(values.checkboxes && values.checkboxes.notifyMail) || disabled}}
                  inputProps={{
                    placeholder: formatMessage({id: 'filter.useMyEmail', defaultMessage: 'Use my email'}),
                    style: {marginTop: '-9px', marginBottom: '-10px'}
                  }}
                  type='text'
                  name='notifications.notificationMail'
                />
              </GridColumn>
            }>
          <div>
            <p><FormattedMessage id='filter.notifications.email.tooltipHead' /></p>
            <p><FormattedMessage id='filter.notifications.email.tooltipText' /></p>
          </div>
        </Tooltip>
        </LessPaddedRow>
        <LessPaddedRow>
          <GridColumn computer={7}>
            <FormikCheckbox
              inputProps={{ disabled, 'data-test': 'filter_notifications_notifyPhone_chckb' }}
              name='checkboxes.notifyPhone'
              label={formatMessage({ id: 'filter.notifications.mobile', defaultMessage: 'Mobile Notifications:' })}
            />
          </GridColumn>
          <Tooltip
            disabled={!(values.checkboxes && values.checkboxes.notifyPhone) || disabled}
            wide='very'
            offset='10px, 0'
            position='top center'
            trigger={
              <GridColumn computer={9} data-test='filter_notifications_mobile_inp'>
                <PhoneNumber
                  name='notifications.notificationPhone'
                  disabled={ !(values.checkboxes && values.checkboxes.notifyPhone) || disabled }
                  clearable
                  label={null}
                  values={values}
                  setFieldValue={formikProps.setFieldValue}
                  setFieldTouched={formikProps.setFieldTouched}
                  errors={formikProps.errors}
                  touched={formikProps.touched}
                  isSubmitting={formikProps.isSubmitting}
                  placeholder={formatMessage({ id: 'filter.useMyPhone', defaultMessage: 'Use my phone' })}
                />
              </GridColumn>
            }>
            <GridColumn computer={14}>
              <p><FormattedMessage id='filter.notifications.mobile.tooltipHead' /></p>
              <p><FormattedMessage id='filter.notifications.mobile.tooltipText' /></p>
            </GridColumn>
          </Tooltip>
        </LessPaddedRow>
        {false && (<LessPaddedRow>
          <GridColumn computer={7}>
            <FormikCheckbox
              inputProps={{ disabled, 'data-test': 'filter_notifications_notifySystem_chckb' }}
              name='checkboxes.notifySystem'
              label={formatMessage({ id: 'filter.notifications.system', defaultMessage: 'System Notifications:' })}
            />
          </GridColumn>
        </LessPaddedRow>)}
      </Grid>
    )
  }
}

export default injectIntl(Notifications)
