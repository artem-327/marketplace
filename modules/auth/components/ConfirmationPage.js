import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { Grid, Header, Segment, Image, Divider } from 'semantic-ui-react'
import { Form, Input, Button } from 'formik-semantic-ui'
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
  companyName: '',
  dba: '',
  streetAddress: '',
  streetAddress2: '',
  city: '',
  state: undefined,
  zip: '',
  einNumber: '',
  dunsNumber: '',
  firstName: '',
  lastName: '',
  title: undefined,
  phone: '',
  email: ''
}

const validationScheme = val.object().shape({
  companyName: val.string()
})

class ConfirmationPage extends Component {

  render() {
    const { confirmationForm } = this.props

    return (
      <ConfirmSegment raised compact>
        <Segment padded='very' style={{ position: 'static', paddingTop: '0' }}>
          <LogoWrapper basic textAlign='center'>
            <LogoImage src={Logo} />
          </LogoWrapper>
          <Form initialValues={{ ...initValues, ...confirmationForm }}
                validationSchema={validationScheme}
                onSubmit={(values, actions) => {

                }}
                className='flex stretched'
                style={{ padding: '20px' }}>
            {({ values, submitForm }) => (
              <>
                <Header as='h2' textAlign='center'>
                  Last Step
                </Header>
                <Header as='h2' textAlign='center' style={{ marginTop: '0', paddingTop: '0.5em', fontSize: '1.14285714em' }}>Please verify the company information below.</Header>

                <Header as='h3'>Company Profile</Header>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Input label='Company Legal Name *'
                             name='companyName' />
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
                             name='streetAddress' />
                    </Grid.Column>
                    <Grid.Column>
                      <Input label='Street Address 2'
                             name='streedAddress2' />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <Input label='City *'
                             name='city' />
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Input label='State *'
                             name='state' />
                    </Grid.Column>
                    <Grid.Column width={4}>
                      <Input label='Zip *'
                             name='zip' />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Input label='EIN Number *'
                             name='einNumber' />
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
                      <Input label='First Name *'
                             name='firstName' />
                    </Grid.Column>
                    <Grid.Column>
                      <Input label='Last Name *'
                             name='lastName' />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column width={4}>
                      <Input label='Title'
                             name='title' />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column>
                      <Input label='Phone *'
                             name='phone' />
                    </Grid.Column>
                    <Grid.Column>
                      <Input label='E-Mail *'
                             name='email' />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </>
            )}
          </Form>
        </Segment>
        <Segment padded='very'>
          <Grid>
            <Grid.Row>
              <Grid.Column aligned='right' textAlign='right'>
                <Button style={{ marginRight: '1em' }}>Cancel</Button>
                <Button color='blue'>Enter Echo Exchange</Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </ConfirmSegment>
    )
  }
}

const stateToProps = ({ auth: { confirmationForm } }) => ({confirmationForm})

export default connect(stateToProps, Actions)(ConfirmationPage)