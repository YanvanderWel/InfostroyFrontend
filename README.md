# Frontend Infostroy test site

## Description

This is a frontend side of the site and here I interact with user the help of React.

## Getting Started with installation

````
git clone https://github.com/YanvanderWel/InfostroyFrontend.git
cd InfostroyFrontend
````

## Prerequisites

According to the documentation you have to add a proxy entry to package.json. This will ensure that the web server at :3000 proxies any requests to http://localhost:3000/api/* to http://localhost:8080/api, which will enable us to call the backend without running into any CORS issues.

`package.json`
````
{
  "name": "infostroy-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@stomp/stompjs": "^6.1.2",
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^12.1.2",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^0.24.0",
    "bootstrap": "^5.1.3",
    "prop-types": "^15.8.1",
    "react": "^17.0.2",
    "react-bootstrap": "^2.1.1",
    "react-dom": "^17.0.2",
    "react-router-dom": "^6.2.1",
    "react-scripts": "5.0.0",
    "sockjs-client": "^1.5.2",
    "web-vitals": "^2.1.3"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "proxy": "http://localhost:8080",
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}


````

## First Run app


````
npm start
````
