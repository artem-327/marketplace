import { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, Header } from 'semantic-ui-react'
import { withToastManager } from 'react-toast-notifications'
import { FormattedMessage, injectIntl } from 'react-intl'
import * as Yup from 'yup'
import { Form, Input, Button, Dropdown as FormikDropdown } from 'formik-semantic-ui-fixed-validation'
import debounce from 'lodash/debounce'

import { generateToastMarkup, getSafe, uniqueArrayByKey } from '../../../../utils/functions'
import { errorMessages } from '../../../../constants/yupValidation'
import { withDatagrid } from '../../../datagrid'
import { closePopup, putProductGroups, searchTags, postProductGroups, searchMarketSegments } from '../../actions'
import { Required } from '../../../../components/constants/layout'
import ErrorFocus from '../../../../components/error-focus'

const formValidation = () =>
  Yup.lazy(values =>
    Yup.object().shape({
      name: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage)
    })
  )

class ProductGroupsPopup extends Component {
  state = {
    selectedTagsOptions: []
  }

  componentDidMount() {
    this.setState({
      selectedTagsOptions: getSafe(() => this.props.popupValues.rawData.tags, []).map(d => {
        return {
          key: d.id,
          text: d.name,
          value: d.id
        }
      })
    })
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.popupValues &&
      ((prevProps.popupValues && prevProps.popupValues !== this.props.popupValues) || prevProps.popupValues === null)
    ) {
      this.setState({
        selectedTagsOptions: getSafe(() => this.props.popupValues.rawData.tags, []).map(d => {
          return {
            key: d.id,
            text: d.name,
            value: d.id
          }
        })
      })
    }
  }

  handleTagsSearchChange = debounce((_, { searchQuery }) => {
    this.props.searchTags(searchQuery)
  }, 250)

  handleTagsChange = (value, options) => {
    const newOptions = options.filter(el => value.some(v => el.value === v))
    this.setState({ selectedTagsOptions: newOptions })
  }

  render() {
    const {
      closePopup,
      popupValues,
      rowId,
      putProductGroups,
      postProductGroups,
      toastManager,
      intl: { formatMessage },
      datagrid,
      searchedTags,
      searchedTagsLoading,
      searchedMarketSegmentsLoading,
      searchedMarketSegments
    } = this.props
    const { selectedTagsOptions } = this.state

    const initialFormValues = {
      name: getSafe(() => popupValues.name, ''),
      tags: getSafe(() => popupValues.tags.props.ids, '')
    }

    const allTagsOptions = uniqueArrayByKey(searchedTags.concat(selectedTagsOptions), 'key')

    return (
      <Modal closeIcon onClose={() => closePopup()} open centered={false} size='small'>
        <Modal.Header>
          {popupValues ? (
            <FormattedMessage id='pruduct.groups.edit' defaultMessage='Edit Product Group' />
          ) : (
            <FormattedMessage id='pruduct.groups.add' defaultMessage='Add Product Group' />
          )}
        </Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={initialFormValues}
            validationSchema={formValidation()}
            onReset={closePopup}
            onSubmit={async (values, { setSubmitting }) => {
              const request = {}
              const propsToInclude = ['tags', 'name'] //, 'marketSegments'  commented based on https://pm.artio.net/issues/34033#note-22
              propsToInclude.forEach(prop => (values[prop] ? (request[prop] = values[prop]) : null))

              try {
                if (popupValues) await putProductGroups(rowId, request, selectedTagsOptions)
                //, selectedMarketSegmentsOptions  commented based on https://pm.artio.net/issues/34033#note-22
                else await postProductGroups(request)
              } catch (err) {
                console.error(err)
              } finally {
                setSubmitting(false)
                closePopup()
              }
            }}>
            {({ values, setFieldValue, setFieldTouched, errors, touched, isSubmitting }) => {
              return (
                <>
                  <FormGroup data-test='operations_tag_name_inp'>
                    <Input
                      name='name'
                      type='text'
                      label={
                        <>
                          <FormattedMessage id='operations.name' defaultMessage='Name'>
                            {text => text}
                          </FormattedMessage>
                          <Required />
                        </>
                      }
                      fieldProps={{ width: 8 }}
                    />
                    <FormikDropdown
                      fieldProps={{ width: 8 }}
                      label={
                        <>
                          <FormattedMessage id='product.groups.tags' defaultMessage='Tags'>
                            {text => text}
                          </FormattedMessage>
                        </>
                      }
                      name='tags'
                      options={allTagsOptions || []}
                      inputProps={{
                        loading: searchedTagsLoading,
                        search: true,
                        icon: 'search',
                        selection: true,
                        multiple: true,
                        noResultsMessage: formatMessage({
                          id: 'global.startTypingToSearch',
                          defaultMessage: 'Start typing to begin search'
                        }),
                        onSearchChange: this.handleTagsSearchChange,
                        onChange: (_, { value }) => this.handleTagsChange(value, allTagsOptions)
                      }}
                    />
                    {/*commented based on https://pm.artio.net/issues/34033#note-22*/}
                    {false && (
                      <>
                        <FormikDropdown
                          fieldProps={{ width: 5 }}
                          label={
                            <>
                              <FormattedMessage id='product.groups.marketSegment' defaultMessage='Market Segment'>
                                {text => text}
                              </FormattedMessage>
                            </>
                          }
                          name='marketSegments'
                          options={allMarketSegmentsOptions || []}
                          inputProps={{
                            loading: searchedMarketSegmentsLoading,
                            search: true,
                            icon: 'search',
                            selection: true,
                            multiple: true,
                            noResultsMessage: formatMessage({
                              id: 'global.startTypingToSearch',
                              defaultMessage: 'Start typing to begin search'
                            }),
                            onSearchChange: this.handleMarketSegmentsSearchChange,
                            onChange: (_, { value }) => this.handleMarketSegmentsChange(value, allMarketSegmentsOptions)
                          }}
                        />
                      </>
                    )}
                  </FormGroup>

                  <div style={{ textAlign: 'right' }}>
                    <Button.Reset data-test='operations_tag_reset_btn'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Reset>
                    <Button.Submit data-test='operations_tag_submit_btn'>
                      <FormattedMessage id='global.save' defaultMessage='Save'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Submit>
                  </div>
                  <ErrorFocus />
                </>
              )
            }}
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  putProductGroups,
  searchTags,
  postProductGroups,
  searchMarketSegments
}

const mapStateToProps = state => {
  const { popupValues } = state.productsAdmin

  return {
    rowId: getSafe(() => popupValues.id),
    popupValues: getSafe(() => popupValues, ''),
    searchedTagsLoading: state.productsAdmin.searchedTagsLoading,
    searchedTags: getSafe(() => state.productsAdmin.searchedTags.length, false)
      ? state.productsAdmin.searchedTags.map(d => ({
          key: d.id,
          text: d.name,
          value: d.id
        }))
      : []
  }
}

export default withDatagrid(
  injectIntl(connect(mapStateToProps, mapDispatchToProps)(withToastManager(ProductGroupsPopup)))
)
