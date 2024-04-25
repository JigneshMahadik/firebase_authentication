// import logo from './logo.svg';
import './App.css';
import app from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

function App() {
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const auth = getAuth();

  async function handleRegister(){
    const em = document.getElementById("email").value;
    const pwd = document.getElementById("pwd").value;
    try{
      const res = await createUserWithEmailAndPassword(auth, em, pwd);
      alert("Register Successfull.")
      const reg = document.getElementById("register");
      reg.style.display = "none";
      const login = document.getElementById("login");
      login.style.display = "block";
    }
    catch(e){
      alert("Error...!",e);
      console.error("Error...!",e);
    }
  }

  async function handleLogin(){
    const em = document.getElementById("login-email").value;
    const pwd = document.getElementById("login-password").value;
    try{
      const res = await signInWithEmailAndPassword(auth, em, pwd);
      alert("Login Successfull.")
      const reg = document.getElementById("register");
      reg.style.display = "none";
      const login = document.getElementById("login");
      login.style.display = "none";
      setEmail(em);
    }
    catch(e){
      alert("Error...!",e);
      console.error("Error...!",e);
    }
  }

  function redirectToLogin(){
    const reg = document.getElementById("register");
    reg.style.display = "none";
    const login = document.getElementById("login");
    login.style.display = "block";
  }

  return (
    <div className="App">
      <div id='register' style={{backgroundColor:"turquoise"}}>
        <h2>Register</h2>
        <input type="email" id="email" placeholder="E-mail"/><br></br><br></br>
        <input type="password" id="pwd" placeholder="Password"/><br></br><br></br>
        <button onClick={handleRegister}>Register</button><br></br><br></br>
        <p>Already Registered ?</p>
        <p style={{cursor:"pointer"}} onClick={redirectToLogin}>Login</p>
      </div>

      {/* Login Page */}
      <div id="login" style={{backgroundColor:"wheat"}}>
        <h2>Login</h2>
        <input type="email" id="login-email" placeholder='E-mail' /><br></br><br></br>
        <input type="password" id="login-password" placeholder='Password' /><br></br><br></br>
        <button onClick={handleLogin}>Login</button>
      </div>

      {
        email ? <h3 style={{marginTop:"10rem", color:"green", fontFamily:"cursive", textDecorationLine:""}}>Welcome, {email}</h3> : <p></p>
      }
    </div>
  );
}

export default App;
