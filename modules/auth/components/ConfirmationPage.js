import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { Grid, Header, Segment, Image, Divider } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import styled from 'styled-components'
import * as val from 'yup'

import Logo from '~/assets/images/logos/logo-dark.png'

const ConfirmSegment = styled(Segment.Group)`
  position: relative;
  display: flex !important;
  width: 800px;
  margin: 55px auto auto !important;
  padding-top: 85px !important;
  background-color: #fff !important;
`
const LogoWrapper = styled(Segment)`
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(-50%);
`
const LogoImage = styled(Image)`
  width: 126px;
  max-width: 100%;
  margin: auto;
`

const initValues = {
  address: {
    city: '',
    country: undefined,
    province: undefined,
    streetAddress: '',
    zip: ''
  },
  companyAdminUser: {
    name: '',
    jobTitle: undefined,
    phone: '',
    email: ''
  },
  dba: '',
  dunsNumber: '',
  name: '',
  tin: ''
}

const validationScheme = val.object().shape({
  address: val.object().shape({
    city: val.string().required('required'),
    country: val.number().moreThan(0, "required").required('required'),
    //province: val.number().moreThan(0, "required").required('required'),
    province: val.mixed().test(
      'requiredIfOptions',
      'required', // error message
      function test(value) {
        return ((value > 0) || (this.options.parent.availableProvinces.length === 0))
      }
    ),
    streetAddress: val.string().required('required'),
    zip: val.string().required('required')
  }),
  companyAdminUser: val.object().shape({
    name: val.string().required('required'),
    jobTitle: val.string(),
    phone: val.string().required('required'),
    email: val.string().email().required('required')
  }),
  dba: val.string(),
  dunsNumber: val.number().moreThan(0, 'DUNS Number can not be negative'),
  name: val.string().required('required'),
  tin: val.string().required('required')
})

class ConfirmationPage extends Component {

  render() {
    const {
      confirmationForm,
      reviewCompany,
      searchedCountries,
      searchedProvinces,
      searchCountries,
      searchProvinces
    } = this.props

    return (
      <Form initialValues={{ ...initValues, ...confirmationForm }}
            validationSchema={validationScheme}
            onSubmit={(values, actions) => {
              reviewCompany(values)
              actions.setSubmitting(false)
            }}
            className='flex stretched'
            style={{ padding: '20px' }}>
        {({ values, setFieldValue, validateForm, submitForm }) => (
          <ConfirmSegment raised compact>
            <Segment padded='very' style={{ position: 'static', paddingTop: '0' }}>
              <LogoWrapper basic textAlign='center'>
                <LogoImage src={Logo} />
              </LogoWrapper>
                    <Header as='h2' textAlign='center'>
                      Last Step
                    </Header>
                    <Header as='h2' textAlign='center' style={{ marginTop: '0', paddingTop: '0.5em', fontSize: '1.14285714em' }}>Please verify the company information below.</Header>

                    <Header as='h3'>Company Profile</Header>
                    <Grid>
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <Input label='Company Legal Name *'
                                 name='name' />
                        </Grid.Column>
                        <Grid.Column>
                          <Input label='DBA'
                                 name='dba' />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <Header as='h3'>Company Primary Address</Header>
                    <Grid>
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <Input label='Street Address 1 *'
                                 name='address.streetAddress' />
                        </Grid.Column>
                        <Grid.Column>
                          <Dropdown label='Country *'
                                    name='address.country'
                                    options={confirmationForm.address.availableCountries}
                                    inputProps={{
                                      search: options => options,
                                      onSearchChange: (e, {searchQuery}) => searchCountries(searchQuery),
                                      onChange: async (e, {value}) => {
                                        setFieldValue('address.province', 0)

                                        const searchedProvinces = await searchProvinces(value)
                                        setFieldValue('address.availableProvinces', searchedProvinces.value.data.map(province => ({
                                          key: province.id,
                                          text: province.name,
                                          value: province.id
                                        })))
                                        validateForm().then(r => {
                                          // stop when errors found
                                          if (Object.keys(r).length) {
                                            submitForm() // show errors
                                          }
                                        })
                                      }
                                    }} />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={8}>
                          <Input label='City *'
                                 name='address.city' />
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <Dropdown label='State *'
                                    name='address.province'
                                    options={confirmationForm.address.availableProvinces}
                                    inputProps={{
                                      selection: true,
                                      value: 0
                                    }} />
                        </Grid.Column>
                        <Grid.Column width={3}>
                          <Input label='Zip *'
                                 name='address.zip' />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <Input label='EIN Number *'
                                 name='tin' />
                        </Grid.Column>
                        <Grid.Column>
                          <Input label='DUNS Number'
                                 name='dunsNumber' />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <Header as='h3'>Company Admin Profile</Header>
                    <Grid>
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <Input label='Name *'
                                 name='companyAdminUser.name' />
                        </Grid.Column>
                        <Grid.Column>
                          <Input label='Title'
                                 name='companyAdminUser.jobTitle' />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row columns={2}>
                        <Grid.Column>
                          <Input label='Phone *'
                                 name='companyAdminUser.phone' />
                        </Grid.Column>
                        <Grid.Column>
                          <Input label='E-Mail *'
                                 name='companyAdminUser.email' />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
            </Segment>
            <Segment padded='very'>
              <Grid>
                <Grid.Row>
                  <Grid.Column aligned='right' textAlign='right'>
                    <Button style={{ marginRight: '1em' }}>Cancel</Button>
                    <Button.Submit color='blue'>Enter Echo Exchange</Button.Submit>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </ConfirmSegment>
        )}
      </Form>
    )
  }
}

const stateToProps = ({ auth: { confirmationForm } }) => ({confirmationForm})

export default connect(stateToProps, Actions)(ConfirmationPage)