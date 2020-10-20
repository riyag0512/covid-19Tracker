
import React from 'react';
import "./InfoBox.css";
import {Card , CardContent, Typography }from "@material-ui/core";
function InfoBox({title,cases, isRed ,active ,total, ...props}) {
    return (
        <Card onClick={props.onClick}
        className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
            <CardContent>

            <Typography color="textSecondary" className="infoBox_title">   
                {title}
            </Typography>
            <h2 className={`infoBox_cases ${!isRed && 'infoBox_cases--green'}`}>{cases} </h2>
            <Typography className="infoBox_total" color="textSecondary">
                {total}Total            </Typography>
          
          
            </CardContent>
            
        </Card>
    )
}

export default InfoBox
 
