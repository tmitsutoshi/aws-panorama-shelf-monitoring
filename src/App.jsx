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
import { Header, StreamView } from "./Functions";
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
  const [camUris, setCamUris] = useState([]);
  const CamSize = 2;
  const tmpCamUriSet = new Set();

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateShelfMonitor),
    ).subscribe({
      next: (eventData) => {
        const data = eventData.value.data.onUpdateShelfMonitor;
        console.log(data);
        if (data.StreamUri === null) {
          console.log("StreamUri is null");
        }

        const oldSize = tmpCamUriSet.size;
        tmpCamUriSet.add(data.StreamUri);
        if (oldSize === tmpCamUriSet.size) {
          console.log("StreamUriList not changed.");
          return;
        }
        setCamUris([...camUris, data.StreamUri]);

        if (tmpCamUriSet.size >= CamSize){
          console.log("unsubscribe");
          subscription.unsubscribe();
        }
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <Grid container justify="center" alignItems="stretch" spacing={3} xs={12}>
        <Header />
        <CamContext.Provider value={camUris}>
          {
            camUris.map((uri, idx) => {
              return(
                <StreamView camId={idx} camUri={uri} />
              )
            })
          }
        </CamContext.Provider>
      </Grid>
    </div>
  );
}

export default App;
