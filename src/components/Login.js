import React, {useState} from "react";
import {Email, Password, paperStyle} from "./Register";
import {Link, useHistory} from "react-router-dom";
import {Paper, Grid, Button} from "@material-ui/core";

export default function Login(){
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

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
            setErrorMessage(res.message)
        } else {
            // store the token
            localStorage.setItem("token", res.token)
            setErrorMessage("You have successfully logged in")
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
                    <p>{errorMessage}</p>
                </Grid>
            </Paper>
            <Paper elevation={10} style={paperStyle}>
                <p>Haven't signed up yet? <Link to="/register">Register here!</Link></p>
            </Paper>
        </Grid>
    )
}