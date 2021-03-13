/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

// Components
import { GridRow, GridColumn, Checkbox } from 'semantic-ui-react'
import { Input, Dropdown } from 'formik-semantic-ui-fixed-validation'

// Styles
import {
  DivHeaderRow,
  DivHeaderCaption,
  GridStyled,
  CheckboxStyled
} from './CasProductSection.styles'

const CasProductSection = props => {
  const {
    intl: { formatMessage },
    items,
    toggle,
    formikProps
  } = props

  const toggleValue = getSafe(() => formikProps.values[toggle], true)

  // ! ! defaultMessage={item[0]}
  return (
    <div>
      <DivHeaderRow>
        <DivHeaderCaption>
          {props.label}
        </DivHeaderCaption>
        {toggle && (
          <CheckboxStyled
            toggle={true}
            defaultChecked={toggleValue}
            onClick={() => {
              formikProps.setFieldValue(toggle, !toggleValue)
            }}
          />
        )}
      </DivHeaderRow>

      {toggleValue && (
        <GridStyled>
          {items.map((row, rowIndex) => (
            <GridRow columns={row.length} key={rowIndex}>
              {row.map((item, itemIndex) => {
                if (!item.length) return (null)
                const type = getSafe(() => item[2], '')

                if (type === false) {
                  return (
                    <GridColumn key={itemIndex}>
                      <Dropdown
                        label={<FormattedMessage id={`casProduct.${item[1]}`} defaultMessage={'! ! ! ! ' + item[0]} />}
                        options={[
                          {
                            id: 0,
                            text: formatMessage({ id: 'global.yes', defaultMessage: 'Yes' }),
                            value: true
                          },
                          { id: 1,
                            text: formatMessage({ id: 'global.no', defaultMessage: 'No' }),
                            value: false
                          }
                        ]}
                        name={item[1]}
                        inputProps={{ 'data-test': 'cas_product_sidebar_properties_filter_drpdn' }}
                      />
                    </GridColumn>
                  )
                } else {
                  return (
                    <GridColumn data-test='settings_branches_popup_name_inp' key={itemIndex}>
                      <Input
                        type='text'
                        label={<FormattedMessage id={`casProduct.${item[1]}`} defaultMessage={'! ! ! ! ' + item[0]} />}
                        name={item[1]}
                      />
                    </GridColumn>
                  )
                }
              })}
            </GridRow>
          ))}
        </GridStyled>
      )}
    </div>
  )
}

CasProductSection.propTypes = {
  /*
  items
  label
  */
  itemsCount: PropTypes.number
}

CasProductSection.defaultProps = {
  itemsCount: 0
}

function mapStateToProps(store) {
  return {

  }
}

export default injectIntl(CasProductSection)
//export default injectIntl(connect(mapStateToProps, {  })(CasProductSection))