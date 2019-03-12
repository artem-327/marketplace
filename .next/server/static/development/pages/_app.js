module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./localization/en.json":
/*!******************************!*\
  !*** ./localization/en.json ***!
  \******************************/
/*! exports provided: global.addNew, global.name, global.delete, global.apply, global.continue, global.pricePer, global.remove, global.selectLocation, global.cancel, global.phoneNumber, global.postalCode, global.state, global.city, global.middleName, global.firstName, global.save, global.edit, global.email, global.surname, global.lastname, global.address, global.location, global.quantity, global.weight, login.username, login.password, login.login, login.logging, login.incorrect, registration.header, registration.firstName, registration.middleName, registration.lastName, nav.Logout, nav.Dashboard, nav.Orders, nav.Clients, nav.Reports, nav.Settings, nav.Inventory, nav.dropdown.MyInventory, nav.dropdown.Marketplace, nav.dropdown.AddInventory, nav.dropdown.ShoppingCart, myInventory.myInventory, myInventory.smallHeader, filter.saved, filter.selectedFilter, filter.setFilters, filter.setFilterName, filter.clearFilter, filter.saveFilter, filter.enterFilterName, filter.savedFilters, filter.ChemicalNameCAS, filter.FromQuantity, filter.ToQuantity, filter.FromPrice, filter.ToPrice, filter.Bags, filter.Bulk, filter.Cartons/Boxes, filter.Drums, filter.FiberDrums, filter.Pails, filter.SuperSacks, filter.Totes, filter.ACSGrade, filter.ElectronicsGrade, filter.FoodGrade, filter.IndustrialGrade, filter.Kosher, filter.NFGrade, filter.Technical, filter.USP, filter.Granular, filter.FineGranular, filter.Flakes, filter.Powder, filter.Beads/Micropearls, filter.Liquid, filter.SoftSolid, filter.Fiber, filter.Damaged, filter.Expired, filter.Fair, filter.Good, filter.OffSpec, filter.Prime, filter.From, filter.To, filter.Minimum(%), filter.Maximum(%), filter.chemicalType, filter.order, filter.orderId, filter.orderDate, filter.orderFrom, filter.orderTo, filter.customer, filter.customerName, filter.product, filter.productName, filter.orderStatus, filter.quantity, filter.price, filter.packaging, filter.grade, filter.condition, filter.form, filter.expiration, filter.assay, filter.productAge, filter.chemicalSearch, filter.location, dataTable.ProductName, dataTable.ProductNumber, dataTable.Available, dataTable.Packaging, dataTable.Pkg.size, dataTable.Quantity, dataTable.Cost, dataTable.FOBPrice, dataTable.TradeName, dataTable.MFR., dataTable.Condition, dataTable.MFGDate, dataTable.Broadcast, dataTable.Merchant, dataTable.Origin, dataTable.Expiration, dataTable.Assay, dataTable.Form, dataTable.Location, dataTable.groupRow.ProductOfferings, dataTable.editListing, dataTable.customBroadcast, dataTable.deleteListing, dataTable.companyName, dataTable.editCompany, dataTable.removeCompany, dataTable.company, dataTable.companyOffice, dataTable.username, dataTable.lastName, dataTable.firstName, dataTable.roles, dataTable.officeName, dataTable.merchants, dataTable.editOffice, dataTable.removeOffice, dataTable.editUser, dataTable.removeUser, allInventory.marketplace, allInventory.shippingQuote, addInventory.addInventory, addInventory.editProductOffer, addInventory.cancelEdit, addInventory.save, addInventory.chemical, addInventory.pricing, addInventory.warehouse, addInventory.chemicalSearch, addInventory.search, addInventory.casNumberProductSearch, addInventory.mappedProductsSearch, addInventory.infoLabel, addInventory.saved, addInventory.saveMapping, addInventory.productMapping, addInventory.CasIndexName, addInventory.CasNumber, addInventory.chemicalName, addInventory.productName, addInventory.productCode, addInventory.measure, addInventory.UM, addInventory.UP, addInventory.lotNumber, addIventory.addLot, addIventory.productOffering, addInventory.manufacturer, addInventory.origin, addInventory.select, addInventory.assayMin, addInventory.assayMax, addInventory.externalNotesTip, addInventory.externalNotes, addInventory.notesPlaceholder, addInventory.internalNotesTip, addInventory.internalNotes, addInventory.totalPackages, addInventory.expirationDate, addInventory.addedLots, addInventory.uploadDocument, addInventory.setPriceAndRules, addInventory.costPer, addInventory.grossMargin, addInventory.totalSalesPrice, addInventory.splits, addInventory.minimum, addInventory.tierPricing, addInventory.warning, addInventory.tieredPricing, addInventory.quantityFrom, addInventory.quantityTo, addInventory.location.warehouse, addInventory.required, addInventory.streetAddress, addInventory.zipCode, addInventory.contactName, addInventory.invalidEmail, addInventory.warehouseName, addInventory.savedWarehouse, addInventory.newWarehouse, administration, administration.newCompanyName, administration.companies, administration.offices, administration.companyOffices, administration.users, administration.officeAdministration, administration.officeName, administration.companyName, administration.merchants, administration.companyAdministration, administration.companyDetail, merchants.table, merchants.name, namesSynonyms, namesSynonyms.searchProduct, namesSynonyms.editPrimaryName, namesSynonyms.primaryName, namesSynonyms.synonyms, operators, operators.login, cart.subtotal, cart.estimatedShipping, cart.estimatedDelivery, cart.estimatedTax, cart.total, cart.purchaseOrder, cart.backToProductOfferings, cart.1shipping, cart.shippingAddress, cart.nothing, cart.carrier, cart.cost, cart.etd, cart.serviceType, cart.2freightSelection, cart.3payment, cart.selectCreditCard, cart.paymentMethod, cart.merchant, cart.packs, cart.item, cart.productTotal, cart.placeOrder, cart.merchant.email, cart.location, cart.pricePer, cart.totalWeight, cart.origin, cart.assay, cart.condition, cart.form, cart.productOfferings, cart.backToProductPurchaseInfo, cart.shoppingCartHeader, notFound, cart.keepShopping, default */
/***/ (function(module) {

module.exports = {"global.addNew":"Add New","global.name":"Name","global.delete":"Delete","global.apply":"Apply","global.continue":"Continue","global.pricePer":"Price per {unit}","global.remove":"Remove","global.selectLocation":"Select Location","global.cancel":"Cancel","global.phoneNumber":"Phone Number","global.postalCode":"Postal Code","global.state":"State","global.city":"City","global.middleName":"Middle Name","global.firstName":"First Name","global.save":"Save","global.edit":"Edit","global.email":"E-mail","global.surname":"Surname","global.lastname":"Last Name","global.address":"Address","global.location":"Location","global.quantity":"Quantity","global.weight":"Weight","login.username":"Username","login.password":"Password","login.login":"LOG IN","login.logging":"Logging...","login.incorrect":"Incorrect username or password","registration.header":"Header","registration.firstName":"Your First Name","registration.middleName":"Your Middle Name","registration.lastName":"Your Last Name","nav.Logout":"Logout","nav.Dashboard":"Dashboard","nav.Orders":"Orders","nav.Clients":"Clients","nav.Reports":"Reports","nav.Settings":"Settings","nav.Inventory":"Inventory","nav.dropdown.MyInventory":"My Inventory","nav.dropdown.Marketplace":"Marketplace","nav.dropdown.AddInventory":"Add Inventory","nav.dropdown.ShoppingCart":"Shopping Cart","myInventory.myInventory":"MY INVENTORY","myInventory.smallHeader":"{number} products offerings selected","filter.saved":"Saved","filter.selectedFilter":"SELECTED FILTER - ","filter.setFilters":"SET FILTERS","filter.setFilterName":"Set Filter Name","filter.clearFilter":"Clear Filter","filter.saveFilter":"Save Filter","filter.enterFilterName":"Enter Filter Name","filter.savedFilters":"SAVED FILTERS","filter.ChemicalNameCAS":"Chemical name / CAS #","filter.FromQuantity":"From Quantity","filter.ToQuantity":"To Quantity","filter.FromPrice":"From Price","filter.ToPrice":"To Price","filter.Bags":"Bags","filter.Bulk":"Bulk","filter.Cartons/Boxes":"Cartons/Boxes","filter.Drums":"Drums","filter.FiberDrums":"Fiber Drums","filter.Pails":"Pails","filter.SuperSacks":"Super Sacks","filter.Totes":"Totes","filter.ACSGrade":"ACS Grade","filter.ElectronicsGrade":"Electronics Grade","filter.FoodGrade":"Food Grade","filter.IndustrialGrade":"Industrial Grade","filter.Kosher":"Kosher","filter.NFGrade":"NF Grade","filter.Technical":"Technical","filter.USP":"USP","filter.Granular":"Granular","filter.FineGranular":"Fine Granular","filter.Flakes":"Flakes","filter.Powder":"Powder","filter.Beads/Micropearls":"Beads/Micropearls","filter.Liquid":"Liquid","filter.SoftSolid":"Soft Solid","filter.Fiber":"Fiber","filter.Damaged":"Damaged","filter.Expired":"Expired","filter.Fair":"Fair","filter.Good":"Good","filter.OffSpec":"Off Spec","filter.Prime":"Prime","filter.From":"From","filter.To":"To","filter.Minimum(%)":"Minimum (%)","filter.Maximum(%)":"Maximum (%)","filter.chemicalType":"Chemical Type","filter.order":"Order","filter.orderId":"Order ID","filter.orderDate":"Order Date","filter.orderFrom":"From","filter.orderTo":"To","filter.customer":"Customer","filter.customerName":"Name","filter.product":"Product/CAS","filter.productName":"Name/Code","filter.orderStatus":"Order Status","filter.quantity":"Quantity","filter.price":"Price","filter.packaging":"Packaging","filter.grade":"Grade","filter.condition":"Condition","filter.form":"Form","filter.expiration":"Expiration","filter.assay":"Assay","filter.productAge":"Product Age","filter.chemicalSearch":"Chemical Search","filter.location":"Location","dataTable.ProductName":"Product Name","dataTable.ProductNumber":"Product Number","dataTable.Available":"Available","dataTable.Packaging":"Packaging","dataTable.Pkg.size":"Pkg. size","dataTable.Quantity":"Quantity","dataTable.Cost":"Cost","dataTable.FOBPrice":"FOB Price","dataTable.TradeName":"Trade Name","dataTable.MFR.":"MFR.","dataTable.Condition":"Condition","dataTable.MFGDate":"MFG Date","dataTable.Broadcast":"Broadcast","dataTable.Merchant":"Merchant","dataTable.Origin":"Origin","dataTable.Expiration":"Expiration","dataTable.Assay":"Assay","dataTable.Form":"Form","dataTable.Location":"Location","dataTable.groupRow.ProductOfferings":"Product Offerings: {number}","dataTable.editListing":"Edit Listing","dataTable.customBroadcast":"Custom Broadcast","dataTable.deleteListing":"Delete Listing","dataTable.companyName":"Company Name","dataTable.editCompany":"Edit Company","dataTable.removeCompany":"Remove Company","dataTable.company":"Company","dataTable.companyOffice":"Company Office","dataTable.username":"Username","dataTable.lastName":"Last Name","dataTable.firstName":"First Name","dataTable.roles":"Roles","dataTable.officeName":"Office Name","dataTable.merchants":"Merchants","dataTable.editOffice":"Edit Office","dataTable.removeOffice":"Remove Office","dataTable.editUser":"Edit User","dataTable.removeUser":"Remove User","allInventory.marketplace":"MARKETPLACE","allInventory.shippingQuote":"Shipping Quote","addInventory.addInventory":"ADD INVENTORY","addInventory.editProductOffer":"EDIT PRODUCT OFFER - {tradeName}","addInventory.cancelEdit":"Cancel Edit","addInventory.save":"Save","addInventory.chemical":"CHEMICAL","addInventory.pricing":"PRICING","addInventory.warehouse":"WAREHOUSE","addInventory.chemicalSearch":"CHEMICAL SEARCH","addInventory.search":"Search","addInventory.casNumberProductSearch":"CAS Number / Product Search","addInventory.mappedProductsSearch":"Mapped Products Search","addInventory.infoLabel":"By clicking Save Mapping; CAS Name, CAS Number, Product Name and Product Number will be mapped in our system. Next time you enter this product these fields will be pre-populated for you.","addInventory.saved":"SAVED","addInventory.saveMapping":"Save Mapping","addInventory.productMapping":"Product Mapping","addInventory.CasIndexName":"CAS Index Name","addInventory.CasNumber":"CAS Number","addInventory.chemicalName":"Chemical Name","addInventory.productName":"Product Name","addInventory.productCode":"Product Number","addInventory.measure":"Measure","addInventory.UM":"U/M","addInventory.UP":"U/P","addInventory.lotNumber":"Lot Number","addIventory.addLot":"Add Lot","addIventory.productOffering":"PRODUCT OFFERING","addInventory.manufacturer":"Manufacturer","addInventory.origin":"Origin","addInventory.select":"Select","addInventory.assayMin":"Assay Min %","addInventory.assayMax":"Assay Max %","addInventory.externalNotesTip":"External notes are visible to other merchants.","addInventory.externalNotes":"External Notes","addInventory.notesPlaceholder":"Enter notes here","addInventory.internalNotesTip":"Internal notes are visible to you or other users of your company only.","addInventory.internalNotes":"Internal Notes","addInventory.totalPackages":"Total Packages","addInventory.expirationDate":"Expiration Date","addInventory.addedLots":"ADDED LOTS","addInventory.uploadDocument":"Click To Upload C of A","addInventory.setPriceAndRules":"SET PRICE & RULES","addInventory.costPer":"Cost per {unit}","addInventory.grossMargin":"Gross Margin %","addInventory.totalSalesPrice":"Total Sales Price","addInventory.splits":"Splits","addInventory.minimum":"Minimum","addInventory.tierPricing":"Tier Pricing","addInventory.warning":"Please enter allowed Split and Minimum values first.","addInventory.tieredPricing":"TIERED PRICING","addInventory.quantityFrom":"Quantity From","addInventory.quantityTo":"Quantity To","addInventory.location.warehouse":"Warehouse","addInventory.required":"Required","addInventory.streetAddress":"Street Address","addInventory.zipCode":"Zip Code","addInventory.contactName":"Contact Name","addInventory.invalidEmail":"Invalid E-mail","addInventory.warehouseName":"Warehouse Name","addInventory.savedWarehouse":"SAVED WAREHOUSE","addInventory.newWarehouse":"NEW WAREHOUSE","administration":"ADMINISTRATION","administration.newCompanyName":"New Company Name","administration.companies":"Companies","administration.offices":"Offices","administration.companyOffices":"Company Offices","administration.users":"Users","administration.officeAdministration":"Office Administration - {office}","administration.officeName":"Office Name: {office}","administration.companyName":"Company Name: {company}","administration.merchants":"Merchants: {merchants}","administration.companyAdministration":"Company Administration - {company}","administration.companyDetail":"Company Detail","merchants.table":"MerchantsTable","merchants.name":"Name","namesSynonyms":"Names and Synonyms","namesSynonyms.searchProduct":"Search Product","namesSynonyms.editPrimaryName":"Edit Primary name and synonyms","namesSynonyms.primaryName":"Primary Name","namesSynonyms.synonyms":"Synonyms","operators":"Operators","operators.login":"Login","cart.subtotal":"Subtotal","cart.estimatedShipping":"Estimated Shipping","cart.estimatedDelivery":"Estimated Delivery","cart.estimatedTax":"Estimated Tax","cart.total":"Total","cart.purchaseOrder":"PURCHASE ORDER","cart.backToProductOfferings":"Back to Product Offerings","cart.1shipping":"1. Shipping","cart.shippingAddress":"Shipping Address","cart.nothing":"Nothing to show","cart.carrier":"Carrier","cart.cost":"Cost","cart.etd":"ETD","cart.serviceType":"Service Type","cart.2freightSelection":"2. Freight Selection","cart.3payment":"3. Payment","cart.selectCreditCard":"Select Credit Card","cart.paymentMethod":"Payment Method","cart.merchant":"Merchant","cart.packs":"{quantity} Packs","cart.item":"Item {index}","cart.productTotal":"Product Total","cart.placeOrder":"Place Order","cart.merchant.email":"Merchant: {merchant}","cart.location":"Location: {location}","cart.pricePer":"Price per {unit}: ${price}","cart.totalWeight":"Total Weight: {weight} {unit}","cart.origin":"Origin: {origin}","cart.assay":"Assay: {first} - {second}","cart.condition":"Condition: {condition}","cart.form":"Form: {form}","cart.productOfferings":"PRODUCT OFFERINGS","cart.backToProductPurchaseInfo":"Back to Product/Purchase info","cart.shoppingCartHeader":"Items ({number})","notFound":"... think we are lost, sir !","cart.keepShopping":"Keep Shopping"};

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/array/from.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/array/from.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/array/from */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/array/from.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/array/is-array */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/array/is-array.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/get-iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/get-iterator.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/is-iterable.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/is-iterable.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/is-iterable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/is-iterable.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/json/stringify */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/json/stringify.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/assign.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/assign */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/assign.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/create.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/create.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/define-property */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/define-property.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/entries.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/entries.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/entries */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/entries.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-own-property-descriptor.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-own-property-symbols.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/get-prototype-of */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-prototype-of.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/keys.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/keys.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/set-prototype-of.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/parse-int.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/parse-int */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/parse-int.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/promise.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/promise.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/promise */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/promise.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/reflect/construct.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/reflect/construct.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/reflect/construct */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/reflect/construct.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/index.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! core-js/library/fn/symbol/iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/iterator.js");

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Promise = __webpack_require__(/*! ../core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    _Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new _Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/construct.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/construct.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Reflect$construct = __webpack_require__(/*! ../core-js/reflect/construct */ "./node_modules/@babel/runtime-corejs2/core-js/reflect/construct.js");

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js");

function isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !_Reflect$construct) return false;
  if (_Reflect$construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(_Reflect$construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = _Reflect$construct;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

module.exports = _construct;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/createClass.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$defineProperty = __webpack_require__(/*! ../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _Object$defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithHoles.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithHoles.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _arrayWithHoles; });
/* harmony import */ var _core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/array/is-array */ "./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js");
/* harmony import */ var _core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0__);

function _arrayWithHoles(arr) {
  if (_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0___default()(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithoutHoles.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithoutHoles.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _arrayWithoutHoles; });
/* harmony import */ var _core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/array/is-array */ "./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js");
/* harmony import */ var _core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0__);

function _arrayWithoutHoles(arr) {
  if (_core_js_array_is_array__WEBPACK_IMPORTED_MODULE_0___default()(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js":
/*!************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _createClass; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);


function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _defineProperty; });
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js");
/* harmony import */ var _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0__);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _core_js_object_define_property__WEBPACK_IMPORTED_MODULE_0___default()(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _extends; });
/* harmony import */ var _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js");
/* harmony import */ var _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_assign__WEBPACK_IMPORTED_MODULE_0__);

function _extends() {
  _extends = _core_js_object_assign__WEBPACK_IMPORTED_MODULE_0___default.a || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _getPrototypeOf; });
/* harmony import */ var _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/get-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js");
/* harmony import */ var _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1__);


function _getPrototypeOf(o) {
  _getPrototypeOf = _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_1___default.a ? _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default.a : function _getPrototypeOf(o) {
    return o.__proto__ || _core_js_object_get_prototype_of__WEBPACK_IMPORTED_MODULE_0___default()(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inherits; });
/* harmony import */ var _core_js_object_create__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");
/* harmony import */ var _core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_create__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _setPrototypeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/setPrototypeOf.js");


function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = _core_js_object_create__WEBPACK_IMPORTED_MODULE_0___default()(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object(_setPrototypeOf__WEBPACK_IMPORTED_MODULE_1__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArray.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArray.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _iterableToArray; });
/* harmony import */ var _core_js_array_from__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/array/from */ "./node_modules/@babel/runtime-corejs2/core-js/array/from.js");
/* harmony import */ var _core_js_array_from__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_array_from__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_is_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/is-iterable */ "./node_modules/@babel/runtime-corejs2/core-js/is-iterable.js");
/* harmony import */ var _core_js_is_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_is_iterable__WEBPACK_IMPORTED_MODULE_1__);


function _iterableToArray(iter) {
  if (_core_js_is_iterable__WEBPACK_IMPORTED_MODULE_1___default()(Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return _core_js_array_from__WEBPACK_IMPORTED_MODULE_0___default()(iter);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArrayLimit.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArrayLimit.js ***!
  \*********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _iterableToArrayLimit; });
/* harmony import */ var _core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/get-iterator */ "./node_modules/@babel/runtime-corejs2/core-js/get-iterator.js");
/* harmony import */ var _core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0__);

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = _core_js_get_iterator__WEBPACK_IMPORTED_MODULE_0___default()(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableRest.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableRest.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _nonIterableRest; });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableSpread.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableSpread.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _nonIterableSpread; });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _objectSpread; });
/* harmony import */ var _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js");
/* harmony import */ var _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/object/get-own-property-symbols */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js");
/* harmony import */ var _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core-js/object/keys */ "./node_modules/@babel/runtime-corejs2/core-js/object/keys.js");
/* harmony import */ var _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_keys__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");




function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    var ownKeys = _core_js_object_keys__WEBPACK_IMPORTED_MODULE_2___default()(source);

    if (typeof _core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default.a === 'function') {
      ownKeys = ownKeys.concat(_core_js_object_get_own_property_symbols__WEBPACK_IMPORTED_MODULE_1___default()(source).filter(function (sym) {
        return _core_js_object_get_own_property_descriptor__WEBPACK_IMPORTED_MODULE_0___default()(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      Object(_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(target, key, source[key]);
    });
  }

  return target;
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _possibleConstructorReturn; });
/* harmony import */ var _helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helpers/esm/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && (Object(_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  }

  return Object(_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/setPrototypeOf.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/setPrototypeOf.js ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _setPrototypeOf; });
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");
/* harmony import */ var _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0__);

function _setPrototypeOf(o, p) {
  _setPrototypeOf = _core_js_object_set_prototype_of__WEBPACK_IMPORTED_MODULE_0___default.a || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _slicedToArray; });
/* harmony import */ var _arrayWithHoles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles */ "./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit */ "./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _nonIterableRest__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nonIterableRest */ "./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableRest.js");



function _slicedToArray(arr, i) {
  return Object(_arrayWithHoles__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || Object(_iterableToArrayLimit__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || Object(_nonIterableRest__WEBPACK_IMPORTED_MODULE_2__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js ***!
  \******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _toConsumableArray; });
/* harmony import */ var _arrayWithoutHoles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithoutHoles */ "./node_modules/@babel/runtime-corejs2/helpers/esm/arrayWithoutHoles.js");
/* harmony import */ var _iterableToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/iterableToArray.js");
/* harmony import */ var _nonIterableSpread__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nonIterableSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/nonIterableSpread.js");



function _toConsumableArray(arr) {
  return Object(_arrayWithoutHoles__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || Object(_iterableToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(arr) || Object(_nonIterableSpread__WEBPACK_IMPORTED_MODULE_2__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _typeof; });
/* harmony import */ var _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core-js/symbol/iterator */ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js");
/* harmony import */ var _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_js_symbol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core-js/symbol */ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js");
/* harmony import */ var _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_core_js_symbol__WEBPACK_IMPORTED_MODULE_1__);



function _typeof2(obj) { if (typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && typeof _core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && obj.constructor === _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a && obj !== _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && _typeof2(_core_js_symbol_iterator__WEBPACK_IMPORTED_MODULE_0___default.a) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a === "function" && obj.constructor === _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a && obj !== _core_js_symbol__WEBPACK_IMPORTED_MODULE_1___default.a.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$getPrototypeOf = __webpack_require__(/*! ../core-js/object/get-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/get-prototype-of.js");

var _Object$setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = _Object$setPrototypeOf ? _Object$getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || _Object$getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/inherits.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$create = __webpack_require__(/*! ../core-js/object/create */ "./node_modules/@babel/runtime-corejs2/core-js/object/create.js");

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ../helpers/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js");

var assertThisInitialized = __webpack_require__(/*! ./assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/setPrototypeOf.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Object$setPrototypeOf = __webpack_require__(/*! ../core-js/object/set-prototype-of */ "./node_modules/@babel/runtime-corejs2/core-js/object/set-prototype-of.js");

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = _Object$setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js":
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/helpers/typeof.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _Symbol$iterator = __webpack_require__(/*! ../core-js/symbol/iterator */ "./node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js");

var _Symbol = __webpack_require__(/*! ../core-js/symbol */ "./node_modules/@babel/runtime-corejs2/core-js/symbol.js");

function _typeof2(obj) { if (typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _Symbol === "function" && _typeof2(_Symbol$iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/array/from.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/array/from.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__(/*! ../../modules/es6.array.from */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.from.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Array.from;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/array/is-array.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/array/is-array.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.array.is-array */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.is-array.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Array.isArray;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/get-iterator.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/get-iterator.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js");
module.exports = __webpack_require__(/*! ../modules/core.get-iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator.js");


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/is-iterable.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/is-iterable.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js");
module.exports = __webpack_require__(/*! ../modules/core.is-iterable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.is-iterable.js");


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/json/stringify.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/json/stringify.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/assign.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/assign.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.assign */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.assign.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object.assign;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/create.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/create.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.create.js");
var $Object = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/define-property.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/define-property.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.define-property */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.define-property.js");
var $Object = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/entries.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/entries.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es7.object.entries */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.object.entries.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object.entries;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-own-property-descriptor.js":
/*!*******************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-own-property-descriptor.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.get-own-property-descriptor */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js");
var $Object = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-own-property-symbols.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-own-property-symbols.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.symbol */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.symbol.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-prototype-of.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/get-prototype-of.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.get-prototype-of */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-prototype-of.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object.getPrototypeOf;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/keys.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/keys.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.keys.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object.keys;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/set-prototype-of.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/object/set-prototype-of.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.object.set-prototype-of */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.set-prototype-of.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Object.setPrototypeOf;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/parse-int.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/parse-int.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.parse-int */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.parse-int.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").parseInt;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/promise.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/promise.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../modules/es6.object.to-string */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.to-string.js");
__webpack_require__(/*! ../modules/es6.string.iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__(/*! ../modules/web.dom.iterable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js");
__webpack_require__(/*! ../modules/es6.promise */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.promise.js");
__webpack_require__(/*! ../modules/es7.promise.finally */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.promise.finally.js");
__webpack_require__(/*! ../modules/es7.promise.try */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.promise.try.js");
module.exports = __webpack_require__(/*! ../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Promise;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/reflect/construct.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/reflect/construct.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.reflect.construct */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.reflect.construct.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Reflect.construct;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/index.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/index.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.symbol */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.symbol.js");
__webpack_require__(/*! ../../modules/es6.object.to-string */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.to-string.js");
__webpack_require__(/*! ../../modules/es7.symbol.async-iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.async-iterator.js");
__webpack_require__(/*! ../../modules/es7.symbol.observable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.observable.js");
module.exports = __webpack_require__(/*! ../../modules/_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").Symbol;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/iterator.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/fn/symbol/iterator.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es6.string.iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js");
__webpack_require__(/*! ../../modules/web.dom.iterable */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js");
module.exports = __webpack_require__(/*! ../../modules/_wks-ext */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js").f('iterator');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_add-to-unscopables.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_add-to-unscopables.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-instance.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-instance.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_array-includes.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_array-includes.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-length.js");
var toAbsoluteIndex = __webpack_require__(/*! ./_to-absolute-index */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-absolute-index.js");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_bind.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_bind.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var invoke = __webpack_require__(/*! ./_invoke */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_invoke.js");
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_classof.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_classof.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_create-property.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_create-property.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_dom-create.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_dom-create.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var document = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-keys.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-keys.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_for-of.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_for-of.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array-iter.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-length.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator-method.js");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js");
module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_html.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_html.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ie8-dom-define.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ie8-dom-define.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") && !__webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js")(function () {
  return Object.defineProperty(__webpack_require__(/*! ./_dom-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_dom-create.js")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_invoke.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_invoke.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iobject.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iobject.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array-iter.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array-iter.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(/*! ./_cof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-call.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-call.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-create.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-create.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(/*! ./_object-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js");
var descriptor = __webpack_require__(/*! ./_property-desc */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js")(IteratorPrototype, __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-define.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-define.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
var $iterCreate = __webpack_require__(/*! ./_iter-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-create.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js");
var getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gpo.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-detect.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-detect.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-step.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-step.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_meta.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_meta.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(/*! ./_uid */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js")('meta');
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var setDesc = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_microtask.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_microtask.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var macrotask = __webpack_require__(/*! ./_task */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_task.js").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(/*! ./_cof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_new-promise-capability.js":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_new-promise-capability.js ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-assign.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-assign.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");
var gOPS = __webpack_require__(/*! ./_object-gops */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gops.js");
var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js");
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iobject.js");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var dPs = __webpack_require__(/*! ./_object-dps */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dps.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(/*! ./_dom-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_dom-create.js")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(/*! ./_html */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_html.js").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ie8-dom-define.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js");
var dP = Object.defineProperty;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dps.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dps.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");

module.exports = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopd.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopd.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(/*! ./_object-pie */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var IE8_DOM_DEFINE = __webpack_require__(/*! ./_ie8-dom-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ie8-dom-define.js");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn-ext.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn-ext.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var gOPN = __webpack_require__(/*! ./_object-gopn */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn.js").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys-internal.js");
var hiddenKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gops.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gops.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gpo.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gpo.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js");
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys-internal.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys-internal.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var arrayIndexOf = __webpack_require__(/*! ./_array-includes */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_array-includes.js")(false);
var IE_PROTO = __webpack_require__(/*! ./_shared-key */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(/*! ./_object-keys-internal */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys-internal.js");
var enumBugKeys = __webpack_require__(/*! ./_enum-bug-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-bug-keys.js");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-sap.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-sap.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-to-array.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-to-array.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var isEnum = __webpack_require__(/*! ./_object-pie */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js").f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_parse-int.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_parse-int.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js").parseInt;
var $trim = __webpack_require__(/*! ./_string-trim */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-trim.js").trim;
var ws = __webpack_require__(/*! ./_string-ws */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-ws.js");
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_perform.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_perform.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_promise-resolve.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_promise-resolve.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine-all.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine-all.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js");
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine.js ***!
  \***********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js");


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-proto.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-proto.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(/*! ./_ctx */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js")(Function.call, __webpack_require__(/*! ./_object-gopd */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopd.js").f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-species.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-species.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var dP = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js").f;
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var TAG = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared-key.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ./_shared */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js")('keys');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(/*! ./_library */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_species-constructor.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_species-constructor.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js");
var SPECIES = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-at.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-at.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-trim.js":
/*!**************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-trim.js ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js");
var spaces = __webpack_require__(/*! ./_string-ws */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-ws.js");
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-ws.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-ws.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_task.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_task.js ***!
  \*******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js");
var invoke = __webpack_require__(/*! ./_invoke */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_invoke.js");
var html = __webpack_require__(/*! ./_html */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_html.js");
var cel = __webpack_require__(/*! ./_dom-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_dom-create.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(/*! ./_cof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_cof.js")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-absolute-index.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-absolute-index.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(/*! ./_iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iobject.js");
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-length.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-length.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(/*! ./_to-integer */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-integer.js");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(/*! ./_defined */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_defined.js");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_user-agent.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_user-agent.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js");
var defineProperty = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js");


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ./_shared */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js")('wks');
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js");
var Symbol = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator-method.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator-method.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var get = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator-method.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.is-iterable.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.is-iterable.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ./_classof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_classof.js");
var ITERATOR = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('iterator');
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
module.exports = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js").isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.from.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.from.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js");
var call = __webpack_require__(/*! ./_iter-call */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-call.js");
var isArrayIter = __webpack_require__(/*! ./_is-array-iter */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array-iter.js");
var toLength = __webpack_require__(/*! ./_to-length */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-length.js");
var createProperty = __webpack_require__(/*! ./_create-property */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_create-property.js");
var getIterFn = __webpack_require__(/*! ./core.get-iterator-method */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/core.get-iterator-method.js");

$export($export.S + $export.F * !__webpack_require__(/*! ./_iter-detect */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-detect.js")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.is-array.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.is-array.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");

$export($export.S, 'Array', { isArray: __webpack_require__(/*! ./_is-array */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array.js") });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.iterator.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.iterator.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(/*! ./_add-to-unscopables */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_add-to-unscopables.js");
var step = __webpack_require__(/*! ./_iter-step */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-step.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(/*! ./_iter-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-define.js")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.assign.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.assign.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(/*! ./_object-assign */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-assign.js") });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.create.js":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.create.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(/*! ./_object-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js") });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.define-property.js":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.define-property.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js"), 'Object', { defineProperty: __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js").f });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js":
/*!****************************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var $getOwnPropertyDescriptor = __webpack_require__(/*! ./_object-gopd */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopd.js").f;

__webpack_require__(/*! ./_object-sap */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-sap.js")('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-prototype-of.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.get-prototype-of.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js");
var $getPrototypeOf = __webpack_require__(/*! ./_object-gpo */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gpo.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-sap.js")('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.keys.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.keys.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(/*! ./_to-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-object.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");

__webpack_require__(/*! ./_object-sap */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-sap.js")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.set-prototype-of.js":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.set-prototype-of.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(/*! ./_set-proto */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-proto.js").set });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.to-string.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.object.to-string.js ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.parse-int.js":
/*!***************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.parse-int.js ***!
  \***************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var $parseInt = __webpack_require__(/*! ./_parse-int */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_parse-int.js");
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.promise.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.promise.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(/*! ./_library */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var ctx = __webpack_require__(/*! ./_ctx */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_ctx.js");
var classof = __webpack_require__(/*! ./_classof */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_classof.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js");
var anInstance = __webpack_require__(/*! ./_an-instance */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-instance.js");
var forOf = __webpack_require__(/*! ./_for-of */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_for-of.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_species-constructor.js");
var task = __webpack_require__(/*! ./_task */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_task.js").set;
var microtask = __webpack_require__(/*! ./_microtask */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_microtask.js")();
var newPromiseCapabilityModule = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_perform.js");
var userAgent = __webpack_require__(/*! ./_user-agent */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_user-agent.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_promise-resolve.js");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(/*! ./_redefine-all */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine-all.js")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js")($Promise, PROMISE);
__webpack_require__(/*! ./_set-species */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-species.js")(PROMISE);
Wrapper = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(/*! ./_iter-detect */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-detect.js")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.reflect.construct.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.reflect.construct.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var create = __webpack_require__(/*! ./_object-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js");
var aFunction = __webpack_require__(/*! ./_a-function */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_a-function.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var fails = __webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js");
var bind = __webpack_require__(/*! ./_bind */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_bind.js");
var rConstruct = (__webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js").Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.string.iterator.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(/*! ./_string-at */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_string-at.js")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(/*! ./_iter-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iter-define.js")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.symbol.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.symbol.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var has = __webpack_require__(/*! ./_has */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_has.js");
var DESCRIPTORS = __webpack_require__(/*! ./_descriptors */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_descriptors.js");
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var redefine = __webpack_require__(/*! ./_redefine */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_redefine.js");
var META = __webpack_require__(/*! ./_meta */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_meta.js").KEY;
var $fails = __webpack_require__(/*! ./_fails */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_fails.js");
var shared = __webpack_require__(/*! ./_shared */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_shared.js");
var setToStringTag = __webpack_require__(/*! ./_set-to-string-tag */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_set-to-string-tag.js");
var uid = __webpack_require__(/*! ./_uid */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_uid.js");
var wks = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js");
var wksExt = __webpack_require__(/*! ./_wks-ext */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-ext.js");
var wksDefine = __webpack_require__(/*! ./_wks-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js");
var enumKeys = __webpack_require__(/*! ./_enum-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_enum-keys.js");
var isArray = __webpack_require__(/*! ./_is-array */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-array.js");
var anObject = __webpack_require__(/*! ./_an-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_an-object.js");
var isObject = __webpack_require__(/*! ./_is-object */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_is-object.js");
var toIObject = __webpack_require__(/*! ./_to-iobject */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-iobject.js");
var toPrimitive = __webpack_require__(/*! ./_to-primitive */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_to-primitive.js");
var createDesc = __webpack_require__(/*! ./_property-desc */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_property-desc.js");
var _create = __webpack_require__(/*! ./_object-create */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-create.js");
var gOPNExt = __webpack_require__(/*! ./_object-gopn-ext */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn-ext.js");
var $GOPD = __webpack_require__(/*! ./_object-gopd */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopd.js");
var $DP = __webpack_require__(/*! ./_object-dp */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-dp.js");
var $keys = __webpack_require__(/*! ./_object-keys */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-keys.js");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(/*! ./_object-gopn */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gopn.js").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(/*! ./_object-pie */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-pie.js").f = $propertyIsEnumerable;
  __webpack_require__(/*! ./_object-gops */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-gops.js").f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(/*! ./_library */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_library.js")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.object.entries.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.object.entries.js ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var $entries = __webpack_require__(/*! ./_object-to-array */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_object-to-array.js")(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.promise.finally.js":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.promise.finally.js ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var core = __webpack_require__(/*! ./_core */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_core.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var speciesConstructor = __webpack_require__(/*! ./_species-constructor */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_species-constructor.js");
var promiseResolve = __webpack_require__(/*! ./_promise-resolve */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_promise-resolve.js");

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.promise.try.js":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.promise.try.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(/*! ./_export */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_export.js");
var newPromiseCapability = __webpack_require__(/*! ./_new-promise-capability */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_new-promise-capability.js");
var perform = __webpack_require__(/*! ./_perform */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_perform.js");

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.async-iterator.js":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.async-iterator.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js")('asyncIterator');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.observable.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es7.symbol.observable.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./_wks-define */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks-define.js")('observable');


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/web.dom.iterable.js ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./es6.array.iterator */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/es6.array.iterator.js");
var global = __webpack_require__(/*! ./_global */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_global.js");
var hide = __webpack_require__(/*! ./_hide */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_hide.js");
var Iterators = __webpack_require__(/*! ./_iterators */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_iterators.js");
var TO_STRING_TAG = __webpack_require__(/*! ./_wks */ "./node_modules/@babel/runtime-corejs2/node_modules/core-js/library/modules/_wks.js")('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ "./node_modules/@babel/runtime-corejs2/regenerator/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime-corejs2/regenerator/index.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "regenerator-runtime");


/***/ }),

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_app */ "./node_modules/next/dist/pages/_app.js")


/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/typeof.js"));

var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/construct */ "./node_modules/@babel/runtime-corejs2/helpers/construct.js"));

var _defineProperty = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/define-property */ "./node_modules/@babel/runtime-corejs2/core-js/object/define-property.js"));

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* global window */

var router_1 = __importDefault(__webpack_require__(/*! next-server/dist/lib/router/router */ "next-server/dist/lib/router/router"));

var SingletonRouter = {
  router: null,
  readyCallbacks: [],
  ready: function ready(cb) {
    if (this.router) return cb();

    if (typeof window !== 'undefined') {
      this.readyCallbacks.push(cb);
    }
  }
}; // Create public properties and methods of the router in the SingletonRouter

var urlPropertyFields = ['pathname', 'route', 'query', 'asPath'];
var propertyFields = ['components'];
var routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
var coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(SingletonRouter, 'events', {
  get: function get() {
    return router_1.default.events;
  }
});
propertyFields.concat(urlPropertyFields).forEach(function (field) {
  // Here we need to use Object.defineProperty because, we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  (0, _defineProperty.default)(SingletonRouter, field, {
    get: function get() {
      throwIfNoRouter();
      return SingletonRouter.router[field];
    }
  });
});
coreMethodFields.forEach(function (field) {
  SingletonRouter[field] = function () {
    var _SingletonRouter$rout;

    throwIfNoRouter();
    return (_SingletonRouter$rout = SingletonRouter.router)[field].apply(_SingletonRouter$rout, arguments);
  };
});
routerEvents.forEach(function (event) {
  SingletonRouter.ready(function () {
    router_1.default.events.on(event, function () {
      var eventField = "on".concat(event.charAt(0).toUpperCase()).concat(event.substring(1));

      if (SingletonRouter[eventField]) {
        try {
          SingletonRouter[eventField].apply(SingletonRouter, arguments);
        } catch (err) {
          console.error("Error when running the Router event: ".concat(eventField));
          console.error("".concat(err.message, "\n").concat(err.stack));
        }
      }
    });
  });
});

function throwIfNoRouter() {
  if (!SingletonRouter.router) {
    var message = 'No router instance found.\n' + 'You should only use "next/router" inside the client side of your app.\n';
    throw new Error(message);
  }
} // Export the SingletonRouter and this is the public API.


exports.default = SingletonRouter; // Reexport the withRoute HOC

var with_router_1 = __webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js");

exports.withRouter = with_router_1.default; // INTERNAL APIS
// -------------
// (do not use following exports inside the app)
// Create a router and assign it as the singleton instance.
// This is used in client side when we are initilizing the app.
// This should **not** use inside the server.

exports.createRouter = function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  SingletonRouter.router = (0, _construct2.default)(router_1.default, args);
  SingletonRouter.readyCallbacks.forEach(function (cb) {
    return cb();
  });
  SingletonRouter.readyCallbacks = [];
  return SingletonRouter.router;
}; // Export the actual Router class, which is usually used inside the server


exports.Router = router_1.default; // This function is used to create the `withRouter` router instance

function makePublicRouterInstance(router) {
  var instance = {};

  for (var _i = 0; _i < urlPropertyFields.length; _i++) {
    var property = urlPropertyFields[_i];

    if ((0, _typeof2.default)(router[property]) === 'object') {
      instance[property] = (0, _assign.default)({}, router[property]); // makes sure query is not stateful

      continue;
    }

    instance[property] = router[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = router_1.default.events;
  propertyFields.forEach(function (field) {
    // Here we need to use Object.defineProperty because, we need to return
    // the property assigned to the actual router
    // The value might get changed as we change routes and this is the
    // proper way to access it
    (0, _defineProperty.default)(instance, field, {
      get: function get() {
        return router[field];
      }
    });
  });
  coreMethodFields.forEach(function (field) {
    instance[field] = function () {
      return router[field].apply(router, arguments);
    };
  });
  return instance;
}

exports.makePublicRouterInstance = makePublicRouterInstance;

/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var react_1 = __importStar(__webpack_require__(/*! react */ "react"));

var prop_types_1 = __importDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var hoist_non_react_statics_1 = __importDefault(__webpack_require__(/*! hoist-non-react-statics */ "./node_modules/next/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js"));

var utils_1 = __webpack_require__(/*! next-server/dist/lib/utils */ "next-server/dist/lib/utils");

function withRouter(ComposedComponent) {
  var displayName = utils_1.getDisplayName(ComposedComponent);

  var WithRouteWrapper =
  /*#__PURE__*/
  function (_react_1$Component) {
    (0, _inherits2.default)(WithRouteWrapper, _react_1$Component);

    function WithRouteWrapper() {
      (0, _classCallCheck2.default)(this, WithRouteWrapper);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(WithRouteWrapper).apply(this, arguments));
    }

    (0, _createClass2.default)(WithRouteWrapper, [{
      key: "render",
      value: function render() {
        return react_1.default.createElement(ComposedComponent, (0, _assign.default)({
          router: this.context.router
        }, this.props));
      }
    }]);
    return WithRouteWrapper;
  }(react_1.Component);

  WithRouteWrapper.contextTypes = {
    router: prop_types_1.default.object
  };
  WithRouteWrapper.displayName = "withRouter(".concat(displayName, ")");
  return hoist_non_react_statics_1.default(WithRouteWrapper, ComposedComponent);
}

exports.default = withRouter;

/***/ }),

/***/ "./node_modules/next/dist/pages/_app.js":
/*!**********************************************!*\
  !*** ./node_modules/next/dist/pages/_app.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/asyncToGenerator */ "./node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js"));

var _assign = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var __importStar = void 0 && (void 0).__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
};

var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var react_1 = __importStar(__webpack_require__(/*! react */ "react"));

var prop_types_1 = __importDefault(__webpack_require__(/*! prop-types */ "prop-types"));

var utils_1 = __webpack_require__(/*! next-server/dist/lib/utils */ "next-server/dist/lib/utils");

var router_1 = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");

var App =
/*#__PURE__*/
function (_react_1$Component) {
  (0, _inherits2.default)(App, _react_1$Component);

  function App() {
    (0, _classCallCheck2.default)(this, App);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(App).apply(this, arguments));
  }

  (0, _createClass2.default)(App, [{
    key: "getChildContext",
    value: function getChildContext() {
      return {
        router: router_1.makePublicRouterInstance(this.props.router)
      };
    } // Kept here for backwards compatibility.
    // When someone ended App they could call `super.componentDidCatch`. This is now deprecated.

  }, {
    key: "componentDidCatch",
    value: function componentDidCatch(err) {
      throw err;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          router = _this$props.router,
          Component = _this$props.Component,
          pageProps = _this$props.pageProps;
      var url = createUrl(router);
      return react_1.default.createElement(Container, null, react_1.default.createElement(Component, (0, _assign.default)({}, pageProps, {
        url: url
      })));
    }
  }], [{
    key: "getInitialProps",
    value: function () {
      var _getInitialProps = (0, _asyncToGenerator2.default)(
      /*#__PURE__*/
      _regenerator.default.mark(function _callee(_ref) {
        var Component, router, ctx, pageProps;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                Component = _ref.Component, router = _ref.router, ctx = _ref.ctx;
                _context.next = 3;
                return utils_1.loadGetInitialProps(Component, ctx);

              case 3:
                pageProps = _context.sent;
                return _context.abrupt("return", {
                  pageProps: pageProps
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _getInitialProps.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);
  return App;
}(react_1.Component);

App.childContextTypes = {
  router: prop_types_1.default.object
};
exports.default = App;

var Container =
/*#__PURE__*/
function (_react_1$Component2) {
  (0, _inherits2.default)(Container, _react_1$Component2);

  function Container() {
    (0, _classCallCheck2.default)(this, Container);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Container).apply(this, arguments));
  }

  (0, _createClass2.default)(Container, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollToHash();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.scrollToHash();
    }
  }, {
    key: "scrollToHash",
    value: function scrollToHash() {
      var hash = window.location.hash;
      hash = hash ? hash.substring(1) : false;
      if (!hash) return;
      var el = document.getElementById(hash);
      if (!el) return; // If we call scrollIntoView() in here without a setTimeout
      // it won't scroll properly.

      setTimeout(function () {
        return el.scrollIntoView();
      }, 0);
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return Container;
}(react_1.Component);

exports.Container = Container;
var warnUrl = utils_1.execOnce(function () {
  if (true) {
    console.error("Warning: the 'url' property is deprecated. https://err.sh/zeit/next.js/url-deprecated");
  }
});

function createUrl(router) {
  // This is to make sure we don't references the router object at call time
  var pathname = router.pathname,
      asPath = router.asPath,
      query = router.query;
  return {
    get query() {
      warnUrl();
      return query;
    },

    get pathname() {
      warnUrl();
      return pathname;
    },

    get asPath() {
      warnUrl();
      return asPath;
    },

    back: function back() {
      warnUrl();
      router.back();
    },
    push: function push(url, as) {
      warnUrl();
      return router.push(url, as);
    },
    pushTo: function pushTo(href, as) {
      warnUrl();
      var pushRoute = as ? href : null;
      var pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: function replace(url, as) {
      warnUrl();
      return router.replace(url, as);
    },
    replaceTo: function replaceTo(href, as) {
      warnUrl();
      var replaceRoute = as ? href : null;
      var replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

exports.createUrl = createUrl;

/***/ }),

/***/ "./node_modules/next/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/next/node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var ReactIs = __webpack_require__(/*! react-is */ "react-is");
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true
};

var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        var targetStatics = TYPE_STATICS[targetComponent['$$typeof']] || REACT_STATICS;
        var sourceStatics = TYPE_STATICS[sourceComponent['$$typeof']] || REACT_STATICS;

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ "./node_modules/next/router.js":
/*!*************************************!*\
  !*** ./node_modules/next/router.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/client/router */ "./node_modules/next/dist/client/router.js")


/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/app */ "./node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next-redux-wrapper */ "next-redux-wrapper");
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _src_store_next__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../src/store-next */ "./src/store-next.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-intl */ "react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _localization_en_json__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../localization/en.json */ "./localization/en.json");
var _localization_en_json__WEBPACK_IMPORTED_MODULE_11___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../localization/en.json */ "./localization/en.json", 1);













var ProdexApp =
/*#__PURE__*/
function (_App) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(ProdexApp, _App);

  function ProdexApp() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ProdexApp);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(ProdexApp).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ProdexApp, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          Component = _this$props.Component,
          pageProps = _this$props.pageProps,
          store = _this$props.store;
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(next_app__WEBPACK_IMPORTED_MODULE_5__["Container"], null, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_10__["IntlProvider"], {
        locale: "en",
        messages: _localization_en_json__WEBPACK_IMPORTED_MODULE_11__
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_9__["Provider"], {
        store: store
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(Component, pageProps))));
    }
  }]);

  return ProdexApp;
}(next_app__WEBPACK_IMPORTED_MODULE_5___default.a);

/* harmony default export */ __webpack_exports__["default"] = (next_redux_wrapper__WEBPACK_IMPORTED_MODULE_7___default()(_src_store_next__WEBPACK_IMPORTED_MODULE_12__["makeStore"])(ProdexApp));

/***/ }),

/***/ "./src/api/broadcast.js":
/*!******************************!*\
  !*** ./src/api/broadcast.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var api = {
  getBroadcast: function getBroadcast(id) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/prodex/api/broadcast-rules/".concat(id)).then(function (response) {
      return response.data;
    });
  },
  postBroadcast: function postBroadcast(id, brcRules) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post("/prodex/api/broadcast-rules/".concat(id), brcRules);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (api);

/***/ }),

/***/ "./src/api/cart.js":
/*!*************************!*\
  !*** ./src/api/cart.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


var api = {
  getCart: function getCart() {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/prodex/api/cart').then(function (response) {
      return response.data;
    });
  },
  deleteCart: function deleteCart(orderId) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete("/prodex/api/cart/".concat(orderId));
  },
  postNewOrder: function postNewOrder(order) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/prodex/api/orders', order);
  },
  postOrderEdit: function postOrderEdit(order) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/prodex/api/orders/".concat(order.id), Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, order));
  },
  getProductOffer: function getProductOffer(id) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/prodex/api/product-offers/".concat(id, "/applyrules")).then(function (response) {
      return response.data;
    });
  },
  getOrderDetail: function getOrderDetail(id) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/prodex/api/orders/".concat(id)).then(function (response) {
      return response.data;
    });
  },
  postNewDeliveryAddress: function postNewDeliveryAddress(address) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/prodex/api/delivery-addresses', address);
  },
  putDeliveryAddressEdit: function putDeliveryAddressEdit(address) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.put("/prodex/api/delivery-addresses/".concat(address.id), address);
  },
  getDeliveryAddresses: function getDeliveryAddresses() {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/prodex/api/delivery-addresses').then(function (response) {
      return response.data;
    });
  },
  getPayments: function getPayments() {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/prodex/api/payments').then(function (response) {
      return response.data;
    });
  },
  getShippingQuotes: function getShippingQuotes(countryId, zip) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/prodex/api/shipment/cart', {
      params: {
        destinationCountryId: countryId,
        destinationZIP: zip
      }
    }).then(function (response) {
      return response.data;
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (api);

/***/ }),

/***/ "./src/api/companies.js":
/*!******************************!*\
  !*** ./src/api/companies.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var api = {
  getCompanies: function getCompanies() {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/prodex/api/companies', {
      params: {}
    }).then(function (response) {
      return response.data;
    });
  },
  getCompany: function getCompany(id) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/prodex/api/companies/".concat(id)).then(function (response) {
      return response.data;
    });
  },
  postNewCompany: function postNewCompany(name) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/prodex/api/companies', {
      name: name
    });
  },
  putCompanyEdit: function putCompanyEdit(company) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.put("/prodex/api/companies/".concat(company.id), {
      name: company.name
    });
  },
  deleteCompany: function deleteCompany(id) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete("/prodex/api/companies/".concat(id));
  }
};
/* harmony default export */ __webpack_exports__["default"] = (api);

/***/ }),

/***/ "./src/api/index.js":
/*!**************************!*\
  !*** ./src/api/index.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);


axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.validateStatus = function (status) {
  return status < 400;
};

var instance = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: ( true ? "https://test.echoexchange.net/" : undefined) + 'prodex/api'
});
/* harmony default export */ __webpack_exports__["default"] = (instance);

/***/ }),

/***/ "./src/api/locations.js":
/*!******************************!*\
  !*** ./src/api/locations.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var api = {
  getRegions: function getRegions(search) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get('/prodex/api/regions', {
      params: {
        search: search
      }
    }).then(function (response) {
      return response.data.regions;
    });
  },
  getRegionDetail: function getRegionDetail(id) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/prodex/api/countries/?regionId=".concat(id)).then(function (response) {
      return response.data;
    });
  },
  getStates: function getStates(search) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/prodex/api/countries", {
      params: {
        search: search
      }
    }).then(function (response) {
      return response.data.countries;
    });
  },
  getStateDetail: function getStateDetail(id) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get("/prodex/api/companies/?entityId=".concat(id, "&entityType=country")).then(function (response) {
      return response.data;
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (api);

/***/ }),

/***/ "./src/api/merchants.js":
/*!******************************!*\
  !*** ./src/api/merchants.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


var api = {
  getMerchant: function getMerchant(id) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/prodex/api/merchants/".concat(id)).then(function (response) {
      return response.data;
    });
  },
  getMerchants: function getMerchants() {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/prodex/api/merchants").then(function (response) {
      return response.data;
    });
  },
  putMerchantEdit: function putMerchantEdit(merchant) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.put("/prodex/api/merchants/".concat(merchant.id), Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, merchant));
  },
  deleteMerchant: function deleteMerchant(id) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete("/prodex/api/merchants/".concat(id));
  }
};
/* harmony default export */ __webpack_exports__["default"] = (api);

/***/ }),

/***/ "./src/api/offices.js":
/*!****************************!*\
  !*** ./src/api/offices.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


var api = {
  getOffice: function getOffice(id) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/prodex/api/offices/".concat(id)).then(function (response) {
      return response.data;
    });
  },
  postNewOffice: function postNewOffice(office) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/prodex/api/offices', Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, office));
  },
  deleteOffice: function deleteOffice(id) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete('/prodex/api/offices/' + id);
  },
  putOfficeEdit: function putOfficeEdit(office) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/prodex/api/offices/' + office.id, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, office));
  },
  getOffices: function getOffices(companyId) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(companyId ? "/prodex/api/offices/?company".concat(companyId) : "/prodex/api/offices").then(function (response) {
      return response.data;
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (api);

/***/ }),

/***/ "./src/api/productOffers.js":
/*!**********************************!*\
  !*** ./src/api/productOffers.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var api = {
  deleteProductOffer: function deleteProductOffer(id) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete("/prodex/api/product-offers/".concat(id));
  }
};
/* harmony default export */ __webpack_exports__["default"] = (api);

/***/ }),

/***/ "./src/api/shippingQuotes.js":
/*!***********************************!*\
  !*** ./src/api/shippingQuotes.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

var api = {
  getShippingQuotes: function getShippingQuotes(pack) {
    return axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('/prodex/api/shipment/', pack, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (response) {
      return response.data;
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (api);

/***/ }),

/***/ "./src/api/users.js":
/*!**************************!*\
  !*** ./src/api/users.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


var api = {
  getUsers: function getUsers() {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/prodex/api/users').then(function (response) {
      return response.data;
    });
  },
  putPromoteToMerchant: function putPromoteToMerchant(payload) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/prodex/api/users/' + payload.id, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, payload.user));
  },
  putPromoteToOperator: function putPromoteToOperator(payload) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/prodex/api/users/' + payload.id, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, payload.user));
  },
  getOperators: function getOperators() {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/prodex/api/operators').then(function (response) {
      return response.data;
    });
  },
  deleteOperator: function deleteOperator(id) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete('/prodex/api/operators/' + id);
  },
  putOperatorEdit: function putOperatorEdit(operator) {
    return axios__WEBPACK_IMPORTED_MODULE_1___default.a.put('/prodex/api/operators/' + operator.id, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, operator));
  }
};
/* harmony default export */ __webpack_exports__["default"] = (api);

/***/ }),

/***/ "./src/components/Filter/components/SavedFilters/constants/SaveFilterItem.constants.js":
/*!*********************************************************************************************!*\
  !*** ./src/components/Filter/components/SavedFilters/constants/SaveFilterItem.constants.js ***!
  \*********************************************************************************************/
/*! exports provided: CHANGE_ELEMENT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANGE_ELEMENT", function() { return CHANGE_ELEMENT; });
var CHANGE_ELEMENT = 'CHANGE_ELEMENT';

/***/ }),

/***/ "./src/components/Filter/components/SavedFilters/reducers/SaveFilterItem.reducers.js":
/*!*******************************************************************************************!*\
  !*** ./src/components/Filter/components/SavedFilters/reducers/SaveFilterItem.reducers.js ***!
  \*******************************************************************************************/
/*! exports provided: show */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "show", function() { return show; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/assign */ "./node_modules/@babel/runtime-corejs2/core-js/object/assign.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_SaveFilterItem_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/SaveFilterItem.constants */ "./src/components/Filter/components/SavedFilters/constants/SaveFilterItem.constants.js");



var initialState = {
  bell0: false,
  notifications0: false,
  selected0: false,
  active0: false,
  email0: false,
  mobile0: false,
  system0: false,
  toolTip0: false,
  bellKey: 0,
  notificationsKey: 0,
  selectedKey: 0,
  activeKey: 0,
  emailKey: 0,
  mobileKey: 0,
  systemKey: 0,
  toolTipKey: 0
};
var show = function show() {
  var _Object$assign2;

  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  switch (action.type) {
    case _constants_SaveFilterItem_constants__WEBPACK_IMPORTED_MODULE_2__["CHANGE_ELEMENT"]:
      return _babel_runtime_corejs2_core_js_object_assign__WEBPACK_IMPORTED_MODULE_1___default()({}, state, (_Object$assign2 = {}, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_Object$assign2, action.payload + action.key, !state[action.payload + action.key]), Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_Object$assign2, action.payload + 'Key', action.key), _Object$assign2));

    default:
      return state;
  }
};

/***/ }),

/***/ "./src/components/Spinner/Spinner.js":
/*!*******************************************!*\
  !*** ./src/components/Spinner/Spinner.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _spinner_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./spinner.css */ "./src/components/Spinner/spinner.css");
/* harmony import */ var _spinner_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_spinner_css__WEBPACK_IMPORTED_MODULE_6__);





var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/components/Spinner/Spinner.js";



var Spinner =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Spinner, _Component);

  function Spinner() {
    Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Spinner);

    return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(Spinner).apply(this, arguments));
  }

  Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Spinner, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "spinner",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 6
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "bounce1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 7
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "bounce2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 8
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "bounce3",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 9
        },
        __self: this
      }));
    }
  }]);

  return Spinner;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Spinner);

/***/ }),

/***/ "./src/components/Spinner/spinner.css":
/*!********************************************!*\
  !*** ./src/components/Spinner/spinner.css ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/constants/broadcast.js":
/*!************************************!*\
  !*** ./src/constants/broadcast.js ***!
  \************************************/
/*! exports provided: BROADCAST_FETCH_FAILED, BROADCAST_FETCH_REQUESTED, BROADCAST_FETCH_SUCCEEDED, BROADCAST_POST_FAILED, BROADCAST_POST_REQUESTED, BROADCAST_POST_SUCCEEDED, GET_BROADCAST_REQUESTED, GET_BROADCAST_SUCCEEDED, GET_BROADCAST_FAILED, POST_BROADCAST_REQUESTED, POST_BROADCAST_SUCCEEDED, POST_BROADCAST_FAILED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BROADCAST_FETCH_FAILED", function() { return BROADCAST_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BROADCAST_FETCH_REQUESTED", function() { return BROADCAST_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BROADCAST_FETCH_SUCCEEDED", function() { return BROADCAST_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BROADCAST_POST_FAILED", function() { return BROADCAST_POST_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BROADCAST_POST_REQUESTED", function() { return BROADCAST_POST_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BROADCAST_POST_SUCCEEDED", function() { return BROADCAST_POST_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_BROADCAST_REQUESTED", function() { return GET_BROADCAST_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_BROADCAST_SUCCEEDED", function() { return GET_BROADCAST_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_BROADCAST_FAILED", function() { return GET_BROADCAST_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_BROADCAST_REQUESTED", function() { return POST_BROADCAST_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_BROADCAST_SUCCEEDED", function() { return POST_BROADCAST_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "POST_BROADCAST_FAILED", function() { return POST_BROADCAST_FAILED; });
var BROADCAST_FETCH_FAILED = "BROADCAST_FETCH_FAILED";
var BROADCAST_FETCH_REQUESTED = "BROADCAST_FETCH_REQUESTED";
var BROADCAST_FETCH_SUCCEEDED = "BROADCAST_FETCH_SUCCEEDED";
var BROADCAST_POST_FAILED = "BROADCAST_POST_FAILED";
var BROADCAST_POST_REQUESTED = "BROADCAST_POST_REQUESTED";
var BROADCAST_POST_SUCCEEDED = "BROADCAST_POST_SUCCEEDED"; //refactor

var GET_BROADCAST_REQUESTED = "GET_BROADCAST_REQUESTED";
var GET_BROADCAST_SUCCEEDED = "GET_BROADCAST_SUCCEEDED";
var GET_BROADCAST_FAILED = "GET_BROADCAST_FAILED";
var POST_BROADCAST_REQUESTED = "BROADCAST_FETCH_REQUESTED";
var POST_BROADCAST_SUCCEEDED = "BROADCAST_FETCH_SUCCEEDED";
var POST_BROADCAST_FAILED = "BROADCAST_FETCH_FAILED";

/***/ }),

/***/ "./src/constants/cart.js":
/*!*******************************!*\
  !*** ./src/constants/cart.js ***!
  \*******************************/
/*! exports provided: OFFER_FETCH_FAILED, OFFER_FETCH_REQUESTED, OFFER_FETCH_SUCCEEDED, CART_FETCH_FAILED, CART_FETCH_REQUESTED, CART_FETCH_SUCCEEDED, DELIVERYADDRESSES_FETCH_REQUESTED, DELIVERYADDRESSES_FETCH_FAILED, DELIVERYADDRESSES_FETCH_SUCCEEDED, PRODUCTFROMCART_REMOVE_REQUESTED, PRODUCTFROMCART_REMOVE_FAILED, PRODUCTFROMCART_REMOVE_SUCCEEDED, CARTITEM_CREATE_REQUESTED, CARTITEM_CREATE_FAILED, CARTITEM_CREATE_SUCCEEDED, PAYMENTS_FETCH_FAILED, PAYMENTS_FETCH_REQUESTED, PAYMENTS_FETCH_SUCCEEDED, DELIVERYADDRESS_CREATE_REQUESTED, DELIVERYADDRESS_CREATE_FAILED, DELIVERYADDRESS_CREATE_SUCCEEDED, ORDERDETAIL_FETCH_REQUESTED, ORDERDETAIL_FETCH_FAILED, ORDERDETAIL_FETCH_SUCCEEDED, ORDER_EDIT_SUCCEEDED, ORDER_EDIT_FAILED, ORDER_EDIT_REQUESTED, DELIVERYADDRESS_EDIT_SUCCEEDED, DELIVERYADDRESS_EDIT_FAILED, DELIVERYADDRESS_EDIT_REQUESTED, SHIPPING_QUOTES_FETCH_SUCCEEDED, SHIPPING_QUOTES_FETCH_FAILED, SHIPPING_QUOTES_FETCH_REQUESTED, GET_CART_REQUESTED, GET_CART_SUCCEEDED, GET_CART_FAILED, DELETE_CART_REQUESTED, DELETE_CART_SUCCEEDED, DELETE_CART_FAILED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFER_FETCH_FAILED", function() { return OFFER_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFER_FETCH_REQUESTED", function() { return OFFER_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFER_FETCH_SUCCEEDED", function() { return OFFER_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CART_FETCH_FAILED", function() { return CART_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CART_FETCH_REQUESTED", function() { return CART_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CART_FETCH_SUCCEEDED", function() { return CART_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELIVERYADDRESSES_FETCH_REQUESTED", function() { return DELIVERYADDRESSES_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELIVERYADDRESSES_FETCH_FAILED", function() { return DELIVERYADDRESSES_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELIVERYADDRESSES_FETCH_SUCCEEDED", function() { return DELIVERYADDRESSES_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRODUCTFROMCART_REMOVE_REQUESTED", function() { return PRODUCTFROMCART_REMOVE_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRODUCTFROMCART_REMOVE_FAILED", function() { return PRODUCTFROMCART_REMOVE_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRODUCTFROMCART_REMOVE_SUCCEEDED", function() { return PRODUCTFROMCART_REMOVE_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CARTITEM_CREATE_REQUESTED", function() { return CARTITEM_CREATE_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CARTITEM_CREATE_FAILED", function() { return CARTITEM_CREATE_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CARTITEM_CREATE_SUCCEEDED", function() { return CARTITEM_CREATE_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAYMENTS_FETCH_FAILED", function() { return PAYMENTS_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAYMENTS_FETCH_REQUESTED", function() { return PAYMENTS_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAYMENTS_FETCH_SUCCEEDED", function() { return PAYMENTS_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELIVERYADDRESS_CREATE_REQUESTED", function() { return DELIVERYADDRESS_CREATE_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELIVERYADDRESS_CREATE_FAILED", function() { return DELIVERYADDRESS_CREATE_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELIVERYADDRESS_CREATE_SUCCEEDED", function() { return DELIVERYADDRESS_CREATE_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERDETAIL_FETCH_REQUESTED", function() { return ORDERDETAIL_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERDETAIL_FETCH_FAILED", function() { return ORDERDETAIL_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERDETAIL_FETCH_SUCCEEDED", function() { return ORDERDETAIL_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_EDIT_SUCCEEDED", function() { return ORDER_EDIT_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_EDIT_FAILED", function() { return ORDER_EDIT_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_EDIT_REQUESTED", function() { return ORDER_EDIT_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELIVERYADDRESS_EDIT_SUCCEEDED", function() { return DELIVERYADDRESS_EDIT_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELIVERYADDRESS_EDIT_FAILED", function() { return DELIVERYADDRESS_EDIT_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELIVERYADDRESS_EDIT_REQUESTED", function() { return DELIVERYADDRESS_EDIT_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHIPPING_QUOTES_FETCH_SUCCEEDED", function() { return SHIPPING_QUOTES_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHIPPING_QUOTES_FETCH_FAILED", function() { return SHIPPING_QUOTES_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHIPPING_QUOTES_FETCH_REQUESTED", function() { return SHIPPING_QUOTES_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_CART_REQUESTED", function() { return GET_CART_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_CART_SUCCEEDED", function() { return GET_CART_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GET_CART_FAILED", function() { return GET_CART_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_CART_REQUESTED", function() { return DELETE_CART_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_CART_SUCCEEDED", function() { return DELETE_CART_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DELETE_CART_FAILED", function() { return DELETE_CART_FAILED; });
var OFFER_FETCH_FAILED = "OFFER_FETCH_FAILED";
var OFFER_FETCH_REQUESTED = "OFFER_FETCH_REQUESTED";
var OFFER_FETCH_SUCCEEDED = "OFFER_FETCH_SUCCEEDED";
var CART_FETCH_FAILED = "CART_FETCH_FAILED";
var CART_FETCH_REQUESTED = "CART_FETCH_REQUESTED";
var CART_FETCH_SUCCEEDED = "CART_FETCH_SUCCEEDED";
var DELIVERYADDRESSES_FETCH_REQUESTED = "DELIVERYADDRESSES_FETCH_REQUESTED";
var DELIVERYADDRESSES_FETCH_FAILED = "DELIVERYADDRESSES_FETCH_FAILED";
var DELIVERYADDRESSES_FETCH_SUCCEEDED = "DELIVERYADDRESSES_FETCH_SUCCEEDED";
var PRODUCTFROMCART_REMOVE_REQUESTED = "PRODUCTFROMCART_REMOVE_REQUESTED";
var PRODUCTFROMCART_REMOVE_FAILED = "PRODUCTFROMCART_REMOVE_FAILED";
var PRODUCTFROMCART_REMOVE_SUCCEEDED = "PRODUCTFROMCART_REMOVE_SUCCEEDED";
var CARTITEM_CREATE_REQUESTED = "CARTITEM_CREATE_REQUESTED";
var CARTITEM_CREATE_FAILED = "CARTITEM_CREATE_FAILED";
var CARTITEM_CREATE_SUCCEEDED = "CARTITEM_CREATE_SUCCEEDED";
var PAYMENTS_FETCH_FAILED = "PAYMENTS_FETCH_FAILED";
var PAYMENTS_FETCH_REQUESTED = "PAYMENTS_FETCH_REQUESTED";
var PAYMENTS_FETCH_SUCCEEDED = "PAYMENTS_FETCH_SUCCEEDED";
var DELIVERYADDRESS_CREATE_REQUESTED = "DELIVERYADDRESS_CREATE_REQUESTED";
var DELIVERYADDRESS_CREATE_FAILED = "DELIVERYADDRESS_CREATE_FAILED";
var DELIVERYADDRESS_CREATE_SUCCEEDED = "DELIVERYADDRESS_CREATE_SUCCEEDED";
var ORDERDETAIL_FETCH_REQUESTED = "ORDERDETAIL_FETCH_REQUESTED";
var ORDERDETAIL_FETCH_FAILED = "ORDERDETAIL_FETCH_FAILED";
var ORDERDETAIL_FETCH_SUCCEEDED = "ORDERDETAIL_FETCH_SUCCEEDED";
var ORDER_EDIT_SUCCEEDED = 'ORDER_EDIT_SUCCEEDED';
var ORDER_EDIT_FAILED = 'ORDER_EDIT_FAILED';
var ORDER_EDIT_REQUESTED = 'ORDER_EDIT_REQUESTED';
var DELIVERYADDRESS_EDIT_SUCCEEDED = 'DELIVERYADDRESS_EDIT_SUCCEEDED';
var DELIVERYADDRESS_EDIT_FAILED = 'DELIVERYADDRESS_EDIT_FAILED';
var DELIVERYADDRESS_EDIT_REQUESTED = 'DELIVERYADDRESS_EDIT_REQUESTED';
var SHIPPING_QUOTES_FETCH_SUCCEEDED = 'SHIPPING_QUOTES_FETCH_SUCCEEDED';
var SHIPPING_QUOTES_FETCH_FAILED = 'SHIPPING_QUOTES_FETCH_FAILED';
var SHIPPING_QUOTES_FETCH_REQUESTED = 'SHIPPING_QUOTES_FETCH_REQUESTED'; //refactor

var GET_CART_REQUESTED = "GET_CART_REQUESTED";
var GET_CART_SUCCEEDED = "GET_CART_SUCCEEDED";
var GET_CART_FAILED = "GET_CART_FAILED";
var DELETE_CART_REQUESTED = "DELETE_CART_REQUESTED";
var DELETE_CART_SUCCEEDED = "DELETE_CART_SUCCEEDED";
var DELETE_CART_FAILED = "DELETE_CART_FAILED";
/*
export const POST_NEW_ORDER_REQUESTED = "POST_NEW_ORDER_REQUESTED";
export const POST_NEW_ORDER_SUCCEEDED = "POST_NEW_ORDER_SUCCEEDED";
export const POST_NEW_ORDER_FAILED = "POST_NEW_ORDER_FAILED";

export const OFFER_FETCH_FAILED = "OFFER_FETCH_FAILED";
export const OFFER_FETCH_REQUESTED = "OFFER_FETCH_REQUESTED";
export const OFFER_FETCH_SUCCEEDED = "OFFER_FETCH_SUCCEEDED";

export const OFFER_FETCH_FAILED = "OFFER_FETCH_FAILED";
export const OFFER_FETCH_REQUESTED = "OFFER_FETCH_REQUESTED";
export const OFFER_FETCH_SUCCEEDED = "OFFER_FETCH_SUCCEEDED";

export const OFFER_FETCH_FAILED = "OFFER_FETCH_FAILED";
export const OFFER_FETCH_REQUESTED = "OFFER_FETCH_REQUESTED";
export const OFFER_FETCH_SUCCEEDED = "OFFER_FETCH_SUCCEEDED";

export const OFFER_FETCH_FAILED = "OFFER_FETCH_FAILED";
export const OFFER_FETCH_REQUESTED = "OFFER_FETCH_REQUESTED";
export const OFFER_FETCH_SUCCEEDED = "OFFER_FETCH_SUCCEEDED";

export const OFFER_FETCH_FAILED = "OFFER_FETCH_FAILED";
export const OFFER_FETCH_REQUESTED = "OFFER_FETCH_REQUESTED";
export const OFFER_FETCH_SUCCEEDED = "OFFER_FETCH_SUCCEEDED";

export const OFFER_FETCH_FAILED = "OFFER_FETCH_FAILED";
export const OFFER_FETCH_REQUESTED = "OFFER_FETCH_REQUESTED";
export const OFFER_FETCH_SUCCEEDED = "OFFER_FETCH_SUCCEEDED";

export const OFFER_FETCH_FAILED = "OFFER_FETCH_FAILED";
export const OFFER_FETCH_REQUESTED = "OFFER_FETCH_REQUESTED";
export const OFFER_FETCH_SUCCEEDED = "OFFER_FETCH_SUCCEEDED";

export const OFFER_FETCH_FAILED = "OFFER_FETCH_FAILED";
export const OFFER_FETCH_REQUESTED = "OFFER_FETCH_REQUESTED";
export const OFFER_FETCH_SUCCEEDED = "OFFER_FETCH_SUCCEEDED";

*/

/***/ }),

/***/ "./src/constants/companies.js":
/*!************************************!*\
  !*** ./src/constants/companies.js ***!
  \************************************/
/*! exports provided: COMPANIES_FETCH_REQUESTED, COMPANIES_FETCH_FAILED, COMPANIES_FETCH_SUCCEEDED, COMPANY_FETCH_REQUESTED, COMPANY_FETCH_FAILED, COMPANY_FETCH_SUCCEEDED, COMPANY_CREATE_REQUESTED, COMPANY_CREATE_FAILED, COMPANY_CREATE_SUCCEEDED, COMPANY_EDIT_REQUESTED, COMPANY_EDIT_FAILED, COMPANY_EDIT_SUCCEEDED, COMPANY_REMOVE_REQUESTED, COMPANY_REMOVE_FAILED, COMPANY_REMOVE_SUCCEEDED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANIES_FETCH_REQUESTED", function() { return COMPANIES_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANIES_FETCH_FAILED", function() { return COMPANIES_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANIES_FETCH_SUCCEEDED", function() { return COMPANIES_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANY_FETCH_REQUESTED", function() { return COMPANY_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANY_FETCH_FAILED", function() { return COMPANY_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANY_FETCH_SUCCEEDED", function() { return COMPANY_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANY_CREATE_REQUESTED", function() { return COMPANY_CREATE_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANY_CREATE_FAILED", function() { return COMPANY_CREATE_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANY_CREATE_SUCCEEDED", function() { return COMPANY_CREATE_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANY_EDIT_REQUESTED", function() { return COMPANY_EDIT_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANY_EDIT_FAILED", function() { return COMPANY_EDIT_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANY_EDIT_SUCCEEDED", function() { return COMPANY_EDIT_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANY_REMOVE_REQUESTED", function() { return COMPANY_REMOVE_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANY_REMOVE_FAILED", function() { return COMPANY_REMOVE_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMPANY_REMOVE_SUCCEEDED", function() { return COMPANY_REMOVE_SUCCEEDED; });
var COMPANIES_FETCH_REQUESTED = 'COMPANIES_FETCH_REQUESTED';
var COMPANIES_FETCH_FAILED = 'COMPANIES_FETCH_FAILED';
var COMPANIES_FETCH_SUCCEEDED = 'COMPANIES_FETCH_SUCCEEDED';
var COMPANY_FETCH_REQUESTED = 'COMPANY_FETCH_REQUESTED';
var COMPANY_FETCH_FAILED = 'COMPANY_FETCH_FAILED';
var COMPANY_FETCH_SUCCEEDED = 'COMPANY_FETCH_SUCCEEDED';
var COMPANY_CREATE_REQUESTED = 'COMPANY_CREATE_REQUESTED';
var COMPANY_CREATE_FAILED = 'COMPANY_CREATE_FAILED';
var COMPANY_CREATE_SUCCEEDED = 'COMPANY_CREATE_SUCCEEDED';
var COMPANY_EDIT_REQUESTED = 'COMPANY_EDIT_REQUESTED';
var COMPANY_EDIT_FAILED = 'COMPANY_EDIT_FAILED';
var COMPANY_EDIT_SUCCEEDED = 'COMPANY_EDIT_SUCCEEDED';
var COMPANY_REMOVE_REQUESTED = 'COMPANY_REMOVE_REQUESTED';
var COMPANY_REMOVE_FAILED = 'COMPANY_REMOVE_FAILED';
var COMPANY_REMOVE_SUCCEEDED = 'COMPANY_REMOVE_SUCCEEDED';

/***/ }),

/***/ "./src/constants/locations.js":
/*!************************************!*\
  !*** ./src/constants/locations.js ***!
  \************************************/
/*! exports provided: REGIONS_FETCH_REQUESTED, REGIONS_FETCH_FAILED, REGIONS_FETCH_SUCCEEDED, STATES_FETCH_REQUESTED, STATES_FETCH_FAILED, STATES_FETCH_SUCCEEDED, STATEDETAIL_FETCH_REQUESTED, STATEDETAIL_FETCH_FAILED, STATEDETAIL_FETCH_SUCCEEDED, REGIONDETAIL_FETCH_REQUESTED, REGIONDETAIL_FETCH_FAILED, REGIONDETAIL_FETCH_SUCCEEDED, PROVINCES_FETCH_REQUESTED, PROVINCES_FETCH_FAILED, PROVINCES_FETCH_SUCCEEDED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGIONS_FETCH_REQUESTED", function() { return REGIONS_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGIONS_FETCH_FAILED", function() { return REGIONS_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGIONS_FETCH_SUCCEEDED", function() { return REGIONS_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATES_FETCH_REQUESTED", function() { return STATES_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATES_FETCH_FAILED", function() { return STATES_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATES_FETCH_SUCCEEDED", function() { return STATES_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATEDETAIL_FETCH_REQUESTED", function() { return STATEDETAIL_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATEDETAIL_FETCH_FAILED", function() { return STATEDETAIL_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATEDETAIL_FETCH_SUCCEEDED", function() { return STATEDETAIL_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGIONDETAIL_FETCH_REQUESTED", function() { return REGIONDETAIL_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGIONDETAIL_FETCH_FAILED", function() { return REGIONDETAIL_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REGIONDETAIL_FETCH_SUCCEEDED", function() { return REGIONDETAIL_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROVINCES_FETCH_REQUESTED", function() { return PROVINCES_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROVINCES_FETCH_FAILED", function() { return PROVINCES_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROVINCES_FETCH_SUCCEEDED", function() { return PROVINCES_FETCH_SUCCEEDED; });
var REGIONS_FETCH_REQUESTED = 'REGIONS_FETCH_REQUESTED';
var REGIONS_FETCH_FAILED = 'REGIONS_FETCH_FAILED';
var REGIONS_FETCH_SUCCEEDED = 'REGIONS_FETCH_SUCCEEDED';
var STATES_FETCH_REQUESTED = 'STATES_FETCH_REQUESTED';
var STATES_FETCH_FAILED = 'STATES_FETCH_FAILED';
var STATES_FETCH_SUCCEEDED = 'STATES_FETCH_SUCCEEDED';
var STATEDETAIL_FETCH_REQUESTED = 'STATEDETAIL_FETCH_REQUESTED';
var STATEDETAIL_FETCH_FAILED = 'STATEDETAIL_FETCH_FAILED';
var STATEDETAIL_FETCH_SUCCEEDED = 'STATEDETAIL_FETCH_SUCCEEDED';
var REGIONDETAIL_FETCH_REQUESTED = 'REGIONDETAIL_FETCH_REQUESTED';
var REGIONDETAIL_FETCH_FAILED = 'REGIONDETAIL_FETCH_FAILED';
var REGIONDETAIL_FETCH_SUCCEEDED = 'REGIONDETAIL_FETCH_SUCCEEDED';
var PROVINCES_FETCH_REQUESTED = 'PROVINCES_FETCH_REQUESTED';
var PROVINCES_FETCH_FAILED = 'PROVINCES_FETCH_FAILED';
var PROVINCES_FETCH_SUCCEEDED = 'PROVINCES_FETCH_SUCCEEDED';

/***/ }),

/***/ "./src/constants/merchants.js":
/*!************************************!*\
  !*** ./src/constants/merchants.js ***!
  \************************************/
/*! exports provided: MERCHANT_FETCH_REQUESTED, MERCHANT_FETCH_FAILED, MERCHANT_FETCH_SUCCEEDED, MERCHANT_EDIT_REQUESTED, MERCHANT_EDIT_SUCCEEDED, MERCHANT_EDIT_FAILED, MERCHANTS_FETCH_REQUESTED, MERCHANTS_FETCH_FAILED, MERCHANTS_FETCH_SUCCEEDED, MERCHANT_REMOVE_REQUESTED, MERCHANT_REMOVE_FAILED, MERCHANT_REMOVE_SUCCEEDED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MERCHANT_FETCH_REQUESTED", function() { return MERCHANT_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MERCHANT_FETCH_FAILED", function() { return MERCHANT_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MERCHANT_FETCH_SUCCEEDED", function() { return MERCHANT_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MERCHANT_EDIT_REQUESTED", function() { return MERCHANT_EDIT_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MERCHANT_EDIT_SUCCEEDED", function() { return MERCHANT_EDIT_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MERCHANT_EDIT_FAILED", function() { return MERCHANT_EDIT_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MERCHANTS_FETCH_REQUESTED", function() { return MERCHANTS_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MERCHANTS_FETCH_FAILED", function() { return MERCHANTS_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MERCHANTS_FETCH_SUCCEEDED", function() { return MERCHANTS_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MERCHANT_REMOVE_REQUESTED", function() { return MERCHANT_REMOVE_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MERCHANT_REMOVE_FAILED", function() { return MERCHANT_REMOVE_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MERCHANT_REMOVE_SUCCEEDED", function() { return MERCHANT_REMOVE_SUCCEEDED; });
var MERCHANT_FETCH_REQUESTED = 'MERCHANT_FETCH_REQUESTED';
var MERCHANT_FETCH_FAILED = "MERCHANT_FETCH_FAILED";
var MERCHANT_FETCH_SUCCEEDED = "MERCHANT_FETCH_SUCCEEDED";
var MERCHANT_EDIT_REQUESTED = "MERCHANT_EDIT_REQUESTED";
var MERCHANT_EDIT_SUCCEEDED = "MERCHANT_EDIT_SUCCEEDED";
var MERCHANT_EDIT_FAILED = "MERCHANT_EDIT_FAILED";
var MERCHANTS_FETCH_REQUESTED = 'MERCHANTS_FETCH_REQUESTED';
var MERCHANTS_FETCH_FAILED = "MERCHANTS_FETCH_FAILED";
var MERCHANTS_FETCH_SUCCEEDED = "MERCHANTS_FETCH_SUCCEEDED";
var MERCHANT_REMOVE_REQUESTED = 'MERCHANT_REMOVE_REQUESTED';
var MERCHANT_REMOVE_FAILED = "MERCHANT_REMOVE_FAILED";
var MERCHANT_REMOVE_SUCCEEDED = "MERCHANT_REMOVE_SUCCEEDED";

/***/ }),

/***/ "./src/constants/offices.js":
/*!**********************************!*\
  !*** ./src/constants/offices.js ***!
  \**********************************/
/*! exports provided: OFFICE_CREATE_REQUESTED, OFFICE_CREATE_FAILED, OFFICE_CREATE_SUCCEEDED, OFFICE_REMOVE_REQUESTED, OFFICE_REMOVE_FAILED, OFFICE_REMOVE_SUCCEEDED, OFFICE_FETCH_REQUESTED, OFFICE_FETCH_FAILED, OFFICE_FETCH_SUCCEEDED, OFFICE_EDIT_REQUESTED, OFFICE_EDIT_FAILED, OFFICE_EDIT_SUCCEEDED, OFFICES_FETCH_REQUESTED, OFFICES_FETCH_FAILED, OFFICES_FETCH_SUCCEEDED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICE_CREATE_REQUESTED", function() { return OFFICE_CREATE_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICE_CREATE_FAILED", function() { return OFFICE_CREATE_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICE_CREATE_SUCCEEDED", function() { return OFFICE_CREATE_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICE_REMOVE_REQUESTED", function() { return OFFICE_REMOVE_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICE_REMOVE_FAILED", function() { return OFFICE_REMOVE_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICE_REMOVE_SUCCEEDED", function() { return OFFICE_REMOVE_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICE_FETCH_REQUESTED", function() { return OFFICE_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICE_FETCH_FAILED", function() { return OFFICE_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICE_FETCH_SUCCEEDED", function() { return OFFICE_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICE_EDIT_REQUESTED", function() { return OFFICE_EDIT_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICE_EDIT_FAILED", function() { return OFFICE_EDIT_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICE_EDIT_SUCCEEDED", function() { return OFFICE_EDIT_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICES_FETCH_REQUESTED", function() { return OFFICES_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICES_FETCH_FAILED", function() { return OFFICES_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OFFICES_FETCH_SUCCEEDED", function() { return OFFICES_FETCH_SUCCEEDED; });
var OFFICE_CREATE_REQUESTED = 'OFFICE_CREATE_REQUESTED';
var OFFICE_CREATE_FAILED = 'OFFICE_CREATE_FAILED';
var OFFICE_CREATE_SUCCEEDED = 'OFFICE_CREATE_SUCCEEDED';
var OFFICE_REMOVE_REQUESTED = 'OFFICE_REMOVE_REQUESTED';
var OFFICE_REMOVE_FAILED = 'OFFICE_REMOVE_FAILED';
var OFFICE_REMOVE_SUCCEEDED = 'OFFICE_REMOVE_SUCCEEDED';
var OFFICE_FETCH_REQUESTED = 'OFFICE_FETCH_REQUESTED';
var OFFICE_FETCH_FAILED = 'OFFICE_FETCH_FAILED';
var OFFICE_FETCH_SUCCEEDED = 'OFFICE_FETCH_SUCCEEDED';
var OFFICE_EDIT_REQUESTED = 'OFFICE_EDIT_REQUESTED';
var OFFICE_EDIT_FAILED = 'OFFICE_EDIT_FAILED';
var OFFICE_EDIT_SUCCEEDED = 'OFFICE_EDIT_SUCCEEDED';
var OFFICES_FETCH_REQUESTED = 'OFFICES_FETCH_REQUESTED';
var OFFICES_FETCH_FAILED = 'OFFICES_FETCH_FAILED';
var OFFICES_FETCH_SUCCEEDED = 'OFFICES_FETCH_SUCCEEDED';

/***/ }),

/***/ "./src/constants/popup.js":
/*!********************************!*\
  !*** ./src/constants/popup.js ***!
  \********************************/
/*! exports provided: ADD_POPUP, REMOVE_POPUP, REMOVE_ALL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ADD_POPUP", function() { return ADD_POPUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_POPUP", function() { return REMOVE_POPUP; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_ALL", function() { return REMOVE_ALL; });
var ADD_POPUP = "ADD_POPUP";
var REMOVE_POPUP = "REMOVE_POPUP";
var REMOVE_ALL = "REMOVE_ALL";

/***/ }),

/***/ "./src/constants/productOffers.js":
/*!****************************************!*\
  !*** ./src/constants/productOffers.js ***!
  \****************************************/
/*! exports provided: PRODUCTOFFER_REMOVE_REQUESTED, PRODUCTOFFER_REMOVE_FAILED, PRODUCTOFFER_REMOVE_SUCCEEDED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRODUCTOFFER_REMOVE_REQUESTED", function() { return PRODUCTOFFER_REMOVE_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRODUCTOFFER_REMOVE_FAILED", function() { return PRODUCTOFFER_REMOVE_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRODUCTOFFER_REMOVE_SUCCEEDED", function() { return PRODUCTOFFER_REMOVE_SUCCEEDED; });
var PRODUCTOFFER_REMOVE_REQUESTED = "PRODUCTOFFER_REMOVE_REQUESTED";
var PRODUCTOFFER_REMOVE_FAILED = "PRODUCTOFFER_REMOVE_FAILED";
var PRODUCTOFFER_REMOVE_SUCCEEDED = "PRODUCTOFFER_REMOVE_SUCCEEDED";

/***/ }),

/***/ "./src/constants/shippingQuotes.js":
/*!*****************************************!*\
  !*** ./src/constants/shippingQuotes.js ***!
  \*****************************************/
/*! exports provided: SHIPPINGQUOTES_FETCH_REQUESTED, SHIPPINGQUOTES_FETCH_FAILED, SHIPPINGQUOTES_FETCH_SUCCEEDED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHIPPINGQUOTES_FETCH_REQUESTED", function() { return SHIPPINGQUOTES_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHIPPINGQUOTES_FETCH_FAILED", function() { return SHIPPINGQUOTES_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SHIPPINGQUOTES_FETCH_SUCCEEDED", function() { return SHIPPINGQUOTES_FETCH_SUCCEEDED; });
var SHIPPINGQUOTES_FETCH_REQUESTED = "SHIPPINGQUOTES_FETCH_REQUESTED";
var SHIPPINGQUOTES_FETCH_FAILED = "SHIPPINGQUOTES_FETCH_FAILED";
var SHIPPINGQUOTES_FETCH_SUCCEEDED = "SHIPPINGQUOTES_FETCH_SUCCEEDED";

/***/ }),

/***/ "./src/constants/users.js":
/*!********************************!*\
  !*** ./src/constants/users.js ***!
  \********************************/
/*! exports provided: USERS_FETCH_NEW_REQUESTED, USERS_FETCH_NEW_FAILED, USERS_FETCH_NEW_SUCCEEDED, PROMOTE_TO_MERCHANT_REQUESTED, PROMOTE_TO_MERCHANT_FAILED, PROMOTE_TO_MERCHANT_SUCCEEDED, PROMOTE_TO_OPERATOR_REQUESTED, PROMOTE_TO_OPERATOR_FAILED, PROMOTE_TO_OPERATOR_SUCCEEDED, OPERATORS_FETCH_REQUESTED, OPERATORS_FETCH_FAILED, OPERATORS_FETCH_SUCCEEDED, OPERATOR_REMOVE_REQUESTED, OPERATOR_REMOVE_FAILED, OPERATOR_REMOVE_SUCCEEDED, OPERATOR_EDIT_REQUESTED, OPERATOR_EDIT_FAILED, OPERATOR_EDIT_SUCCEEDED, USERS_FETCH_REQUESTED, USERS_FETCH_FAILED, USERS_FETCH_SUCCEEDED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USERS_FETCH_NEW_REQUESTED", function() { return USERS_FETCH_NEW_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USERS_FETCH_NEW_FAILED", function() { return USERS_FETCH_NEW_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USERS_FETCH_NEW_SUCCEEDED", function() { return USERS_FETCH_NEW_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROMOTE_TO_MERCHANT_REQUESTED", function() { return PROMOTE_TO_MERCHANT_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROMOTE_TO_MERCHANT_FAILED", function() { return PROMOTE_TO_MERCHANT_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROMOTE_TO_MERCHANT_SUCCEEDED", function() { return PROMOTE_TO_MERCHANT_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROMOTE_TO_OPERATOR_REQUESTED", function() { return PROMOTE_TO_OPERATOR_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROMOTE_TO_OPERATOR_FAILED", function() { return PROMOTE_TO_OPERATOR_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PROMOTE_TO_OPERATOR_SUCCEEDED", function() { return PROMOTE_TO_OPERATOR_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPERATORS_FETCH_REQUESTED", function() { return OPERATORS_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPERATORS_FETCH_FAILED", function() { return OPERATORS_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPERATORS_FETCH_SUCCEEDED", function() { return OPERATORS_FETCH_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPERATOR_REMOVE_REQUESTED", function() { return OPERATOR_REMOVE_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPERATOR_REMOVE_FAILED", function() { return OPERATOR_REMOVE_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPERATOR_REMOVE_SUCCEEDED", function() { return OPERATOR_REMOVE_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPERATOR_EDIT_REQUESTED", function() { return OPERATOR_EDIT_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPERATOR_EDIT_FAILED", function() { return OPERATOR_EDIT_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OPERATOR_EDIT_SUCCEEDED", function() { return OPERATOR_EDIT_SUCCEEDED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USERS_FETCH_REQUESTED", function() { return USERS_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USERS_FETCH_FAILED", function() { return USERS_FETCH_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "USERS_FETCH_SUCCEEDED", function() { return USERS_FETCH_SUCCEEDED; });
var USERS_FETCH_NEW_REQUESTED = 'USERS_FETCH_NEW_REQUESTED';
var USERS_FETCH_NEW_FAILED = 'USERS_FETCH_NEW_FAILED';
var USERS_FETCH_NEW_SUCCEEDED = 'USERS_FETCH_NEW_SUCCEEDED';
var PROMOTE_TO_MERCHANT_REQUESTED = 'PROMOTE_TO_MERCHANT_REQUESTED';
var PROMOTE_TO_MERCHANT_FAILED = 'PROMOTE_TO_MERCHANT_FAILED';
var PROMOTE_TO_MERCHANT_SUCCEEDED = 'PROMOTE_TO_MERCHANT_SUCCEEDED';
var PROMOTE_TO_OPERATOR_REQUESTED = 'PROMOTE_TO_OPERATOR_REQUESTED';
var PROMOTE_TO_OPERATOR_FAILED = 'PROMOTE_TO_OPERATOR_FAILED';
var PROMOTE_TO_OPERATOR_SUCCEEDED = 'PROMOTE_TO_OPERATOR_SUCCEEDED';
var OPERATORS_FETCH_REQUESTED = 'OPERATORS_FETCH_REQUESTED';
var OPERATORS_FETCH_FAILED = 'OPERATORS_FETCH_FAILED';
var OPERATORS_FETCH_SUCCEEDED = 'OPERATORS_FETCH_SUCCEEDED';
var OPERATOR_REMOVE_REQUESTED = 'OPERATOR_REMOVE_REQUESTED';
var OPERATOR_REMOVE_FAILED = 'OPERATOR_REMOVE_FAILED';
var OPERATOR_REMOVE_SUCCEEDED = 'OPERATOR_REMOVE_SUCCEEDED';
var OPERATOR_EDIT_REQUESTED = 'OPERATOR_EDIT_REQUESTED';
var OPERATOR_EDIT_FAILED = 'OPERATOR_EDIT_FAILED';
var OPERATOR_EDIT_SUCCEEDED = 'OPERATOR_EDIT_SUCCEEDED'; //administration

var USERS_FETCH_REQUESTED = 'USERS_FETCH_REQUESTED';
var USERS_FETCH_FAILED = 'USERS_FETCH_FAILED';
var USERS_FETCH_SUCCEEDED = 'USERS_FETCH_SUCCEEDED';

/***/ }),

/***/ "./src/modules/broadcast.js":
/*!**********************************!*\
  !*** ./src/modules/broadcast.js ***!
  \**********************************/
/*! exports provided: initialState, default, getBroadcast, postBroadcast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBroadcast", function() { return getBroadcast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postBroadcast", function() { return postBroadcast; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _constants_broadcast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/broadcast */ "./src/constants/broadcast.js");


var initialState = {
  broadcastData: {},
  isFetching: true
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants_broadcast__WEBPACK_IMPORTED_MODULE_1__["BROADCAST_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isFetching: true
        });
      }

    case _constants_broadcast__WEBPACK_IMPORTED_MODULE_1__["BROADCAST_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          broadcastData: action.payload,
          isFetching: false
        });
      }

    default:
      {
        return state;
      }
  }
}
function getBroadcast(id, resolve) {
  return {
    type: _constants_broadcast__WEBPACK_IMPORTED_MODULE_1__["BROADCAST_FETCH_REQUESTED"],
    payload: {
      id: id
    },
    resolve: resolve
  };
}
function postBroadcast(id, brcRules) {
  return {
    type: _constants_broadcast__WEBPACK_IMPORTED_MODULE_1__["BROADCAST_POST_REQUESTED"],
    payload: {
      id: id,
      brcRules: brcRules
    }
  };
}

/***/ }),

/***/ "./src/modules/cart.js":
/*!*****************************!*\
  !*** ./src/modules/cart.js ***!
  \*****************************/
/*! exports provided: initialState, default, getProductOffer, getCart, getDeliveryAddresses, getPayments, deleteCart, postNewOrder, postNewDeliveryAddress, getOrderDetail, postOrderEdit, putDeliveryAddressEdit, getShippingQuotes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProductOffer", function() { return getProductOffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCart", function() { return getCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDeliveryAddresses", function() { return getDeliveryAddresses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPayments", function() { return getPayments; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteCart", function() { return deleteCart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postNewOrder", function() { return postNewOrder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postNewDeliveryAddress", function() { return postNewDeliveryAddress; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOrderDetail", function() { return getOrderDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postOrderEdit", function() { return postOrderEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putDeliveryAddressEdit", function() { return putDeliveryAddressEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShippingQuotes", function() { return getShippingQuotes; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _constants_cart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/cart */ "./src/constants/cart.js");


var initialState = {
  offerDetail: {},
  orderDetail: {},
  cart: {},
  deliveryAddresses: [],
  payments: [],
  isFetching: true,
  cartIsFetching: true,
  orderDetailIsFetching: true,
  offerDetailIsFetching: true,
  selectedAddressId: null,
  selectedCardId: null,
  shippingQuotes: []
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants_cart__WEBPACK_IMPORTED_MODULE_1__["ORDERDETAIL_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          orderDetailIsFetching: true
        });
      }

    case _constants_cart__WEBPACK_IMPORTED_MODULE_1__["ORDERDETAIL_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          orderDetail: action.payload,
          orderDetailIsFetching: false
        });
      }

    case _constants_cart__WEBPACK_IMPORTED_MODULE_1__["DELIVERYADDRESSES_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isFetching: true
        });
      }

    case _constants_cart__WEBPACK_IMPORTED_MODULE_1__["DELIVERYADDRESSES_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          deliveryAddresses: action.payload,
          isFetching: false
        });
      }

    case _constants_cart__WEBPACK_IMPORTED_MODULE_1__["PAYMENTS_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isFetching: true
        });
      }

    case _constants_cart__WEBPACK_IMPORTED_MODULE_1__["PAYMENTS_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          payments: action.payload,
          isFetching: false
        });
      }

    case _constants_cart__WEBPACK_IMPORTED_MODULE_1__["OFFER_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          offerDetailIsFetching: true
        });
      }

    case _constants_cart__WEBPACK_IMPORTED_MODULE_1__["OFFER_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          offerDetail: action.payload,
          offerDetailIsFetching: false
        });
      }

    case _constants_cart__WEBPACK_IMPORTED_MODULE_1__["CART_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          cartIsFetching: true
        });
      }

    case _constants_cart__WEBPACK_IMPORTED_MODULE_1__["CART_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          cart: action.payload,
          cartIsFetching: false
        });
      }

    case _constants_cart__WEBPACK_IMPORTED_MODULE_1__["SHIPPING_QUOTES_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          country: action.country,
          zip: action.zip,
          shippingQuotesAreFetching: true
        });
      }

    case _constants_cart__WEBPACK_IMPORTED_MODULE_1__["SHIPPING_QUOTES_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          shippingQuotes: action.payload,
          shippingQuotesAreFetching: false
        });
      }

    default:
      {
        return state;
      }
  }
}
function getProductOffer(id) {
  return {
    type: _constants_cart__WEBPACK_IMPORTED_MODULE_1__["OFFER_FETCH_REQUESTED"],
    payload: {
      id: id
    }
  };
}
function getCart() {
  return {
    type: _constants_cart__WEBPACK_IMPORTED_MODULE_1__["CART_FETCH_REQUESTED"]
  };
}
function getDeliveryAddresses() {
  return {
    type: _constants_cart__WEBPACK_IMPORTED_MODULE_1__["DELIVERYADDRESSES_FETCH_REQUESTED"]
  };
}
function getPayments() {
  return {
    type: _constants_cart__WEBPACK_IMPORTED_MODULE_1__["PAYMENTS_FETCH_REQUESTED"]
  };
}
function deleteCart(id) {
  return {
    type: _constants_cart__WEBPACK_IMPORTED_MODULE_1__["PRODUCTFROMCART_REMOVE_REQUESTED"],
    payload: {
      id: id
    }
  };
}
function postNewOrder(product) {
  return {
    type: _constants_cart__WEBPACK_IMPORTED_MODULE_1__["CARTITEM_CREATE_REQUESTED"],
    payload: {
      product: product
    }
  };
}
function postNewDeliveryAddress(address) {
  return {
    type: _constants_cart__WEBPACK_IMPORTED_MODULE_1__["DELIVERYADDRESS_CREATE_REQUESTED"],
    payload: {
      address: address
    }
  };
}
function getOrderDetail(id) {
  return {
    type: _constants_cart__WEBPACK_IMPORTED_MODULE_1__["ORDERDETAIL_FETCH_REQUESTED"],
    payload: {
      id: id
    }
  };
}
function postOrderEdit(order) {
  return {
    type: _constants_cart__WEBPACK_IMPORTED_MODULE_1__["ORDER_EDIT_REQUESTED"],
    payload: {
      order: order
    }
  };
}
function putDeliveryAddressEdit(address) {
  return {
    type: _constants_cart__WEBPACK_IMPORTED_MODULE_1__["DELIVERYADDRESS_EDIT_REQUESTED"],
    payload: {
      address: address
    }
  };
}
function getShippingQuotes(countryId, zip) {
  return {
    type: _constants_cart__WEBPACK_IMPORTED_MODULE_1__["SHIPPING_QUOTES_FETCH_REQUESTED"],
    payload: {
      countryId: countryId,
      zip: zip
    }
  };
}

/***/ }),

/***/ "./src/modules/companies.js":
/*!**********************************!*\
  !*** ./src/modules/companies.js ***!
  \**********************************/
/*! exports provided: initialState, default, fetchAll, fetchDetail, postNewCompany, putCompanyEdit, deleteCompany, postNewOffice, deleteOffice, getOffice, putOfficeEdit, getOffices */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAll", function() { return fetchAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchDetail", function() { return fetchDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postNewCompany", function() { return postNewCompany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putCompanyEdit", function() { return putCompanyEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteCompany", function() { return deleteCompany; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postNewOffice", function() { return postNewOffice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteOffice", function() { return deleteOffice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOffice", function() { return getOffice; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putOfficeEdit", function() { return putOfficeEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOffices", function() { return getOffices; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _constants_companies__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/companies */ "./src/constants/companies.js");
/* harmony import */ var _constants_offices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/offices */ "./src/constants/offices.js");



var initialState = {
  data: [],
  detail: {},
  office: {},
  offices: [],
  isFetching: true
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants_companies__WEBPACK_IMPORTED_MODULE_1__["COMPANY_FETCH_REQUESTED"]:
    case _constants_offices__WEBPACK_IMPORTED_MODULE_2__["OFFICE_FETCH_REQUESTED"]:
    case _constants_offices__WEBPACK_IMPORTED_MODULE_2__["OFFICES_FETCH_REQUESTED"]:
    case _constants_companies__WEBPACK_IMPORTED_MODULE_1__["COMPANIES_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isFetching: true
        });
      }

    case _constants_offices__WEBPACK_IMPORTED_MODULE_2__["OFFICES_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          offices: action.payload,
          isFetching: false
        });
      }

    case _constants_companies__WEBPACK_IMPORTED_MODULE_1__["COMPANIES_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          data: action.payload,
          isFetching: false
        });
      }

    case _constants_companies__WEBPACK_IMPORTED_MODULE_1__["COMPANY_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          detail: action.payload,
          isFetching: false
        });
      }

    case _constants_offices__WEBPACK_IMPORTED_MODULE_2__["OFFICE_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          office: action.payload,
          isFetching: false
        });
      }

    default:
      {
        return state;
      }
  }
}
function fetchAll() {
  var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    type: _constants_companies__WEBPACK_IMPORTED_MODULE_1__["COMPANIES_FETCH_REQUESTED"],
    payload: {
      search: search
    }
  };
}
function fetchDetail(id, resolve) {
  return {
    type: _constants_companies__WEBPACK_IMPORTED_MODULE_1__["COMPANY_FETCH_REQUESTED"],
    payload: {
      id: id
    },
    resolve: resolve
  };
}
function postNewCompany(name, onSuccess) {
  return {
    type: _constants_companies__WEBPACK_IMPORTED_MODULE_1__["COMPANY_CREATE_REQUESTED"],
    payload: {
      name: name,
      onSuccess: onSuccess
    }
  };
}
function putCompanyEdit(company) {
  return {
    type: _constants_companies__WEBPACK_IMPORTED_MODULE_1__["COMPANY_EDIT_REQUESTED"],
    payload: {
      company: company
    }
  };
}
function deleteCompany(id, onSuccess) {
  return {
    type: _constants_companies__WEBPACK_IMPORTED_MODULE_1__["COMPANY_REMOVE_REQUESTED"],
    payload: {
      id: id,
      onSuccess: onSuccess
    }
  };
}
function postNewOffice(office, onSuccess) {
  return {
    type: _constants_offices__WEBPACK_IMPORTED_MODULE_2__["OFFICE_CREATE_REQUESTED"],
    payload: {
      office: office,
      onSuccess: onSuccess
    }
  };
}
function deleteOffice(id, company) {
  return {
    type: _constants_offices__WEBPACK_IMPORTED_MODULE_2__["OFFICE_REMOVE_REQUESTED"],
    payload: {
      id: id,
      company: company
    }
  };
}
function getOffice(id) {
  return {
    type: _constants_offices__WEBPACK_IMPORTED_MODULE_2__["OFFICE_FETCH_REQUESTED"],
    payload: {
      id: id
    }
  };
}
function putOfficeEdit(office) {
  return {
    type: _constants_offices__WEBPACK_IMPORTED_MODULE_2__["OFFICE_EDIT_REQUESTED"],
    payload: {
      office: office
    }
  };
}
function getOffices() {
  return {
    type: _constants_offices__WEBPACK_IMPORTED_MODULE_2__["OFFICES_FETCH_REQUESTED"]
  };
}

/***/ }),

/***/ "./src/modules/dataTables.js":
/*!***********************************!*\
  !*** ./src/modules/dataTables.js ***!
  \***********************************/
/*! exports provided: initialState, default, initDataTable, selectRow, selectGroup, selectDataTable, toggleVisibleColumn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initDataTable", function() { return initDataTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectRow", function() { return selectRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectGroup", function() { return selectGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectDataTable", function() { return selectDataTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleVisibleColumn", function() { return toggleVisibleColumn; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");


var INIT_DATA_TABLE = 'INIT_DATA_TABLE';
var SELECT_ROW = 'SELECT_ROW';
var SELECT_GROUP = 'SELECT_GROUP';
var TOGGLE_VISIBLE_COLUMN = 'TOGGLE_VISIBLE_COLUMN';
var SELECT_DATA_TABLE = 'SELECT_DATA_TABLE';
var initialState = {};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case INIT_DATA_TABLE:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, action.payload.id, {
          header: action.payload.header,
          rowsOpns: action.payload.rowsOpns
        }));
      }

    case SELECT_ROW:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, action.payload.id, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state[action.payload.id], {
          rowsOpns: state[action.payload.id].rowsOpns.map(function (row) {
            return row.index === action.payload.groupId ? Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state[action.payload.id].rowsOpns[action.payload.groupId], {
              rows: state[action.payload.id].rowsOpns[action.payload.groupId].rows.map(function (rw) {
                return rw.index === action.payload.rowId ? Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state[action.payload.id].rowsOpns[action.payload.groupId].rows[action.payload.rowId], {
                  selected: action.payload.value
                }) : rw;
              })
            }) : row;
          })
        })));
      }

    case SELECT_GROUP:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, action.payload.id, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state[action.payload.id], {
          rowsOpns: state[action.payload.id].rowsOpns.map(function (row) {
            return row.index === action.payload.groupId ? Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state[action.payload.id].rowsOpns[action.payload.groupId], {
              rows: action.payload.rows
            }) : row;
          })
        })));
      }

    case SELECT_DATA_TABLE:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, action.payload.id, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state[action.payload.id], {
          rowsOpns: action.payload.rowsOpns
        })));
      }

    case TOGGLE_VISIBLE_COLUMN:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, action.payload.id, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state[action.payload.id], {
          header: state[action.payload.id].header.map(function (h) {
            return h.index === action.payload.headerId ? Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state[action.payload.id].rowsOpns[action.payload.headerId], {
              visible: action.payload.value
            }) : h;
          })
        })));
      }

    default:
      return state;
  }
}
function initDataTable(id, header, rowsOpns) {
  return {
    type: INIT_DATA_TABLE,
    payload: {
      id: id,
      header: header,
      rowsOpns: rowsOpns
    }
  };
}
function selectRow(id, groupId, rowId, value) {
  return {
    type: SELECT_ROW,
    payload: {
      id: id,
      groupId: groupId,
      rowId: rowId,
      value: value
    }
  };
}
function selectGroup(id, groupId, rows) {
  return {
    type: SELECT_GROUP,
    payload: {
      id: id,
      groupId: groupId,
      rows: rows
    }
  };
}
function selectDataTable(id, rowsOpns) {
  return {
    type: SELECT_DATA_TABLE,
    payload: {
      id: id,
      rowsOpns: rowsOpns
    }
  };
}
function toggleVisibleColumn(id, headerId, value) {
  return {
    type: TOGGLE_VISIBLE_COLUMN,
    payload: {
      id: id,
      headerId: headerId,
      value: value
    }
  };
}

/***/ }),

/***/ "./src/modules/errors.js":
/*!*******************************!*\
  !*** ./src/modules/errors.js ***!
  \*******************************/
/*! exports provided: TOO_LARGE_FILE, UPLOAD_FILE_FAILED, initialState, default, closeMessage, addMessage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOO_LARGE_FILE", function() { return TOO_LARGE_FILE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UPLOAD_FILE_FAILED", function() { return UPLOAD_FILE_FAILED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeMessage", function() { return closeMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addMessage", function() { return addMessage; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-intl */ "react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_4__);





var CLOSE_MESSAGE = 'CLOSE_MESSAGE';
var ADD_MESSAGE = 'ADD_MESSAGE'; //register const for all axios endpoints

var ADD_PRODUCT_OFFER_REJECTED = 'ADD_PRODUCT_OFFER_REJECTED';
var EDIT_PRODUCT_OFFER_REJECTED = 'EDIT_PRODUCT_OFFER_REJECTED';
var SAVE_MAPPING_REJECTED = 'SAVE_MAPPING_REJECTED';
var ADD_ATTACHMENT_REJECTED = 'ADD_ATTACHMENT_REJECTED';
var TOO_LARGE_FILE = 'TOO_LARGE_FILE';
var UPLOAD_FILE_FAILED = 'UPLOAD_FILE_FAILED'; // const SAVE_MAPPING_REJECTED = 'SAVE_MAPPING_REJECTED';
// const FETCH_ORIGIN_REJECTED = 'FETCH_ORIGIN_REJECTED';
// const FETCH_RECENT_ADDED_PRODUCTS_REJECTED = 'FETCH_RECENT_ADDED_PRODUCTS_REJECTED';
// const FETCH_PRODUCT_GRADE_REJECTED = 'FETCH_PRODUCT_GRADE_REJECTED';
// const FETCH_PRODUCT_CONDITIONS_REJECTED = 'FETCH_PRODUCT_CONDITIONS_REJECTED';
// const FETCH_PRODUCT_FORMS_REJECTED = 'PRODUCT_FORMS_REJECTED';
// const GET_UNIT_OF_PACKAGING_REJECTED = 'GET_UNIT_OF_PACKAGING_REJECTED';
// const GET_UNIT_OF_MEASUREMENT_REJECTED = 'GET_UNIT_OF_MEASUREMENT_REJECTED';
// const GET_PRODUCT_OFFERS_REJECTED = 'GET_PRODUCT_OFFERS_REJECTED';
// const GET_PACKAGE_TYPES_REJECTED = 'GET_PACKAGE_TYPES_REJECTED';
// const VALIDATE_PACKAGE_TYPE_REJECTED = 'VALIDATE_PACKAGE_TYPE_REJECTED';
// const ACCEPT_MERCHANT_REJECTED = 'ACCEPT_MERCHANT_REJECTED';
// const REJECT_MERCHANT_REJECTED = 'REJECT_MERCHANT_REJECTED';
// const UPDATE_APPROVE_REJECTED = 'UPDATE_APPROVE_REJECTED';
// const FETCH_WAREHOUSE_FULFILLED_REJECTED = 'FETCH_WAREHOUSE_FULFILLED_REJECTED';
// const FETCH_LOCATIONS_FULFILLED_REJECTED = 'FETCH_LOCATIONS_FULFILLED_REJECTED';
// const SAVE_WAREHOUSE_REJECTED = 'SAVE_WAREHOUSE_REJECTED';
// const UPDATE_WAREHOUSE_REJECTED = 'UPDATE_WAREHOUSE_REJECTED';
// const GET_COMPANIES_REJECTED = 'GET_COMPANIES_REJECTED';
// const CURRENT_ADDED_REJECTED = "CURRENT_ADDED_REJECTED";
// const CHANGE_RULES_REJECTED = "CHANGE_RULES_REJECTED";
// const PACKAGE_OPTIONS_REJECTED = 'PACKAGE_OPTIONS_REJECTED';
// const MANUFACTURER_REJECTED = 'MANUFACTURER_REJECTED';

var initialState = {
  messages: []
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    // case SAVE_MAPPING_REJECTED:
    // case FETCH_ORIGIN_REJECTED:
    // case FETCH_RECENT_ADDED_PRODUCTS_REJECTED:
    // case FETCH_PRODUCT_GRADE_REJECTED:
    // case FETCH_PRODUCT_CONDITIONS_REJECTED:
    // case FETCH_PRODUCT_FORMS_REJECTED:
    // case GET_UNIT_OF_PACKAGING_REJECTED:
    // case GET_UNIT_OF_MEASUREMENT_REJECTED:
    // case GET_PACKAGE_TYPES_REJECTED:
    // case VALIDATE_PACKAGE_TYPE_REJECTED:
    // case ACCEPT_MERCHANT_REJECTED:
    // case REJECT_MERCHANT_REJECTED:
    // case UPDATE_APPROVE_REJECTED:
    // case FETCH_WAREHOUSE_FULFILLED_REJECTED:
    // case FETCH_LOCATIONS_FULFILLED_REJECTED:
    // case SAVE_WAREHOUSE_REJECTED:
    // case UPDATE_WAREHOUSE_REJECTED:
    // case GET_COMPANIES_REJECTED:
    // case CURRENT_ADDED_REJECTED:
    // case CHANGE_RULES_REJECTED:
    // case PACKAGE_OPTIONS_REJECTED:
    // case MANUFACTURER_REJECTED:
    case ADD_PRODUCT_OFFER_REJECTED:
    case EDIT_PRODUCT_OFFER_REJECTED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          messages: [].concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(state.messages), [action.payload.response && action.payload.response.data.message && action.payload.response.data.message.length <= 100 ? action.payload.response.data.message : action.payload.message])
        });
      }

    case SAVE_MAPPING_REJECTED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          messages: [].concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(state.messages), [action.payload.message])
        });
      }

    case CLOSE_MESSAGE:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          messages: [].concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(state.messages.slice(0, action.payload)), Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(state.messages.slice(action.payload + 1)))
        });
      }

    case ADD_MESSAGE:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          messages: [].concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(state.messages), [action.payload])
        });
      }

    case ADD_ATTACHMENT_REJECTED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          messages: [].concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(state.messages), [action.payload.response.data.message])
        });
      }

    case TOO_LARGE_FILE:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          messages: [].concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(state.messages), [react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_4__["FormattedMessage"], {
            id: "tooLargeFile",
            defaultMessage: "File \"{fileName}\" is larger than maximal allowed size: {maxSize} MB",
            values: {
              fileName: action.payload.fileName,
              maxSize: action.payload.maxSize
            }
          })])
        });
      }

    case UPLOAD_FILE_FAILED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          messages: [].concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(state.messages), [react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(react_intl__WEBPACK_IMPORTED_MODULE_4__["FormattedMessage"], {
            id: "uploadFileFailed",
            defaultMessage: "File \"{fileName}\" was not uploaded due to error.",
            values: {
              fileName: action.payload.fileName
            }
          })])
        });
      }

    default:
      {
        return state;
      }
  }
}
function closeMessage(index) {
  return {
    type: CLOSE_MESSAGE,
    payload: index
  };
}
function addMessage(message) {
  return {
    type: ADD_MESSAGE,
    payload: message
  };
}

/***/ }),

/***/ "./src/modules/filter.js":
/*!*******************************!*\
  !*** ./src/modules/filter.js ***!
  \*******************************/
/*! exports provided: initialState, default, toggleFilter, toggleFilterGroup, addFilterTag, closeFilterTag, resetFilterTags, fetchSavedFilters, deleteSaveFilter, saveSaveFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleFilter", function() { return toggleFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleFilterGroup", function() { return toggleFilterGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFilterTag", function() { return addFilterTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeFilterTag", function() { return closeFilterTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetFilterTags", function() { return resetFilterTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchSavedFilters", function() { return fetchSavedFilters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteSaveFilter", function() { return deleteSaveFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveSaveFilter", function() { return saveSaveFilter; });
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_4__);





var RESET_TAGS = "RESET_TAGS";
var TOGGLE_FILTER = "TOGGLE_FILTER";
var TOGGLE_FILTER_GROUP = 'TOGGLE_FILTER_GROUP';
var ADD_FILTER_TAG = 'ADD_FILTER_TAG';
var CLOSE_FILTER_TAG = 'CLOSE_FILTER_TAG';
var CLOSE_FILTER_TAG_FULFILLED = 'CLOSE_FILTER_TAG_FULFILLED';
var GET_SAVE_FILTERS = 'GET_SAVE_FILTERS';
var GET_SAVE_FILTERS_FULFILLED = 'GET_SAVE_FILTERS_FULFILLED';
var DELETE_SAVE_FILTER = 'DELETE_SAVE_FILTER';
var SAVE_SAVE_FILTER = 'SAVE_SAVE_FILTER';
var initialState = {
  isOpen: false,
  data: {},
  filterGroup: {
    orderId: true,
    orderDate: true,
    customer: false,
    product: false,
    orderStatus: false,
    chemName: true,
    quantity: true,
    price: true,
    packaging: false,
    productGrade: false,
    chemSearch: false,
    productAge: false,
    location: false,
    date: false,
    condition: false,
    form: false
  },
  filterTags: [],
  saveFilters: []
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case TOGGLE_FILTER:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, state, {
          isOpen: !state.isOpen
        });
      }

    case TOGGLE_FILTER_GROUP:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, state, {
          filterGroup: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, state.filterGroup, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, action.payload.name, action.payload.value))
        });
      }

    case ADD_FILTER_TAG:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, state, {
          filterTags: action.payload
        });
      }

    case CLOSE_FILTER_TAG_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, state, {
          filterTags: Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(state.filterTags.slice(0, action.payload)).concat(Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__["default"])(state.filterTags.slice(action.payload + 1)))
        });
      }

    case RESET_TAGS:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, state, {
          filterTags: []
        });
      }

    case GET_SAVE_FILTERS_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, state, {
          saveFilters: action.payload
        });
      }

    default:
      {
        return state;
      }
  }
}
function toggleFilter() {
  return {
    type: TOGGLE_FILTER
  };
}
function toggleFilterGroup(name, value) {
  return {
    type: TOGGLE_FILTER_GROUP,
    payload: {
      name: name,
      value: value
    }
  };
}
function addFilterTag(data) {
  return {
    type: ADD_FILTER_TAG,
    payload: data
  };
}
function closeFilterTag(index) {
  return {
    type: CLOSE_FILTER_TAG,
    payload: _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.resolve(index)
  };
}
function resetFilterTags() {
  return {
    type: RESET_TAGS
  };
}
function fetchSavedFilters() {
  return {
    type: GET_SAVE_FILTERS,
    payload: axios__WEBPACK_IMPORTED_MODULE_4___default.a.get("/prodex/api/filters").then(function (response) {
      return response.data;
    })
  };
}
function deleteSaveFilter(id) {
  return {
    type: DELETE_SAVE_FILTER,
    payload: axios__WEBPACK_IMPORTED_MODULE_4___default.a.delete("/prodex/api/filters/".concat(id))
  };
}
function saveSaveFilter(inputs) {
  return {
    type: SAVE_SAVE_FILTER,
    payload: axios__WEBPACK_IMPORTED_MODULE_4___default.a.post("/prodex/api/filters", inputs)
  };
}

/***/ }),

/***/ "./src/modules/identity.js":
/*!*********************************!*\
  !*** ./src/modules/identity.js ***!
  \*********************************/
/*! exports provided: initialState, default, getIdentity, login, getVersion, logout, registration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getIdentity", function() { return getIdentity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getVersion", function() { return getVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logout", function() { return logout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registration", function() { return registration; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! qs */ "qs");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/auth */ "./src/utils/auth.js");
/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/constants */ "./src/utils/constants.js");






var GET_IDENTITY = 'GET_IDENTITY';
var GET_IDENTITY_PENDING = 'GET_IDENTITY_PENDING';
var GET_IDENTITY_FULFILLED = 'GET_IDENTITY_FULFILLED';
var GET_IDENTITY_REJECTED = 'GET_IDENTITY_REJECTED';
var LOGIN = 'LOGIN';
var LOGIN_PENDING = 'LOGIN_PENDING';
var LOGIN_REJECTED = 'LOGIN_REJECTED';
var LOGIN_FULFILLED = 'LOGIN_FULFILLED';
var LOGOUT = 'LOGOUT';
var GET_VERSION = 'GET_VERSION';
var GET_VERSION_FULFILLED = 'GET_VERSION_FULFILLED';
var REGISTRATION = 'REGISTRATION';
var REGISTRATION_PENDING = 'REGISTRATION_PENDING';
var REGISTRATION_REJECTED = 'REGISTRATION_REJECTED';
var REGISTRATION_FULFILLED = 'REGISTRATION_FULFILLED';
var initialState = {
  isAuthenticated: false,
  identity: {
    isFetching: false,
    data: {
      role: _utils_constants__WEBPACK_IMPORTED_MODULE_4__["ROLE_GUEST"]
    }
  },
  loginForm: {
    isFetching: false,
    hasError: false,
    isValid: false,
    data: {
      email: "",
      password: "",
      role: _utils_constants__WEBPACK_IMPORTED_MODULE_4__["ROLE_GUEST"]
    }
  },
  registrationForm: {
    isFetching: false,
    hasError: false,
    isValid: false,
    data: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: ""
    }
  },
  version: "0"
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case GET_IDENTITY_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isAuthenticated: false,
          identity: {
            isFetching: true,
            data: {
              role: _utils_constants__WEBPACK_IMPORTED_MODULE_4__["ROLE_GUEST"]
            }
          }
        });
      }

    case GET_IDENTITY_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isAuthenticated: true,
          identity: {
            isFetching: false,
            data: action.payload
          }
        });
      }

    case GET_IDENTITY_REJECTED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isAuthenticated: false,
          identity: {
            isFetching: false,
            data: {
              role: _utils_constants__WEBPACK_IMPORTED_MODULE_4__["ROLE_GUEST"]
            }
          }
        });
      }

    case LOGIN_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          loginForm: {
            isFetching: true,
            hasError: false,
            isValid: false
          }
        });
      }

    case LOGIN_REJECTED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          loginForm: {
            isFetching: false,
            hasError: true,
            isValid: false
          }
        });
      }

    case LOGIN_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          loginForm: {
            isFetching: false,
            hasError: false,
            isValid: true
          }
        });
      }

    case REGISTRATION_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          registrationForm: {
            isFetching: true,
            hasError: false,
            isValid: false
          }
        });
      }

    case REGISTRATION_REJECTED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          registrationForm: {
            isFetching: false,
            hasError: true,
            isValid: false
          }
        });
      }

    case REGISTRATION_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          registrationForm: {
            isFetching: false,
            hasError: false,
            isValid: true
          }
        });
      }

    case LOGOUT:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          identity: initialState.identity,
          isAuthenticated: false
        });
      }

    case GET_VERSION_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          version: action.payload
        });
      }

    default:
      {
        return state;
      }
  }
}
function getIdentity() {
  return {
    type: GET_IDENTITY,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/prodex/api/users/me").then(function (response) {
      return response.data;
    }).catch(function (e) {
      Object(_utils_auth__WEBPACK_IMPORTED_MODULE_3__["deleteAuthToken"])();
      throw e;
    })
  };
}
function login(username, password) {
  var grant_type = "password";
  return {
    type: LOGIN,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/prodex/oauth/token", qs__WEBPACK_IMPORTED_MODULE_2___default.a.stringify({
      grant_type: grant_type,
      username: username,
      password: password
    }), {
      headers: {
        'Authorization': 'Basic cHJvZGV4LXJlYWN0OmthcmVsLXZhcmVs'
      }
    }).then(function (response) {
      return Object(_utils_auth__WEBPACK_IMPORTED_MODULE_3__["setAuthToken"])(response.data.access_token);
    })
  };
}
function getVersion() {
  return {
    type: GET_VERSION,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/prodex/api/version").then(function (result) {
      return result.data.version;
    })
  };
}
function logout() {
  Object(_utils_auth__WEBPACK_IMPORTED_MODULE_3__["deleteAuthToken"])();
  return {
    type: LOGOUT
  };
}
function registration(email, password, firstName, middleName, lastName) {
  return {
    type: REGISTRATION,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default()({
      method: 'post',
      url: "/api/users",
      data: {
        email: email,
        password: password,
        firstname: firstName,
        middlename: middleName,
        lastname: lastName
      }
    })
  };
}

/***/ }),

/***/ "./src/modules/location.js":
/*!*********************************!*\
  !*** ./src/modules/location.js ***!
  \*********************************/
/*! exports provided: initialState, default, fetchLocations, fetchFilterLocations, fetchWarehouses, saveWarehouse, updateWarehouse, getRegions, getStates, getStateDetail, fetchWarehouseDistances, getRegionDetail, fetchProvinces */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLocations", function() { return fetchLocations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchFilterLocations", function() { return fetchFilterLocations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchWarehouses", function() { return fetchWarehouses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveWarehouse", function() { return saveWarehouse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateWarehouse", function() { return updateWarehouse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRegions", function() { return getRegions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStates", function() { return getStates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStateDetail", function() { return getStateDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchWarehouseDistances", function() { return fetchWarehouseDistances; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRegionDetail", function() { return getRegionDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProvinces", function() { return fetchProvinces; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_locations__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/locations */ "./src/constants/locations.js");



var FETCH_WAREHOUSE = 'FETCH_WAREHOUSE';
var FETCH_WAREHOUSE_FULFILLED = 'FETCH_WAREHOUSE_FULFILLED';
var FETCH_LOCATIONS = 'FETCH_LOCATIONS';
var FETCH_LOCATIONS_PENDING = 'FETCH_LOCATIONS_PENDING';
var FETCH_LOCATIONS_FULFILLED = 'FETCH_LOCATIONS_FULFILLED';
var FETCH_FILTER_LOCATIONS = 'FETCH_FILTER_LOCATIONS';
var FETCH_FILTER_LOCATIONS_FULFILLED = 'FETCH_FILTER_LOCATIONS_FULFILLED';
var SAVE_WAREHOUSE = 'SAVE_WAREHOUSE';
var UPDATE_WAREHOUSE = 'UPDATE_WAREHOUSE';
var FETCH_WAREHOUSE_DISTANCES = 'FETCH_WAREHOUSE_DISTANCES';
var initialState = {
  isPending: false,
  isValid: false,
  hasError: false,
  warehouse: [],
  locations: [],
  filterLocations: [],
  regions: [],
  states: [],
  provinces: [],
  stateDetail: {},
  regionDetail: {},
  stateDetailIsFetching: false,
  regionDetailIsFetching: false,
  statesAreFetching: false,
  regionsAreFetching: false,
  isFetching: false,
  warehouseDistances: [],
  //filter location
  locationFetching: false,
  filterLocationsFetching: false,
  data: {}
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case FETCH_LOCATIONS_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          locationFetching: true,
          locationsFetched: false
        });
      }

    case FETCH_WAREHOUSE_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          warehouse: action.payload
        });
      }

    case FETCH_LOCATIONS_FULFILLED:
      {
        var locations = action.payload.map(function (loc) {
          return {
            id: loc.id,
            province: loc.province,
            country: loc.country
          };
        });
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          locationFetching: false,
          locations: locations,
          locationsFetched: action.payload.status
        });
      }

    case FETCH_FILTER_LOCATIONS_FULFILLED:
      {
        var filterLocations = action.payload.map(function (loc) {
          return {
            id: loc.id,
            province: loc.province,
            country: loc.country
          };
        });
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          filterLocationsFetching: false,
          filterLocations: filterLocations,
          filterLocationsFetched: action.payload.status
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["STATES_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          statesAreFetching: true
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["REGIONS_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          regionsAreFetching: true
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["STATEDETAIL_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          stateDetailIsFetching: true
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["REGIONDETAIL_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          regionDetailIsFetching: true
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["REGIONS_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          regions: action.payload,
          regionsAreFetching: false
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["STATES_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          states: action.payload,
          statesAreFetching: false
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["STATEDETAIL_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          stateDetail: action.payload,
          stateDetailIsFetching: false
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["REGIONDETAIL_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          regionDetail: action.payload,
          regionDetailIsFetching: false
        });
      }

    case FETCH_WAREHOUSE_DISTANCES:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          warehouseDistances: action.payload
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["PROVINCES_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          provincesAreFetching: true
        });
      }

    case _constants_locations__WEBPACK_IMPORTED_MODULE_2__["PROVINCES_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          provinces: action.payload,
          provincesAreFetching: false
        });
      }

    default:
      {
        return state;
      }
  }
}
function fetchLocations() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: FETCH_LOCATIONS,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/prodex/api/locations', {
      params: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, filter)
    }).then(function (result) {
      return result.data;
    })
  };
}
function fetchFilterLocations() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return {
    type: FETCH_FILTER_LOCATIONS,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/prodex/api/locations', {
      params: {
        search: filter
      }
    }).then(function (result) {
      return result.data;
    })
  };
}
function fetchWarehouses() {
  return {
    type: FETCH_WAREHOUSE,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/prodex/api/branches/warehouses').then(function (result) {
      return result.data;
    })
  };
}
function saveWarehouse(warehouseName, streetAddress, city, province, name, number, email, zip) {
  var address = {
    streetAddress: streetAddress,
    city: city,
    zip: zip,
    province: province
  };
  var contact = {
    name: name,
    phone: number,
    email: email
  };
  return {
    type: SAVE_WAREHOUSE,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/prodex/api/branches', {
      address: address,
      company: 1,
      contact: contact,
      warehouse: true,
      warehouseName: warehouseName
    })
  };
}
function updateWarehouse(id, warehouseName, streetAddress, city, province, name, number, email, zip) {
  var address = {
    streetAddress: streetAddress,
    city: city,
    zip: zip,
    province: province
  };
  var contact = {
    name: name,
    phone: number,
    email: email
  };
  return {
    type: UPDATE_WAREHOUSE,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.put("prodex/api/branches/".concat(id), {
      address: address,
      company: 1,
      contact: contact,
      warehouse: true,
      warehouseName: warehouseName
    })
  };
}
function getRegions() {
  var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    type: _constants_locations__WEBPACK_IMPORTED_MODULE_2__["REGIONS_FETCH_REQUESTED"],
    payload: {
      search: search
    }
  };
}
function getStates() {
  var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    type: _constants_locations__WEBPACK_IMPORTED_MODULE_2__["STATES_FETCH_REQUESTED"],
    payload: {
      search: search
    }
  };
}
function getStateDetail(id) {
  return {
    type: _constants_locations__WEBPACK_IMPORTED_MODULE_2__["STATEDETAIL_FETCH_REQUESTED"],
    payload: {
      id: id
    }
  };
}
function fetchWarehouseDistances() {
  return {
    type: FETCH_WAREHOUSE_DISTANCES,
    payload: [{
      id: 1,
      name: '10'
    }, {
      id: 2,
      name: '100'
    }, {
      id: 3,
      name: '1000'
    }, {
      id: 4,
      name: '10000'
    }]
  };
}
function getRegionDetail(id) {
  return {
    type: _constants_locations__WEBPACK_IMPORTED_MODULE_2__["REGIONDETAIL_FETCH_REQUESTED"],
    payload: {
      id: id
    }
  };
}
function fetchProvinces() {
  var search = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    type: _constants_locations__WEBPACK_IMPORTED_MODULE_2__["PROVINCES_FETCH_REQUESTED"],
    payload: {
      search: search
    }
  };
}

/***/ }),

/***/ "./src/modules/merchants.js":
/*!**********************************!*\
  !*** ./src/modules/merchants.js ***!
  \**********************************/
/*! exports provided: initialState, default, approveMerchant, acceptMerchant, rejectMerchant, getMerchants, getMerchant, putMerchantEdit, deleteMerchant */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "approveMerchant", function() { return approveMerchant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "acceptMerchant", function() { return acceptMerchant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rejectMerchant", function() { return rejectMerchant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMerchants", function() { return getMerchants; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMerchant", function() { return getMerchant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putMerchantEdit", function() { return putMerchantEdit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteMerchant", function() { return deleteMerchant; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants_merchants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/merchants */ "./src/constants/merchants.js");



var ACCEPT_MERCHANT = 'ACCEPT_MERCHANT';
var REJECT_MERCHANT = 'REJECT_MERCHANT';
var UPDATE_APPROVE = 'UPDATE_APPROVE';
var initialState = {
  data: [],
  approvedMerchants: {},
  isFetching: false,
  merchantDetail: {}
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants_merchants__WEBPACK_IMPORTED_MODULE_2__["MERCHANTS_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isFetching: true
        });
      }

    case _constants_merchants__WEBPACK_IMPORTED_MODULE_2__["MERCHANTS_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          data: action.payload,
          isFetching: false
        });
      }

    case _constants_merchants__WEBPACK_IMPORTED_MODULE_2__["MERCHANT_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isFetching: true
        });
      }

    case _constants_merchants__WEBPACK_IMPORTED_MODULE_2__["MERCHANT_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          merchantDetail: action.payload,
          isFetching: false
        });
      }

    default:
      {
        return state;
      }
  }
}
function approveMerchant(id) {
  return {
    type: UPDATE_APPROVE,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default()({
      method: 'post',
      url: "api/v1/merchant/" + id + "/approved"
    })
  };
}
function acceptMerchant(id) {
  return {
    type: ACCEPT_MERCHANT,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default()({
      method: 'get',
      url: "/prodex/api/operator/approve-merchant/" + id
    })
  };
}
function rejectMerchant(id) {
  return {
    type: REJECT_MERCHANT,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default()({
      method: 'get',
      url: "/prodex/api/operator/reject-merchant/" + id
    })
  };
}
function getMerchants() {
  return {
    type: _constants_merchants__WEBPACK_IMPORTED_MODULE_2__["MERCHANTS_FETCH_REQUESTED"]
  };
}
function getMerchant(id, resolve) {
  return {
    type: _constants_merchants__WEBPACK_IMPORTED_MODULE_2__["MERCHANT_FETCH_REQUESTED"],
    payload: {
      id: id
    },
    resolve: resolve
  };
}
function putMerchantEdit(merchant) {
  return {
    type: _constants_merchants__WEBPACK_IMPORTED_MODULE_2__["MERCHANT_EDIT_REQUESTED"],
    payload: {
      merchant: merchant
    }
  };
}
function deleteMerchant(id) {
  return {
    type: _constants_merchants__WEBPACK_IMPORTED_MODULE_2__["MERCHANT_REMOVE_REQUESTED"],
    payload: {
      id: id
    }
  };
}

/***/ }),

/***/ "./src/modules/packageTypes.js":
/*!*************************************!*\
  !*** ./src/modules/packageTypes.js ***!
  \*************************************/
/*! exports provided: initialState, default, validatePackageType, fetchAll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validatePackageType", function() { return validatePackageType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAll", function() { return fetchAll; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


var GET_PACKAGE_TYPES = 'GET_PACKAGE_TYPES';
var GET_PACKAGE_TYPES_FULFILLED = 'GET_PACKAGE_TYPES_FULFILLED';
var GET_PACKAGE_TYPES_PENDING = 'GET_PACKAGE_TYPES_PENDING';
var VALIDATE_PACKAGE_TYPE = 'VALIDATE_PACKAGE_TYPE';
var VALIDATE_PACKAGE_TYPE_FULFILLED = 'VALIDATE_PACKAGE_TYPE_FULFILLED';
var initialState = {
  data: [],
  isFetching: false,
  packageTypeId: null
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case GET_PACKAGE_TYPES_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isFetching: true
        });
      }

    case GET_PACKAGE_TYPES_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          data: action.payload,
          isFetching: false
        });
      }

    case VALIDATE_PACKAGE_TYPE_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          packageTypeId: action.payload
        });
      }

    default:
      {
        return state;
      }
  }
}
function validatePackageType(name, measureType, capacity, unit) {
  return {
    type: VALIDATE_PACKAGE_TYPE,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/prodex/api/package-types/', {
      name: name,
      measureType: measureType,
      capacity: capacity,
      unit: unit
    }).then(function (response) {
      return response.data.packageType.id;
    })
  };
}
function fetchAll() {
  return {
    type: GET_PACKAGE_TYPES,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/prodex/api/package-types/').then(function (response) {
      return response.data.packageTypes;
    })
  };
}

/***/ }),

/***/ "./src/modules/popup.js":
/*!******************************!*\
  !*** ./src/modules/popup.js ***!
  \******************************/
/*! exports provided: initialState, default, addPopup, removePopup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addPopup", function() { return addPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removePopup", function() { return removePopup; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/toConsumableArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _constants_popup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants/popup */ "./src/constants/popup.js");



var initialState = {
  components: []
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants_popup__WEBPACK_IMPORTED_MODULE_2__["ADD_POPUP"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          components: Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(state.components).concat([action.payload])
        });
      }

    case _constants_popup__WEBPACK_IMPORTED_MODULE_2__["REMOVE_POPUP"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          components: Object(_babel_runtime_corejs2_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__["default"])(state.components.slice(0, -1))
        });
      }

    case _constants_popup__WEBPACK_IMPORTED_MODULE_2__["REMOVE_ALL"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          components: []
        });
      }

    default:
      {
        return state;
      }
  }
}
function addPopup(component) {
  return {
    type: _constants_popup__WEBPACK_IMPORTED_MODULE_2__["ADD_POPUP"],
    payload: component
  };
}
function removePopup() {
  return {
    type: _constants_popup__WEBPACK_IMPORTED_MODULE_2__["REMOVE_POPUP"]
  };
}

/***/ }),

/***/ "./src/modules/productOffers.js":
/*!**************************************!*\
  !*** ./src/modules/productOffers.js ***!
  \**************************************/
/*! exports provided: initialState, default, deleteProductOffersList, fetchMyProductOffers, fetchAllProductOffers, fetchProductOffer, editProductOffer, addProductOffer, loadFile, addAttachment, linkAttachment, removeAttachmentLink, removeAttachment, getUnitOfMeasurement, getUnitOfPackaging, deleteProductOffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteProductOffersList", function() { return deleteProductOffersList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchMyProductOffers", function() { return fetchMyProductOffers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAllProductOffers", function() { return fetchAllProductOffers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProductOffer", function() { return fetchProductOffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editProductOffer", function() { return editProductOffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addProductOffer", function() { return addProductOffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadFile", function() { return loadFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addAttachment", function() { return addAttachment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "linkAttachment", function() { return linkAttachment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAttachmentLink", function() { return removeAttachmentLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAttachment", function() { return removeAttachment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUnitOfMeasurement", function() { return getUnitOfMeasurement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUnitOfPackaging", function() { return getUnitOfPackaging; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteProductOffer", function() { return deleteProductOffer; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/functions */ "./src/utils/functions.js");
/* harmony import */ var _constants_productOffers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/productOffers */ "./src/constants/productOffers.js");
/* harmony import */ var form_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! form-data */ "form-data");
/* harmony import */ var form_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(form_data__WEBPACK_IMPORTED_MODULE_4__);





var GET_PRODUCT_OFFERS_MY = 'GET_PRODUCT_OFFERS_MY';
var GET_PRODUCT_OFFERS_MY_FULFILLED = 'GET_PRODUCT_OFFERS_MY_FULFILLED';
var GET_PRODUCT_OFFERS_MY_PENDING = 'GET_PRODUCT_OFFERS_MY_PENDING';
var GET_PRODUCT_OFFERS_ALL = 'GET_PRODUCT_OFFERS_ALL';
var GET_PRODUCT_OFFERS_ALL_FULFILLED = 'GET_PRODUCT_OFFERS_ALL_FULFILLED';
var GET_PRODUCT_OFFERS_ALL_PENDING = 'GET_PRODUCT_OFFERS_ALL_PENDING';
var GET_PRODUCT_OFFER = 'GET_PRODUCT_OFFER';
var GET_PRODUCT_OFFER_FULFILLED = 'GET_PRODUCT_OFFER_FULFILLED';
var GET_PRODUCT_OFFER_PENDING = 'GET_PRODUCT_OFFER_PENDING';
var EDIT_PRODUCT_OFFER = 'EDIT_PRODUCT_OFFER';
var GET_UNIT_OF_MEASUREMENT = 'GET_UNIT_OF_MEASUREMENT';
var GET_UNIT_OF_MEASUREMENT_FULFILLED = 'GET_UNIT_OF_MEASUREMENT_FULFILLED';
var GET_UNIT_OF_PACKAGING = 'GET_UNIT_OF_PACKAGING';
var GET_UNIT_OF_PACKAGING_FULFILLED = 'GET_UNIT_OF_PACKAGING_FULFILLED';
var LOAD_FILE = 'LOAD_FILE';
var ADD_ATTACHMENT = 'ADD_ATTACHMENT';
var ADD_ATTACHMENT_FULFILLED = 'ADD_ATTACHMENT_FULFILLED';
var REMOVE_ATTACHMENT = 'REMOVE_ATTACHMENT';
var REMOVE_ATTACHMENT_FULFILLED = 'REMOVE_ATTACHMENT_FULFILLED';
var REMOVE_ATTACHMENT_LINK = 'REMOVE_ATTACHMENT_LINK';
var REMOVE_ATTACHMENT_LINK_FULFILLED = 'REMOVE_ATTACHMENT_LINK_FULFILLED';
var LINK_ATTACHMENT = 'LINK_ATTACHMENT';
var ADD_PRODUCT_OFFER = 'ADD_PRODUCT_OFFER';
var ADD_PRODUCT_OFFER_FULFILLED = 'ADD_PRODUCT_OFFER_FULFILLED';
var RESET_PRODUCT_OFFER = 'RESET_PRODUCT_OFFER'; //const SAVE_INCREMENTAL_PRICING = 'SAVE_INCREMENTAL_PRICING';

var DELETE_PRODUCT_OFFERS_LIST = 'DELETE_PRODUCT_OFFERS_LIST';
var initialState = {
  myProductOffers: [],
  allProductOffers: [],
  addProductOffer: {},
  isFetching: true,
  unitOfMeasurement: [],
  unitOfPackaging: [],
  productOffer: {},
  productOfferFetching: true,
  productOffersIsFetching: true,
  attachmentAdded: false
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case DELETE_PRODUCT_OFFERS_LIST:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isFetching: true,
          myProductOffers: [],
          allProductOffers: []
        });
      }

    case GET_PRODUCT_OFFERS_MY_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          myProductOffers: [],
          isFetching: true
        });
      }

    case GET_PRODUCT_OFFERS_MY_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          myProductOffers: action.payload,
          isFetching: false
        });
      }

    case GET_PRODUCT_OFFERS_ALL_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          allProductOffers: [],
          productOffersIsFetching: true
        });
      }

    case GET_PRODUCT_OFFERS_ALL_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          allProductOffers: action.payload,
          productOffersIsFetching: false
        });
      }

    case GET_PRODUCT_OFFER_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          productOfferFetching: true
        });
      }

    case GET_PRODUCT_OFFER_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          productOfferFetching: false,
          productOffer: action.payload
        });
      }

    case ADD_PRODUCT_OFFER_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          products: {
            isPending: false,
            isValid: true,
            hasError: false
          }
        });
      }

    case ADD_ATTACHMENT_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          attachmentAdded: true
        });
      }

    case GET_UNIT_OF_MEASUREMENT_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          unitOfMeasurement: action.payload
        });
      }

    case GET_UNIT_OF_PACKAGING_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          unitOfPackaging: action.payload
        });
      }

    case RESET_PRODUCT_OFFER:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          addProductOffer: {}
        });
      }

    default:
      {
        return state;
      }
  }
}
function deleteProductOffersList() {
  return {
    type: DELETE_PRODUCT_OFFERS_LIST
  };
}
function fetchMyProductOffers() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: GET_PRODUCT_OFFERS_MY,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/prodex/api/product-offers/own/all", //! !
    //"/prodex/api/product-offers",
    {
      params: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, filter),
      'paramsSerializer': function paramsSerializer(params) {
        return Object(_utils_functions__WEBPACK_IMPORTED_MODULE_2__["transformRequestOptions"])(params);
      }
    }).then(function (response) {
      var productOffers = response.data;
      return Object(_utils_functions__WEBPACK_IMPORTED_MODULE_2__["filterByUniqueProperty"])(productOffers, "id"); //dont show product offers with same id (synonyms)
    })
  };
}
function fetchAllProductOffers() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: GET_PRODUCT_OFFERS_ALL,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/prodex/api/product-offers/broadcasted/all", {
      params: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, filter),
      'paramsSerializer': function paramsSerializer(params) {
        return Object(_utils_functions__WEBPACK_IMPORTED_MODULE_2__["transformRequestOptions"])(params);
      }
    }).then(function (response) {
      var productOffers = response.data;
      return Object(_utils_functions__WEBPACK_IMPORTED_MODULE_2__["filterByUniqueProperty"])(productOffers, "id");
    })
  };
}
function fetchProductOffer(id) {
  return {
    type: GET_PRODUCT_OFFER,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/prodex/api/product-offers/".concat(id)).then(function (response) {
      return response.data;
    })
  };
}
function editProductOffer(id, inputs) {
  return {
    type: EDIT_PRODUCT_OFFER,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.patch("/prodex/api/product-offers/".concat(id), inputs)
  };
}
function addProductOffer(inputs) {
  return {
    type: ADD_PRODUCT_OFFER,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post('/prodex/api/product-offers', inputs)
  };
}
function loadFile(attachment) {
  return {
    type: LOAD_FILE,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default()({
      baseURL: '',
      url: attachment.preview,
      method: "GET",
      responseType: "blob"
    }).then(function (r) {
      return new File([r.data], attachment.name, {
        type: attachment.type
      });
    })
  };
}
function addAttachment(file, docType) {
  var data = new form_data__WEBPACK_IMPORTED_MODULE_4___default.a();
  if (file) data.append('file', file, file.name);else return false;
  return {
    type: ADD_ATTACHMENT,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/prodex/api/attachments?type=".concat(docType, "&isTemporary=true"), data, {
      headers: {
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': "multipart/form-data; boundary=".concat(data._boundary)
      }
    })
  };
}
function linkAttachment(isLot, itemId, aId) {
  return {
    type: LINK_ATTACHMENT,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.post("/prodex/api/attachment-links/to-".concat(isLot ? 'lot' : 'product-offer', "?attachmentId=").concat(aId, "&").concat(isLot ? 'lotId' : 'productOfferId', "=").concat(itemId))
  };
}
function removeAttachmentLink(isLot, itemId, aId) {
  return {
    type: REMOVE_ATTACHMENT_LINK,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete("/prodex/api/attachment-links/to-".concat(isLot ? 'lot' : 'product-offer', "?attachmentId=").concat(aId, "&").concat(isLot ? 'lotId' : 'productOfferId', "=").concat(itemId))
  };
}
function removeAttachment(aId) {
  return {
    type: REMOVE_ATTACHMENT,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.delete('/prodex/api/attachments/' + aId)
  };
}
function getUnitOfMeasurement() {
  return {
    type: GET_UNIT_OF_MEASUREMENT,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get("/prodex/api/units").then(function (result) {
      return result.data;
    })
  };
}
function getUnitOfPackaging(pack) {
  return {
    type: GET_UNIT_OF_PACKAGING,
    payload: axios__WEBPACK_IMPORTED_MODULE_1___default.a.get('/prodex/api/packaging-types', {
      params: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, pack)
    }).then(function (response) {
      return response.data;
    })
  };
} // unused
// export function saveIncrementalPricing(from, to, price, quantityDiscount = 1){
//     const data = {
//         quantityFrom:from,
//         quantityTo:to,
//         price:price,
//         quantityDiscount,
//     }
//     return {
//         type: SAVE_INCREMENTAL_PRICING,
//         payload: axios.post('/prodex/api/v1/discount-level/', data)
//     }
// }

function deleteProductOffer(id, onSuccess) {
  return {
    type: _constants_productOffers__WEBPACK_IMPORTED_MODULE_3__["PRODUCTOFFER_REMOVE_REQUESTED"],
    payload: {
      id: id,
      onSuccess: onSuccess
    } //TODO: refactor all product offers to saga, then remove onSuccess

  };
}

/***/ }),

/***/ "./src/modules/products.js":
/*!*********************************!*\
  !*** ./src/modules/products.js ***!
  \*********************************/
/*! exports provided: initialState, default, addLotSaveOffering, searchProducts, mapProducts, fetchManufacturer, fetchProductForms, fetchProductConditions, fetchProductGrade, fetchOrigin, fetchProductAge, fetchRecentAddedProducts, saveMapping, setSavedMappingToFalse, fetchAlternativeNames, fetchPackagingTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLotSaveOffering", function() { return addLotSaveOffering; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "searchProducts", function() { return searchProducts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapProducts", function() { return mapProducts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchManufacturer", function() { return fetchManufacturer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProductForms", function() { return fetchProductForms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProductConditions", function() { return fetchProductConditions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProductGrade", function() { return fetchProductGrade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchOrigin", function() { return fetchOrigin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchProductAge", function() { return fetchProductAge; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRecentAddedProducts", function() { return fetchRecentAddedProducts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveMapping", function() { return saveMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSavedMappingToFalse", function() { return setSavedMappingToFalse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAlternativeNames", function() { return fetchAlternativeNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchPackagingTypes", function() { return fetchPackagingTypes; });
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/promise */ "./node_modules/@babel/runtime-corejs2/core-js/promise.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);



var FETCH_PRODUCT_FORMS = 'PRODUCT_FORMS';
var FETCH_PRODUCT_FORMS_FULFILLED = 'PRODUCT_FORMS_FULFILLED';
var FETCH_PRODUCT_CONDITIONS = 'FETCH_PRODUCT_CONDITIONS';
var FETCH_PRODUCT_CONDITIONS_FULFILLED = 'FETCH_PRODUCT_CONDITIONS_FULFILLED';
var FETCH_PRODUCT_GRADE = 'FETCH_PRODUCT_GRADE';
var FETCH_PRODUCT_GRADE_FULFILLED = 'FETCH_PRODUCT_GRADE_FULFILLED';
var FETCH_PRODUCT_AGE = 'FETCH_PRODUCT_AGE';
var FETCH_PRODUCT_AGE_FULFILLED = 'FETCH_PRODUCT_AGE_FULFILLED';
var FETCH_RECEANT_ADDED_PRODUCTS = 'FETCH_RECEANT_ADDED_PRODUCTS';
var FETCH_RECEANT_ADDED_PRODUCTS_FULFILLED = 'FETCH_RECEANT_ADDED_PRODUCTS_FULFILLED';
var FETCH_ORIGIN = 'FETCH_ORIGIN';
var FETCH_ORIGIN_PENDING = 'FETCH_ORIGIN_PENDING';
var FETCH_ORIGIN_FULFILLED = 'FETCH_ORIGIN_FULFILLED';
var SEARCH_PRODUCT = 'SEARCH_PRODUCT';
var SEARCH_PRODUCT_PENDING = 'SEARCH_PRODUCT_PENDING';
var MAP_PRODUCT = 'MAP_PRODUCT';
var MAP_PRODUCT_PENDING = 'MAP_PRODUCT_PENDING';
var MAP_PRODUCT_REJECTED = 'MAP_PRODUCT_REJECTED';
var MAP_PRODUCT_FULFILLED = 'MAP_PRODUCT_FULFILLED';
var SEARCH_PRODUCT_FULFILLED = 'SEARCH_PRODUCT_FULFILLED';
var SEARCH_PRODUCT_REJECTED = 'SEARCH_PRODUCT_REJECTED';
var SAVE_MAPPING = 'SAVE_MAPPING';
var SAVE_MAPPING_FULFILLED = 'SAVE_MAPPING_FULFILLED';
var SAVE_MAPPING_FULFILLED_TIMEOUT = "SAVE_MAPPING_FULFILLED_TIMEOUT";
var SAVE_OFFERING_FULFILLED = 'SAVE_OFFERING_FULFILLED';
var FETCH_ALTERNATIVE_NAMES = 'FETCH_ALTERNATIVE_NAMES';
var FETCH_ALTERNATIVE_NAMES_FULFILLED = 'FETCH_ALTERNATIVE_NAMES_FULFILLED';
var FETCH_MANUFACTURER = 'FETCH_MANUFACTURER';
var FETCH_MANUFACTURER_PENDING = 'FETCH_MANUFACTURER_PENDING';
var FETCH_MANUFACTURER_FULFILLED = 'FETCH_MANUFACTURER_FULFILLED';
var FETCH_PACKAGING_TYPES = 'FETCH_PACKAGING_TYPES';
var FETCH_PACKAGING_TYPES_FULFILLED = 'FETCH_PACKAGING_TYPES_FULFILLED';
var initialState = {
  productsMapping: {},
  productOffering: {},
  data: [],
  mappedData: [],
  productForms: [],
  productConditions: [],
  productGrades: [],
  productAge: [],
  location: [],
  recentProducts: [],
  origin: [],
  originFetched: false,
  manufacturer: [],
  manufacturerFetched: false,
  packagingTypes: [],
  isFetching: false,
  isFetchingManufacturer: false,
  isFetchingOrigin: false,
  isMapFetching: false,
  alternativeNames: [],
  productMappingValidation: false,
  productOfferingValidation: false,
  savedMapping: false,
  fileMaxSize: 20 // MB

};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case "rrf/setSubmitFailed":
      {
        if (action.model == "forms.productMapping" && action.submitFailed == true) {
          return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
            productMappingValidation: false
          });
        } else if (action.model == "forms.productOffering" && action.submitFailed == true) {
          return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
            productOfferingValidation: false
          });
        }

        return state;
      }

    case SAVE_MAPPING_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          productMappingValidation: true,
          products: {
            isFetching: false
          },
          savedMapping: true
        });
      }

    case SAVE_MAPPING_FULFILLED_TIMEOUT:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          savedMapping: false
        });
      }

    case SAVE_OFFERING_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          productOfferingValidation: true
        });
      }

    case FETCH_PRODUCT_FORMS_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          productForms: action.payload
        });
      }

    case FETCH_MANUFACTURER_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isFetchingManufacturer: true,
          manufacturerFetched: false
        });
      }

    case FETCH_MANUFACTURER_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isFetchingManufacturer: false,
          manufacturer: action.payload.data,
          manufacturerFetched: action.payload.status
        });
      }

    case FETCH_PRODUCT_CONDITIONS_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          productConditions: action.payload
        });
      }

    case FETCH_PRODUCT_GRADE_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          productGrade: action.payload
        });
      }

    case FETCH_ORIGIN_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isFetchingOrigin: true,
          origin: "",
          originFetched: false
        });
      }

    case FETCH_ORIGIN_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isFetchingOrigin: false,
          origin: action.payload.data,
          originFetched: action.payload.status
        });
      }

    case FETCH_PRODUCT_AGE_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          productAge: action.payload
        });
      }

    case FETCH_RECEANT_ADDED_PRODUCTS_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          recentProducts: action.payload
        });
      }

    case SEARCH_PRODUCT_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isFetching: true
        });
      }

    case SEARCH_PRODUCT_REJECTED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isFetching: false,
          productsFetched: false
        });
      }

    case SEARCH_PRODUCT_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isFetching: false,
          data: action.payload.data,
          productsFetched: action.payload.status
        });
      }

    case MAP_PRODUCT_PENDING:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isMapFetching: true,
          mappedDataFetched: "no"
        });
      }

    case MAP_PRODUCT_REJECTED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isMapFetching: false
        });
      }

    case MAP_PRODUCT_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          isMapFetching: false,
          mappedData: action.payload.data,
          mappedDataFetched: action.payload.status
        });
      }

    case FETCH_ALTERNATIVE_NAMES_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          alternativeNames: action.payload
        });
      }

    case FETCH_PACKAGING_TYPES_FULFILLED:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, state, {
          packagingTypes: action.payload
        });
      }

    default:
      {
        return state;
      }
  }
}
function addLotSaveOffering() {
  return {
    type: SAVE_OFFERING_FULFILLED
  };
}
function searchProducts(search) {
  return {
    type: SEARCH_PRODUCT,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/products', {
      params: {
        search: search
      }
    }).then(function (response) {
      return response;
    })
  };
}
function mapProducts(search) {
  return {
    type: MAP_PRODUCT,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/product-templates', {
      params: {
        search: search
      }
    }).then(function (response) {
      return response;
    })
  };
}
function fetchManufacturer() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return {
    type: FETCH_MANUFACTURER,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/manufacturers', {
      params: {
        search: filter
      }
    }).then(function (result) {
      return result;
    })
  };
}
function fetchProductForms() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: FETCH_PRODUCT_FORMS,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/product-forms', {
      params: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, filter)
    }).then(function (result) {
      return result.data;
    })
  };
}
function fetchProductConditions() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: FETCH_PRODUCT_CONDITIONS,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/product-conditions', {
      params: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, filter)
    }).then(function (result) {
      return result.data;
    })
  };
}
function fetchProductGrade() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: FETCH_PRODUCT_GRADE,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/product-grades', {
      params: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, filter)
    }).then(function (result) {
      return result.data;
    })
  };
}
function fetchOrigin() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return {
    type: FETCH_ORIGIN,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/countries', {
      params: {
        search: filter
      }
    }).then(function (result) {
      return result;
    })
  };
}
function fetchProductAge() {
  return {
    type: FETCH_PRODUCT_AGE,
    payload: [{
      id: 1,
      name: '0 - 3 months'
    }, {
      id: 2,
      name: '3 - 6 months'
    }, {
      id: 3,
      name: '6 - 9 months'
    }, {
      id: 4,
      name: '9 - 12 months'
    }, {
      id: 5,
      name: '12+ months'
    }, {
      id: 6,
      name: 'Custom Product Age'
    }]
  };
}
function fetchRecentAddedProducts() {
  var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
  return {
    type: FETCH_RECEANT_ADDED_PRODUCTS,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/products', {
      params: {
        srtb: 'updatedAt',
        lmt: limit
      }
    }).then(function (result) {
      return result.data.products;
    })
  };
}
function saveMapping(values) {
  if (values.fakeSubmit) {
    return {
      type: SAVE_MAPPING_FULFILLED
    };
  } else {
    delete values.fakeSubmit;
  }

  return {
    type: SAVE_MAPPING,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.post("/prodex/api/product-templates", values)
  };
}
function setSavedMappingToFalse() {
  return {
    type: SAVE_MAPPING_FULFILLED_TIMEOUT
  };
}
function fetchAlternativeNames(id) {
  return {
    type: FETCH_ALTERNATIVE_NAMES,
    payload: _babel_runtime_corejs2_core_js_promise__WEBPACK_IMPORTED_MODULE_0___default.a.resolve({
      "data": {
        "alternativeNames": [{
          "id": 1,
          "alternativeName": "Elon"
        }, {
          "id": 2,
          "alternativeName": "Musk"
        }, {
          "id": 3,
          "alternativeName": "Must"
        }, {
          "id": 4,
          "alternativeName": "Sleep"
        }]
      },
      "status": "success"
    }).then(function (result) {
      return result.data.alternativeNames;
    })
  };
}
function fetchPackagingTypes() {
  var filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    type: FETCH_PACKAGING_TYPES,
    payload: axios__WEBPACK_IMPORTED_MODULE_2___default.a.get('/prodex/api/packaging-types', {
      params: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, filter)
    }).then(function (result) {
      return result.data;
    })
  };
}

/***/ }),

/***/ "./src/modules/shippingQuotes.js":
/*!***************************************!*\
  !*** ./src/modules/shippingQuotes.js ***!
  \***************************************/
/*! exports provided: initialState, default, getShippingQuotes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShippingQuotes", function() { return getShippingQuotes; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _constants_shippingQuotes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/shippingQuotes */ "./src/constants/shippingQuotes.js");


var initialState = {
  destinationZIP: '',
  quantity: 0,
  maxTransit: 0,
  shippingQuotes: [],
  shippingQuotesIsFetching: false
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants_shippingQuotes__WEBPACK_IMPORTED_MODULE_1__["SHIPPINGQUOTES_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          shippingQuotesIsFetching: true
        });
      }

    case _constants_shippingQuotes__WEBPACK_IMPORTED_MODULE_1__["SHIPPINGQUOTES_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          shippingQuotes: action.payload,
          shippingQuotesIsFetching: false
        });
      }

    default:
      {
        return state;
      }
  }
}
function getShippingQuotes(pack) {
  return {
    type: _constants_shippingQuotes__WEBPACK_IMPORTED_MODULE_1__["SHIPPINGQUOTES_FETCH_REQUESTED"],
    payload: {
      pack: pack
    }
  };
}

/***/ }),

/***/ "./src/modules/users.js":
/*!******************************!*\
  !*** ./src/modules/users.js ***!
  \******************************/
/*! exports provided: initialState, default, getUsers, putPromoteToMerchant, putPromoteToOperator, getOperators, deleteOperator, putOperatorEdit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialState", function() { return initialState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return reducer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUsers", function() { return getUsers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putPromoteToMerchant", function() { return putPromoteToMerchant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putPromoteToOperator", function() { return putPromoteToOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOperators", function() { return getOperators; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteOperator", function() { return deleteOperator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putOperatorEdit", function() { return putOperatorEdit; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _constants_users__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/users */ "./src/constants/users.js");


var initialState = {
  usersNew: [],
  operators: [],
  isFetching: true,
  users: []
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _constants_users__WEBPACK_IMPORTED_MODULE_1__["OPERATORS_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isFetching: true
        });
      }

    case _constants_users__WEBPACK_IMPORTED_MODULE_1__["USERS_FETCH_REQUESTED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isFetching: true
        });
      }

    case _constants_users__WEBPACK_IMPORTED_MODULE_1__["USERS_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          users: action.payload,
          isFetching: false
        });
      }

    case _constants_users__WEBPACK_IMPORTED_MODULE_1__["OPERATORS_FETCH_SUCCEEDED"]:
      {
        return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
          isFetching: false,
          operators: action.payload
        });
      }

    default:
      {
        return state;
      }
  }
}
function getUsers() {
  return {
    type: _constants_users__WEBPACK_IMPORTED_MODULE_1__["USERS_FETCH_REQUESTED"]
  };
}
function putPromoteToMerchant(id, user) {
  return {
    type: _constants_users__WEBPACK_IMPORTED_MODULE_1__["PROMOTE_TO_MERCHANT_REQUESTED"],
    payload: {
      id: id,
      user: user
    }
  };
}
function putPromoteToOperator(id, user) {
  return {
    type: _constants_users__WEBPACK_IMPORTED_MODULE_1__["PROMOTE_TO_OPERATOR_REQUESTED"],
    payload: {
      id: id,
      user: user
    }
  };
}
function getOperators() {
  return {
    type: _constants_users__WEBPACK_IMPORTED_MODULE_1__["OPERATORS_FETCH_REQUESTED"]
  };
}
function deleteOperator(id) {
  return {
    type: _constants_users__WEBPACK_IMPORTED_MODULE_1__["OPERATOR_REMOVE_REQUESTED"],
    payload: {
      id: id
    }
  };
}
function putOperatorEdit(operator) {
  return {
    type: _constants_users__WEBPACK_IMPORTED_MODULE_1__["OPERATOR_EDIT_REQUESTED"],
    payload: {
      operator: operator
    }
  };
}

/***/ }),

/***/ "./src/pages/administration/operators/saga/operators.js":
/*!**************************************************************!*\
  !*** ./src/pages/administration/operators/saga/operators.js ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../api/users */ "./src/api/users.js");
/* harmony import */ var _constants_users__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../constants/users */ "./src/constants/users.js");


var _marked =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getOperators),
    _marked2 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(deleteOperator),
    _marked3 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(putOperatorEdit),
    _marked4 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(operatorsSaga);





function getOperators() {
  var operators;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getOperators$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_users__WEBPACK_IMPORTED_MODULE_2__["default"].getOperators);

        case 3:
          operators = _context.sent;
          _context.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_3__["OPERATORS_FETCH_SUCCEEDED"],
            payload: operators
          });

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          _context.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_3__["OPERATORS_FETCH_FAILED"],
            message: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 8]]);
}

function deleteOperator(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function deleteOperator$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_users__WEBPACK_IMPORTED_MODULE_2__["default"].deleteOperator, action.payload.id);

        case 3:
          _context2.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_3__["OPERATOR_REMOVE_SUCCEEDED"]
          });

        case 5:
          _context2.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_3__["OPERATORS_FETCH_REQUESTED"]
          });

        case 7:
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_3__["OPERATOR_REMOVE_FAILED"],
            message: _context2.t0.message
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 9]]);
}

function putOperatorEdit(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function putOperatorEdit$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_users__WEBPACK_IMPORTED_MODULE_2__["default"].putOperatorEdit, action.payload.operator);

        case 3:
          _context3.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_3__["OPERATOR_EDIT_SUCCEEDED"]
          });

        case 5:
          _context3.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_3__["OPERATORS_FETCH_REQUESTED"]
          });

        case 7:
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_3__["OPERATOR_EDIT_FAILED"],
            message: _context3.t0.message
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[0, 9]]);
}

function operatorsSaga() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function operatorsSaga$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_users__WEBPACK_IMPORTED_MODULE_3__["OPERATORS_FETCH_REQUESTED"], getOperators);

        case 2:
          _context4.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_users__WEBPACK_IMPORTED_MODULE_3__["OPERATOR_REMOVE_REQUESTED"], deleteOperator);

        case 4:
          _context4.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_users__WEBPACK_IMPORTED_MODULE_3__["OPERATOR_EDIT_REQUESTED"], putOperatorEdit);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this);
}

/* harmony default export */ __webpack_exports__["default"] = (operatorsSaga);

/***/ }),

/***/ "./src/pages/administration/users/saga/users.js":
/*!******************************************************!*\
  !*** ./src/pages/administration/users/saga/users.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_users__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../api/users */ "./src/api/users.js");
/* harmony import */ var _api_offices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../api/offices */ "./src/api/offices.js");
/* harmony import */ var _constants_users__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../constants/users */ "./src/constants/users.js");
/* harmony import */ var _constants_offices__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../constants/offices */ "./src/constants/offices.js");


var _marked =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getUsers),
    _marked2 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getOffices),
    _marked3 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(putPromoteToMerchant),
    _marked4 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(putPromoteToOperator),
    _marked5 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(usersSaga);







function getUsers() {
  var users;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getUsers$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_users__WEBPACK_IMPORTED_MODULE_2__["default"].getUsers);

        case 3:
          users = _context.sent;
          _context.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_4__["USERS_FETCH_SUCCEEDED"],
            payload: users
          });

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          _context.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_4__["USERS_FETCH_FAILED"],
            message: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 8]]);
}

function getOffices() {
  var offices;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getOffices$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_offices__WEBPACK_IMPORTED_MODULE_3__["default"].getOffices);

        case 3:
          offices = _context2.sent;
          _context2.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_offices__WEBPACK_IMPORTED_MODULE_5__["OFFICES_FETCH_SUCCEEDED"],
            payload: offices
          });

        case 6:
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_offices__WEBPACK_IMPORTED_MODULE_5__["OFFICES_FETCH_FAILED"],
            message: _context2.t0.message
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 8]]);
}

function putPromoteToMerchant(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function putPromoteToMerchant$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_users__WEBPACK_IMPORTED_MODULE_2__["default"].putPromoteToMerchant, action.payload);

        case 3:
          _context3.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_4__["PROMOTE_TO_MERCHANT_SUCCEEDED"]
          });

        case 5:
          _context3.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_4__["USERS_FETCH_NEW_REQUESTED"]
          });

        case 7:
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_4__["PROMOTE_TO_MERCHANT_FAILED"],
            message: _context3.t0.message
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[0, 9]]);
}

function putPromoteToOperator(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function putPromoteToOperator$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_users__WEBPACK_IMPORTED_MODULE_2__["default"].putPromoteToOperator, action.payload);

        case 3:
          _context4.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_4__["PROMOTE_TO_OPERATOR_SUCCEEDED"]
          });

        case 5:
          _context4.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_4__["USERS_FETCH_NEW_REQUESTED"]
          });

        case 7:
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          _context4.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_users__WEBPACK_IMPORTED_MODULE_4__["PROMOTE_TO_OPERATOR_FAILED"],
            message: _context4.t0.message
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this, [[0, 9]]);
}

function usersSaga() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function usersSaga$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_users__WEBPACK_IMPORTED_MODULE_4__["USERS_FETCH_REQUESTED"], getUsers);

        case 2:
          _context5.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_offices__WEBPACK_IMPORTED_MODULE_5__["OFFICES_FETCH_REQUESTED"], getOffices);

        case 4:
          _context5.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_users__WEBPACK_IMPORTED_MODULE_4__["PROMOTE_TO_OPERATOR_REQUESTED"], putPromoteToOperator);

        case 6:
          _context5.next = 8;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_users__WEBPACK_IMPORTED_MODULE_4__["PROMOTE_TO_MERCHANT_REQUESTED"], putPromoteToMerchant);

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this);
}

/* harmony default export */ __webpack_exports__["default"] = (usersSaga);

/***/ }),

/***/ "./src/pages/cart/saga/cart.js":
/*!*************************************!*\
  !*** ./src/pages/cart/saga/cart.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_cart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../api/cart */ "./src/api/cart.js");
/* harmony import */ var _constants_cart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../constants/cart */ "./src/constants/cart.js");


var _marked =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getProductOffer),
    _marked2 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getCart),
    _marked3 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getDeliveryAddresses),
    _marked4 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getPayments),
    _marked5 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(deleteCart),
    _marked6 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(postNewOrder),
    _marked7 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(postNewDeliveryAddress),
    _marked8 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getOrderDetail),
    _marked9 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(postOrderEdit),
    _marked10 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(putDeliveryAddressEdit),
    _marked11 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getShippingQuotes),
    _marked12 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(cartSaga);





function getProductOffer(action) {
  var offerDetail;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getProductOffer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_cart__WEBPACK_IMPORTED_MODULE_2__["default"].getProductOffer, action.payload.id);

        case 3:
          offerDetail = _context.sent;
          _context.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["OFFER_FETCH_SUCCEEDED"],
            payload: offerDetail
          });

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          _context.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["OFFER_FETCH_FAILED"],
            message: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 8]]);
}

function getCart() {
  var cart;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getCart$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_cart__WEBPACK_IMPORTED_MODULE_2__["default"].getCart);

        case 3:
          cart = _context2.sent;
          _context2.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["CART_FETCH_SUCCEEDED"],
            payload: cart
          });

        case 6:
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["CART_FETCH_FAILED"],
            message: _context2.t0.message
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 8]]);
}

function getDeliveryAddresses() {
  var addresses;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getDeliveryAddresses$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_cart__WEBPACK_IMPORTED_MODULE_2__["default"].getDeliveryAddresses);

        case 3:
          addresses = _context3.sent;
          _context3.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["DELIVERYADDRESSES_FETCH_SUCCEEDED"],
            payload: addresses
          });

        case 6:
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["DELIVERYADDRESSES_FETCH_FAILED"],
            message: _context3.t0.message
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[0, 8]]);
}

function getPayments() {
  var addresses;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getPayments$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_cart__WEBPACK_IMPORTED_MODULE_2__["default"].getPayments);

        case 3:
          addresses = _context4.sent;
          _context4.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["PAYMENTS_FETCH_SUCCEEDED"],
            payload: addresses
          });

        case 6:
          _context4.next = 12;
          break;

        case 8:
          _context4.prev = 8;
          _context4.t0 = _context4["catch"](0);
          _context4.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["PAYMENTS_FETCH_FAILED"],
            message: _context4.t0.message
          });

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this, [[0, 8]]);
}

function deleteCart(action) {
  var cart;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function deleteCart$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_cart__WEBPACK_IMPORTED_MODULE_2__["default"].deleteCart, action.payload.id);

        case 3:
          _context5.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["PRODUCTFROMCART_REMOVE_SUCCEEDED"]
          });

        case 5:
          _context5.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_cart__WEBPACK_IMPORTED_MODULE_2__["default"].getCart);

        case 7:
          cart = _context5.sent;
          _context5.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["CART_FETCH_SUCCEEDED"],
            payload: cart
          });

        case 10:
          _context5.next = 16;
          break;

        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](0);
          _context5.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["PRODUCTFROMCART_REMOVE_FAILED"],
            message: _context5.t0.message
          });

        case 16:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this, [[0, 12]]);
}

function postNewOrder(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function postNewOrder$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_cart__WEBPACK_IMPORTED_MODULE_2__["default"].postNewOrder, action.payload.product);

        case 3:
          _context6.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["CARTITEM_CREATE_SUCCEEDED"]
          });

        case 5:
          _context6.next = 11;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          _context6.next = 11;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["CARTITEM_CREATE_FAILED"],
            message: _context6.t0.message
          });

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, this, [[0, 7]]);
}

function postNewDeliveryAddress(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function postNewDeliveryAddress$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_cart__WEBPACK_IMPORTED_MODULE_2__["default"].postNewDeliveryAddress, action.payload);

        case 3:
          _context7.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["DELIVERYADDRESS_CREATE_SUCCEEDED"]
          });

        case 5:
          _context7.next = 11;
          break;

        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          _context7.next = 11;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["DELIVERYADDRESS_CREATE_FAILED"],
            message: _context7.t0.message
          });

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7, this, [[0, 7]]);
}

function getOrderDetail(action) {
  var order;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getOrderDetail$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_cart__WEBPACK_IMPORTED_MODULE_2__["default"].getOrderDetail, action.payload.id);

        case 3:
          order = _context8.sent;
          _context8.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["ORDERDETAIL_FETCH_SUCCEEDED"],
            payload: order
          });

        case 6:
          _context8.next = 12;
          break;

        case 8:
          _context8.prev = 8;
          _context8.t0 = _context8["catch"](0);
          _context8.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["ORDERDETAIL_FETCH_FAILED"],
            message: _context8.t0.message
          });

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8, this, [[0, 8]]);
}

function postOrderEdit(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function postOrderEdit$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          _context9.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_cart__WEBPACK_IMPORTED_MODULE_2__["default"].postOrderEdit, action.payload.order);

        case 3:
          _context9.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["ORDER_EDIT_SUCCEEDED"]
          });

        case 5:
          _context9.next = 11;
          break;

        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          _context9.next = 11;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["ORDER_EDIT_FAILED"],
            message: _context9.t0.message
          });

        case 11:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9, this, [[0, 7]]);
}

function putDeliveryAddressEdit(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function putDeliveryAddressEdit$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_cart__WEBPACK_IMPORTED_MODULE_2__["default"].editDeliveryAddress, action.payload.address);

        case 3:
          _context10.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["DELIVERYADDRESS_EDIT_SUCCEEDED"]
          });

        case 5:
          _context10.next = 11;
          break;

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          _context10.next = 11;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["DELIVERYADDRESS_EDIT_FAILED"],
            message: _context10.t0.message
          });

        case 11:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10, this, [[0, 7]]);
}

function getShippingQuotes(action) {
  var shippingQuotes;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getShippingQuotes$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_cart__WEBPACK_IMPORTED_MODULE_2__["default"].getShippingQuotes, action.payload.countryId, action.payload.zip);

        case 3:
          shippingQuotes = _context11.sent;
          _context11.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["SHIPPING_QUOTES_FETCH_SUCCEEDED"],
            payload: shippingQuotes
          });

        case 6:
          _context11.next = 12;
          break;

        case 8:
          _context11.prev = 8;
          _context11.t0 = _context11["catch"](0);
          _context11.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_cart__WEBPACK_IMPORTED_MODULE_3__["SHIPPING_QUOTES_FETCH_FAILED"],
            message: _context11.t0.message
          });

        case 12:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11, this, [[0, 8]]);
}

function cartSaga() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function cartSaga$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_cart__WEBPACK_IMPORTED_MODULE_3__["OFFER_FETCH_REQUESTED"], getProductOffer);

        case 2:
          _context12.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_cart__WEBPACK_IMPORTED_MODULE_3__["CART_FETCH_REQUESTED"], getCart);

        case 4:
          _context12.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_cart__WEBPACK_IMPORTED_MODULE_3__["DELIVERYADDRESSES_FETCH_REQUESTED"], getDeliveryAddresses);

        case 6:
          _context12.next = 8;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_cart__WEBPACK_IMPORTED_MODULE_3__["PAYMENTS_FETCH_REQUESTED"], getPayments);

        case 8:
          _context12.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_cart__WEBPACK_IMPORTED_MODULE_3__["PRODUCTFROMCART_REMOVE_REQUESTED"], deleteCart);

        case 10:
          _context12.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_cart__WEBPACK_IMPORTED_MODULE_3__["CARTITEM_CREATE_REQUESTED"], postNewOrder);

        case 12:
          _context12.next = 14;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_cart__WEBPACK_IMPORTED_MODULE_3__["DELIVERYADDRESS_CREATE_REQUESTED"], postNewDeliveryAddress);

        case 14:
          _context12.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_cart__WEBPACK_IMPORTED_MODULE_3__["ORDERDETAIL_FETCH_REQUESTED"], getOrderDetail);

        case 16:
          _context12.next = 18;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_cart__WEBPACK_IMPORTED_MODULE_3__["ORDER_EDIT_REQUESTED"], postOrderEdit);

        case 18:
          _context12.next = 20;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_cart__WEBPACK_IMPORTED_MODULE_3__["DELIVERYADDRESS_EDIT_REQUESTED"], putDeliveryAddressEdit);

        case 20:
          _context12.next = 22;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_cart__WEBPACK_IMPORTED_MODULE_3__["SHIPPING_QUOTES_FETCH_REQUESTED"], getShippingQuotes);

        case 22:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked12, this);
}

/* harmony default export */ __webpack_exports__["default"] = (cartSaga);

/***/ }),

/***/ "./src/pages/orders/action-types.js":
/*!******************************************!*\
  !*** ./src/pages/orders/action-types.js ***!
  \******************************************/
/*! exports provided: ORDERS_FETCH, ORDERS_FETCH_REQUESTED, ORDERS_FETCH_SUCCESS, ORDERS_FETCH_FAILURE, ORDERS_DETAIL_FETCH, ORDERS_DETAIL_FETCH_REQUESTED, ORDERS_DETAIL_FETCH_SUCCESS, ORDERS_DETAIL_FETCH_FAILURE, ORDER_CONFIRM_FETCH, ORDER_CONFIRM_FETCH_REQUESTED, ORDER_CONFIRM_FETCH_SUCCESS, ORDER_CONFIRM_FETCH_FAILURE, ORDER_REJECT_FETCH, ORDER_REJECT_FETCH_REQUESTED, ORDER_REJECT_FETCH_SUCCESS, ORDER_REJECT_FETCH_FAILURE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_FETCH", function() { return ORDERS_FETCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_FETCH_REQUESTED", function() { return ORDERS_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_FETCH_SUCCESS", function() { return ORDERS_FETCH_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_FETCH_FAILURE", function() { return ORDERS_FETCH_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_DETAIL_FETCH", function() { return ORDERS_DETAIL_FETCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_DETAIL_FETCH_REQUESTED", function() { return ORDERS_DETAIL_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_DETAIL_FETCH_SUCCESS", function() { return ORDERS_DETAIL_FETCH_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDERS_DETAIL_FETCH_FAILURE", function() { return ORDERS_DETAIL_FETCH_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_CONFIRM_FETCH", function() { return ORDER_CONFIRM_FETCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_CONFIRM_FETCH_REQUESTED", function() { return ORDER_CONFIRM_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_CONFIRM_FETCH_SUCCESS", function() { return ORDER_CONFIRM_FETCH_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_CONFIRM_FETCH_FAILURE", function() { return ORDER_CONFIRM_FETCH_FAILURE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_REJECT_FETCH", function() { return ORDER_REJECT_FETCH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_REJECT_FETCH_REQUESTED", function() { return ORDER_REJECT_FETCH_REQUESTED; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_REJECT_FETCH_SUCCESS", function() { return ORDER_REJECT_FETCH_SUCCESS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ORDER_REJECT_FETCH_FAILURE", function() { return ORDER_REJECT_FETCH_FAILURE; });
var ORDERS_FETCH = 'ORDERS_FETCH';
var ORDERS_FETCH_REQUESTED = 'ORDERS_FETCH_REQUESTED';
var ORDERS_FETCH_SUCCESS = 'ORDERS_FETCH_SUCCESS';
var ORDERS_FETCH_FAILURE = 'ORDERS_FETCH_FAILURE';
var ORDERS_DETAIL_FETCH = 'ORDERS_DETAIL_FETCH';
var ORDERS_DETAIL_FETCH_REQUESTED = 'ORDERS_DETAIL_FETCH_REQUESTED';
var ORDERS_DETAIL_FETCH_SUCCESS = 'ORDERS_DETAIL_FETCH_SUCCESS';
var ORDERS_DETAIL_FETCH_FAILURE = 'ORDERS_DETAIL_FETCH_FAILURE';
var ORDER_CONFIRM_FETCH = 'ORDER_CONFIRM_FETCH';
var ORDER_CONFIRM_FETCH_REQUESTED = 'ORDER_CONFIRM_FETCH_REQUESTED';
var ORDER_CONFIRM_FETCH_SUCCESS = 'ORDER_CONFIRM_FETCH_SUCCESS';
var ORDER_CONFIRM_FETCH_FAILURE = 'ORDER_CONFIRM_FETCH_FAILURE';
var ORDER_REJECT_FETCH = 'ORDER_REJECT_FETCH';
var ORDER_REJECT_FETCH_REQUESTED = 'ORDER_REJECT_FETCH_REQUESTED';
var ORDER_REJECT_FETCH_SUCCESS = 'ORDER_REJECT_FETCH_SUCCESS';
var ORDER_REJECT_FETCH_FAILURE = 'ORDER_REJECT_FETCH_FAILURE';

/***/ }),

/***/ "./src/pages/orders/api.js":
/*!*********************************!*\
  !*** ./src/pages/orders/api.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../api */ "./src/api/index.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../utils/functions */ "./src/utils/functions.js");



/* harmony default export */ __webpack_exports__["default"] = ({
  getAll: function getAll(endpointType, filter) {
    return _api__WEBPACK_IMPORTED_MODULE_1__["default"].get("/".concat(endpointType, "-orders"), {
      params: Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, filter),
      'paramsSerializer': function paramsSerializer(params) {
        return Object(_utils_functions__WEBPACK_IMPORTED_MODULE_2__["transformRequestOptions"])(params);
      }
    });
  },
  create: function create(model) {
    return _api__WEBPACK_IMPORTED_MODULE_1__["default"].post('/orders', model);
  },
  getOrder: function getOrder(endpointType, orderId) {
    return _api__WEBPACK_IMPORTED_MODULE_1__["default"].get("/".concat(endpointType, "-orders/").concat(orderId));
  },
  update: function update(orderId, model) {
    return _api__WEBPACK_IMPORTED_MODULE_1__["default"].put("/orders/".concat(orderId), model);
  },
  confirm: function confirm(orderId) {
    return _api__WEBPACK_IMPORTED_MODULE_1__["default"].post("/sale-orders/".concat(orderId, "/confirm"));
  },
  reject: function reject(orderId) {
    return _api__WEBPACK_IMPORTED_MODULE_1__["default"].post("/sale-orders/".concat(orderId, "/reject"));
  }
});

/***/ }),

/***/ "./src/pages/orders/reducers.js":
/*!**************************************!*\
  !*** ./src/pages/orders/reducers.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./action-types */ "./src/pages/orders/action-types.js");


var initialState = {
  data: [],
  dataType: null,
  detail: {},
  detailType: null,
  isFetching: false,
  isDetailFetching: false,
  isConfirmFetching: false,
  isRejectFetching: false,
  reloadPage: false,
  selectedIndex: -1,
  statusFilter: null
};
/* harmony default export */ __webpack_exports__["default"] = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _action_types__WEBPACK_IMPORTED_MODULE_1__["ORDERS_FETCH_REQUESTED"]:
      return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isFetching: true,
        reloadPage: false
      });

    case _action_types__WEBPACK_IMPORTED_MODULE_1__["ORDERS_FETCH_SUCCESS"]:
      return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isFetching: false,
        data: action.payload.data,
        dataType: action.payload.dataType === 'sale' ? 'sales' : action.payload.dataType,
        reloadPage: false,
        statusFilter: action.payload.statusFilter
      });

    case _action_types__WEBPACK_IMPORTED_MODULE_1__["ORDERS_FETCH_FAILURE"]:
      return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isFetching: false,
        reloadPage: false
      });

    case _action_types__WEBPACK_IMPORTED_MODULE_1__["ORDERS_DETAIL_FETCH_REQUESTED"]:
      return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isDetailFetching: true,
        reloadPage: false
      });

    case _action_types__WEBPACK_IMPORTED_MODULE_1__["ORDERS_DETAIL_FETCH_SUCCESS"]:
      return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isDetailFetching: false,
        detail: action.payload.data,
        detailType: action.payload.detailType === 'sale' ? 'sales' : action.payload.detailType,
        reloadPage: false
      });

    case _action_types__WEBPACK_IMPORTED_MODULE_1__["ORDERS_DETAIL_FETCH_FAILURE"]:
      return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isDetailFetching: false,
        reloadPage: false
      });

    case _action_types__WEBPACK_IMPORTED_MODULE_1__["ORDER_CONFIRM_FETCH_REQUESTED"]:
      return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isConfirmFetching: true,
        reloadPage: false
      });

    case _action_types__WEBPACK_IMPORTED_MODULE_1__["ORDER_CONFIRM_FETCH_SUCCESS"]:
      return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isConfirmFetching: false,
        reloadPage: true
      });

    case _action_types__WEBPACK_IMPORTED_MODULE_1__["ORDER_CONFIRM_FETCH_FAILURE"]:
      return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isConfirmFetching: false,
        reloadPage: false
      });

    case _action_types__WEBPACK_IMPORTED_MODULE_1__["ORDER_REJECT_FETCH_REQUESTED"]:
      return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isRejectFetching: true,
        reloadPage: false
      });

    case _action_types__WEBPACK_IMPORTED_MODULE_1__["ORDER_REJECT_FETCH_SUCCESS"]:
      return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isRejectFetching: false,
        reloadPage: true
      });

    case _action_types__WEBPACK_IMPORTED_MODULE_1__["ORDER_REJECT_FETCH_FAILURE"]:
      return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, state, {
        isRejectFetching: false,
        reloadPage: false
      });

    default:
      return state;
  }
});

/***/ }),

/***/ "./src/pages/orders/saga.js":
/*!**********************************!*\
  !*** ./src/pages/orders/saga.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _callee; });
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api */ "./src/pages/orders/api.js");
/* harmony import */ var _action_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./action-types */ "./src/pages/orders/action-types.js");



var _marked =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getOrders),
    _marked2 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getOrder),
    _marked3 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(confirm),
    _marked4 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(reject),
    _marked5 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(_callee);




/*
 * Get list of (sale/purchase) Orders
 */

function getOrders(action) {
  var data;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getOrders$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _action_types__WEBPACK_IMPORTED_MODULE_4__["ORDERS_FETCH_REQUESTED"]
          });

        case 3:
          _context.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(_api__WEBPACK_IMPORTED_MODULE_3__["default"].getAll, action.payload.endpointType, Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_1__["default"])({}, action.payload.filter, {
            status: !action.payload.filter || action.payload.filter.status === 'All' ? '' : action.payload.filter.status
          }));

        case 5:
          data = _context.sent;
          data.dataType = action.payload.endpointType;
          data.statusFilter = !action.payload.filter ? 'All' : action.payload.filter.status;
          _context.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _action_types__WEBPACK_IMPORTED_MODULE_4__["ORDERS_FETCH_SUCCESS"],
            payload: data
          });

        case 10:
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          _context.next = 16;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _action_types__WEBPACK_IMPORTED_MODULE_4__["ORDERS_FETCH_FAILURE"]
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 12]]);
}
/*
 * Get detail of (sale/purchase) Order
 */


function getOrder(action) {
  var detail;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getOrder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _action_types__WEBPACK_IMPORTED_MODULE_4__["ORDERS_DETAIL_FETCH_REQUESTED"]
          });

        case 3:
          _context2.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(_api__WEBPACK_IMPORTED_MODULE_3__["default"].getOrder, action.payload.endpointType, action.payload.selectedIndex);

        case 5:
          detail = _context2.sent;
          detail.detailType = action.payload.endpointType;
          _context2.next = 9;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _action_types__WEBPACK_IMPORTED_MODULE_4__["ORDERS_DETAIL_FETCH_SUCCESS"],
            payload: detail
          });

        case 9:
          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 15;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _action_types__WEBPACK_IMPORTED_MODULE_4__["ORDERS_DETAIL_FETCH_FAILURE"]
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 11]]);
}
/*
 * Confirm Order
 */


function confirm(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function confirm$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _action_types__WEBPACK_IMPORTED_MODULE_4__["ORDER_CONFIRM_FETCH_REQUESTED"]
          });

        case 3:
          _context3.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(_api__WEBPACK_IMPORTED_MODULE_3__["default"].confirm, action.payload.orderId);

        case 5:
          _context3.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _action_types__WEBPACK_IMPORTED_MODULE_4__["ORDER_CONFIRM_FETCH_SUCCESS"]
          });

        case 7:
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _action_types__WEBPACK_IMPORTED_MODULE_4__["ORDER_CONFIRM_FETCH_FAILURE"]
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[0, 9]]);
}
/*
 * Reject Order
 */


function reject(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function reject$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _action_types__WEBPACK_IMPORTED_MODULE_4__["ORDER_REJECT_FETCH_REQUESTED"]
          });

        case 3:
          _context4.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(_api__WEBPACK_IMPORTED_MODULE_3__["default"].reject, action.payload.orderId);

        case 5:
          _context4.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _action_types__WEBPACK_IMPORTED_MODULE_4__["ORDER_REJECT_FETCH_SUCCESS"]
          });

        case 7:
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          _context4.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _action_types__WEBPACK_IMPORTED_MODULE_4__["ORDER_REJECT_FETCH_FAILURE"]
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this, [[0, 9]]);
}

function _callee() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeLatest"])(_action_types__WEBPACK_IMPORTED_MODULE_4__["ORDERS_FETCH"], getOrders);

        case 2:
          _context5.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeEvery"])(_action_types__WEBPACK_IMPORTED_MODULE_4__["ORDERS_DETAIL_FETCH"], getOrder);

        case 4:
          _context5.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeEvery"])(_action_types__WEBPACK_IMPORTED_MODULE_4__["ORDER_CONFIRM_FETCH"], confirm);

        case 6:
          _context5.next = 8;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeEvery"])(_action_types__WEBPACK_IMPORTED_MODULE_4__["ORDER_REJECT_FETCH"], reject);

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this);
}

/***/ }),

/***/ "./src/saga/broadcast.js":
/*!*******************************!*\
  !*** ./src/saga/broadcast.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_broadcast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/broadcast */ "./src/api/broadcast.js");
/* harmony import */ var _constants_broadcast__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/broadcast */ "./src/constants/broadcast.js");


var _marked =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getBroadcast),
    _marked2 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(postBroadcast),
    _marked3 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(broadcastSaga);





function getBroadcast(action) {
  var broadcastData;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getBroadcast$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_broadcast__WEBPACK_IMPORTED_MODULE_2__["default"].getBroadcast, action.payload.id);

        case 3:
          broadcastData = _context.sent;
          _context.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_broadcast__WEBPACK_IMPORTED_MODULE_3__["BROADCAST_FETCH_SUCCEEDED"],
            payload: broadcastData
          });

        case 6:
          action.resolve();
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          _context.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_broadcast__WEBPACK_IMPORTED_MODULE_3__["BROADCAST_FETCH_FAILED"],
            message: _context.t0.message
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 9]]);
}

function postBroadcast(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function postBroadcast$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_broadcast__WEBPACK_IMPORTED_MODULE_2__["default"].postBroadcast, action.payload.id, action.payload.brcRules);

        case 3:
          _context2.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_broadcast__WEBPACK_IMPORTED_MODULE_3__["BROADCAST_POST_SUCCEEDED"]
          });

        case 5:
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 11;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_broadcast__WEBPACK_IMPORTED_MODULE_3__["BROADCAST_POST_FAILED"],
            message: _context2.t0.message
          });

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 7]]);
}

function broadcastSaga() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function broadcastSaga$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_broadcast__WEBPACK_IMPORTED_MODULE_3__["BROADCAST_FETCH_REQUESTED"], getBroadcast);

        case 2:
          _context3.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_broadcast__WEBPACK_IMPORTED_MODULE_3__["BROADCAST_POST_REQUESTED"], postBroadcast);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this);
}

/* harmony default export */ __webpack_exports__["default"] = (broadcastSaga);

/***/ }),

/***/ "./src/saga/companies.js":
/*!*******************************!*\
  !*** ./src/saga/companies.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_companies__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/companies */ "./src/api/companies.js");
/* harmony import */ var _constants_companies__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/companies */ "./src/constants/companies.js");


var _marked =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getCompanies),
    _marked2 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getCompany),
    _marked3 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(postNewCompany),
    _marked4 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(putCompanyEdit),
    _marked5 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(deleteCompany),
    _marked6 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(companiesSaga);





function getCompanies(action) {
  var companies;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getCompanies$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_companies__WEBPACK_IMPORTED_MODULE_2__["default"].getCompanies, action.payload.search);

        case 3:
          companies = _context.sent;
          _context.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANIES_FETCH_SUCCEEDED"],
            payload: companies
          });

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          _context.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANIES_FETCH_FAILED"],
            message: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 8]]);
}

function getCompany(action) {
  var company;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getCompany$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_companies__WEBPACK_IMPORTED_MODULE_2__["default"].getCompany, action.payload.id);

        case 3:
          company = _context2.sent;
          _context2.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANY_FETCH_SUCCEEDED"],
            payload: company
          });

        case 6:
          action.resolve();
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANY_FETCH_FAILED"],
            message: _context2.t0.message
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 9]]);
}

function postNewCompany(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function postNewCompany$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_companies__WEBPACK_IMPORTED_MODULE_2__["default"].postNewCompany, action.payload.name);

        case 3:
          _context3.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANY_CREATE_SUCCEEDED"]
          });

        case 5:
          _context3.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(action.payload.onSuccess);

        case 7:
          _context3.next = 9;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANIES_FETCH_REQUESTED"]
          });

        case 9:
          _context3.next = 15;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 15;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANY_CREATE_FAILED"],
            message: _context3.t0.message
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[0, 11]]);
}

function putCompanyEdit(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function putCompanyEdit$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_companies__WEBPACK_IMPORTED_MODULE_2__["default"].putCompanyEdit, action.payload.company);

        case 3:
          _context4.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANY_EDIT_SUCCEEDED"]
          });

        case 5:
          _context4.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANY_FETCH_REQUESTED"],
            payload: action.payload.company
          });

        case 7:
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          _context4.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANY_EDIT_FAILED"],
            message: _context4.t0.message
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this, [[0, 9]]);
}

function deleteCompany(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function deleteCompany$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_companies__WEBPACK_IMPORTED_MODULE_2__["default"].deleteCompany, action.payload.id);

        case 3:
          _context5.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANY_REMOVE_SUCCEEDED"]
          });

        case 5:
          _context5.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANIES_FETCH_REQUESTED"]
          });

        case 7:
          _context5.next = 13;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          _context5.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANY_EDIT_FAILED"],
            message: _context5.t0.message
          });

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this, [[0, 9]]);
}

function companiesSaga() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function companiesSaga$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANIES_FETCH_REQUESTED"], getCompanies);

        case 2:
          _context6.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANY_FETCH_REQUESTED"], getCompany);

        case 4:
          _context6.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANY_CREATE_REQUESTED"], postNewCompany);

        case 6:
          _context6.next = 8;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANY_EDIT_REQUESTED"], putCompanyEdit);

        case 8:
          _context6.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_companies__WEBPACK_IMPORTED_MODULE_3__["COMPANY_REMOVE_REQUESTED"], deleteCompany);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, this);
}

/* harmony default export */ __webpack_exports__["default"] = (companiesSaga);

/***/ }),

/***/ "./src/saga/locations.js":
/*!*******************************!*\
  !*** ./src/saga/locations.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api_locations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/locations */ "./src/api/locations.js");
/* harmony import */ var _constants_locations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/locations */ "./src/constants/locations.js");



var _marked =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(getRegions),
    _marked2 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(getStates),
    _marked3 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(fetchProvinces),
    _marked4 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(getStateDetail),
    _marked5 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(getRegionDetail),
    _marked6 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(locationsSaga);





function getRegions(action) {
  var regions;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function getRegions$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(_api_locations__WEBPACK_IMPORTED_MODULE_3__["default"].getRegions, action.payload.search);

        case 3:
          regions = _context.sent;
          _context.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _constants_locations__WEBPACK_IMPORTED_MODULE_4__["REGIONS_FETCH_SUCCEEDED"],
            payload: regions
          });

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          _context.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _constants_locations__WEBPACK_IMPORTED_MODULE_4__["REGIONS_FETCH_FAILED"],
            message: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 8]]);
}

function getStates(action) {
  var states;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function getStates$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(_api_locations__WEBPACK_IMPORTED_MODULE_3__["default"].getStates, action.payload.search);

        case 3:
          states = _context2.sent;
          _context2.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _constants_locations__WEBPACK_IMPORTED_MODULE_4__["STATES_FETCH_SUCCEEDED"],
            payload: states
          });

        case 6:
          _context2.next = 12;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _constants_locations__WEBPACK_IMPORTED_MODULE_4__["STATES_FETCH_FAILED"],
            message: _context2.t0.message
          });

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 8]]);
}

function fetchProvinces(action) {
  var provinces;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function fetchProvinces$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(_api_locations__WEBPACK_IMPORTED_MODULE_3__["default"].fetchProvinces, action.payload.search);

        case 3:
          provinces = _context3.sent;
          _context3.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _constants_locations__WEBPACK_IMPORTED_MODULE_4__["PROVINCES_FETCH_SUCCEEDED"],
            payload: provinces
          });

        case 6:
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _constants_locations__WEBPACK_IMPORTED_MODULE_4__["PROVINCES_FETCH_FAILED"],
            message: _context3.t0.message
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[0, 8]]);
}

function getStateDetail(action) {
  var stateDetail, stateDetailWithId;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function getStateDetail$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(_api_locations__WEBPACK_IMPORTED_MODULE_3__["default"].getStateDetail, action.payload.id);

        case 3:
          stateDetail = _context4.sent;
          stateDetailWithId = Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, stateDetail, {
            id: action.payload.id
          });
          _context4.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _constants_locations__WEBPACK_IMPORTED_MODULE_4__["STATEDETAIL_FETCH_SUCCEEDED"],
            payload: stateDetailWithId
          });

        case 7:
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          _context4.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _constants_locations__WEBPACK_IMPORTED_MODULE_4__["STATEDETAIL_FETCH_FAILED"],
            message: _context4.t0.message
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this, [[0, 9]]);
}

function getRegionDetail(action) {
  var regionDetail, regionDetailWithId;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function getRegionDetail$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(_api_locations__WEBPACK_IMPORTED_MODULE_3__["default"].getRegionDetail, action.payload.id);

        case 3:
          regionDetail = _context5.sent;
          regionDetailWithId = Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__["default"])({}, regionDetail, {
            id: action.payload.id
          });
          _context5.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _constants_locations__WEBPACK_IMPORTED_MODULE_4__["REGIONDETAIL_FETCH_SUCCEEDED"],
            payload: regionDetailWithId
          });

        case 7:
          _context5.next = 13;
          break;

        case 9:
          _context5.prev = 9;
          _context5.t0 = _context5["catch"](0);
          _context5.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _constants_locations__WEBPACK_IMPORTED_MODULE_4__["REGIONDETAIL_FETCH_FAILED"],
            message: _context5.t0.message
          });

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this, [[0, 9]]);
}

function locationsSaga() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function locationsSaga$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeEvery"])(_constants_locations__WEBPACK_IMPORTED_MODULE_4__["REGIONS_FETCH_REQUESTED"], getRegions);

        case 2:
          _context6.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeEvery"])(_constants_locations__WEBPACK_IMPORTED_MODULE_4__["STATES_FETCH_REQUESTED"], getStates);

        case 4:
          _context6.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeEvery"])(_constants_locations__WEBPACK_IMPORTED_MODULE_4__["STATEDETAIL_FETCH_REQUESTED"], getStateDetail);

        case 6:
          _context6.next = 8;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeEvery"])(_constants_locations__WEBPACK_IMPORTED_MODULE_4__["REGIONDETAIL_FETCH_REQUESTED"], getRegionDetail);

        case 8:
          _context6.next = 10;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeEvery"])(_constants_locations__WEBPACK_IMPORTED_MODULE_4__["PROVINCES_FETCH_REQUESTED"], fetchProvinces);

        case 10:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, this);
}

/* harmony default export */ __webpack_exports__["default"] = (locationsSaga);

/***/ }),

/***/ "./src/saga/merchants.js":
/*!*******************************!*\
  !*** ./src/saga/merchants.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_merchants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/merchants */ "./src/api/merchants.js");
/* harmony import */ var _constants_merchants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/merchants */ "./src/constants/merchants.js");
/* harmony import */ var _constants_popup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/popup */ "./src/constants/popup.js");


var _marked =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getMerchants),
    _marked2 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getMerchant),
    _marked3 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(putMerchantEdit),
    _marked4 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(deleteMerchant),
    _marked5 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(merchantsSaga);






function getMerchants() {
  var merchants;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getMerchants$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_merchants__WEBPACK_IMPORTED_MODULE_2__["default"].getMerchants);

        case 3:
          merchants = _context.sent;
          _context.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_merchants__WEBPACK_IMPORTED_MODULE_3__["MERCHANTS_FETCH_SUCCEEDED"],
            payload: merchants
          });

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          _context.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_merchants__WEBPACK_IMPORTED_MODULE_3__["MERCHANTS_FETCH_FAILED"],
            message: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 8]]);
}

function getMerchant(action) {
  var merchant;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getMerchant$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_merchants__WEBPACK_IMPORTED_MODULE_2__["default"].getMerchant, action.payload.id);

        case 3:
          merchant = _context2.sent;
          _context2.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_merchants__WEBPACK_IMPORTED_MODULE_3__["MERCHANT_FETCH_SUCCEEDED"],
            payload: merchant
          });

        case 6:
          action.resolve();
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_merchants__WEBPACK_IMPORTED_MODULE_3__["MERCHANT_FETCH_FAILED"],
            message: _context2.t0.message
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 9]]);
}

function putMerchantEdit(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function putMerchantEdit$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_merchants__WEBPACK_IMPORTED_MODULE_2__["default"].putMerchantEdit, action.payload.merchant);

        case 3:
          _context3.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_merchants__WEBPACK_IMPORTED_MODULE_3__["MERCHANT_EDIT_SUCCEEDED"]
          });

        case 5:
          _context3.next = 11;
          break;

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 11;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_merchants__WEBPACK_IMPORTED_MODULE_3__["MERCHANT_EDIT_FAILED"],
            message: _context3.t0.message
          });

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[0, 7]]);
}

function deleteMerchant(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function deleteMerchant$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_merchants__WEBPACK_IMPORTED_MODULE_2__["default"].deleteMerchant, action.payload.id);

        case 3:
          _context4.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_merchants__WEBPACK_IMPORTED_MODULE_3__["MERCHANT_REMOVE_SUCCEEDED"]
          });

        case 5:
          _context4.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_popup__WEBPACK_IMPORTED_MODULE_4__["REMOVE_POPUP"]
          });

        case 7:
          _context4.next = 9;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_merchants__WEBPACK_IMPORTED_MODULE_3__["MERCHANTS_FETCH_REQUESTED"],
            payload: action.payload.merchants
          });

        case 9:
          _context4.next = 15;
          break;

        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          _context4.next = 15;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_merchants__WEBPACK_IMPORTED_MODULE_3__["MERCHANT_REMOVE_FAILED"],
            message: _context4.t0.message
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this, [[0, 11]]);
}

function merchantsSaga() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function merchantsSaga$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_merchants__WEBPACK_IMPORTED_MODULE_3__["MERCHANTS_FETCH_REQUESTED"], getMerchants);

        case 2:
          _context5.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_merchants__WEBPACK_IMPORTED_MODULE_3__["MERCHANT_FETCH_REQUESTED"], getMerchant);

        case 4:
          _context5.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_merchants__WEBPACK_IMPORTED_MODULE_3__["MERCHANT_EDIT_REQUESTED"], putMerchantEdit);

        case 6:
          _context5.next = 8;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_merchants__WEBPACK_IMPORTED_MODULE_3__["MERCHANT_REMOVE_REQUESTED"], deleteMerchant);

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this);
}

/* harmony default export */ __webpack_exports__["default"] = (merchantsSaga);

/***/ }),

/***/ "./src/saga/offices.js":
/*!*****************************!*\
  !*** ./src/saga/offices.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_offices__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/offices */ "./src/api/offices.js");
/* harmony import */ var _constants_offices__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/offices */ "./src/constants/offices.js");
/* harmony import */ var _constants_companies__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/companies */ "./src/constants/companies.js");


var _marked =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getOffice),
    _marked2 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(postNewOffice),
    _marked3 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(deleteOffice),
    _marked4 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(putOfficeEdit),
    _marked5 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(officesSaga);






function getOffice(action) {
  var office;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getOffice$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_offices__WEBPACK_IMPORTED_MODULE_2__["default"].getOffice, action.payload.id);

        case 3:
          office = _context.sent;
          _context.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_offices__WEBPACK_IMPORTED_MODULE_3__["OFFICE_FETCH_SUCCEEDED"],
            payload: office
          });

        case 6:
          _context.next = 8;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(action.payload.onSuccess);

        case 8:
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          _context.next = 14;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_offices__WEBPACK_IMPORTED_MODULE_3__["OFFICE_FETCH_FAILED"],
            message: _context.t0.message
          });

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 10]]);
}

function postNewOffice(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function postNewOffice$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_offices__WEBPACK_IMPORTED_MODULE_2__["default"].postNewOffice, action.payload.office);

        case 3:
          _context2.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_offices__WEBPACK_IMPORTED_MODULE_3__["OFFICE_CREATE_SUCCEEDED"]
          });

        case 5:
          _context2.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(action.payload.onSuccess);

        case 7:
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_offices__WEBPACK_IMPORTED_MODULE_3__["OFFICE_CREATE_FAILED"],
            message: _context2.t0.message
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this, [[0, 9]]);
}

function deleteOffice(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function deleteOffice$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_offices__WEBPACK_IMPORTED_MODULE_2__["default"].deleteOffice, action.payload.id);

        case 3:
          _context3.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_offices__WEBPACK_IMPORTED_MODULE_3__["OFFICE_REMOVE_SUCCEEDED"]
          });

        case 5:
          _context3.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_companies__WEBPACK_IMPORTED_MODULE_4__["COMPANY_FETCH_REQUESTED"],
            payload: action.payload.company
          });

        case 7:
          _context3.next = 13;
          break;

        case 9:
          _context3.prev = 9;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_offices__WEBPACK_IMPORTED_MODULE_3__["OFFICE_REMOVE_FAILED"],
            message: _context3.t0.message
          });

        case 13:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, this, [[0, 9]]);
}

function putOfficeEdit(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function putOfficeEdit$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_offices__WEBPACK_IMPORTED_MODULE_2__["default"].putOfficeEdit, action.payload.office);

        case 3:
          _context4.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_offices__WEBPACK_IMPORTED_MODULE_3__["OFFICE_EDIT_SUCCEEDED"]
          });

        case 5:
          _context4.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_offices__WEBPACK_IMPORTED_MODULE_3__["OFFICE_FETCH_REQUESTED"],
            payload: action.payload.office
          });

        case 7:
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          _context4.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_offices__WEBPACK_IMPORTED_MODULE_3__["OFFICE_EDIT_FAILED"],
            message: _context4.t0.message
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4, this, [[0, 9]]);
}

function officesSaga() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function officesSaga$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_offices__WEBPACK_IMPORTED_MODULE_3__["OFFICE_FETCH_REQUESTED"], getOffice);

        case 2:
          _context5.next = 4;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_offices__WEBPACK_IMPORTED_MODULE_3__["OFFICE_CREATE_REQUESTED"], postNewOffice);

        case 4:
          _context5.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_offices__WEBPACK_IMPORTED_MODULE_3__["OFFICE_REMOVE_REQUESTED"], deleteOffice);

        case 6:
          _context5.next = 8;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_offices__WEBPACK_IMPORTED_MODULE_3__["OFFICE_EDIT_REQUESTED"], putOfficeEdit);

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, this);
}

/* harmony default export */ __webpack_exports__["default"] = (officesSaga);

/***/ }),

/***/ "./src/saga/productOffers.js":
/*!***********************************!*\
  !*** ./src/saga/productOffers.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_productOffers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/productOffers */ "./src/api/productOffers.js");
/* harmony import */ var _constants_productOffers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../constants/productOffers */ "./src/constants/productOffers.js");


var _marked =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(deleteProductOffer),
    _marked2 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(productOffersSaga);





function deleteProductOffer(action) {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function deleteProductOffer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(_api_productOffers__WEBPACK_IMPORTED_MODULE_2__["default"].deleteProductOffer, action.payload.id);

        case 3:
          _context.next = 5;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_productOffers__WEBPACK_IMPORTED_MODULE_3__["PRODUCTOFFER_REMOVE_SUCCEEDED"]
          });

        case 5:
          _context.next = 7;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["call"])(action.payload.onSuccess);

        case 7:
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          _context.next = 13;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["put"])({
            type: _constants_productOffers__WEBPACK_IMPORTED_MODULE_3__["PRODUCTOFFER_REMOVE_FAILED"],
            message: _context.t0.message
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 9]]);
}

function productOffersSaga() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function productOffersSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__["takeEvery"])(_constants_productOffers__WEBPACK_IMPORTED_MODULE_3__["PRODUCTOFFER_REMOVE_REQUESTED"], deleteProductOffer);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

/* harmony default export */ __webpack_exports__["default"] = (productOffersSaga);

/***/ }),

/***/ "./src/saga/shippingQuotes.js":
/*!************************************!*\
  !*** ./src/saga/shippingQuotes.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/regenerator */ "./node_modules/@babel/runtime-corejs2/regenerator/index.js");
/* harmony import */ var _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/json/stringify */ "./node_modules/@babel/runtime-corejs2/core-js/json/stringify.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api_shippingQuotes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/shippingQuotes */ "./src/api/shippingQuotes.js");
/* harmony import */ var _constants_shippingQuotes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants/shippingQuotes */ "./src/constants/shippingQuotes.js");



var _marked =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(getShippingQuotes),
    _marked2 =
/*#__PURE__*/
_babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(shippingQuotesSaga);





function getShippingQuotes(action) {
  var shippingQuotes;
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function getShippingQuotes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["call"])(_api_shippingQuotes__WEBPACK_IMPORTED_MODULE_3__["default"].getShippingQuotes, _babel_runtime_corejs2_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_1___default()(action.payload.pack));

        case 3:
          shippingQuotes = _context.sent;
          _context.next = 6;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _constants_shippingQuotes__WEBPACK_IMPORTED_MODULE_4__["SHIPPINGQUOTES_FETCH_SUCCEEDED"],
            payload: shippingQuotes
          });

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          _context.next = 12;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["put"])({
            type: _constants_shippingQuotes__WEBPACK_IMPORTED_MODULE_4__["SHIPPINGQUOTES_FETCH_FAILED"],
            message: _context.t0.message
          });

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[0, 8]]);
}

function shippingQuotesSaga() {
  return _babel_runtime_corejs2_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function shippingQuotesSaga$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return Object(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__["takeEvery"])(_constants_shippingQuotes__WEBPACK_IMPORTED_MODULE_4__["SHIPPINGQUOTES_FETCH_REQUESTED"], getShippingQuotes);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

/* harmony default export */ __webpack_exports__["default"] = (shippingQuotesSaga);

/***/ }),

/***/ "./src/store-next.js":
/*!***************************!*\
  !*** ./src/store-next.js ***!
  \***************************/
/*! exports provided: makeStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeStore", function() { return makeStore; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-logger */ "redux-logger");
/* harmony import */ var redux_logger__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_logger__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-thunk */ "redux-thunk");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux_promise_middleware__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-promise-middleware */ "redux-promise-middleware");
/* harmony import */ var redux_promise_middleware__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_promise_middleware__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux-form */ "react-redux-form");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux_form__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux-saga */ "redux-saga");
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(redux_saga__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _modules_identity__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/identity */ "./src/modules/identity.js");
/* harmony import */ var _modules_users__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/users */ "./src/modules/users.js");
/* harmony import */ var _modules_companies__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/companies */ "./src/modules/companies.js");
/* harmony import */ var _modules_productOffers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/productOffers */ "./src/modules/productOffers.js");
/* harmony import */ var _modules_shippingQuotes__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/shippingQuotes */ "./src/modules/shippingQuotes.js");
/* harmony import */ var _modules_popup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/popup */ "./src/modules/popup.js");
/* harmony import */ var _modules_filter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/filter */ "./src/modules/filter.js");
/* harmony import */ var _modules_packageTypes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/packageTypes */ "./src/modules/packageTypes.js");
/* harmony import */ var _modules_broadcast__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./modules/broadcast */ "./src/modules/broadcast.js");
/* harmony import */ var _modules_cart__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./modules/cart */ "./src/modules/cart.js");
/* harmony import */ var _modules_merchants__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./modules/merchants */ "./src/modules/merchants.js");
/* harmony import */ var _modules_products__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./modules/products */ "./src/modules/products.js");
/* harmony import */ var _modules_location__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./modules/location */ "./src/modules/location.js");
/* harmony import */ var _modules_errors__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./modules/errors */ "./src/modules/errors.js");
/* harmony import */ var _modules_dataTables__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./modules/dataTables */ "./src/modules/dataTables.js");
/* harmony import */ var _components_Filter_components_SavedFilters_reducers_SaveFilterItem_reducers__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/Filter/components/SavedFilters/reducers/SaveFilterItem.reducers */ "./src/components/Filter/components/SavedFilters/reducers/SaveFilterItem.reducers.js");
/* harmony import */ var _saga_companies__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./saga/companies */ "./src/saga/companies.js");
/* harmony import */ var _saga_offices__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./saga/offices */ "./src/saga/offices.js");
/* harmony import */ var _saga_merchants__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./saga/merchants */ "./src/saga/merchants.js");
/* harmony import */ var _pages_administration_users_saga_users__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./pages/administration/users/saga/users */ "./src/pages/administration/users/saga/users.js");
/* harmony import */ var _pages_administration_operators_saga_operators__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./pages/administration/operators/saga/operators */ "./src/pages/administration/operators/saga/operators.js");
/* harmony import */ var _pages_cart_saga_cart__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./pages/cart/saga/cart */ "./src/pages/cart/saga/cart.js");
/* harmony import */ var _saga_locations__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./saga/locations */ "./src/saga/locations.js");
/* harmony import */ var _saga_broadcast__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./saga/broadcast */ "./src/saga/broadcast.js");
/* harmony import */ var _saga_productOffers__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./saga/productOffers */ "./src/saga/productOffers.js");
/* harmony import */ var _saga_shippingQuotes__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./saga/shippingQuotes */ "./src/saga/shippingQuotes.js");
/* harmony import */ var _pages_orders_reducers__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./pages/orders/reducers */ "./src/pages/orders/reducers.js");
/* harmony import */ var _pages_orders_saga__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./pages/orders/saga */ "./src/pages/orders/saga.js");






 // import jwtDecode from 'jwt-decode'
// import moment from "moment"
// import identity, {initialState as identityFormInit, logout} from './modules/identity'


























 // Orders



var reducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  identity: _modules_identity__WEBPACK_IMPORTED_MODULE_6__["default"],
  brcRules: _modules_broadcast__WEBPACK_IMPORTED_MODULE_14__["default"],
  companies: _modules_companies__WEBPACK_IMPORTED_MODULE_8__["default"],
  users: _modules_users__WEBPACK_IMPORTED_MODULE_7__["default"],
  location: _modules_location__WEBPACK_IMPORTED_MODULE_18__["default"],
  productOffers: _modules_productOffers__WEBPACK_IMPORTED_MODULE_9__["default"],
  shippingQuotes: _modules_shippingQuotes__WEBPACK_IMPORTED_MODULE_10__["default"],
  products: _modules_products__WEBPACK_IMPORTED_MODULE_17__["default"],
  packageTypes: _modules_packageTypes__WEBPACK_IMPORTED_MODULE_13__["default"],
  cart: _modules_cart__WEBPACK_IMPORTED_MODULE_15__["default"],
  popup: _modules_popup__WEBPACK_IMPORTED_MODULE_11__["default"],
  merchants: _modules_merchants__WEBPACK_IMPORTED_MODULE_16__["default"],
  filter: _modules_filter__WEBPACK_IMPORTED_MODULE_12__["default"],
  errors: _modules_errors__WEBPACK_IMPORTED_MODULE_19__["default"],
  dataTables: _modules_dataTables__WEBPACK_IMPORTED_MODULE_20__["default"],
  saveFilterItem: _components_Filter_components_SavedFilters_reducers_SaveFilterItem_reducers__WEBPACK_IMPORTED_MODULE_21__["show"],
  orders: _pages_orders_reducers__WEBPACK_IMPORTED_MODULE_32__["default"],
  forms: Object(react_redux_form__WEBPACK_IMPORTED_MODULE_4__["combineForms"])({
    filter: _modules_filter__WEBPACK_IMPORTED_MODULE_12__["initialState"].data,
    brcRules: _modules_broadcast__WEBPACK_IMPORTED_MODULE_14__["initialState"].broadcastData,
    addProductOffer: _modules_productOffers__WEBPACK_IMPORTED_MODULE_9__["initialState"].addProductOffer,
    shippingQuotes: _modules_shippingQuotes__WEBPACK_IMPORTED_MODULE_10__["initialState"].shippingQuotes,
    productMapping: _modules_products__WEBPACK_IMPORTED_MODULE_17__["initialState"].productsMapping,
    productOffering: _modules_products__WEBPACK_IMPORTED_MODULE_17__["initialState"].productOffering,
    loginForm: _modules_identity__WEBPACK_IMPORTED_MODULE_6__["initialState"].loginForm.data,
    registrationForm: _modules_identity__WEBPACK_IMPORTED_MODULE_6__["initialState"].registrationForm.data,
    merchants: _modules_merchants__WEBPACK_IMPORTED_MODULE_16__["initialState"],
    cart: _modules_cart__WEBPACK_IMPORTED_MODULE_15__["initialState"],
    shippingEdit: {}
  }, 'forms')
});
var logger = Object(redux_logger__WEBPACK_IMPORTED_MODULE_1__["createLogger"])({
  predicate: function predicate(getState, action) {
    return "development" === "development";
  }
}); // Middleware to check token expiration and potentially redirect user to login package
// const checkTokenExpirationMiddleware = store => next => action => {
//     const token = localStorage.getItem('jwtoken')
//     if (token) {
//         const expirationTime = moment(jwtDecode(token).exp)
//         const nowTime = moment(Date.now() / 1000)
//       if (expirationTime < nowTime) {
//         next(action)
//         store.dispatch(logout())
//       }
//     }
//     next(action)
//   }

var makeStore = function makeStore() {
  // create the saga middleware
  var sagaMiddleware = redux_saga__WEBPACK_IMPORTED_MODULE_5___default()();
  var middleware = Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_2___default.a, redux_promise_middleware__WEBPACK_IMPORTED_MODULE_3___default.a, sagaMiddleware, logger); // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

  var store = Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(reducer, middleware);
  sagaMiddleware.run(_saga_companies__WEBPACK_IMPORTED_MODULE_22__["default"]);
  sagaMiddleware.run(_saga_offices__WEBPACK_IMPORTED_MODULE_23__["default"]);
  sagaMiddleware.run(_pages_administration_users_saga_users__WEBPACK_IMPORTED_MODULE_25__["default"]);
  sagaMiddleware.run(_pages_administration_operators_saga_operators__WEBPACK_IMPORTED_MODULE_26__["default"]);
  sagaMiddleware.run(_saga_merchants__WEBPACK_IMPORTED_MODULE_24__["default"]);
  sagaMiddleware.run(_pages_cart_saga_cart__WEBPACK_IMPORTED_MODULE_27__["default"]);
  sagaMiddleware.run(_saga_locations__WEBPACK_IMPORTED_MODULE_28__["default"]);
  sagaMiddleware.run(_saga_broadcast__WEBPACK_IMPORTED_MODULE_29__["default"]);
  sagaMiddleware.run(_saga_productOffers__WEBPACK_IMPORTED_MODULE_30__["default"]);
  sagaMiddleware.run(_saga_shippingQuotes__WEBPACK_IMPORTED_MODULE_31__["default"]);
  sagaMiddleware.run(_pages_orders_saga__WEBPACK_IMPORTED_MODULE_33__["default"]);
  return store;
};

/***/ }),

/***/ "./src/utils/auth.js":
/*!***************************!*\
  !*** ./src/utils/auth.js ***!
  \***************************/
/*! exports provided: withAuth, setAuthToken, deleteAuthToken, checkToken */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withAuth", function() { return withAuth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAuthToken", function() { return setAuthToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteAuthToken", function() { return deleteAuthToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkToken", function() { return checkToken; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/extends */ "./node_modules/@babel/runtime-corejs2/helpers/esm/extends.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/esm/inherits.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_Spinner_Spinner__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/Spinner/Spinner */ "./src/components/Spinner/Spinner.js");
/* harmony import */ var _modules_identity__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../modules/identity */ "./src/modules/identity.js");






var _jsxFileName = "/Users/mirek/Documents/dev/prodex-frontend/src/utils/auth.js";






function withAuth(ComposedComponent) {
  var requireAuth =
  /*#__PURE__*/
  function (_React$Component) {
    Object(_babel_runtime_corejs2_helpers_esm_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(requireAuth, _React$Component);

    function requireAuth() {
      Object(_babel_runtime_corejs2_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, requireAuth);

      return Object(_babel_runtime_corejs2_helpers_esm_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, Object(_babel_runtime_corejs2_helpers_esm_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(requireAuth).apply(this, arguments));
    }

    Object(_babel_runtime_corejs2_helpers_esm_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(requireAuth, [{
      key: "verify",
      value: function verify(props) {
        if (!props.isAuthenticated && !props.isFetchingIdentity) {
          if (props.location.pathname !== "/login") props.history.push("/login");
        }

        if (!props.isFetchingIdentity && !localStorage.jwtoken) {
          Object(_modules_identity__WEBPACK_IMPORTED_MODULE_11__["logout"])();
          if (props.location.pathname !== "/login") props.history.push("/login");
        }
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        this.verify(this.props);
      }
    }, {
      key: "componentWillUpdate",
      value: function componentWillUpdate(nextProps) {
        this.verify(nextProps);
      }
    }, {
      key: "render",
      value: function render() {
        return this.props.isFetchingIdentity ? react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_components_Spinner_Spinner__WEBPACK_IMPORTED_MODULE_10__["default"], {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          },
          __self: this
        }) : react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(ComposedComponent, Object(_babel_runtime_corejs2_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({}, this.props, {
          __source: {
            fileName: _jsxFileName,
            lineNumber: 32
          },
          __self: this
        }));
      }
    }]);

    return requireAuth;
  }(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

  requireAuth.propTypes = {
    isAuthenticated: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool.isRequired,
    isFetchingIdentity: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.bool.isRequired
  };

  function mapStateToProps(store) {
    return {
      isAuthenticated: store.identity.isAuthenticated,
      isFetchingIdentity: store.identity.identity.isFetching
    };
  }

  return Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps)(requireAuth);
}
function setAuthToken(token) {
  localStorage.setItem('jwtoken', token);
  axios__WEBPACK_IMPORTED_MODULE_6___default.a.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
function deleteAuthToken() {
  localStorage.removeItem('jwtoken');
  delete axios__WEBPACK_IMPORTED_MODULE_6___default.a.defaults.headers.common['Authorization'];
}
function checkToken(props) {
  //use isFetchingIdentity ?
  if (!props.isFetchingIdentity && !localStorage.jwtoken) {
    Object(_modules_identity__WEBPACK_IMPORTED_MODULE_11__["logout"])();
    if (props.location.pathname !== "/login") props.history.push("/login");
    return true;
  }

  return false;
}

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/*! exports provided: ROLE_GUEST, DATE_FORMAT, PRICE_PRECISION, DEBOUNCE_TIME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROLE_GUEST", function() { return ROLE_GUEST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DATE_FORMAT", function() { return DATE_FORMAT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PRICE_PRECISION", function() { return PRICE_PRECISION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEBOUNCE_TIME", function() { return DEBOUNCE_TIME; });
var ROLE_GUEST = 'ROLE_GUEST'; //USER - ROLE

var DATE_FORMAT = 'MM/DD/YYYY';
var PRICE_PRECISION = 2;
var DEBOUNCE_TIME = 50; //ms

/***/ }),

/***/ "./src/utils/functions.js":
/*!********************************!*\
  !*** ./src/utils/functions.js ***!
  \********************************/
/*! exports provided: filterNonEmptyAttributes, resetForm, getUnit, getSelectedDataTable, getSelectedRowsDataTable, transformRequestOptions, filterByUniqueProperty */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterNonEmptyAttributes", function() { return filterNonEmptyAttributes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetForm", function() { return resetForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUnit", function() { return getUnit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectedDataTable", function() { return getSelectedDataTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelectedRowsDataTable", function() { return getSelectedRowsDataTable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformRequestOptions", function() { return transformRequestOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterByUniqueProperty", function() { return filterByUniqueProperty; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/typeof */ "./node_modules/@babel/runtime-corejs2/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/parse-int */ "./node_modules/@babel/runtime-corejs2/core-js/parse-int.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/slicedToArray */ "./node_modules/@babel/runtime-corejs2/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime-corejs2/core-js/object/entries */ "./node_modules/@babel/runtime-corejs2/core-js/object/entries.js");
/* harmony import */ var _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-redux-form */ "react-redux-form");
/* harmony import */ var react_redux_form__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_redux_form__WEBPACK_IMPORTED_MODULE_6__);







var filterNonEmptyAttributes = function filterNonEmptyAttributes(object) {
  return _babel_runtime_corejs2_core_js_object_entries__WEBPACK_IMPORTED_MODULE_5___default()(object).filter(function (_ref) {
    var _ref2 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return value !== null && value !== '';
  }).reduce(function (carry, _ref3) {
    var _ref4 = Object(_babel_runtime_corejs2_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_4__["default"])(_ref3, 2),
        key = _ref4[0],
        value = _ref4[1];

    return Object(_babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_3__["default"])({}, carry, Object(_babel_runtime_corejs2_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])({}, key, value));
  }, {});
}; // eslint-disable-next-line

Number.prototype.formatMoney = function (c) {
  var n = this,
      d = ".",
      t = ",",
      s = n < 0 ? "-" : "",
      i = String(_babel_runtime_corejs2_core_js_parse_int__WEBPACK_IMPORTED_MODULE_1___default()(n = Math.abs(Number(n) || 0).toFixed(c), 10)),
      j = i.length;
  j = j > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}; //resetForm is action-creator so its required for usage to include it into index file


var resetForm = function resetForm(model) {
  return function (dispatch) {
    dispatch(react_redux_form__WEBPACK_IMPORTED_MODULE_6__["actions"].reset(model));
  };
}; // eslint-disable-next-line

Number.prototype.formatNumber = function () {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

var getUnit = function getUnit(unitName) {
  switch (unitName) {
    case "pound":
      return "lb";

    case "gallon":
      return "gal";

    default:
      return "#";
  }
};
var getSelectedDataTable = function getSelectedDataTable(dataTable) {
  if (!dataTable) return 0;
  var selected = 0;

  for (var i = 0; i < dataTable.rowsOpns.length; i++) {
    for (var j = 0; j < dataTable.rowsOpns[i].rows.length; j++) {
      if (dataTable.rowsOpns[i].rows[j].selected) selected++;
    }
  }

  return selected;
};
var getSelectedRowsDataTable = function getSelectedRowsDataTable(dataTable) {
  if (!dataTable) return false;
  var selectedRows = [];

  for (var i = 0; i < dataTable.rowsOpns.length; i++) {
    for (var j = 0; j < dataTable.rowsOpns[i].rows.length; j++) {
      if (dataTable.rowsOpns[i].rows[j].selected) selectedRows.push(dataTable.rowsOpns[i].rows[j].id);
    }
  }

  return selectedRows;
};
var transformRequestOptions = function transformRequestOptions(params) {
  var options = '';

  var _loop = function _loop(key) {
    if (Object(_babel_runtime_corejs2_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(params[key]) !== 'object') {
      options += "".concat(key, "=").concat(params[key], "&");
    } else if (Object(_babel_runtime_corejs2_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(params[key]) === 'object' && params[key].length) {
      // eslint-disable-next-line
      params[key].forEach(function (el) {
        options += "".concat(key, "=").concat(el, "&");
      });
    }
  };

  for (var key in params) {
    _loop(key);
  }

  return options ? options.slice(0, -1) : options;
};
var filterByUniqueProperty = function filterByUniqueProperty(arr, property) {
  var uniqueArr = [];
  arr.filter(function (item) {
    var i = uniqueArr.findIndex(function (x) {
      return x[property] === item[property];
    });

    if (i <= -1) {
      uniqueArr.push(item);
    }

    return null;
  });
  return uniqueArr;
};

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi private-next-pages/_app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.js */"./pages/_app.js");


/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),

/***/ "form-data":
/*!****************************!*\
  !*** external "form-data" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("form-data");

/***/ }),

/***/ "next-redux-wrapper":
/*!*************************************!*\
  !*** external "next-redux-wrapper" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "next-server/dist/lib/router/router":
/*!*****************************************************!*\
  !*** external "next-server/dist/lib/router/router" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-server/dist/lib/router/router");

/***/ }),

/***/ "next-server/dist/lib/utils":
/*!*********************************************!*\
  !*** external "next-server/dist/lib/utils" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next-server/dist/lib/utils");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "qs":
/*!*********************!*\
  !*** external "qs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-intl":
/*!*****************************!*\
  !*** external "react-intl" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-intl");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-is");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "react-redux-form":
/*!***********************************!*\
  !*** external "react-redux-form" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux-form");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),

/***/ "redux-logger":
/*!*******************************!*\
  !*** external "redux-logger" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-logger");

/***/ }),

/***/ "redux-promise-middleware":
/*!*******************************************!*\
  !*** external "redux-promise-middleware" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-promise-middleware");

/***/ }),

/***/ "redux-saga":
/*!*****************************!*\
  !*** external "redux-saga" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-saga");

/***/ }),

/***/ "redux-saga/effects":
/*!*************************************!*\
  !*** external "redux-saga/effects" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-saga/effects");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),

/***/ "regenerator-runtime":
/*!**************************************!*\
  !*** external "regenerator-runtime" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ })

/******/ });
//# sourceMappingURL=_app.js.map