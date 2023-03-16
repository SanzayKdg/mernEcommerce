backend

npm i bcryptjs jsonwebtoken validator nodemailer cookie-parser body-parser

bcryptjs - password hasing
jsonwebtoken - 
validator - validating emails
nodemailer - forgort pw /reset pw
cookie-parser - stores jsonwebtoken in form of cookies
body-parser -

npm install cloudinary
npm i express-fileupload
npm i stripe //for payment gateway

front end

npm i 
axios 
react-alert
react-alert-template-basic
react-helmet 
react-redux 
redux redux-thunk 
redux-devtools-extension 
react-router-dom 
overlay-navbar

npm i react-material-ui-carousel
npm install @mui/material
npm install @mui/icons-material
npm install @mui/styles
npm i react-js-pagination
npm i country-state-city // all country satates
npm install @stripe/react-stripe-js @stripe/stripe-js //
npm install @mui/x-data-grid //table mui
npm i react-chart.js-2 chart.js 



to deploy in localbrowser. helps to run code in single host. backend host >>>
in cd frontend >> npm run build  >> then delete build folder only


in root folder of package.json under--- 
"scripts"{
"heroku-postbuild" :"NPM_CONFIG_PRODUCTION=false"

}

if set --> "heroku-postbuild" :"NPM_CONFIG_PRODUCTION=false" only dependencies installs but we need both dependencies and dev dependencies 


so we need to set ---> 
    "heroku-postbuild" :"NPM_CONFIG_PRODUCTION=false && npm install --prefix frontend && run build --prefix frontend"



then create a file in root folder and name it - Procfile under it type web: node backend/server.js and save it