import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, track, actions } from "react-redux-form";
import BroadcastField from "./BroadcastField";
import StateBroadcastField from "./StateBroadcastField";
import RegionBroadcastField from "./RegionBroadcastField";
import RootBroadcastField from "./RootBroadcastField";
import {RegionsSearchBox, StatesSearchBox, CompaniesSearchBox, DefaultSearchBox} from "./BroadcastSearchBoxes";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import PopupComponent from "../../../../../components/PopUp/PopupComponent";
import Button from "../../../../../components/Button/Button";
import Spinner from '../../../../../components/Spinner/Spinner'

import "./AddBroadcast.css";

class AddBroadcast extends Component {
  state = {
    isList: true,
    categoryFilter: false,
    regionsExpanded: [],
    statesExpanded: [],
    clickedModel: "",
    clickedModelId: false,
  };

  componentDidMount() {
    const {dispatch} = this.props
    this.props.fetchRegions()


    new Promise((resolve) => {
      this.props.fetchBroadcast(resolve)
    }).then(() => {
      const root = this.props.broadcastData.root
      if(root.anonymous === 1 || root.anonymous === 2) dispatch(actions.change(`forms.broadcastRules.root[${root.id}].anonymous`, true))
      if(root.broadcast === 1 || root.broadcast === 2) dispatch(actions.change(`forms.broadcastRules.root[${root.id}].broadcast`, true))
      if(root.priceAddition) {
        dispatch(actions.change(`forms.broadcastRules.root[${root.id}].priceValue`, root.priceAddition))
        dispatch(actions.change(`forms.broadcastRules.root[${root.id}].priceUnit`, "$"))
      }
      if(root.priceMultiplier) {
        dispatch(actions.change(`forms.broadcastRules.root[${root.id}].priceValue`, root.priceMultiplier))
        dispatch(actions.change(`forms.broadcastRules.root[${root.id}].priceUnit`, "$"))
      }

      const regions = root.regions
      regions.forEach(region => {
        if(region.anonymous === 1 || region.anonymous === 2) dispatch(actions.change(`forms.broadcastRules.region[${region.id}].anonymous`, true))
        if(region.broadcast === 1 || region.broadcast === 2) dispatch(actions.change(`forms.broadcastRules.region[${region.id}].broadcast`, true))
        if(region.priceAddition) {
          dispatch(actions.change(`forms.broadcastRules.region[${region.id}].priceValue`, region.priceAddition))
          dispatch(actions.change(`forms.broadcastRules.region[${region.id}].priceUnit`, "$"))
        }
        if(region.priceMultiplier) {
          dispatch(actions.change(`forms.broadcastRules.region[${region.id}].priceValue`, region.priceMultiplier))
          dispatch(actions.change(`forms.broadcastRules.region[${region.id}].priceUnit`, "$"))
        }
      })

      const states = regions.map(i => {
        const statesWithId = i.states.map(j => {
          j.regionId = i.id;
          return j;
        })
        return statesWithId;
      })
      
      const flattenStates = states.flat()
      flattenStates.forEach(state => {
        if(state.anonymous === 1 || state.anonymous === 2) dispatch(actions.change(`forms.broadcastRules.state[${state.id}].anonymous`, true))
        if(state.broadcast === 1 || state.broadcast === 2) dispatch(actions.change(`forms.broadcastRules.state[${state.id}].broadcast`, true))
        if(state.priceAddition) {
          dispatch(actions.change(`forms.broadcastRules.state[${state.id}].priceValue`, state.priceAddition))
          dispatch(actions.change(`forms.broadcastRules.state[${state.id}].priceUnit`, "$"))
        }
        if(state.priceMultiplier) {
          dispatch(actions.change(`forms.broadcastRules.state[${state.id}].priceValue`, state.priceMultiplier))
          dispatch(actions.change(`forms.broadcastRules.state[${state.id}].priceUnit`, "$"))
        }
     })

     const companies = flattenStates.map(i => {
        const companiesWithId = i.companies.map(j => {
          j.stateId = i.id;
          j.regionId = i.regionId;
          return j;
        })
        return companiesWithId;
      })
    
     const flattenCompanies = companies.flat()
     flattenCompanies.forEach(company => {
       if(company.anonymous === 1 || company.anonymous === 2) dispatch(actions.change(`forms.broadcastRules.company[${company.id}].anonymous`, true))
       if(company.broadcast === 1 || company.broadcast === 2) dispatch(actions.change(`forms.broadcastRules.company[${company.id}].broadcast`, true))
       if(company.priceAddition) {
         dispatch(actions.change(`forms.broadcastRules.company[${company.id}].priceValue`, company.priceAddition))
         dispatch(actions.change(`forms.broadcastRules.company[${company.id}].priceUnit`, "$"))
       }
       if(company.priceMultiplier) {
         dispatch(actions.change(`forms.broadcastRules.company[${company.id}].priceValue`, company.priceMultiplier))
         dispatch(actions.change(`forms.broadcastRules.company[${company.id}].priceUnit`, "$"))
       }
    })

    const offices = flattenCompanies.map(i => {
      const officesWithId = i.offices.map(j => {
        j.companyId = i.id;
        j.stateId = i.stateId;
        j.regionId = i.regionId;
        return j;
      })
      return officesWithId;
    })
    const flattenOffices = offices.flat()
    flattenOffices.forEach(office => {
      if(office.anonymous === 1 || office.anonymous === 2) dispatch(actions.change(`forms.broadcastRules.office[${office.id}].anonymous`, true))
      if(office.broadcast === 1 || office.broadcast === 2) dispatch(actions.change(`forms.broadcastRules.office[${office.id}].broadcast`, true))
      if(office.priceAddition) {
        dispatch(actions.change(`forms.broadcastRules.office[${office.id}].priceValue`, office.priceAddition))
        dispatch(actions.change(`forms.broadcastRules.office[${office.id}].priceUnit`, "$"))
      }
      if(office.priceMultiplier) {
        dispatch(actions.change(`forms.broadcastRules.office[${office.id}].priceValue`, office.priceMultiplier))
        dispatch(actions.change(`forms.broadcastRules.office[${office.id}].priceUnit`, "$"))
      }
   })
  })
}




  handleExpanded = (e) => {
    const { regionsExpanded, statesExpanded } = this.state;
    const typeOfClickedItem = e.target.getAttribute('name');
    const idOfClickedItem = parseInt(e.target.id, 10);

    if (typeOfClickedItem === "office") return;
    if (typeOfClickedItem === "region") {
      const isExpanded = regionsExpanded.includes(idOfClickedItem)
      if (isExpanded) {
        const newRegionsExpanded = [ ...regionsExpanded ]
        const filtered = newRegionsExpanded.filter(i => i !== idOfClickedItem)
        this.setState({regionsExpanded: filtered})
      } else this.setState({regionsExpanded: [ ...regionsExpanded, idOfClickedItem ]})
    }
    if (typeOfClickedItem === "state") {
      const isExpanded = statesExpanded.includes(idOfClickedItem)
      if (isExpanded) {
        const newRegionsExpanded = [ ...statesExpanded ]
        const filtered = newRegionsExpanded.filter(i => i !== idOfClickedItem)
        this.setState({statesExpanded: filtered})
      } else this.setState({statesExpanded: [ ...statesExpanded, idOfClickedItem ]})
    }
  }

  handleRuleClick = (e) => {
    this.setState({clickedModel: e.target.getAttribute('name')})
    this.setState({clickedModelId: parseInt(e.target.id, 10)})
  }

  //transform storedStates/storedCompanies/storedRegions from object of objects to array of objects (the former object key is now id property)
  convertObjectToArray = (storedObject) => {
    if (!storedObject) return;
    const storedValues = Object.values(storedObject) 
    const storedKeys = Object.keys(storedObject)
    const newArray = storedValues.map((item, index) => ({...item, id: parseInt(storedKeys[index], 10)}))
    return newArray;
  }
  componentDidUpdate() {
    const {
      dispatch, storedRoot, broadcastData, 
      storedRegions, storedStates, storedCompanies, storedOffices
    } = this.props;
    const {clickedModel, clickedModelId} = this.state;

    const broadcastRoot = this.convertObjectToArray(storedRoot)
    const broadcastRegions = this.convertObjectToArray(storedRegions)
    const broadcastStates = this.convertObjectToArray(storedStates)
    const broadcastCompanies = this.convertObjectToArray(storedCompanies)
    const broadcastOffices = this.convertObjectToArray(storedOffices)

    const regions = broadcastData.root.regions
    const states = regions.map(i => i.states)
    const flattenStates = states.flat()
    const offices = flattenStates.map(state => state.companies.map(company => company.offices))
    const flattenOffices = offices.flat(2)

    if (clickedModel.includes("root")) {
      const broadcastIsChecked = broadcastRoot[0].broadcast === true ? true : false 
      if(broadcastRoot[0].broadcast === broadcastIsChecked) {
        broadcastRegions.forEach(i => dispatch(actions.change(`forms.broadcastRules.region[${i.id}].broadcast`, broadcastIsChecked)))
        broadcastStates.forEach(i => dispatch(actions.change(`forms.broadcastRules.state[${i.id}].broadcast`, broadcastIsChecked)))
        broadcastCompanies.forEach(i => dispatch(actions.change(`forms.broadcastRules.company[${i.id}].broadcast`, broadcastIsChecked)))
        broadcastOffices.forEach(i => dispatch(actions.change(`forms.broadcastRules.office[${i.id}].broadcast`, broadcastIsChecked)))
      };

      const anonymousIsChecked = broadcastRoot[0].anonymous === true ? true : false 
      if(broadcastRoot[0].anonymous === anonymousIsChecked) {
        broadcastRegions.forEach(i => dispatch(actions.change(`forms.broadcastRules.region[${i.id}].anonymous`, anonymousIsChecked)))
        broadcastStates.forEach(i => dispatch(actions.change(`forms.broadcastRules.state[${i.id}].anonymous`, anonymousIsChecked)))
        broadcastCompanies.forEach(i => dispatch(actions.change(`forms.broadcastRules.company[${i.id}].anonymous`, anonymousIsChecked)))
        broadcastOffices.forEach(i => dispatch(actions.change(`forms.broadcastRules.office[${i.id}].anonymous`, anonymousIsChecked)))
      };
    }

    if (clickedModel.includes("region")) {
      const clickedRegion = regions.find(region => region.id === clickedModelId)
      const clickedBroadcastRegion = broadcastRegions.find(region => region.id === clickedModelId)
      const isChecked = clickedBroadcastRegion.broadcast === true ? true : false 

      if (clickedBroadcastRegion.broadcast === isChecked) {
        if (broadcastRegions.every(region => region.broadcast === isChecked)) dispatch(actions.change(`forms.broadcastRules.root[1].broadcast`, isChecked))
      }

      if (clickedBroadcastRegion.broadcast === isChecked && clickedRegion.states) {
        clickedRegion.states.forEach(state => {
          dispatch(actions.change(`forms.broadcastRules.state[${state.id}].broadcast`, isChecked))
          if (state.companies) state.companies.forEach(company => {
            dispatch(actions.change(`forms.broadcastRules.company[${company.id}].broadcast`, isChecked))
            if (company.offices) company.offices.forEach(office => {
              dispatch(actions.change(`forms.broadcastRules.office[${office.id}].broadcast`, isChecked))
            })
          })
        })
      };
    }

    if (clickedModel.includes("state")) {
      const clickedState = flattenStates.find(state => state.id === clickedModelId)
      const clickedBroadcastState = broadcastStates.find(state => state.id === clickedModelId)
      const isChecked = clickedBroadcastState.broadcast === true ? true : false 

      const parentRegion = regions.find(region => region.id === clickedState.regionId)
      const statesFiltered = broadcastStates.filter(obj => parentRegion["states"].find(obj2 => obj.id === obj2.id)) 
      
      if (clickedBroadcastState.broadcast === isChecked) {
        if (statesFiltered.every(state => state.broadcast === isChecked)) dispatch(actions.change(`forms.broadcastRules.region[${clickedState.regionId}].broadcast`, isChecked))
      }

        if (clickedBroadcastState.broadcast === isChecked && clickedState.companies) {
          clickedState.companies.forEach(company => {
            if (company.offices) company.offices.forEach(office => {
              dispatch(actions.change(`forms.broadcastRules.office[${office.id}].broadcast`, isChecked))
            })
          })
        };
    }

    if (clickedModel.includes("office")) {
      // const clickedState = flattenStates.find(state => state.id === clickedModelId)
      // const clickedBroadcastState = broadcastStates.find(state => state.id === clickedModelId)
      // const isChecked = clickedBroadcastState.broadcast === true ? true : false 

      // const parentState = flattenStates.find(state => state.id === clickedState.regionId)
      // const statesFiltered = broadcastStates.filter(obj => parentState["states"].find(obj2 => obj.id === obj2.id)) 
      
      // if (clickedBroadcastState.broadcast === isChecked) {
      //   if (statesFiltered.every(state => state.broadcast === isChecked)) dispatch(actions.change(`forms.broadcastRules.region[${clickedState.regionId}].broadcast`, isChecked))
      // }
    }
  }



  // checkUpToDownBroadcasts = (storedParent, parentDetail, children, child, dispatch) => {
  //   const parent = this.convertObjectToArray(storedParent)
  //   const currentParrent = storedParent && parent.find(i => i.id === parentDetail.id)
  //   // manipulate with companies broadcast rules based on state broadcast rule

  //     if(currentParrent) {
  //       if(currentParrent.include) parentDetail[children].forEach(i => dispatch(actions.change(`forms.broadcastRules.${child}.${i.id}.include`, true)))
  //       // if(!currentParrent.include) parentDetail[children].forEach(i => dispatch(actions.change(`forms.broadcastRules.${child}.${i.id}.include`, false)))
  //       if(currentParrent.anonymous) parentDetail[children].forEach(i => dispatch(actions.change(`forms.broadcastRules.${child}.${i.id}.anonymous`, true)))
  //       // if(!currentParrent.anonymous) parentDetail[children].forEach(i => dispatch(actions.change(`forms.broadcastRules.${child}.${i.id}.anonymous`, false)))
  //       if(currentParrent.priceUnit === "%") parentDetail[children].forEach(i => dispatch(actions.change(`forms.broadcastRules.${child}.${i.id}.priceUnit`, "%")))
  //       if(currentParrent.priceUnit === "$") parentDetail[children].forEach(i => dispatch(actions.change(`forms.broadcastRules.${child}.${i.id}.priceUnit`, "$")))
  //       if(currentParrent.priceValue) parentDetail[children].forEach(i => dispatch(actions.change(`forms.broadcastRules.${child}.${i.id}.priceValue`, currentParrent.priceValue)))
  //     }
  // }

  // checkDownToUpBroadcasts = (storedChildren, parentDetail, dispatch, parentsChildren, parent) => {
  //   const children = this.convertObjectToArray(storedChildren) 
  //   const childrenFiltered = storedChildren && children.filter(obj => parentDetail[parentsChildren].find(obj2 => obj.id === obj2.id)) //from storedChildren filter only those companies that are also in the selected State
  //   const areAllBroadcasted = storedChildren && childrenFiltered.length === parentDetail[parentsChildren].length; //check that all companies from selected state has a broadcast rule

  //   const allChildrenInclude = areAllBroadcasted && childrenFiltered.every(i => i.include === true) //also check if every company broadcast-include rule is set to true
  //   const allChildrenChecked = areAllBroadcasted && childrenFiltered.every(i => i.anonymous === true) //also check if every company broadcast-anonymous rule is set to true
  //   const allChildrenUnitSame = (priceUnit) => areAllBroadcasted && childrenFiltered.every(i => i.priceUnit === priceUnit) 
  //   const allValuesEqual = arr => arr.every(i => i.priceValue === arr[0].priceValue )
  //   const allChildrenValueSame = areAllBroadcasted && allValuesEqual(childrenFiltered) 

  //   if (allChildrenInclude) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.include`, true));
  //   if (!allChildrenInclude) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.include`, false));
  //   if (allChildrenChecked) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.anonymous`, true));
  //   if (!allChildrenChecked) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.anonymous`, false));
  //   if (allChildrenUnitSame("%")) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.priceUnit`, "%"));
  //   if (allChildrenUnitSame("$")) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.priceUnit`, "$"));
  //   if (!allChildrenUnitSame("$") && !allChildrenUnitSame("%")) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.priceUnit`, ""));
  //   if (allChildrenValueSame) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.priceValue`, (childrenFiltered[0].priceValue)));
  //   if (!allChildrenValueSame) dispatch(actions.change(`forms.broadcastRules.${parent}.${parentDetail.id}.priceValue`, ""));
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const {fetchStateDetail, fetchRegionDetail, dispatch, storedCompanies, storedStates, stateDetail, regionDetail, storedRegions, searchedItem } = this.props
  //   const {stateIsExpanded, regionIsExpanded} = this.state;
  //     // manipulate companies broadcast rules based on state broadcast rule
  //     if (this.props.stateDetailIsFetching !== prevProps.stateDetailIsFetching || stateIsExpanded !== prevState.stateIsExpanded) {
  //       this.checkUpToDownBroadcasts(storedStates, stateDetail, "companies", "company", dispatch)
  //     }
  //     // manipulate states broadcast rules based on region broadcast rule
  //     if (this.props.regionDetailIsFetching !== prevProps.regionDetailIsFetching || regionIsExpanded !== prevState.regionIsExpanded) {
  //         this.checkUpToDownBroadcasts(storedRegions, regionDetail, "countries", "state", dispatch)
  //     }

  //     if ((storedCompanies && stateDetail.companies) || storedStates !== prevProps.storedStates) { 
  //       // manipulate companies broadcast rules based on state broadcast rule
  //       if(stateIsExpanded && (storedStates !== prevProps.storedStates || !prevProps.storedStates)) {
  //         this.checkUpToDownBroadcasts(storedStates, stateDetail, "companies", "company", dispatch)
  //       }
  //       // manipulate state broadcast rules on the base of companies broadcast rules
  //       if (storedCompanies !== prevProps.storedCompanies) {
  //         this.checkDownToUpBroadcasts(storedCompanies, stateDetail, dispatch, "companies", "state")
  //       }
  //     }

  //     if(regionDetail.countries && (storedRegions !== prevProps.storedRegions || storedStates !== prevProps.storedStates)) {
  //       // manipulate with region broadcast rules on the base of states broadcast rules
  //       if (storedStates !== prevProps.storedStates) { 
  //         this.checkDownToUpBroadcasts(storedStates, regionDetail, dispatch, "countries", "region")
  //       }
  //       // manipulate states broadcast rules based on region broadcast rule
  //       if(regionIsExpanded && (storedRegions !== prevProps.storedRegions || !prevProps.storedRegions)) {
  //         this.checkUpToDownBroadcasts(storedRegions, regionDetail, "countries", "state", dispatch)
  //       }
  //     }

  //     // fetch new detail after the click on broadcast-rule
  //     if (searchedItem && Object.keys(searchedItem).length !== 0) {
  //       if (!prevProps.searchedItem || searchedItem.id !== prevProps.searchedItem.id || searchedItem.type !== prevProps.searchedItem.type) {
  //           this.setState({stateIsExpanded: false}, () => fetchStateDetail(searchedItem.id)); //fetch new state detail after the new search entry
  //           this.setState({regionIsExpanded: false}, () => fetchRegionDetail(searchedItem.id)); //fetch new state detail after the new search entry
  //         }
  //     } 
  // }

  handleContinue = () => {
    console.log("broadcast was applied"); //TODO
    this.props.removePopup();
  };

  switchToList = () => {
    this.setState({ isList: true });
  };

  switchToPrice = () => {
    this.setState({ isList: false });
  };

  renderSearchField = () => {
    const {regions, states, companies, fetchStates, fetchCompanies, fetchRegions, dispatch, companiesAreFetching, statesAreFetching, regionsAreFetching } = this.props
    const {categoryFilter} = this.state;
    switch(categoryFilter){
        case 'region': return <RegionsSearchBox 
          regions={regions} 
          fetchRegions={fetchRegions} 
          isFetching={regionsAreFetching} 
          dispatch={dispatch}
      />;
        case 'state': return <StatesSearchBox
          states={states} 
          fetchStates={fetchStates} 
          isFetching={statesAreFetching} 
          dispatch={dispatch}
      />;
        case 'company': return <CompaniesSearchBox
          companies={companies} 
          fetchCompanies={fetchCompanies} 
          isFetching={companiesAreFetching} 
          dispatch={dispatch}
      />;
        default: return <DefaultSearchBox
      />;
    }
  }


  render() {
    const { removePopup, dispatch, broadcastData, broadcastIsFetching } = this.props;
    const { isList, categoryFilter, regionsExpanded, statesExpanded } = this.state;
    if (broadcastIsFetching) return <Spinner />
    console.log(this.props, this.state)
    const categoryFilterOptions = [
      { name: "Regions", id: "region" },
      { name: "States", id: "state" },
      { name: "Companies", id: "company" }
    ];
    const templatesOptions = [] //TODO

    const footerComponent = (
      <>
        <Button color="grey-white" onClick={() => removePopup()}>
          Cancel
        </Button>
        {/*<Button color="green-white" size="large-2x" onClick={() => removePopup()}>*/}
          {/*Save As Template*/}
        {/*</Button>*/}
        <Button color="blue" onClick={() => removePopup()}>
          Apply
        </Button>
      </>
    )
    return (
      <PopupComponent
        handleContinue={this.handleContinue}
        footerComponent={footerComponent}
        removePopup={removePopup}
        headerTitle="Broadcast control"
      >
        <div className="add-broadcast">
          <div className="broadcast-nav">
            <div className={isList ? "active" : ""} onClick={this.switchToList}>
              Client List
            </div>
            <div
              className={!isList ? "active" : ""}
              onClick={this.switchToPrice}
            >
              Client Price
            </div>
          </div>

          <div className="broadcast-filter">
            <div className="broadcasting-info">
              <i className="fas fa-info-circle" />
              <span>
                Broadcasting to: <b>85/260</b>
              </span>
            </div>
            <div className="group-item-wr">
              <label>Category Filter</label>
              <Dropdown
                opns={categoryFilterOptions}
                placeholder="Select Category Filter"
                onChange={value => this.setState({categoryFilter: value})}
              />
            </div>
            <div className="group-item-wr">
              {this.renderSearchField()}
            </div>
            <hr />
            <div className="group-item-wr">
              <label>Templates ({templatesOptions.length})</label>
              <Dropdown opns={[]} placeholder="Select Template" disabled={templatesOptions.length === 0 ? true : false}/>
            </div>
          </div>

          <div className="broadcast-filter-nav">
            <div className="field-name">Name {categoryFilter && `(${categoryFilter})`}</div>
            {isList ? (
              <div className="list-rules">
                <div>Include</div>
                <div>Anonymous</div>
              </div>
            ) : (
              <div>Mark-up/down</div>
            )}
          </div>

          <div className="broadcast-main">
          <Form model="forms.broadcastRules" onSubmit={v => console.log(v)}>
            <RootBroadcastField
              name="Root"
              type="root"
              rootData={broadcastData.root}
              dispatch={dispatch}
              isList={isList}
              handleExpanded={this.handleExpanded}
              regionsExpanded={regionsExpanded}
              statesExpanded={statesExpanded}
              handleRuleClick={this.handleRuleClick}
            />
          {/* {!searchedItem && regions.map(i => <RegionBroadcastField
              regionDetail={regionDetail}
              regionDetailIsFetching={regionDetailIsFetching}
              stateDetailIsFetching={stateDetailIsFetching}
              stateDetail={stateDetail}
              dispatch={dispatch}
              isList={isList}
              regionIsExpanded={regionIsExpanded === i.id}
              stateIsExpanded={stateIsExpanded}
              name={i.name}
              id={i.id}
              key={i.id}
            />)} */}
          </Form>
          </div>
        </div>
      </PopupComponent>
    );
  }
}

AddBroadcast.propTypes = {
  isFetching: PropTypes.bool,
  removePopup: PropTypes.func
};

export default AddBroadcast;
