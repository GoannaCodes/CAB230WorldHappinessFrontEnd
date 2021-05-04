import React, {useState} from "react";
import {Link} from "react-router-dom";

const token = localStorage.getItem("token");

function AuthenticatedContent(props){
    const[selectedYear, setSelectedCountry] = useState("2015");
    return(
        <div>
            <h1>Factors</h1>
            <p>You have access to this content</p>
        </div>
    )
}

function UnauthenticatedContent(props){
    return(
        <div>
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
