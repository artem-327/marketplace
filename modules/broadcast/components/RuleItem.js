import { Icon, Checkbox } from 'semantic-ui-react'
import PriceControl from './PriceControl'
import { Rule } from './Broadcast.style'
import { getNodeStatus, setBroadcast } from '~/modules/broadcast/utils'
import { getSafe } from '~/utils/functions'

const EmptyIconSpace = () => (
  <span style={{ width: '1.18em', display: 'inline-block', marginRight: '0.25rem' }}>&nbsp;</span>
)

const RuleItem = props => {
  const {
    onChange,
    onPriceChange,
    onRowClick,
    // item,
    offer,
    hideFobPrice,
    filter,
    loadingChanged,
    asSidebar,
    openModalCompanyInfo,
    getCompanyInfo
    // tree,
  } = props
  // let item = _.cloneDeep(props.item)
  let { item } = props
  let {
    model: { name, rule }
  } = item

  const handleChange = (propertyName, e) => {
    e.preventDefault()
    e.stopPropagation()

    const value = rule[propertyName]
    const newValue = value === 1 ? 0 : 1

    rule[propertyName] = newValue

    if (item.hasChildren()) {
      item.walk(node => {
        node.model.rule[propertyName] = newValue
      })

      // Hack...
      // For some reason walk above doesn't change broadcast value of regions...
      item.model.rule.elements.forEach(element => (element[propertyName] = newValue))
    }
    onChange(item)
  }

  const handleRowClick = i => {
    onRowClick(i)
  }

  //get company name from item based on id with 2 loops. When find the same id then has companyName and breaks all loops
  const findCompany = () => {
    if (getSafe(() => item.model.rule.type, null) === 'branch') {
      for (let i in getSafe(() => item.parent.model.rule.elements, [])) {
        if (item.parent.model.rule.elements[i].elements.length) {
          for (let j in item.parent.model.rule.elements[i].elements) {
            if (item.parent.model.rule.elements[i].elements[j].id === getSafe(() => item.model.rule.id, '')) {
              return item.parent.model.rule.elements[i].name
            }
          }
        }
      }
    }
    return ''
  }

  const nodePath = item.getPath()

  const broadcastedParents = nodePath
    .reverse()
    .slice(1)
    .filter(n => n.model.rule.broadcast === 1)
  const parentBroadcasted = broadcastedParents.reverse()[0]
  const nodeBroadcast = rule.broadcast

  let companyName = findCompany()

  return (
    <>
      <Rule.Row
        depth={nodePath.length}
        type={rule.type}
        onClick={() => rule.type !== 'root' && handleRowClick(item)}
        data-test='broadcast_rule_row_click'
        style={asSidebar ? { 'justify-content': 'flex-end' } : {}}>
        <Rule.RowContent>
          {item.children.length > 0 && rule.type !== 'root' ? (
            <Icon name={`chevron ${item.model.rule.expanded ? 'down' : 'right'}`} />
          ) : (
            <EmptyIconSpace />
          )}
          {rule.type !== 'branch' || (rule.type === 'branch' && companyName) ? (
            <span>{companyName ? `${companyName} ${name}` : `${name}`}</span>
          ) : (
            <a
              onClick={() => {
                try {
                  if (getSafe(() => item.parent.model.rule.id, '')) {
                    getCompanyInfo(item.parent.model.rule.id)
                    openModalCompanyInfo()
                  }
                } catch (error) {
                  console.error(error)
                }
              }}>
              {companyName ? `${companyName} ${name}` : `${name}`}
            </a>
          )}
        </Rule.RowContent>

        <Rule.Toggle style={asSidebar ? { flex: '0 0 62px' } : null}>
          <Checkbox
            className={rule.priceOverride && nodeBroadcast === 1 && 'independent'}
            data-test='broadcast_rule_toggle_chckb'
            toggle
            fitted
            indeterminate={nodeBroadcast === 2}
            checked={nodeBroadcast === 1}
            // disabled={toggleDisabled}
            onClick={e => handleChange('broadcast', e)}
          />
        </Rule.Toggle>

        <PriceControl
          hideFobPrice={hideFobPrice}
          data-test='broadcast_price_control'
          offer={offer}
          disabled={nodeBroadcast === 0}
          rootRule={parentBroadcasted ? parentBroadcasted.model.rule : null}
          item={item}
          onChange={onPriceChange}
        />
      </Rule.Row>

      {(item.model.rule.expanded || rule.type === 'root') &&
        item.children.map((i, idx) => (
          <RuleItem
            loadingChanged={loadingChanged}
            filter={filter}
            hideFobPrice={hideFobPrice}
            data-test={`broadcast_rule_item_${i}`}
            key={idx}
            item={i}
            tree={item}
            offer={offer}
            onRowClick={onRowClick}
            onPriceChange={onPriceChange}
            onChange={onChange}
            asSidebar={asSidebar}
            openModalCompanyInfo={openModalCompanyInfo}
            getCompanyInfo={getCompanyInfo}
          />
        ))}
    </>
  )
}

export default RuleItem
