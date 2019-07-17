# Prodex frontend


This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
More information is in [Table of React Contents](#table-of-react-contents) section.

## Project structure

All source codes are in src/ directory. The main scripts are **index.js**, **App.js** and **store.js**.
>TODO: create .env file in project directory with line REACT_APP_API_URL=URL_TO_API <br> This variable is used by AXIOS as default API URL
>  

Then there are other directories which  are divided into these parts: 

## Parts of application source codes:
- [Components](###components)
- [Images](###images)
- [Layout](###layout)
- [Modules](###modules)
- [Pages](###pages)
- [Translations](###translations)

### Components

#### Nav
In this directory is Nav bar component, which represents top nav bar of all pages. 


### Images
This directory contains all images of all pages. Images might be separated into sub-folders such as
filter or nav.  

### Layout
In this directory are three layout scripts of whole fronend *Main.js*, *Header.js* and *Footer.js*.

### Modules
This folder contains all store reducers.

### Pages
This folder is divided into sub-folders. Each sub-folder represents one part of application like inventory or login
and it use to have other sub-directories of related pages.
For example **inventory**:
##### Inventory:
This directory is now divided into three sub-directories : *addInventory*, *myInventory*, *products*, where each 
represnts different page, e.g. addInventory is page for adding inventory and it has its own components directory, 
with form components parts.

### Translations

This directory contains file **en.json**, where are all strings used in project.

## Project packages

- axios
- bootstrap
- bootstrap-without-jquery
- classnames
- jquery
- jsonwebtoken
- lodash
- node-sass-chokidar
- npm-run-all
- prop-types
- react
- react-countup
- react-dom
- react-localize-redux
- react-motion
- react-redux
- react-redux-form
- react-router
- react-router-dom
- react-scripts
- react-select
- reactstrap
- redux
- redux-logger
- redux-promise-middleware
- redux-thunk
- scroll-to-element

Application is using [**react-localize-redux**](https://github.com/ryandrewjohnson/react-localize-redux)
to handle language translations. All translation mutataion are in json files in src/translation directory.
The page myInventory is using [**react-selectable-table**](https://www.npmjs.com/package/react-selectable-table).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

### `npm run cy:open`

Opens Cypress used for manual launching of automated tests.

### `npm run cy:run`

Launches all automated UI tests using Cypress. Results can be found in _cypress/results/_ folder

## More Information

For more information about creat-react-app and all scripts visit **Docs/Readme.md**
