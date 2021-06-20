import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';

export default function HomePage() {
    let history = useHistory();
    const [player, setPlayer] = useState("");

    const signOut = () => {
        var token = localStorage.getItem("token");
        var email = localStorage.getItem("email");
        var request = new XMLHttpRequest();
        request.open("POST", "http://127.0.0.1:5000/sign-out", true);
        request.onreadystatechange = function(){
      
            if (this.readyState === 4 && this.status === 200) {
                var parsedRequest = JSON.parse(request.responseText);
            if(parsedRequest.success) {
            history.push("/")                    // Fix login page
            localStorage.removeItem("token");
          localStorage.removeItem("email");
        }
      }
      }
      request.setRequestHeader('Content-type','application/json; charset=utf-8');
      request.setRequestHeader("token", token);
      
      request.send(JSON.stringify({"email": email}));
      
    }

    const searchPlayer = ()=> {
        var request = new XMLHttpRequest();
        request.open("POST", "http://127.0.0.1:5000/search", true);
        request.onreadystatechange = function(){

        }
        request.setRequestHeader('Content-type','application/json; charset=utf-8');
        request.setRequestHeader("player", player);
        
        request.send(JSON.stringify({"player": player}));
    }

    return (
        <div>
            <div>
                <form onSubmit={searchPlayer}>
                <input type="text" 
                 placeholder="Search player"

                onChange={(e) => setPlayer(e.target.value)}
                            />
                <input type="submit" value="Search" />
                </form>
              
            </div>
            <br /><br /><br />
        <button onClick={signOut}>Sign out</button>            
        </div>
    )
}
