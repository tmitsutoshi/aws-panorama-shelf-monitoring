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
import React, { useEffect, useState } from "react";
import { Header, StreamView } from "./Functions";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { onUpdateShelfMonitor } from "./graphql/subscriptions";

Amplify.configure(awsconfig);

function App() {

  const initialState = {
    uris: [],
  };
  const [camUris, setCamUris] = useState(initialState);
  const CamSize = 2;

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

        const tmpCamUriSet = new Set(camUris.uris);
        tmpCamUriSet.add(data.StreamUri);
        if (camUris.uris.length === tmpCamUriSet.size) {
          console.log("StreamUriList not changed.");
          return;
        }
        camUris.uris.push(data.StreamUri)
        setCamUris(camUris);

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
          {
            camUris.uris.map((uri, idx) => {
              return(
                <StreamView camId={idx} camUri={uri} />
              )
            })
          }
      </Grid>
    </div>
  );
}

export default App;
