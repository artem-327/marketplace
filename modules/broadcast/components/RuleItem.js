import {Checkbox, Icon} from 'semantic-ui-react'
import PriceControl from './PriceControl'
import {Rule} from './Broadcast.style'

const EmptyIconSpace = () => <span style={{width: '1.18em', display: 'inline-block', marginRight: '0.25rem'}}>&nbsp;</span>

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

  const nodePath = item.node.getPath()

  const parentBroadcasted = nodePath.reverse().slice(1).filter(n => n.model.broadcast === 1).length > 0
  const nodeBroadcast = parentBroadcasted || broadcast === 1 ? 1 : item.node.first(n => n.model.broadcast === 1) ? 2 : 0
  const toggleDisabled =  parentBroadcasted
  const priceDisabled = nodeBroadcast !== 1 || toggleDisabled

  const controls = {
    'client': <>
      <Rule.Toggle>
        <Checkbox
          toggle
          fitted
          indeterminate={nodeBroadcast === 2}
          checked={nodeBroadcast === 1}
          disabled={toggleDisabled}
          onClick={(e) => !toggleDisabled && handleChange('broadcast', e)}
        />
      </Rule.Toggle>
      <PriceControl disabled={priceDisabled} node={item.node} onChange={onPriceChange} />
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
          {(item.children.length > 0 && type !== 'root') ? <Icon name={`chevron ${item.node.model.expanded ? 'down' : 'right'}`} /> : <EmptyIconSpace />}
          <span>{item.name}</span>
        </Rule.RowContent>

        {controls[mode]}

      </Rule.Row>

      {(expanded || type === 'root') && item.children.map((i, idx) => (
        <RuleItem
          key={idx} 
          mode={mode} 
          item={i} 
          onRowClick={onRowClick} 
          onPriceChange={onPriceChange} 
          onChange={onChange} 
        />
      ))}
    </>
  )
}

export default RuleItem