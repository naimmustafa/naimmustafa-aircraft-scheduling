import React from "react";
import MainRouter from "./components/MainRouter";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import reducers from "./redux/reducers";

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
function App() {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
}

export default App;
