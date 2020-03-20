# ekonik-app

## React

- CRA
- TypeScript
- hooks
- Global state: context
- CSS: Global + BEM in components (moible first)
- Routing: React Router
- Testing: JEST, Cyperss (as an extra)
- Prettier
- Structure (components, pages, ComponentName, Register/Register.js Register.scss, Register.test.js)

## Workflow

- master = prod
- uat
- dev
- feature/register
- fix/register

## Enviroments

Project uses 2 enviroments:

- uat (release/uat branch)
- production (release/master branch)

### Local development:

http://ekonik-dev-local.squiz.pl:3000

You need to configure your hosts:

```
127.0.0.1 ekonik-dev-local.squiz.pl
```

### Web:

UAT: https://ekonik-uat-web.squiz.pl/

PROD: https://www.trafonline.pl/

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Build notes

**Please do not push source maps to production/uat!**

There are 2 configuration files for each of the enviroments
.env.uat
.env.production

Each of these enviroments has a different GitBridge asset id and git bridge server folder.
Both of these variables are set in enviroment configurations mention above.

Required variables before to build the projects are:
MTX_GIT_BRIDGE_ASSET_ID=8895 (Id of git bridge used in specific enviroment)
MTX_GIT_BRIDGE_SERVER_FOLDER=0030 (dynamic folder name where git bridge keeps the data on the server)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run build:uat`

Build the app for uat enviroment.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
