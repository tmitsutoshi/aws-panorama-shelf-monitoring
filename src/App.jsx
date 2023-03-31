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
import React, { createContext, useEffect } from "react";
import { Header, StreamView } from "./Functions";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { onUpdateShelfMonitor } from "./graphql/subscriptions";

Amplify.configure(awsconfig);

export const StreamContext = createContext();

function App() {

  const CamSize = 2;
  const streamUris = [];

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

        const streamUriSet = new Set([...streamUris, data.StreamUri]);
        if (streamUris.length === streamUriSet.size) {
          console.log("no need to update stream uris list.");
          return;
        }

        streamUris.push(data.StreamUri);

        if (streamUriSet.size >= CamSize){
          console.log("unsubscribe app component.");
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
        <StreamContext.Provider value={streamUris}>
          {
            [...Array(CamSize)].map((v, i) => {
              return(
                <StreamView key={i} streamId={i} />
              )
            })
          }
        </StreamContext.Provider>
      </Grid>
    </div>
  );
}

export default App;
