## Installation

1. clone the `git clone git@github.com repository: RenanRB / curso-angular.git`
2. Enter the project and install the `npm install` dependencies

## Local Environment

Run `ng serve` to make the project go up locally. Access the url `http: // localhost: 4200 /`. The project is already reloaded automatically according to the changes you make to the code

## Simulating the Backend

Run `npm install -g json-server` to globally install the json server. After installation enter the project folder and run `json-server --watch db.json`, with this a server will be started at the url` http: // localhost: 3000 / `, after initialization it will be possible to make http requests.

## Generating component

Run `ng generate component component-name` to create a new component. You can also use `ng generate directive | pipe | service | class | guard | interface | enum | module`.

## Build

Run `ng build` to generate the project build. The project will be created inside the `dist /` directory. Add `--prod` together with the build command to generate minified and ready for the production environment.
