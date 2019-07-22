import { Checkbox, Icon } from 'semantic-ui-react'
import PriceControl from './PriceControl'
import { Rule } from './Broadcast.style'

const EmptyIconSpace = () => <span style={{ width: '1.18em', display: 'inline-block', marginRight: '0.25rem' }}>&nbsp;</span>

const RuleItem = (props) => {

  const {
    onChange,
    onPriceChange,
    onRowClick,
    item,
    offer,
    item: { model: { name, rule } }
  } = props

  const handleChange = (propertyName, e) => {
    e.preventDefault()
    e.stopPropagation()

    const value = rule[propertyName]
    const newValue = value === 1 ? 0 : 1

    rule[propertyName] = newValue

    onChange(rule)
  }

  const handleRowClick = (i) => {
    onRowClick(i)
  }

  const nodePath = item.getPath()
  const allChildrenBroadcasting = item.hasChildren() && item.all(n => !n.hasChildren()).length === item.all(n => !n.hasChildren() && n.model.rule.broadcast === 1).length
  const broadcastedParents = nodePath.reverse().slice(1).filter(n => n.model.rule.broadcast === 1)
  const parentBroadcasted = broadcastedParents.reverse()[0]

  const nodeBroadcast = !!parentBroadcasted || rule.broadcast === 1 || allChildrenBroadcasting ? 1 : item.first(n => n.model.rule.broadcast === 1) ? 2 : 0
  
  const toggleDisabled = !!parentBroadcasted
  const priceDisabled = !(rule.broadcast === 1 && !parentBroadcasted) //allChildrenBroadcasting || rule.broadcast !== 1 || toggleDisabled

  return (
    <>
      <Rule.Row depth={nodePath.length} type={rule.type} onClick={() => rule.type !== 'root' && handleRowClick(item)}>
        <Rule.RowContent>
          {(item.children.length > 0 && rule.type !== 'root') ? <Icon name={`chevron ${item.model.expanded ? 'down' : 'right'}`} /> : <EmptyIconSpace />}
          <span>{name}</span>
        </Rule.RowContent>

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
        <PriceControl 
          offer={offer} 
          disabled={priceDisabled} 
          rootRule={parentBroadcasted ? parentBroadcasted.model.rule : null} 
          rule={rule} 
          onChange={onPriceChange} 
        />
      </Rule.Row>

      {(item.model.expanded || rule.type === 'root') && item.children.map((i, idx) => (
        <RuleItem
          key={idx}
          item={i}
          offer={offer}
          onRowClick={onRowClick}
          onPriceChange={onPriceChange}
          onChange={onChange}
        />
      ))}
    </>
  )
}

export default RuleItem