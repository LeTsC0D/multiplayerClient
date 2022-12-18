import React,{useState } from 'react'
import {
  Button,Input
} from 'reactstrap';
import { useNavigate} from 'react-router-dom';

interface setAuthProps {
    setIsAuth: (state: boolean) => void;
    setOpen:(state: boolean)=>void;
}



export default function Login({setIsAuth,setOpen}: setAuthProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const login = () => {
    localStorage.setItem("tictoe", JSON.stringify({"username":username,"password":password}));
    //localStorage.setItem("tictoepassword", JSON.stringify(password));
    setIsAuth(true);
    setOpen(true)
    navigate('/joinroom');
    }

  return (

    <div >
      
       
      <Input
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      /> 
      <br/>
      <Input
        placeholder="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <br/>
      <Button onClick={login}> Login</Button>
    </div>
  
  )
}
