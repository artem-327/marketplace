import {Checkbox, Icon} from 'semantic-ui-react'
import PriceControl from './PriceControl'
import {Rule} from './Broadcast.style'

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
          {item.children.length > 0 && type !== 'root' && <Icon name={`chevron ${item.node.model.expanded ? 'up' : 'right'}`} />}
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