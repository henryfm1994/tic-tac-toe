import Square from "./Square";

function WinnerModal({ winner, resetGame }: { winner: any; resetGame: any }) {
  if (winner === null) return null;

  return (
    <section className="winner">
      <div className="text">
        <h2>{winner === false ? "Empate" : "Ganó " + winner}</h2>
        <header>
          {winner && (
            <Square
              isSelected={false}
              updateBoard={undefined}
              index={undefined}
            >
              {winner}
            </Square>
          )}
        </header>
        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
}
export default WinnerModal;
