import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField } from '@material-ui/core';
import {playersList} from "../PlayerNames"


export default function HomePage() {
    let history = useHistory();
    const [player, setPlayer] = useState("");
    const [comparePlayer, setComparePlayer] = useState("");
    const [flagger, setFlagger] = useState(false);
    const [compareData, setCompareData] = useState("CF");


    const signOut = () => {
        var token = localStorage.getItem("token");
        var email = localStorage.getItem("email");
        var request = new XMLHttpRequest();
        request.open("POST", "http://127.0.0.1:5000/sign-out", true);
        request.onreadystatechange = function(){
      
            if (this.readyState === 4 && this.status === 200) {
                var parsedRequest = JSON.parse(request.responseText);
            if(parsedRequest.success) {
            history.push("/")                    
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

        var playerComparing = JSON.stringify({
            "player1": player,
            "player2": comparePlayer,
            "compareData": compareData
        });



        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
       
            if (this.readyState === 4 && this.status === 200) {
                localStorage.setItem("WHAT2", "CANCER ");

                var parsedRequest = JSON.parse(xhttp.responseText);

                
                if (parsedRequest.success){
                    localStorage.setItem("Hej", "hallå");

                    setFlagger(true);
                  
                } 

            }
        }

   
     xhttp.open("POST", "http://127.0.0.1:5000/search", true);

    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');


    xhttp.send(playerComparing);
    }
    
    return (
        <div>
            <div>
            <form onSubmit={searchPlayer}>
                <Autocomplete 
                            
                options={playersList}
                getOptionLabel={option => option.player}
                style={{ width: 300 }}
                onChange={(event, selectedValue) => setPlayer(selectedValue.player)}  // You can get the `selectedValue` inside your handler function on every time user select some new value

                renderInput={params => (
                    <TextField {...params}  variant="outlined" fullWidth />
                    )}
                />
                  <Autocomplete 
                            
                            options={playersList}
                            getOptionLabel={option => option.player}
                            style={{ width: 300 }}
                            onChange={(event, selectedValue) => setComparePlayer(selectedValue.player)}  // You can get the `selectedValue` inside your handler function on every time user select some new value
            
                            renderInput={params => (
                                <TextField {...params}  variant="outlined" fullWidth />
                                )}
                            />
                            Position {" "}
                             <select 
                             value={compareData}
            onChange={(e)=> setCompareData(e.target.value)}
           >
           <option value = "CF">Striker</option>
           <option value = "CAM">Attacking mid/winger</option>
           <option value = "CM">Midfielder</option>
           <option value = "FB">Fullbacks</option>
           <option value = "CB">Centre backs</option>
         { // <option value = "GK">Goalkeeper</option>
         }

           
           </select>


                    <input 
                    type="submit"
                    value ="Compare"
                    />
                </form>
                <br />
                {   
                    flagger?(
                        <div>HEJ</div>

                    )
                    :
                    (
                  <div>
                <img src="/testing.png" alt="Logo" className ="chartImg" />

                      </div>
                    )
                }


              
            </div>
            <br /><br /><br />
        <button onClick={signOut}>Sign out</button>            
        </div>
    )
}
