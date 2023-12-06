# QU Beyond - Web Developer Challenge

This project is a simple web application that fetches and displays data from the Star Wars API (SWAPI). It uses React, TypeScript, and Redux for state management. The application fetches data about planets from the SWAPI and displays it in a table. The table can be sorted by planet name, population, or climate.

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Prerequisites

- Node.js and npm installed on your machine. You can download Node.js from their [official website](https://nodejs.org/en/download/).

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the dependencies by running `npm install`.

### Running the Application

In the project directory, you can run:

- `npm start`: Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.

- `npm test`: Launches the test runner in the interactive watch mode.

- `npm run build`: Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!

- `npm run eject`: Note: this is a one-way operation. Once you `eject`, you can’t go back!

For more information, refer to the scripts section in the `package.json` file:

```
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
}
```

## Challenge Questions

1. **What's a closure? Where in the code is there a closure?**

A closure is a function that has access to its own scope, the outer function's scope, and the global scope. It's a function that's defined inside another function and has access to variables that are declared and defined in the parent function. In JavaScript, closures are created every time a function is created, at function creation time.

In this code, a closure is used in the `useAppLogic` hook in the `src/hooks/useAppLogic/index.ts` file. The `handleSortKeyChange` function is a closure because it's a function defined inside another function and it has access to the `setSortKey` function and `sortKey` state from the outer scope.

2. **Which are the potential side-effects in any function? Could you point out any of these cases in your code? Are they expected? Can they be avoided?**

Side effects in a function occur when the function modifies some state or has an observable interaction with its calling functions or the outside world besides returning a value. Examples of side effects include modifying a global object or a parameter passed by reference, writing data to a database, making a network request, changing the DOM in a web page, writing to a file, etc.

In this code, one example of a function with a potential side effect is the `fetchPlanets` function in the `src/api/planetsApi.ts` file. This function makes a network request to an API, which is a side effect. This side effect is expected and cannot be avoided because we need to fetch data from an external API.

Another example is the `handleRowClick` function in the `src/components/Planet/index.tsx` file. This function dispatches an action to the Redux store, which is a side effect. This side effect is expected and cannot be avoided because we need to fetch data about the residents of a planet when a row in the table is clicked.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
