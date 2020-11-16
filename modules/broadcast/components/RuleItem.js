import { Icon, Checkbox } from 'semantic-ui-react'
import PriceControl from './PriceControl'
import { Rule } from './Broadcast.style'
import { getBroadcast } from '~/modules/broadcast/utils'
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
    getCompanyInfo,
    changeInModel,
    associationFilter,
    treeData
  } = props
  // let item = _.cloneDeep(props.item)
  let { item } = props
  let {
    model: { name, rule }
  } = item

  const handleRowClick = i => {
    onRowClick(i)
  }

  // Get company name from item based on id with 2 loops. When find the same id then has companyName and breaks all loops
  const findCompany = () => {
    if (getSafe(() => item.model.rule.type, null) === 'branch') {
      for (let i in getSafe(() => item.parent.model.rule.elements, [])) {
        if (getSafe(() => item.parent.model.rule.elements[i].elements.length, '')) {
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
  let nodeBroadcast = rule.broadcast
  const hasNonHiddenChild = item.first(n => !n.model.rule.hidden)

  const displayArrow = item.children.length > 0 && rule.type !== 'root' && hasNonHiddenChild

  if (filter.category === 'branch' && item.isRoot()) {
    let all = item.all(n => n.model.rule.type === 'branch').length

    let broadcastingTo = item.all(n => n.model.rule.type === 'branch' && n.model.rule.broadcast === 1).length

    if (all === broadcastingTo) nodeBroadcast = 1
    else if (broadcastingTo === 0) nodeBroadcast = 0
  } else if (item.hasChildren()) {
    nodeBroadcast = getBroadcast(item)
  }

  if (rule.hidden || (filter.category === 'branch' && rule.type === 'company' && !hasNonHiddenChild)) {
    return null
  }

  let companyName = findCompany()

  return (
    <>
      <Rule.Row
        type={rule.type}
        onClick={() => rule.type !== 'root' && handleRowClick(item)}
        data-test='broadcast_rule_row_click'
        style={asSidebar ? { 'justify-content': 'flex-end' } : {}}>
        <Rule.Toggle
          style={
            asSidebar ? { flex: '0 0 62px' } : { flex: '0 0 88px', maxWidth: '60px', paddingLeft: '0 !important' }
          }>
          <Checkbox
            className={rule.priceOverride && nodeBroadcast === 1 && 'independent'}
            data-test='broadcast_rule_toggle_chckb'
            toggle
            fitted
            indeterminate={nodeBroadcast === 2}
            checked={nodeBroadcast === 1}
            // disabled={toggleDisabled}
            onClick={e => onChange(item, 'broadcast', e)}
          />
        </Rule.Toggle>
        <Rule.RowContent depth={nodePath.length}>
          {displayArrow ? <Icon name={`chevron ${item.model.rule.expanded ? 'down' : 'right'}`} /> : <EmptyIconSpace />}
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
              <span>{companyName ? `${companyName} ${name}` : `${name}`}</span>
            </a>
          )}
        </Rule.RowContent>

        <PriceControl
          changeInModel={changeInModel}
          hideFobPrice={hideFobPrice}
          data-test='broadcast_price_control'
          offer={offer}
          disabled={nodeBroadcast === 0}
          rootRule={parentBroadcasted ? parentBroadcasted.model.rule : null}
          item={item}
          onChange={onPriceChange}
          asSidebar={asSidebar}
          filter={filter}
          associationFilter={associationFilter}
          treeData={treeData}
        />
      </Rule.Row>

      {(item.model.rule.expanded || rule.type === 'root') &&
        item.children.map((i, idx) => (
          <RuleItem
            changeInModel={changeInModel}
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
            treeData={treeData}
          />
        ))}
    </>
  )
}

export default RuleItem
