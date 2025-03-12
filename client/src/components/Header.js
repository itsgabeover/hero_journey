import { useState, useEffect } from "react";


function Header({ user }) {
    const [ userName, setUserName ] = useState("")
    useEffect(() => {
   // auto-login
   if (user) {
    setUserName(user.username);
    console.log("resetting username", user);
   }
        
    }, [user]);

    
    return (
        <>
            <h3 className="header">
                Welcome, {userName ? userName : "Hero"}
            </h3>
        </>
    )
  }
  
  export default Header;