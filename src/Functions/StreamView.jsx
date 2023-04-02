/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Grid from "@material-ui/core/Grid";
import React, { useContext, useEffect, useState } from "react";

import { Body, InventoryThreshold } from ".";


function StreamView(props) {

    return (
        <Grid container item xs={5} spacing={1}>
            <Body streamUri={props.streamUri}/>
            <InventoryThreshold streamUri={props.streamUri}/>
        </Grid>
    );
}

export default StreamView;
