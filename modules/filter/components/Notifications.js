import React, { Component } from 'react'

import { GridColumn, Grid } from 'semantic-ui-react'
import { injectIntl } from 'react-intl'
import { Input, Checkbox as FormikCheckbox } from 'formik-semantic-ui-fixed-validation'

import { LessPaddedRow } from '../constants/layout'

class Notifications extends Component {
  render() {
    let { intl, values } = this.props
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
              inputProps={{ disabled, 'data-test': 'filter_notifications_notifyMail_chckb' }}
              name='checkboxes.notifyMail'
              label={formatMessage({ id: 'filter.notifications.email', defaultMessage: 'Email Notifications:' })}
            />
          </GridColumn>
          {
            <GridColumn computer={9} data-test='filter_notifications_email_inp'>
              <Input
                fluid
                fieldProps={{ disabled: !(values.checkboxes && values.checkboxes.notifyMail) || disabled }}
                inputProps={{ placeholder: ' Email', style: { marginTop: '-9px', marginBottom: '-10px' } }}
                type='text'
                name='notifications.notificationMail'
              />
            </GridColumn>
          }
        </LessPaddedRow>

        <LessPaddedRow>
          <GridColumn computer={7}>
            <FormikCheckbox
              inputProps={{ disabled, 'data-test': 'filter_notifications_notifyPhone_chckb' }}
              name='checkboxes.notifyPhone'
              label={formatMessage({ id: 'filter.notifications.mobile', defaultMessage: 'Mobile Notifications:' })}
            />
          </GridColumn>
        </LessPaddedRow>
        <LessPaddedRow>
          <GridColumn computer={7}>
            <FormikCheckbox
              inputProps={{ disabled, 'data-test': 'filter_notifications_notifySystem_chckb' }}
              name='checkboxes.notifySystem'
              label={formatMessage({ id: 'filter.notifications.system', defaultMessage: 'System Notifications:' })}
            />
          </GridColumn>
        </LessPaddedRow>
      </Grid>
    )
  }
}

export default injectIntl(Notifications)
