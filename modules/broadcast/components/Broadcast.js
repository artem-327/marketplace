import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import {Modal, Segment, Grid, Checkbox, GridColumn} from 'semantic-ui-react'
import {connect as fconnect, getIn, setIn} from 'formik'
import {Form, Button} from 'formik-semantic-ui'
import styled from 'styled-components'

const RuleItem = fconnect(({elements, name, model, formik: {values, setFieldValue}}) => {
  const value = getIn(values, `${model}.broadcast`)

  return (
    <>
    <RuleRow depth={model ? model.split('.').length : 1}>
      <span>{name || 'By region'}</span>

      <RuleToggle
        indeterminate={value === 2} 
        checked={value === 1}
        toggle
        onChange={(e,{checked}) => { 
          // if (checked) {
          //   let path = model.split('.')
          //   while(path.length > 1) {
          //     setFieldValue(`${path.join('.')}.broadcast`, 2)
          //     console.log(path.join('.'), getIn(values, `${path.join('.')}.broadcast`))
          //     path.pop()
          //   }
          // }
          setFieldValue(`${model}.broadcast`, checked ? 1 : 0)
        }} 
      />

      <RuleCheckbox 
        indeterminate={value === 2} 
        checked={value === 1}
        onChange={(e,{checked}) => { 
          // if (checked) {
          //   let path = model.split('.')
          //   while(path.length > 1) {
          //     setFieldValue(`${path.join('.')}.broadcast`, 2)
          //     console.log(path.join('.'), getIn(values, `${path.join('.')}.broadcast`))
          //     path.pop()
          //   }
          // }
          setFieldValue(`${model}.broadcast`, checked ? 1 : 0)
        }} 
      />
      
    </RuleRow>
    {elements.map((r,i) => <RuleItem key={i} model={`${model}.elements[${i}]`} {...r} />)}
    </>
  )
})

class Broadcast extends Component {

  render() {
    const {open, loading, data, closeBroadcast} = this.props

    return (
      <Modal open={open} onClose={closeBroadcast} centered={false}>
        <Modal.Header>Broadcast center</Modal.Header>
        <Modal.Content scrolling>
          <Form 
            initialValues={data}
            onSubmit={(values, actions) => {
              console.log(values)
              actions.setSubmitting(false)
            }}
            render={({values}) => (
              <Grid>
                <Grid.Row divided>
                  <Grid.Column width={6}>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <RulesRoot>
                      {data && <RuleItem {...data} />}
                    </RulesRoot>
                  </Grid.Column>
                </Grid.Row>
                
              </Grid>
            )} 
          />
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect(state => state.broadcast, Actions)(Broadcast)

const RulesRoot = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`
const RuleRow = styled.div`
  position: relative;
  flex: 0 0 45px;
  line-height: 45px;
  border-bottom: 1px solid #e7e7e7;
  padding-left: ${({depth}) => (depth*25)-25}px;
`
const RuleToggle = styled(Checkbox)`
  position: absolute !important;
  right: 100px;
  top: 14px;
`
const RuleCheckbox = styled(Checkbox)`
  position: absolute !important;
  right: 30px;
  top: 14px;
`
const RulesHeader = styled(RuleRow)`
  font-weight: bold;
`