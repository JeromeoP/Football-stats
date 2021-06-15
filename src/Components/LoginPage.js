import React, { useState } from 'react'

import Zoom from 'react-reveal/Zoom';
import Modal from 'react-modal';


export default function LoginPage() {

    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [userNameReg, setUserNameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [passwordRegx2, setPasswordRegx2] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");




    function handleSubmit(event) {
        event.preventDefault();
        console.log(email);
      }
      
      function handleSubmitRegister(event) {
          if(passwordReg.length>6) {
            if (passwordReg === passwordRegx2) {
                console.log("success!")
                event.preventDefault();
    
              }else {
                  console.log("Your passwords does not match");
              }
          } else {
              console.log("Password is too short");
          }
         
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
         tabindex="1" 
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
            tabindex="2" 
            placeholder = "Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
                />
            <input className ="loginBtn" type="submit" value="Log in" />
             </form>

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
                               <form className="register-form"  onSubmit={handleSubmitRegister}>
                               <input
                                type = "text"
                                required
                                className = "userNameReg" 
                                name = "username" 
                                id="username" 
                                tabindex="1" 
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
                                tabindex="2" 
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
                                tabindex="3" 
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
                                tabindex="4" 
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
                                tabindex="5" 
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
                                tabindex="6" 
                                placeholder = "Repeat your password"
                                value={passwordRegx2}
                                onChange={(e) => setPasswordRegx2(e.target.value)}
                                />
                                
                                <input 
                                type="submit"
                                value="Register"
                                className ="signUpBtn"
                                />
                                </form>
                               </div>
                            
                            

                               </Zoom>

                               </Modal>


        </div>

         
        </div>
    )
}

