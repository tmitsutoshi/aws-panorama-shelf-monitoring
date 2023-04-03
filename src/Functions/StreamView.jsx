/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Grid from "@material-ui/core/Grid";
import React from "react";

import { Body, InventoryThreshold } from ".";


function StreamView(props) {

    return (
        <Grid container item spacing={1} xs={5}>
            <Body key={'b-' + props.streamId} streamId={props.streamId} streamUri={props.streamUri}/>
            <InventoryThreshold  key={'it-' + props.streamId} streamId={props.streamId} streamUri={props.streamUri}/>
        </Grid>
    );
}

export default StreamView;
