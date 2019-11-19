import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchProductOffer } from '../../../modules/productOffers'
import Spinner from '../../../components/Spinner/Spinner'

export function withEdit(ComposedComponent) {
  class requireEdit extends React.Component {
    componentWillMount() {
      this.props.fetchProductOffer(this.props.match.params.id)
    }

    render() {
      return this.props.isFetching ? (
        <Spinner />
      ) : (
        <ComposedComponent edit productOffer={this.props.data} {...this.props} />
      )
    }
  }

  requireEdit.propTypes = {
    isFetching: PropTypes.bool,
    data: PropTypes.object
  }

  function mapStateToProps(store) {
    return {
      isFetching: store.productOffers.productOfferFetching,
      data: store.productOffers.productOffer
    }
  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators(
      {
        fetchProductOffer
      },
      dispatch
    )
  }
  return connect(mapStateToProps, mapDispatchToProps)(requireEdit)
}
