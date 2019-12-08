### This repo is now designed as an npm package

The npm package looks for exports in the `index.js` file located in `src/index.js`

The format of this is:







---


.env file contents for deployed backend:
REACT_APP_BACKEND_BASE_URL=https://ocean-commotion-backend.herokuapp.com

.env file contents for local backend:
REACT_APP_BACKEND_BASE_URL=http://localhost:3001

Note: Remember to restart the app when the .env file is changed


`Compile the entire src directory and output it to the lib directory by using either --out-dir or -d. This doesn't overwrite any other files or directories in lib.`
Source: https://babeljs.io/docs/en/babel-cli

