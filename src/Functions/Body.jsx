/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React, { useContext, useEffect, useState } from "react";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "../aws-exports";
import { onUpdateShelfMonitor } from "../graphql/subscriptions";
import { StreamContext } from "../App";

Amplify.configure(awsconfig);

const useStyles = makeStyles(() => ({
  image: {
    width: "100%",
    height: "100%",
    margin: "auto",
  },
}));

function Body(props) {
  const classes = useStyles();

  const initialState = {
    StreamUri: "",
    s3Uri: "./default.png",
    count: "",
  };
  const [shelf, setShelf] = useState(initialState);
  const streamContext = useContext(StreamContext);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateShelfMonitor),
    ).subscribe({
      next: (eventData) => {
        if (streamContext.streamUris.length > props.streamId) 
          return ;
        
        const streamUri = streamContext.streamUris[props.streamId];
        const data = eventData.value.data.onUpdateShelfMonitor;
        if (data.StreamUri !== streamUri){
          return;
        }
        console.log(data);
        if (data.s3Uri === null) {
          console.log("streamUri: " + props.streamUri + "null");
        }
        setShelf({
          ...shelf,
          StreamUri: data.StreamUri,
          s3Uri: data.s3Uri,
          count: data.count,
        });
      },
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Grid item xs={12}>
      <Paper>
        <Typography variant="h5" style={{ textAlign: "center", padding: 10 }}>
          Shelf Display : Camera {props.camId + 1}
        </Typography>
        <img src={shelf.s3Uri} alt="Detections" className={classes.image} />

        <Typography variant="h5" style={{ padding: 10, textAlign: "center" }}>
          Count of items:{" "}
          {shelf.count === "" || shelf.count === 9000 ? (
            <em>
              <span style={{ color: "#FF9900" }}>Waiting for items...</span>
            </em>
          ) : (
            shelf.count
          )}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Body;
