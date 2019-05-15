import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import {Modal, Segment, Accordion, Checkbox} from 'semantic-ui-react'
import {connect as fconnect, getIn, setIn} from 'formik'
import {Form, Button} from 'formik-semantic-ui'

const setDown = (value) => {

}

const RuleItem = fconnect(({elements, name, model, formik: {values, setFieldValue}}) => {
  const value = getIn(values, `${model}.broadcast`)
  
  return (
    <ul>
      <Checkbox 
        label={name || 'Global'} 
        indeterminate={value === 2} 
        checked={value === 1}
        onChange={(e,{checked}) => { 
          let path = model.split('.')
          if (checked) {
            while(path.length > 1) {
              setFieldValue(`${path.join('.')}.broadcast`, 2)
              console.log(path.join('.'), getIn(values, `${path.join('.')}.broadcast`))
              path.pop()
            }
          }
          console.log(model.split('.'))
          setFieldValue(`${model}.broadcast`, checked ? 1 : 0)
        }} 
      />
      {elements.map((r,i) => <RuleItem key={i} model={`${model}.elements[${i}]`} {...r} />)}
    </ul>
  )
})

class Broadcast extends Component {

  render() {
    const {open, loading, data, closeBroadcast} = this.props

    return (
      <Modal open={open} onClose={closeBroadcast} centered={false}>
        <Modal.Header>Broadcast center</Modal.Header>
        <Modal.Content>
          <Form 
            initialValues={data}
            onSubmit={(values, actions) => {
              console.log(values)
              actions.setSubmitting(false)
            }}
            render={({values}) => (
              <Segment basic loading={loading} style={{minHeight: '400px'}}>
                <Button.Submit>Save</Button.Submit>
                {data && <RuleItem {...data} />}
              </Segment>
            )} 
          />
        </Modal.Content>
      </Modal>
    )
  }
}

export default connect(state => state.broadcast, Actions)(Broadcast)
