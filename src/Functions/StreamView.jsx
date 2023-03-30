/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Grid from "@material-ui/core/Grid";
import React from "react";

import { Body, InventoryThreshold } from ".";

function StreamView(props) {
    return (
        <Grid container item xs={5} spacing={1}>
            <Body camId={props.camId} />
            <InventoryThreshold camId={props.camId} />
        </Grid>
    );
}

export default StreamView;
