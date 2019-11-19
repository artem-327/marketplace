import React, {Component} from 'react'
import './ComboBox.scss'
import debounce from 'debounce'
import PropTypes from 'prop-types'
import {DEBOUNCE_TIME} from '../../utils/constants'
import Spinner from '../Spinner/Spinner'

//TODO: maybe try http://react-autosuggest.js.org/
class RemoteComboBox extends Component {
  constructor(props) {
    super(props)
    this.filterData = debounce(this.filterData, DEBOUNCE_TIME)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.comboRef = React.createRef()
    this.state = {
      fulltext: '',
      isOpen: false,
      results_count: this.props.limit,
      hasSearched: false,
      dataFetched: this.props.dataFetched,
      items: this.props.items
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.dataFetched !== prevProps.dataFetched) this.setState({dataFetched: this.props.dataFetched})
    if (this.props.items !== prevProps.items) this.setState({items: this.props.items})
    if (
      (this.state.fulltext.length === 0 && prevState.fulltext.length > 0) ||
      (this.state.fulltext.length === 1 && prevState.fulltext.length !== 1)
    )
      this.setState({items: [], dataFetched: false})
  }

  componentDidMount() {
    if (this.props.currentValue) {
      this.setState({fulltext: this.props.currentValue}, () => {
        if (this.props.onChange) this.props.onChange(this.state.fulltext)
      })
    }

    document.addEventListener('mousedown', this.handleClickOutside, false)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentValue) {
      this.setState({fulltext: nextProps.currentValue}, () => {})
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false)
  }

  handleClickOutside(e) {
    if (this.comboRef.current.contains(e.target)) return
    this.setState({isOpen: false})
  }

  setActive(index) {
    if (this.props.scroll === undefined || this.props.scroll === -1) {
      return ''
    } else {
      if (index == this.props.scroll) {
        return ' activeSearchResult'
      }
      return ''
    }
  }

  renderResults() {
    if (!this.state.hasSearched || !this.state.isOpen || this.state.fulltext.length < 3) return

    if (this.props.isFetching)
      return (
        <div className='combo-results'>
          <Spinner />
        </div>
      )
    if (this.state.items.length > 0) {
      let res = this.state.items.map((combo, index) => (
        <div
          key={index}
          className={'combo-item' + this.setActive(index)}
          onClick={() => {
            this.setState(
              {
                fulltext: this.props.displayName
                  ? this.props.displayName(combo)
                  : combo[this.props.displayAttr] /* || combo.country.name || combo.province.name */ || combo.name,
                hasSearched: false,
                items: [],
                dataFetched: false
              },
              () => {
                if (this.props.onChange)
                  this.props.onChange(this.props.saveObj ? this.props.saveObj(combo) : this.state.fulltext)
                if (this.props.getObject) this.props.getObject(combo)
              }
            )
          }}
          data-test={`RemoteComboBox_item_${index}_action`}>
          <span className='combo-cas'>
            {this.props.displayName ? this.props.displayName(combo) : combo[this.props.displayAttr] || combo.name}
          </span>
        </div>
      ))
      return (
        <div tabIndex='-1' className={'combo-results'} style={{maxHeight: 44 * this.state.results_count}}>
          {res}
        </div>
      )
    }
    if (this.state.dataFetched === 200 && this.state.items.length === 0) {
      return (
        <div className={'combo-results'} style={{maxHeight: 44 * this.state.results_count}}>
          <p className='combo-no-result'>No results</p>
        </div>
      )
    }
  }

  handleChange(e) {
    //if(e.target.value === "") this.setState({items: [], dataFetched: false})
    this.setState({fulltext: e.target.value, hasSearched: true, isOpen: true}, () => {
      if (!!this.state.fulltext.length)
        setTimeout(() => {
          if (this.state.fulltext.length > 2) this.filterData()
        }, 700)
    })
  }

  handleTab(e) {
    if (e.keyCode == 9) this.setState({isOpen: false})
  }

  filterData() {
    this.props.api(this.state.fulltext)
  }

  render() {
    let {fulltext} = this.state
    let results = this.renderResults()
    let validate =
      this.state.fulltext.length < 3 && this.state.fulltext.length > 0 ? (
        <span className='combo-validate'>Please enter at least 3 characters.</span>
      ) : null

    return (
      <div
        className={'comboBox ' + (this.props.className ? this.props.className : '')}
        ref={this.comboRef}
        data-test='RemoteComboBox_inp'>
        <label>{this.props.label}</label>
        <i className='search combo-icon' />
        <input
          id={this.props.id}
          autoComplete='off'
          value={fulltext}
          onChange={e => this.handleChange(e)}
          onKeyDown={e => this.handleTab(e)}
          disabled={this.props.disabled || false}
          placeholder={this.props.placeholder || 'Search'}
        />
        {validate}
        {results}
      </div>
    )
  }
}

RemoteComboBox.propTypes = {
  items: PropTypes.string.isRequired,
  getObject: PropTypes.func,
  api: PropTypes.func,
  className: PropTypes.string,
  limit: PropTypes.number,
  label: PropTypes.string,
  currentValue: PropTypes.string,
  isFetching: PropTypes.bool,
  displayAttr: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}

export default RemoteComboBox
