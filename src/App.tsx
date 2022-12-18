import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import socketService from "./services/socketService";
import { JoinRoom } from "./components/joinRoom";
import GameContext, { IGameContextProps } from "./gameContext";
import { Game } from "./components/game";
import Login from "./components/Login";
import {
  Button
} from 'reactstrap';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Register from "./components/Register";

const WelcomeText = styled.h1`
  margin: 0;
  color: #8e44ad;
  `;

const Mobile = styled.div`
  height: 100vh;
  width: 30vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:#D3D3D3;
  flex-direction: column;
  border-radius: 30px;
  `;



function App() {
  const [isInRoom, setInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<"x" | "o">("x");
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [previousLoginData,setPreviouslogin]=useState(false);
  const [open,setOpen]=useState(false)

  const connectSocket = async () => {
    // eslint-disable-next-line
    await socketService
      .connect("http://localhost:9000")
      .catch((err) => {
        console.log("Error: ", err);
      });   
  };


  const navigate = useNavigate();
  const navigateToLogin = () => {
    // 👇️ navigate to /login
    setOpen(true)
    navigate('/login');
  };

  const navigateToRegister = () => {
    // 👇️ navigate to /register
    setOpen(true)
    navigate('/register');
  };

  useEffect(() => {
    connectSocket();
  }, []);

  // useEffect(() => {
  //   setOpen(false)
  // },[]);


  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    const userPreviousLoginInfo=localStorage.getItem("tictoe")
    console.log(userPreviousLoginInfo)
    setPreviouslogin(userPreviousLoginInfo!=null?true:false)
  })

  const gameContextValue: IGameContextProps = {
    isInRoom,
    setInRoom,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
  };

  return (
    <GameContext.Provider value={gameContextValue}>

      {/* <AppContainer> */}
      <center>
      <Mobile>
        
          
          <WelcomeText>Welcome to Tic-Tac-Toe</WelcomeText>
            <>
            {
              console.log(isAuth)
              
            }
            {
              console.log(previousLoginData)
            }
          </>            
          {/* {(!isAuth && !previousLoginData) && <Login setIsAuth={setIsAuth}/>} */}
          {/* <MainContainer> */}
            {/* {(isAuth || previousLoginData) && !isInRoom && <JoinRoom />} */}
            {(isAuth || previousLoginData) && isInRoom && <Game />}
          {/* </MainContainer> */}
          {
          !open && <div> 
          <Button style={{alignItems:"center",marginTop:50,position:"relative"}} onClick={navigateToLogin}> Login</Button>
          <br/><Button style={{alignItems:"center",marginTop:50,position:"relative"}} onClick={navigateToRegister}> Register</Button>
          </div>
            }

       
        <Routes>
        
          <Route path="/login" element={<Login setIsAuth={setIsAuth} setOpen={setOpen}/>} />
          <Route path="/register" element={<Register setOpen={setOpen}/>} />
          <Route path="/joinroom" element={<JoinRoom />} />
        </Routes>

        </Mobile>
        </center>

      {/* </AppContainer> */}
    </GameContext.Provider>
  );
}

export default App;
