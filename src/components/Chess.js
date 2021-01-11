import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { ChessInstance, ShortMove } from "chess.js";

const ChessGame = require("chess.js");

export const Chess = () => {

  const [chessGame] = useState(
    new ChessGame("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
  )

  const [fen, setFen] = useState(chessGame.fen());

  const handleMove = (move: ShortMove) => {
    if ( chessGame.move(move)) {
      setTimeout(() => {
        const moves = chessGame.moves()

        if (moves.length > 0) {
          const computerMove = moves[Math.floor(Math.random() * moves.length)]
          chessGame.move(computerMove)
          setFen(chessGame.fen())
        }
      }, 300)

      setFen(chessGame.fen())
    }
  }

  return (
    <div className="flex-center">
      <h1>The Pawn's Gambit Chess</h1>
      <Chessboard
        width={400}
        position={fen}
        onDrop={(move) => handleMove({from: move.sourceSquare, to: move.targetSquare, promotion: "q"})}
      />
    </div>
  )
};
