import React, { Component } from 'react'
import {string, array, object, bool} from "prop-types";
import { Form, Dropdown, Input } from 'formik-semantic-ui'
import { FormGroup } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'


export default class PhoneNumber extends Component {
  render() {
    let {
      name,
      dialCodes,
      label,
      search,

    } = this.props

    //label={label}
    return (
      <Form>
        <FormGroup widths='equal' data-test='settings_users_popup_nameTitle_inp'>
          <Dropdown
            name='phoneDial'
            options={dialCodes}
            inputProps={{
              search,
            }}
          />
          <Input
            type='text'
            name='phoneNum'
            />
        </FormGroup>
      </Form>
    )
  }
}

PhoneNumber.propTypes = {
  dialCodes: array,
  name: string.isRequired,
  label: string,
  search: bool,
}

PhoneNumber.defaultProps = {
  //dialCodes: []
  dialCodes: [{id: 0, text: '001', value: '001'}, {id: 1, text: '+420', value: '+420'}, {id: 2, text: '+421', value: '+421'}],
  search: true,
}