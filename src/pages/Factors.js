import React, {useState} from "react";
import {Link} from "react-router-dom";
import {CountrySelection, YearSelection} from "./Records";

const token = localStorage.getItem("token");

function AuthenticatedContent(props){
    const[selectedYear, setSelectedYear] = useState("2015");
    const [selectedCountry, setSelectedCountry] = useState("");
    return(
        <div className="content">
            <h1>Factors</h1>
            <p>You have access to this content</p>
            <YearSelection onInputChange={setSelectedYear} />
            <CountrySelection onInputChange={setSelectedCountry}/>
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
    if ("token" in localStorage && token !== "undefefined"){
        return(
            <AuthenticatedContent/>
        )
    } else {
        return(
            <UnauthenticatedContent/>
        )
    }
}
