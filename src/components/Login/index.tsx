import React,{useState } from 'react'

interface setAuthProps {
    setIsAuth: (state: boolean) => void;
}

export default function Login({setIsAuth}: setAuthProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = () => {
    localStorage.setItem("tictoe", JSON.stringify({"username":username,"password":password}));
    //localStorage.setItem("tictoepassword", JSON.stringify(password));
    setIsAuth(true);
    }

  return (
    <div className="login">
      <label> Login</label>
        <br/>
      <input
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <br/>
      <input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <br/>
      <button onClick={login}> Login</button>
    </div>
  )
}
