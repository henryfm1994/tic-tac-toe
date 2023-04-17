import { WINNER_COMBOS } from "../constants";

export const checkWinner = (boardtoCheck: any[]) => {
  //Chequear las combinaciones ganadoras
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardtoCheck[a] &&
      boardtoCheck[a] === boardtoCheck[b] &&
      boardtoCheck[a] === boardtoCheck[c]
    ) {
      return boardtoCheck[a];
    }
  }
  return null;
};

export const checkEndGame = (newBoard: any[]) => {
  //Revisar si todas las posiciones están llenas
  return newBoard.every((square) => square !== null);
};
