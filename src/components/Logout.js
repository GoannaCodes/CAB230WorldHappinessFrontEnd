let token = localStorage.getItem("token");
export default function Logout(){
    if ("token" in localStorage && token !== "undefined"){
        localStorage.removeItem("token");
        token="";
    } 
    return(
        <div className="content">
            <h1>Logout</h1>
            <p>You have been logged out.</p>
        </div>
    )
    // if token expires logout here too
    
}