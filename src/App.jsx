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
import React, { createContext, useEffect, useState } from "react";
import { Header, Body, InventoryThreshold } from "./Functions";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { onUpdateShelfMonitor } from "./graphql/subscriptions";

Amplify.configure(awsconfig);

export const CamContext = createContext();

function App() {

  const initialState = {
    init: false,
    camUris: [],
  };
  const [camValue, setCamValue] = useState(initialState);

  const CamSize = 2;
  const camUriSet = new Set();

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateShelfMonitor),
    ).subscribe({
      next: (eventData) => {
        const data = eventData.value.data.onUpdateShelfMonitor;
        console.log(data);
        if (data.StreamUris === null) {
          console.log("StreamUris is null");
        }
        camUriSet.add(data.StreamUris);
        if (camUriSet.size == CamSize){
          setCamValue({
            init: true,
            camUris: Array.from(camUriSet),
          });
        }
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <Grid container justify="center" alignItems="stretch" spacing={3} xs={12}>
        <Header />
        <CamContext.Provider value={camValue}>
          <Body camId={0} />
          <InventoryThreshold camId={0}/>
        </CamContext.Provider>
      </Grid>
    </div>
  );
}

export default App;
