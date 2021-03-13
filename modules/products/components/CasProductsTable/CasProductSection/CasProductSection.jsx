/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

// Components
import { Grid, GridRow, GridColumn, Popup } from 'semantic-ui-react'
import { Input, Dropdown } from 'formik-semantic-ui-fixed-validation'

// Styles
import {
  DivHeaderRow,
  DivHeaderCaption,
  GridStyled,
  GridDropdownOptions,
  CheckboxStyled
} from './CasProductSection.styles'

// 1! ! import {SmallerTextColumn, StyledGrid} from "../../../../filter/constants/layout";

const CasProductSection = props => {
  const {
    intl: { formatMessage },
    items,
    toggle,
    hazardClasses,
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
                  return (  // Boolean type field
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
                } else if (type === 'array') {
                  return (
                    <GridColumn key={itemIndex}>
                      <Dropdown
                        label={<FormattedMessage id={`casProduct.${item[1]}`} defaultMessage={'! ! ! ! ' + item[0]} />}
                        options={hazardClasses.map(el => ({
                          id: el.id,
                          value: el.id,
                          text: el.classCode, // el.description
                          content: (
                            <GridDropdownOptions>
                              <GridRow>
                                <GridColumn computer={3}>{el.classCode}</GridColumn>

                                <GridColumn computer={13}>
                                  {el.description}
                                </GridColumn>
                              </GridRow>

                            </GridDropdownOptions>
                          )
                        }))}
                        name={item[1]}
                        inputProps={{
                          multiple: true,
                          'data-test': `cas_product_sidebar_${item[1]}_inp`
                        }}
                      />
                    </GridColumn>
                  )
                } else {
                  return (
                    <GridColumn data-test={`cas_product_sidebar_${item[1]}_inp`} key={itemIndex}>
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
    hazardClasses: store.productsAdmin.hazardClasses
      /* ! !
      .map(el => ({
      id: el.id,
      value: el.id, // {id: 10, description: "Explosive: Division Not Specified", classCode: "1"}
      text: el.classCode
    }))
    */
  }
}

export default injectIntl(connect(mapStateToProps, {  })(CasProductSection))