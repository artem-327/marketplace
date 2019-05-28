import React, { Component } from 'react'
import pt from 'prop-types'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as Actions from '../actions'
import { Modal, Segment, Grid, Icon, Button, Form, Input, Radio, Dropdown, Dimmer, Loader, Checkbox, Message, Menu } from 'semantic-ui-react'
import TreeModel from 'tree-model'
import { Rule } from './Broadcast.style'

class PriceControl extends Component {

  static propTypes = {
    disabled: pt.bool
  }

  defaultProps = {
    disabled: false
  }

  state = {
    value: '',
    type: ''
  }

  

  constructor(props) {
    super(props)

    this.onChange = _.debounce(props.onChange, 300)
  }

  componentWillMount() {
    const { node: { model } } = this.props
    this.setState({
      type: model.priceAddition > 0 ? 'addition' : model.priceMultiplier > 0 ? 'multiplier' : '',
      value: model.priceAddition > 0 ? model.priceAddition : model.priceMultiplier > 0 ? model.priceMultiplier : ''
    })
  }

  componentWillReceiveProps({ node: { model } }) {
    // console.log('receive props:', model)

    this.setState({
      //type: model.priceAddition > 0 ? 'addition' : model.priceMultiplier > 0 ? 'multiplier' : '',
      value: model.priceAddition > 0 ? model.priceAddition : model.priceMultiplier > 0 ? model.priceMultiplier : ''
    })
  }

  handleChange = (e, { name, value }) => {
    e.preventDefault()
    e.stopPropagation()

    const { node: { model }, node, disabled } = this.props

    this.setState({ [name]: value }, () => {
      const { value, type } = this.state

      if (type === 'addition') {
        model.priceAddition = value ? parseInt(value, 10) : 0
        model.priceMultiplier = 0
        
        this.onChange(node, { priceAddition: TreeModel.priceAddition })
      } else if (type === 'multiplier') {
        model.priceMultiplier = value ? parseInt(value, 10) : 0
        model.priceAddition = 0
        
        this.onChange(node, { priceMultiplier: model.priceMultiplier })
      }
    })

    return false
  }

  render() {
    const { node: { model }, disabled } = this.props
    const { type, value } = this.state

    return (
      <Rule.Toggle style={{ paddingRight: '10px' }}>
        <Input 
          disabled={disabled}
          name="value" 
          type="number" 
          value={value} 
          onClick={e => {e.preventDefault(); e.stopPropagation()}}
          onChange={this.handleChange} 
          size='small' 
          style={{ padding: '5px', width: '80px' }} 
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Radio disabled={disabled} label='%' checked={type === 'multiplier'} onClick={(e) => this.handleChange(e, { name: 'type', value: 'multiplier' })} />
          <Radio disabled={disabled} label='$' checked={type === 'addition'} onClick={(e) => this.handleChange(e, { name: 'type', value: 'addition' })} />
        </div>
      </Rule.Toggle>
    )
  }

}
const RuleItem = (props) => {
  const { onChange, onPriceChange, onRowClick, item, mode } = props

  const handleChange = (propertyName, e) => {
    e.preventDefault()
    e.stopPropagation()

    const value = item.node.model[propertyName]

    const newValue = value === 2 || value === 1 ? 0 : 1

    onChange(item.node, { [propertyName]: newValue })
  }

  const { model: { id, broadcast, anonymous, expanded, hidden, type } } = item.node

  const controls = {
    'client': <>
      <Rule.Toggle>
        <Checkbox
          toggle
          indeterminate={broadcast === 2}
          checked={broadcast === 1}
          onClick={(e) => handleChange('broadcast', e)}
        />
      </Rule.Toggle>
      <PriceControl disabled={broadcast !== 1} node={item.node} onChange={onPriceChange} />
      {/* <Rule.Checkbox>
          <Checkbox
            indeterminate={anonymous === 2}
            checked={anonymous === 1}
            onClick={(e) => handleChange('anonymous', e)}
          />
        </Rule.Checkbox> */}
    </>,
    'price': <PriceControl node={item.node} onChange={onPriceChange} />
  }

  if (hidden) return null

  return (
    <>
      <Rule.Row depth={item.depth} type={type} onClick={() => type !== 'root' && onRowClick(item.node)}>
        <Rule.RowContent>
          {item.children.length > 0 && type !== 'root' && <Icon name={`chevron ${item.node.model.expanded ? 'down' : 'right'}`} />}
          <span>{item.name}</span>
        </Rule.RowContent>

        {controls[mode]}

      </Rule.Row>

      {(expanded || type === 'root') && item.children.map((i, idx) => <RuleItem key={idx} mode={mode} item={i} onRowClick={onRowClick} onPriceChange={onPriceChange} onChange={onChange} />)}
    </>
  )
}

class Broadcast extends Component {

  state = {
    filterSearch: ''
  }

  constructor(props) {
    super(props)

    this.handleFilterChange = _.debounce(this.handleFilterChange, 300)
  }

  componentWillReceiveProps(props) {
    this.setState({ filterSearch: props.filter.search })
  }

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

  handlePriceChange = () => {
    const { updateLocalRules, treeData } = this.props

    updateLocalRules(treeData.model)
  }

  handleChange = (node, values) => {
    const { updateLocalRules, treeData } = this.props

    this.updateTreeSelection(node, values)

    updateLocalRules(treeData.model)
  }

  handleRowClick = (node) => {
    const { updateLocalRules, treeData } = this.props
    node.model.expanded = !node.model.expanded
    if (!node.model.expanded) node.all(n => n.model.expanded = false)

    updateLocalRules(treeData.model)
  }

  handleSearchChange = (e, { name, value }) => {
    this.setState({ filterSearch: value })

    this.handleFilterChange(e, { name, value })
  }

  handleFilterChange = (e, { name, value }) => {
    const { updateFilter, updateLocalRules, filter, treeData } = this.props

    if (name === 'search' && value.length > 0) {
      treeData.all().forEach(n => n.model.expanded = true)
      //updateLocalRules(treeData.model)
    } else {
      treeData.all().forEach(n => n.model.expanded = false)
    }

    updateFilter({
      ...filter,
      [name]: value
    })
  }

  getFilteredTree = () => {
    const { treeData, filter } = this.props

    const fs = filter.search.toLowerCase()

    const searchFn = (n => {
      var found = false
      const name = n.model.name.toLowerCase()

      if (name.startsWith(fs)) {
        return true
      }

      name.split(' ').forEach(s => {
        if (s.startsWith(fs)) { found = true; return }
      })

      return found
    })

    const searchParentFn = (n => n.first(i => i.model.type !== 'company' && searchFn(i)))

    const presets = {
      region: () => ({
        name: "By region",
        type: treeData.model.type,
        node: treeData,
        depth: 1,
        children: treeData.children.filter(n => searchParentFn(n)).map(n1 => ({
          name: n1.model.name,
          type: n1.model.type,
          node: n1,
          depth: 2,
          children: n1.children.filter(n => searchFn(n) || searchParentFn(n)).map(n2 => ({
            name: n2.model.name,
            type: n2.model.type,
            node: n2,
            depth: 3,
            children: n2.all(n => n.model.type === 'branch' && searchFn(n)).map(n3 => ({
              name: n3.model.name,
              type: n3.model.type,
              node: n3,
              depth: 4,
              children: []
            }))
          }))
        }))
      }),
      branch: () => ({
        name: "By company",
        type: treeData.model.type,
        node: treeData,
        depth: 1,
        children: treeData.all(n => n.model.type === 'company').map(n1 => ({
          name: n1.model.name,
          type: n1.model.type,
          node: n1,
          depth: 2,
          children: n1.children.map(n2 => ({
            name: n2.model.name,
            type: n2.model.type,
            node: n2,
            depth: 3,
            children: []
          }))
        }))
      })
    }


    return presets[filter.category]()
  }

  render() {
    const { open, loading, treeData, filter, closeBroadcast, saveRules, id, mode, switchMode } = this.props
    const broadcastToBranches = treeData && `${treeData.all(n => n.model.type === 'branch' && n.model.broadcast === 1).length}/${treeData.all(n => n.model.type === 'branch').length}`

    return (
      <Modal open={open} onClose={closeBroadcast} centered={false}>
        <Modal.Header>Broadcast center</Modal.Header>
        <Modal.Content scrolling style={{ minHeight: '70vh' }} className="flex stretched">
          <Grid className="flex stretched">
            <Grid.Row divided className="flex stretched">
              <Grid.Column width={6}>
                {/* <div style={{ flex: '0 0', padding: '0 0 15px 0' }}>
                  <Button.Group widths={2}>
                    <Button onClick={() => switchMode('client')} active={mode === 'client'} basic={mode !== 'client'} color="blue">Client list</Button>
                    <Button onClick={() => switchMode('price')} basic={mode !== 'price'} active={mode === 'price'} color="blue">Price list</Button>
                  </Button.Group>
                </div> */}
                <div>
                  <Message info size='large' style={{ padding: '6px 15px' }}>
                    <Icon name='info circle' />
                    Broadcasting to: <strong>{broadcastToBranches}</strong>
                  </Message>
                  <Form>
                    <Form.Field>
                      <label>Category filter</label>
                      <Dropdown
                        selection
                        name="category"
                        value={filter.category}
                        onChange={this.handleFilterChange}
                        options={[
                          { key: 'region', text: 'All Regions', value: 'region' },
                          { key: 'branch', text: 'All Companies', value: 'branch' },
                        ]}
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Filter</label>
                      <Input name="search" icon='search' iconPosition='left' value={this.state.filterSearch} onChange={this.handleSearchChange} />
                    </Form.Field>
                  </Form>
                </div>
              </Grid.Column>
              <Grid.Column width={10} stretched>
                <Rule.Root>
                  <Rule.Header>
                    <Rule.RowContent>
                      Region select
                    </Rule.RowContent>
                    <Rule.Toggle>
                      Include
                    </Rule.Toggle>
                    <Rule.Toggle style={{marginRight: '20px'}}>
                      Mark-up/down
                    </Rule.Toggle>
                    {/* <Rule.Toggle>
                      {mode === "client" ? "Include" : "Mark-up/down"}
                    </Rule.Toggle> */}
                    {/* <Rule.Checkbox>
                      Anomymous
                    </Rule.Checkbox> */}
                  </Rule.Header>
                  <Rule.Content>
                    {treeData && [this.getFilteredTree()].map(i => (
                      <RuleItem
                        item={i}
                        mode={mode}
                        onRowClick={this.handleRowClick}
                        onPriceChange={this.handlePriceChange}
                        onChange={this.handleChange}
                      />
                    ))}
                    {loading && <Dimmer active inverted><Loader active /></Dimmer>}
                  </Rule.Content>
                </Rule.Root>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => saveRules(id, treeData.model)}>Save</Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default connect(({ broadcast: { data, filter, ...rest } }) => {
  const treeData = data ? new TreeModel({ childrenPropertyName: 'elements' }).parse(data) : null
  return {
    treeData,
    filter,
    ...rest,
  }
}, Actions)(Broadcast)

