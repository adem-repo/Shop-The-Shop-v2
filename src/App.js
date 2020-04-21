import React, { useReducer } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import Shop from "./components/Shop/Shop";
import SignInModal from "./components/Modals/SignInModal";
import EditProductModal from "./components/Modals/EditProductModal";

import { AppContext } from "./store/appContext";
import { reducer, initialState } from "./store/reducer";
import "./App.scss";

function App() {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ store, dispatch }}>
      <div className="app">
        <Router>
          <Header />
          <Grid container spacing={1}>
            <Switch>
              <Route path="/" exact component={MainPage} />
              {store.signedIn ? (
                <Route path="/shop" component={Shop} />
              ) : (
                <Redirect to="/" />
              )}
            </Switch>
          </Grid>
        </Router>
        <div>
          <SignInModal />
          <EditProductModal />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
