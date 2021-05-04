import React, {useState, useEffect} from "react";
import {Select, MenuItem, Grid, TableContainer, TextField} from "@material-ui/core";
import {Autocomplete} from '@material-ui/lab'
import {AgGridReact} from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

let yearOptions= ["All", "2015", "2016", "2017", "2018", "2019", "2020"]

const columns = [
    {headerName: "Rank", field: "rank"}, 
    {headerName: "Country", field: "country"}, 
    {headerName: "Score", field: "score"}, 
    {headerName: "Year", field: "year"}
]

const tableStyles = {
    height:"635px",
    width: "700px",
    paddingLeft: "34.7%", 
    marginTop: "15px"
}


export function Records(){
    const [selectedYear, setSelectedYear] = useState("");
    const [rowData, setRowData] = useState("");
    const [error, setError] = useState("");
    const [hasError, setHasError] = useState("false");

    useEffect(()=>{
        let url=`http://131.181.190.87:3000/rankings`;
        if(selectedYear!== ""){
            url+= `?year=${selectedYear}`
            // set it back to normal
        }else if (selectedYear === "All" || selectedYear === ""){
            url=`http://131.181.190.87:3000/rankings`
        }

        fetch(url)
        .then(res=>res.json())
        .catch(err=>{
            setHasError(true)
            setError(err.message);
        })
        .then(data=>data.map(records=>{
            return{
                rank: records.rank,
                country: records.country,
                score: records.score,
                year: records.year
            }
        }))
        .then(rankings => setRowData(rankings))
    })
    return(
        <div>
            <div>
                <h1>Ranking Records</h1>
                <Grid align="center">
                    {/* <YearSelection onInputChange={setSelectedYear}/> */}
                    <Autocomplete
                            className="year-selection"
                            onInputChange = {(event, value)=>{
                                // only change if 4 characters have been inputted
                                if (value.length === 4){
                                    setSelectedYear(value);
                                }
                                if (value === "All" || value===""){
                                    setSelectedYear("");
                                }
                            }}
                            options={yearOptions}
                            getOptionLabel={(option)=>option.toString()}
                            getOptionSelected={(option, value) => option === value}
                            style={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Filter records by year" variant="outlined" />
                            )}
                        />
                </Grid>
            </div>
            <div className="ag-theme-balham" style={tableStyles}>
                <AgGridReact
                    suppressHorizontalScroll
                    columnDefs={columns}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={20}
                />
            </div>
        </div>
    )
}