import React, {useState, useEffect} from "react";
import { Grid, TextField} from "@material-ui/core";
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
    paddingLeft: "31%", 
    marginTop: "15px",
    marginBottom: "20px"
}

function GetCountryNames(){
    const [countryList, setCountryList] = useState([]);
    useEffect(()=>{
        fetch("http://131.181.190.87:3000/countries")
        .then((res)=>res.json())
        .then((data)=> setCountryList(data))
    }, [])
    return countryList;
}


export function YearSelection(props){
    const [year, setYear] = useState("");
    return(
        <Autocomplete
            onInputChange={(event, value)=>{
                if (value.length === 4){
                    setYear(value);
                    props.onInputChange(value);
                }
                if (value === "All" || value === ""){
                    setYear("");
                    props.onInputChange("");
                }
            
            }}
            options = {yearOptions}
            getOptionLabel={(option)=>option.toString()}
            getOptionSelected={(option, value)=> option === value}
            style={{width: 300, display: "inline-block", marginRight: 50}}
            renderInput={(params)=>(
                <TextField {...params} value={year} label="Filter by year" variant="outlined"/>
            )}
        />
    )
}

export function CountrySelection(props){
    // stores country query
    const [country, setCountry]=useState("");
    const countryList = GetCountryNames();
    return(
        <Autocomplete
        options={countryList}
        getOptionSelected={(option, value)=> option === value}
        onInputChange={(event, value)=>{
            if (value==="" || value === "undefined"){
                setCountry("");
                props.onInputChange("");
            } else {
                setCountry(value);
                props.onInputChange(value);
            }
        }}
        style={{width: 300, display: "inline-block", marginRight: 20}}
        renderInput={(params)=>(
            <TextField {...params} value={country} label="Filter by country" variant="outlined"/>
        )}
    />
    )
}
export function Records(){
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [rowData, setRowData] = useState("");
    const [error, setError] = useState("");
    const [hasError, setHasError] = useState("false");

    useEffect(()=>{       
        fetch(`http://131.181.190.87:3000/rankings?year=${selectedYear}&country=${selectedCountry}`)
        .then(res=>res.json())
        .then(data=>data.map(records=>{
            return{
                rank: records.rank,
                country: records.country,
                score: records.score,
                year: records.year
            }
        }))
        .catch(err=>{
            setHasError(true)
            setError(err.message);
        })
        .then(rankings => setRowData(rankings))
    })
    return(
        <div>
            <div>
                <Grid align="center">
                    <h1>Ranking Records</h1>
                    <p>The table below displays the world happiness rankings from 2015 - 2020.</p>
                    <p>Feel free to filter the results by year and/or country: </p>
                    {hasError && <div>{error}</div>}
                    {/* Tested typing in "2014" and "2021" = table shows no data to display */}
                    {/* Tested typing in "2018" and "2019" = table successfully updates content*/}
                    {/* Clicking away from textfield before submitting resets the table */}
                    <YearSelection onInputChange={setSelectedYear}/>
                    <CountrySelection onInputChange={setSelectedCountry}/>
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