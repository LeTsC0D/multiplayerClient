import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
// import { io } from "socket.io-client";
import socketService from "./services/socketService";
import { JoinRoom } from "./components/joinRoom";
import GameContext, { IGameContextProps } from "./gameContext";
import { Game } from "./components/game";
import Login from "./components/Login";

const AppContainer = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
  border-radius: 50%;
  box-shadow: 0 0 6px 4px #fff;
`;

const WelcomeText = styled.h1`
  margin: 0;
  color: #8e44ad;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position:relative;
`;

function App() {
  const [isInRoom, setInRoom] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState<"x" | "o">("x");
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [previousLoginData,setPreviouslogin]=useState(false);

  const connectSocket = async () => {
    await socketService
      .connect("http://localhost:9000")
      .catch((err) => {
        console.log("Error: ", err);
      });
      
  };

  const logout=()=>{
    localStorage.removeItem("tictoe")
  }

  useEffect(() => {
    connectSocket();
  }, []);

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

      <AppContainer>
        <WelcomeText>Welcome to Tic-Tac-Toe</WelcomeText>
        <>
        {
          console.log(isAuth)
          
        }
        {
          console.log(previousLoginData)
        }
      </>
        {(!isAuth && !previousLoginData) && <Login setIsAuth={setIsAuth}/>}
        <MainContainer>
          {(isAuth || previousLoginData) && !isInRoom && <JoinRoom />}
          {(isAuth || previousLoginData) && isInRoom && <Game />}
        </MainContainer>
        <div>
        <button onClick={logout}> Logout</button>
        </div>
      </AppContainer>
    </GameContext.Provider>
  );
}

export default App;
