import React, {useState} from "react";
import {Grid, Paper, Button, TextField} from "@material-ui/core";
import {Link} from "react-router-dom";

export const paperStyle={
    padding: "20px 30px",
    width: "300px",
    margin: "30px auto"
}

export function Email(props){
    const[innerEmail, setInnerEmail] = useState("");
    return(
        <TextField 
            label="Email"
            helperText="Enter email"
            type="email"
            value={innerEmail}
            onChange={event=>{
                const {value} = event.target;
                setInnerEmail(value)
                props.onChange(value);
            }}/>
    )
}

export function Password(props){
    const[innerPassword, setInnerPassword] = useState("");
    return(
        <TextField 
            label="Password"
            helperText="Enter password"
            type="password"
            value={innerPassword}
            onChange={event=>{
                const {value} = event.target;
                setInnerPassword(value)
                props.onChange(value);
            }}/>
    )
}

export function Register(){
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = event =>{
        event.preventDefault();

        fetch("http://131.181.190.87:3000/user/register", {
            method:"POST",
            headers:{
                "Content-type":"application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({email: `${email}`, password: `${pass}`})
        })
        .then(res=> res.json())
        // obtain response message
        .then(res => setMessage(res.message))
    }
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <h1 className="form-title">Register</h1>
                    <form onSubmit={handleSubmit}>
                        <Email onChange={setEmail}/>
                        <Password onChange={setPass}/>
                        <Button
                        variant="contained"
                        type="submit"
                        style={{marginTop: "15px" }}
                        color="primary">Create an account</Button>
                        {/* Display response message to user */}
                        <p>{message}</p>
                    </form>
                </Grid>
            </Paper>
            <Paper elevation={20} style={paperStyle} >
                <p>Already have an account? <Link to="/login">Login here!</Link></p>
           </Paper>
        </Grid>
    )
}