/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
// Services
import { getSafe } from '../../../../../utils/functions'
// Components
import { GridRow, GridColumn } from 'semantic-ui-react'
import { Input, Dropdown } from 'formik-semantic-ui-fixed-validation'
// Styles
import {
  DivHeaderRow,
  DivHeaderCaption,
  CasGridStyled,
  GridDropdownOptions,
  CheckboxStyled
} from '../../../styles'

/**
 * @Component
 * @category Products - Components / CasProductsTable / CasProductSection / CasProductSection
 */
const CasProductSection = props => {
  const {
    intl: { formatMessage },
    items,
    toggle,
    hazardClasses,
    formikProps
  } = props

  const toggleValue = getSafe(() => formikProps.values[toggle], true)

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
        <CasGridStyled>
          {items.map((row, rowIndex) => (
            <GridRow columns={row.length} key={rowIndex}>
              {row.map((item, itemIndex) => {
                if (!item.length) return (null)
                const type = getSafe(() => item[2], '')

                if (Array.isArray(type)) {
                  const inputProps = getSafe(() => item[3], {})

                  return (  // Array type field
                    <GridColumn key={itemIndex}>
                      <Dropdown
                        label={<FormattedMessage id={`casProduct.${item[1]}`} defaultMessage={item[0]} />}
                        options={
                          type.length
                            ? type.map(el => ({ id: el, text: el, value: el }))
                            : [
                                {
                                  id: 0,
                                  text: formatMessage({ id: 'global.yes', defaultMessage: 'Yes' }),
                                  value: true
                                },
                                { id: 1,
                                  text: formatMessage({ id: 'global.no', defaultMessage: 'No' }),
                                  value: false
                                }
                              ]
                        }
                        name={item[1]}
                        inputProps={{
                          ...inputProps,
                          'data-test': 'cas_product_sidebar_properties_filter_drpdn'
                        }}
                      />
                    </GridColumn>
                  )
                } else if (type === 'hazard') {
                  return (
                    <GridColumn key={itemIndex}>
                      <Dropdown
                        label={<FormattedMessage id={`casProduct.${item[1]}`} defaultMessage={item[0]} />}
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
                        label={<FormattedMessage id={`casProduct.${item[1]}`} defaultMessage={item[0]} />}
                        name={item[1]}
                      />
                    </GridColumn>
                  )
                }
              })}
            </GridRow>
          ))}
        </CasGridStyled>
      )}
    </div>
  )
}

CasProductSection.propTypes = {
  items: PropTypes.array,
  toggle: PropTypes.string,
  hazardClasses: PropTypes.array,
  formikProps: PropTypes.object,
  label: PropTypes.any
}

CasProductSection.defaultProps = {
  items: [],
  toggle: '',
  hazardClasses: [],
  formikProps: {},
  label: ''
}

export default injectIntl(CasProductSection)