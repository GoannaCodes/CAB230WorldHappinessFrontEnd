import React, {useState} from "react";
import {Email, Password, paperStyle} from "./Register";
import {Link, useHistory} from "react-router-dom";
import {Paper, Grid, Button} from "@material-ui/core";
import {errorMessageStyle} from "../pages/Records";

export const successStyle={
    color: "green",
    marginTop: "10px",
    fontWeight: "bold"
}
export default function Login(){
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [message, setMessage] = useState("");
    const [hasError, setHasError] = useState(false);

    const handleSubmit = event =>{
        event.preventDefault();
        localStorage.clear();
        fetch(`http://131.181.190.87:3000/user/login`, {method:"POST", 
        headers:{
            "Content-type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({email: `${email}`, password: `${pass}`})
    }).then(res => 
        res.json())
    .then(res => {
        // if there is an error message, store it
        if (res.message){
            setHasError(true)
            setMessage(res.message)
        } else {
            setHasError(false)
            // store the token
            localStorage.setItem("token", res.token)
            setMessage("You have successfully logged in")
        }
    })}
  

    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <h1 className="form-title">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <Email onChange={setEmail}/>
                        <Password onChange={setPass}/>
                        <Button
                        variant="contained"
                        type="submit"
                        id="login-button"
                        style={{marginTop: "15px", marginLeft: "24.8px"}}
                        color="primary">Login</Button>
                    </form>
                    {hasError && <div style={errorMessageStyle}>{message}</div>}
                    {/* Should only show successful login message */}
                    {!hasError && <div style={successStyle}>{message}</div>}
                </Grid>
            </Paper>
            <Paper elevation={10} style={paperStyle}>
                <p>Haven't signed up yet? <Link to="/register">Register here!</Link></p>
            </Paper>
        </Grid>
    )
}