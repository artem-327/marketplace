import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { GridRow } from 'semantic-ui-react'

import {
  DivTable,
  DivHeaderTable,
  DivHeaderColumnTable,
  DivBodyTable,
  DivBodyRowTable,
  DivBodyColumnTable,
  DivBodyRowDetail,
  ColumnDetail
} from './styles'

function Content({ items, attributes, separatedRows, hiddenDetailContentHeader, renderSubDetail, onDetailRowClick }) {
  return (
    <GridRow>
      <ColumnDetail width={16}>
        <DivTable>
          {!hiddenDetailContentHeader &&
            <DivHeaderTable>
              {attributes.map(attr => (
                <DivHeaderColumnTable widthProp={attr.width}>
                  <FormattedMessage id={`detailRow.${attr.name}`} defaultMessage='Title' />
                </DivHeaderColumnTable>
              ))}
            </DivHeaderTable>
          }
          <DivBodyTable separatedRows={separatedRows}>
            {items.map((item, index) => (
              <DivBodyRowTable isLastRow={index === items.length - 1} separatedRows={separatedRows} canWrap={item.opened} onClick={() => onDetailRowClick(item.id)}>
                {attributes.map(attr => (
                  <DivBodyColumnTable widthProp={attr.width}>{item[attr.name]}</DivBodyColumnTable>
                ))}
                {item.opened && <DivBodyRowDetail onClick={(e) => e.stopPropagation() }>{renderSubDetail(item)}</DivBodyRowDetail>}
              </DivBodyRowTable>
            ))}
          </DivBodyTable>
        </DivTable>
      </ColumnDetail>
    </GridRow>
  )
}

Content.propTypes = {
  items: PropTypes.object,
  attributes: PropTypes.array,
  separatedRows: PropTypes.bool,
  hiddenDetailContentHeader: PropTypes.bool,
  renderSubDetail: PropTypes.func,
  onDetailRowClick: PropTypes.func
}

Content.defaultProps = {
  items: {},
  attributes: [],
  separatedRows: false,
  hiddenDetailContentHeader: false,
  renderSubDetail: () => {},
  onDetailRowClick: () => {}
}

export default Content
