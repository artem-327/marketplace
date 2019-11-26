import React, { Component } from 'react'
import FilterTag from './FilterTag'
import './filterTags.scss'
class FilterTags extends Component {
  renderTags() {
    return this.props.filterTags.map((tag, index) => {
      return (
        <FilterTag
          packagingTypes={this.props.packagingTypes}
          productConditions={this.props.productConditions}
          productForms={this.props.productForms}
          productGradeTypes={this.props.productGradeTypes}
          //zipCode={this.props.zipCode}
          //warehouseDistances={this.props.warehouseDistances}
          resetForm={this.props.resetForm}
          key={index}
          name={tag.name}
          dispatch={this.props.dispatch}
          value={tag.value}
          close={() =>
            this.props.closeFilterTag(index).then(() => {
              let filter = {}
              this.props.filterTags.map(input => {
                filter[input.name] = input.value
                return true
              })
              this.props.closeFunc(filter)
            })
          }
        />
      )
    })
  }

  render() {
    return <div className='filterTags'>{this.renderTags()}</div>
  }
}

export default FilterTags
