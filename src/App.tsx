import { Key, useState } from "react";
import Square from "./components/Square";
import { TURNS } from "./constants";
import "./App.css";
import { checkWinner, checkEndGame } from "./logic/board";
import WinnerModal from "./components/WinnerModal";
import { resetGameStorage, saveGameStorage } from "./logic/storage";

function App() {
  // const board = Array(9).fill(null);

  //Desestructuración de TURNS
  const { x, o } = TURNS;

  //Leer el localStorage antes de iniciar el estado
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    if (boardFromStorage) return JSON.parse(boardFromStorage);
    return Array(9).fill(null);
  });

  //Leer el localStorage antes de iniciar el estado
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    turnFromStorage ? turnFromStorage : x;
  });

  // null es q no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null);

  const updateBoard = (index: number) => {
    //No actualizar si la posición tiene algo o si hay un ganador
    if (board[index] || winner) return;

    //Actualizar el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //Cambiar de turno
    const newTurn = turn === x ? o : x;
    setTurn(newTurn);

    //Guardar partida
    saveGameStorage(newBoard, newTurn);

    //Revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      // alert(`Winner: ${newWinner}`);
    }
    //Chequear si el juego terminó
    else if (checkEndGame(newBoard)) {
      setWinner(false); //Empate
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(x);
    setWinner(null);

    //Limpiar localStorage al resetear el juego
    resetGameStorage();
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <section className="game">
        {board.map((square: any, index: Key | null | undefined) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              isSelected={false}
            >
              {square}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square
          updateBoard={undefined}
          index={undefined}
          isSelected={turn === x}
        >
          {TURNS.x}
        </Square>
        <Square
          updateBoard={undefined}
          index={undefined}
          isSelected={turn === o}
        >
          {TURNS.o}
        </Square>
      </section>
      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  );
}

export default App;
