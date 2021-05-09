import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {yearOptions} from "./Records";
import {Grid, Select, MenuItem} from "@material-ui/core";
import {AgGridReact} from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

let token = localStorage.getItem("token");

const tableStyles = {
    height: "500px",
    width: "1000px",
    marginTop: "15px",
    paddingLeft: 450
}
const columns = [
    {headerName: "Rank", field: "rank"}, 
    {headerName: "Country", field: "country"}, 
    {headerName: "Score", field: "score"}, 
    {headerName: "Economy", field: "economy"},
    {headerName: "Family", field: "family"},
    {headerName: "Health", field: "health"},
    {headerName: "Freedom", field: "freedom"},
    {headerName: "Generosity", field: "generosity"},
    {headerName: "Trust", field: "trust"}
]

function AuthenticatedContent(props){
    const[selectedYear, setSelectedYear] = useState("2015");
    const [rowData, setRowData] = useState([]);

    useEffect(()=>{
        token = localStorage.getItem("token");
        fetch(`http://131.181.190.87:3000/factors/${selectedYear}?limit=15`, {headers:{
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
        })
        .then(res => res.json())
        .then((data)=>data.map(records=>{
            return{
                rank: records.rank,
                country: records.country,
                score: records.score,
                economy: records.economy,
                family: records.family,
                health: records.health,
                freedom: records.freedom,
                generosity: records.generosity,
                trust: records.trust
            }
        }))
        .then(factors => setRowData(factors))
    })
    
    return(
        <div className="content">
            <h1>Factors</h1>
            <p>Below are the country ratings with their assosciated happiness-related factor scores.</p>
            <Grid align="center" style={{display: "flex", justifyContent: "center"}}>
                <p>Currently showing happiness factors for: </p>
                <Select
                    value= {selectedYear}
                    label="Year"
                    onChange = {(event)=>{setSelectedYear(event.target.value)}}
                    style={{width: 80, marginLeft: "25px"}}
                >   
                {yearOptions.map((year)=>{
                    return(
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                    )
                })}
                </Select>
               
            </Grid>
            <div className="ag-theme-balham" style={tableStyles}>
                <AgGridReact 
                    columnDefs={columns}
                    rowData={rowData}
                />
            </div>
        </div>
    )
}

function UnauthenticatedContent(props){
    return(
        <div className="content">
            <h1>Factors</h1>
            <p>You need to <Link to="/login">login</Link> to access this content</p>
        </div>
    )
}

export default function Factors(){
    if ("token" in localStorage && token !== "undefined"){
        return(
            <AuthenticatedContent />
        )
    } else {
        return(
            <UnauthenticatedContent/>
        )
    }
}
