import React, { useEffect, useState } from 'react'

import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';
import { Link, Redirect, useHistory } from 'react-router-dom';


export default function LoginPage() {
    let history = useHistory();

    const [flag, setFlag] = useState(false);

    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [userNameReg, setUserNameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [passwordRegx2, setPasswordRegx2] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");



    useEffect(()=> {
     
      
  }, []); // empty array so it only renders once.



 const errorMsg=(message)=>{
   setFlag(true);
}



    function handleSubmit(event) {
        event.preventDefault();


        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var parsedRequest = JSON.parse(xhttp.responseText);
                
                if (parsedRequest.success){
                    console.log(parsedRequest.data)
                    localStorage.setItem("token", parsedRequest.data);
                    localStorage.setItem("email", userName);

                    history.push("/home")                    // Fix login page

                } else {
                    console.log(parsedRequest.message)
                    errorMsg(parsedRequest.message);
                    // Fix error message! 
                }

            }
        };
        xhttp.open("POST", "http://127.0.0.1:5000/sign-in", true);

        xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhttp.send(JSON.stringify({"email": userName, "password": password}));
      



}


      
      
      

      const [isOpen, setIsOpen] = useState(false);

        function toggleModal() {
        setIsOpen(!isOpen);
        }


    return (
        
        <div className = "container">
            <form className="login-form"  onSubmit={handleSubmit}>

        {
            //Login page
        }
         <input type="text" 
         required
         name="username" 
         className = "usern" 
         id="username" 
         placeholder="Username" 
         value={userName}
         onChange={(e) => setUsername(e.target.value)
         }
>
            </input>
            <input type="password"
            required
            className = "passw" 
            name = "password" 
            id="password" 
            placeholder = "Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
                />
            <input className ="loginBtn" type="submit" value="Log in"
            

               

            />

             </form>
            <div>{
                flag?
                <div>Wrong username or password</div>
                :
                <div></div>
                
                }</div>

{
    //Sign up page
}

        <div className ="signUp"> 
        
        <h4>Create an account</h4>
        <button
         onClick = {toggleModal}
        
        >
        Create an account</button>

                        <Modal isOpen={isOpen} 
                                onRequestClose={toggleModal}
                                ariaHideApp={false}>
                
                               <Zoom>
                               <button className="close-modal" onClick={toggleModal}> x </button>

                               <div className = "registerContainer">
                               <form className="register-form" >
                               <input
                                type = "text"
                                required
                                className = "userNameReg" 
                                name = "username" 
                                id="username" 
                                placeholder = "Username"
                                value={userNameReg}
                                onChange={(e) => setUserNameReg(e.target.value)}
                                />
                               
                                <input
                                type = "text"
                                required
                                className = "firstName" 
                                name = "firstName" 
                                id="firstName" 
                                placeholder = "First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                />
                                <input
                                type = "text"
                                required
                                className = "lastName" 
                                name = "lastName" 
                                id="lastName" 
                                placeholder = "Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                />
                                
                            
                                <input
                                type = "text"
                                required
                                className = "email" 
                                name = "email" 
                                id="email" 
                                placeholder = "Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                />
                                  <input
                                type = "password"
                                required
                                className = "passwordReg" 
                                name = "passwordReg" 
                                id="passwordReg" 
                                placeholder = "Password"
                                value={passwordReg}
                                onChange={(e) => setPasswordReg(e.target.value)}
                                />

                                <input
                                type = "password"
                                required
                                className = "passwordRegx2" 
                                name = "passwordRegx2" 
                                id="passwordRegx2" 
                                placeholder = "Repeat your password"
                                value={passwordRegx2}
                                onChange={(e) => setPasswordRegx2(e.target.value)}
                                />
                                
                                <input 
                                type="submit"
                                value="Register"
                                className ="signUpBtn"
                                onClick={async () => {
                                    var newUser = ({
                                        "username": userNameReg,
                                        "email": email,
                                        "password": passwordReg,
                                        "password2": passwordRegx2,
                                        "firstname": firstName,
                                        "lastname": lastName,
                                      });
                                if (passwordReg === passwordRegx2) {
                                    if (userNameReg !== "" && email !== "" && firstName !== "" && lastName !== "")
                                    {
                                        const response = await fetch("http://127.0.0.1:5000/sign-up", {
                                            method: "POST",
                                            headers: {
                                            'Content-Type' : 'application/json'
                                            },
                                            body: JSON.stringify(newUser)
                                            })
                                            if (response.success){
                                            console.log("it worked")
                                            }
                                            else {
                                                console.log("fields are empty");
                                            }
                                    }
                                   
                                } else {
                                    console.log("Passwords does not match")
                                    }
                                
                            
                            }
                        }
                                />
                                </form>
                               </div>
                            
                            

                               </Zoom>

                               </Modal>


        </div>

         
        </div>
    )
}

