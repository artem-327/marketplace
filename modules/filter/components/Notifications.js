import React, { Component } from 'react'

import { GridColumn, GridRow } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Input, Checkbox as FormikCheckbox } from 'formik-semantic-ui-fixed-validation'
import { PhoneNumber } from '~/modules/phoneNumber'
import { NotificationsFiltersGrid } from '../constants/layout'
import Tooltip from '~/components/tooltip'

class Notifications extends Component {
  render() {
    let { intl, values, formikProps } = this.props
    const { formatMessage } = intl

    let disabled = !values.checkboxes.notificationEnabled

    return (
      <NotificationsFiltersGrid>
        <GridRow>
          <GridColumn computer={12}>
            <label>
              {formatMessage({ id: 'filter.notifications.enable', defaultMessage: 'Enable Notifications:' })}
            </label>
          </GridColumn>
          <GridColumn computer={4}>
            <FormikCheckbox
              name='checkboxes.notificationEnabled'
              inputProps={{
                toggle: true,
                style: { marginBottom: '-4px' },
                'data-test': 'filter_notifications_enabled_chckb'
              }}
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn computer={16}>
            <FormikCheckbox
              inputProps={{disabled, 'data-test': 'filter_notifications_notifyMail_chckb'}}
              name='checkboxes.notifyMail'
              label={formatMessage({id: 'filter.notifications.email', defaultMessage: 'Email Notifications:'})}
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <Tooltip
            disabled={!(values.checkboxes && values.checkboxes.notifyMail) || disabled}
            wide='very'
            offset='10px, 0'
            position='top center'
            trigger={
              <GridColumn computer={16} data-test='filter_notifications_email_inp'>
                <Input
                  fluid
                  fieldProps={{disabled: !(values.checkboxes && values.checkboxes.notifyMail) || disabled}}
                  inputProps={{
                    placeholder: formatMessage({id: 'filter.useMyEmail', defaultMessage: 'Your Email Address'})
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
        </GridRow>
        <GridRow>
          <GridColumn computer={16}>
            <FormikCheckbox
              inputProps={{ disabled, 'data-test': 'filter_notifications_notifyPhone_chckb' }}
              name='checkboxes.notifyPhone'
              label={formatMessage({ id: 'filter.notifications.mobile', defaultMessage: 'Mobile Notifications:' })}
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <Tooltip
            disabled={!(values.checkboxes && values.checkboxes.notifyPhone) || disabled}
            wide='very'
            offset='10px, 0'
            position='top center'
            trigger={
              <GridColumn computer={16} data-test='filter_notifications_mobile_inp'>
                <div className='phoneNumber'>
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
                    placeholder={formatMessage({ id: 'filter.useMyPhone', defaultMessage: 'Your Phone Number' })}
                  />
                </div>
              </GridColumn>
            }>
            <GridColumn computer={14}>
              <p><FormattedMessage id='filter.notifications.mobile.tooltipHead' /></p>
              <p><FormattedMessage id='filter.notifications.mobile.tooltipText' /></p>
            </GridColumn>
          </Tooltip>
        </GridRow>
        {false && (<GridRow>
          <GridColumn computer={16}>
            <FormikCheckbox
              inputProps={{ disabled, 'data-test': 'filter_notifications_notifySystem_chckb' }}
              name='checkboxes.notifySystem'
              label={formatMessage({ id: 'filter.notifications.system', defaultMessage: 'System Notifications:' })}
            />
          </GridColumn>
        </GridRow>)}
      </NotificationsFiltersGrid>
    )
  }
}

export default injectIntl(Notifications)
