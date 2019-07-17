
.env file contents for deployed backend:
REACT_APP_BACKEND_BASE_URL=https://ocean-commotion-backend.herokuapp.com

.env file contents for local backend:
REACT_APP_BACKEND_BASE_URL=http://localhost:3001

Note: Remember to restart the app when the .env file is changed

React `package.json` scripts:
"start": "react-scripts start",
"build": "react-scripts build",

Webpack `package.json` scripts:
"start": "webpack --watch",
"build": "webpack --config webpack.config.js"
