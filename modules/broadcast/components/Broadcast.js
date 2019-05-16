import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as Actions from '../actions'
import {Modal, Segment, Grid, Checkbox, Icon} from 'semantic-ui-react'
import {connect as formikConnect, getIn, setNestedObjectValues} from 'formik'
import {Form, Button} from 'formik-semantic-ui'
import styled from 'styled-components'
import TreeModel from 'tree-model'


const RuleItem = ({onChange, onRowClick, node}) => {
  
  const handleChange = (propertyName, e) => {
    e.preventDefault()
    e.stopPropagation()

    const value = node.model[propertyName]

    const newValue = value === 2 || value === 1  ? 0 : 1

    onChange(node, {[propertyName]: newValue})
  }

  const {model: {name, broadcast, anonymous, expanded}} = node

  return (
    <>
    <RuleRow depth={node.getPath().length} onClick={() => onRowClick(node)}>
      {node.hasChildren() && <Icon name={`chevron ${node.model.expanded ? 'down':'right'}`} />}
      <span>{name || 'By region'}</span>
      <RuleToggle
        indeterminate={broadcast === 2}
        checked={broadcast === 1}
        onClick={(e) => handleChange('broadcast',e)} 
      />

      <RuleCheckbox 
        indeterminate={anonymous === 2} 
        checked={anonymous === 1}
        onClick={(e) => handleChange('anonymous',e)}
      />
      
    </RuleRow>
    {expanded && node.children.map((n,i) => <RuleItem key={i} node={n} onRowClick={onRowClick} onChange={onChange} />)}
    </>
  )
}

class Broadcast extends Component {

  updateTreeSelection = (node, values) => {
    const update = (node, values) => {
      Object.keys(values).forEach(k => {
        const v = values[k]

        if (v === 1) {
      
          node.all(n => n.model[k] = 1)
          node.getPath().forEach(n => {
            const found = n.first(_n => !_n.hasChildren() && _n.model[k] !== 1)
            n.model[k] = found ? 2 : 1
          })
          node.model[k] = 1
    
        } else if (v === 0) {
    
          node.all(n => n.model[k] = 0)
          node.getPath().forEach(n => {
            const found = n.first(_n => !_n.hasChildren() && _n.model[k] === 1)
            n.model[k] = found ? 2 : 0
          })
          node.model[k] = 0
    
        }
      })
    }

    update(node, values)
  }

  handleChange = (node, values) => {
    const {updateLocalRules, treeData} = this.props
    
    this.updateTreeSelection(node, values)

    updateLocalRules(treeData.model)
  }

  handleRowClick = (node) => {
    const {updateLocalRules, treeData} = this.props
    node.model.expanded = !node.model.expanded
    if (!node.model.expanded) node.all(n => n.model.expanded = false)
    
    updateLocalRules(treeData.model)
  }

  render() {
    const {open, loading, treeData, closeBroadcast} = this.props

    return (
      <Modal open={open} onClose={closeBroadcast} centered={false}>
        <Modal.Header>Broadcast center</Modal.Header>
        <Modal.Content scrolling style={{minHeight: '80vh'}} className="flex stretched">
          <Form 
            className="flex stretched"
            onSubmit={(values, actions) => {
              actions.setSubmitting(false)
            }}
            render={({values}) => (
              <Grid className="flex stretched">
                <Grid.Row divided  className="flex stretched">
                  <Grid.Column width={6} stretched>
                  </Grid.Column>
                  <Grid.Column width={10} stretched>
                    <RulesRoot>
                      {treeData && <RuleItem node={treeData} onRowClick={this.handleRowClick} onChange={this.handleChange} />}
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

export default connect(({broadcast: {data, ...rest}}) => {
  return {
    treeData: data ? new TreeModel({childrenPropertyName: 'elements'}).parse(data) : null,
    ...rest,
  }
}, Actions)(formikConnect(Broadcast))


const RuleRow = styled.div`
  position: relative;
  flex: 0 0 45px;
  line-height: 45px;
  border-bottom: 1px solid #e7e7e7;
  padding-left: ${({depth}) => (depth*25)-25}px;
  cursor: pointer;

  &:hover {
    background-color: #EEE;
  }
`
const RulesRoot = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  overflow: auto;
`
const RulesHeader = styled(RuleRow)`
  font-weight: bold;
`
const RulesContent = styled.div`
  flex: 1 1 300px;
  display: flex;
  flex-direction: column;
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
