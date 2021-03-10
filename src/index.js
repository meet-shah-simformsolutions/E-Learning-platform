import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk"
import { AuthProvider } from "./contexts/AuthContext";
import cartDetails from "./store/reducers/priceReducer"
// const composeEnhancers = process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose;
const rootReducer = combineReducers({
cartDetails:cartDetails
})
// const store = createStore(rootReducer, composeEnhancers(
//   applyMiddleware(thunk)
// ));
const store = createStore(rootReducer, 
  applyMiddleware(thunk)
);
// const store  = createStore(rootReducer)
ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <App />
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
