import React, { Component } from 'react'

import { GridColumn, Grid } from 'semantic-ui-react'
import { injectIntl } from 'react-intl'
import { Input, Checkbox as FormikCheckbox } from 'formik-semantic-ui'

import { LessPaddedRow } from '../constants/layout'

class Notifications extends Component {
  render() {
    let { intl, values } = this.props
    const { formatMessage } = intl

    let disabled = !values.checkboxes.notificationEnabled

    return (
      <Grid verticalAlign='middle'>
        <LessPaddedRow>
          <GridColumn computer={14}>
            <label>{formatMessage({ id: 'filter.notifications.enable', defaultMessage: 'Enable Notifications:' })}</label>
          </GridColumn>
          <GridColumn computer={2}>
            <FormikCheckbox
              name='checkboxes.notificationEnabled'
              inputProps={{ toggle: true }} />
          </GridColumn>
        </LessPaddedRow>

        <LessPaddedRow>
          <GridColumn computer={7}>
            <FormikCheckbox
              inputProps={{ disabled }}
              name='checkboxes.notifyMail'
              label={formatMessage({ id: 'filter.notifications.email', defaultMessage: 'Email Notifications:' })} />
          </GridColumn>
          {
            <GridColumn computer={9}>
              <Input
                fluid
                fieldProps={{ disabled: !(values.checkboxes && values.checkboxes.notifyMail) || disabled }}
                inputProps={{ placeholder: ' Email' }}
                type='text'
                name='notifications.notificationMail' />
            </GridColumn>
          }
        </LessPaddedRow >

        <LessPaddedRow>
          <GridColumn computer={7}>
            <FormikCheckbox
              inputProps={{ disabled }}
              name='checkboxes.notifyPhone'
              label={formatMessage({ id: 'filter.notifications.mobile', defaultMessage: 'Mobile Notifications:' })} />
          </GridColumn>
        </LessPaddedRow>
        <LessPaddedRow>
          <GridColumn>
            <FormikCheckbox
              inputProps={{ disabled }}
              name='checkboxes.notifySystem'
              label={formatMessage({ id: 'filter.notifications.system', defaultMessage: 'System Notifications:' })} />
          </GridColumn>
        </LessPaddedRow>

      </Grid>
    )
  }
}

export default injectIntl(Notifications)