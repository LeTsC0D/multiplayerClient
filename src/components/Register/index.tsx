import React,{useState } from 'react'
import {
  Button,Input
} from 'reactstrap';
import { useNavigate} from 'react-router-dom';

interface setAuthProps {
    setOpen:(state: boolean)=>void;
}


export default function Register({setOpen}: setAuthProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();
    const navigateToLogin = () => {
      // 👇️ navigate to /login
      setOpen(true)
      navigate('/login');
    };


  return (

    <div >
      
       
      <Input
        placeholder="Your Name" value={name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      /> 
      <br/>
      <Input
        placeholder="Username" value={username}
        type="password"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <br/>
      <Input
        placeholder="Email" value={email}
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      /> 
      <br/>
      <Input 
        placeholder="Password" value={password}
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <br/>      
      <Button onClick={navigateToLogin}> Register</Button>
    </div>
  
  )
}
