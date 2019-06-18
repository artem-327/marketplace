import React, { Component } from 'react'

import { GridRow, GridColumn } from 'semantic-ui-react'
import { injectIntl } from 'react-intl'
import { Input, Checkbox as FormikCheckbox } from 'formik-semantic-ui'

class Notifications extends Component {
  render() {
    let { intl, values } = this.props
    const { formatMessage } = intl

    let disabled = !values.checkboxes.notificationEnabled

    return (
      <>
        <GridRow>
          <GridColumn computer={12}>
            <label>{formatMessage({ id: 'filter.notifications.enable', defaultMessage: 'Enable Notifications:' })}</label>
          </GridColumn>
          <GridColumn computer={4}>
            <FormikCheckbox
              name='checkboxes.notificationEnabled'
              inputProps={{ toggle: true }} />
          </GridColumn>
        </GridRow>

        <>
          <GridRow>
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
                  inputProps={{ placeholder: ' Email', disabled: !(values.checkboxes && values.checkboxes.notifyMail) || disabled }}
                  type='text'
                  name='notifications.notificationMail' />
              </GridColumn>
            }
          </GridRow >

          <GridRow>
            <GridColumn computer={7}>
              <FormikCheckbox
                inputProps={{ disabled }}
                name='checkboxes.notifyPhone'
                label={formatMessage({ id: 'filter.notifications.mobile', defaultMessage: 'Mobile Notifications:' })} />
            </GridColumn>
            {

              <GridColumn computer={9}>
                <Input
                  fluid
                  type='text'
                  name='notifications.notificationPhone'
                  inputProps={{ placeholder: ' Phone Number', disabled: !(values.checkboxes && values.checkboxes.notifyPhone) || disabled }} />
              </GridColumn>

            }
          </GridRow>
          <GridRow>
            <GridColumn>
              <FormikCheckbox
                inputProps={{ disabled }}
                name='checkboxes.notifySystem'
                label={formatMessage({ id: 'filter.notifications.system', defaultMessage: 'System Notifications:' })} />
            </GridColumn>
          </GridRow>
        </>

      </>
    )
  }
}

export default injectIntl(Notifications)