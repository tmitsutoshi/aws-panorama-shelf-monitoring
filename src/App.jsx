/* eslint-disable react/react-in-jsx-scope */
// import logo from './logo.svg';
import "./App.css";

import "@fontsource/roboto";
// import { Button, Input, FormControl, Select, MenuItem, Link } from '@material-ui/core';
// import { withStyles, lighten } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import LinearProgress from '@material-ui/core/LinearProgress';
import React, { createContext, useEffect, useReducer } from "react";
import { Header, StreamView } from "./Functions";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { onUpdateShelfMonitor } from "./graphql/subscriptions";

Amplify.configure(awsconfig);

export const StreamContext = createContext();

function App() {

  const CamSize = 2;
  const [streamUris, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateShelfMonitor),
    ).subscribe({
      next: (eventData) => {
        const data = eventData.value.data.onUpdateShelfMonitor;
        dispatch([data, subscription]);
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  function reducer(state, [data, subscription]) {
    console.log(data);
    if (data.StreamUri === null) {
      console.log("StreamUri is null");
    }
  
    const streamUriSet = new Set([...state, data.StreamUri]);
    if (state.length === streamUriSet.size) {
      console.log("no need to update stream uris list.");
      return;
    }

    if (streamUriSet.size >= CamSize) {
      subscription.unsubscribe();
    }
  
    return [...state, data.StreamUri];
  }

  return (
    <div>
      <Grid container justify="center" alignItems="stretch" spacing={3} xs={12}>
        <Header />
        <StreamContext.Provider value={streamUris}>
          {
            streamUris.map((v, i) => {
              return(
                <StreamView key={i} streamUri={v}/>
              )
            })
          }
        </StreamContext.Provider>
      </Grid>
    </div>
  );
}

export default App;
