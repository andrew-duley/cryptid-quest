import React, { useState } from 'react';

import PageTemplate from '../../layout/PageTemplate';
import Block from '../../layout/Block';
import PageFooter from '../../layout/PageFooter';

import '../a11y/index.scss';
import './styles/index.scss';

const newBoard = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ];

  const winCheck = (copiedBoard) => {
    const rows = copiedBoard.length;
    const cols = copiedBoard[0].length;

    for (let r = 0; r < rows; r ++) {
      for (let c = 0; c < cols; c ++) {

        const value = copiedBoard[r][c];
        if (!value) continue;

        if (c + 3 < cols && value === copiedBoard[r][c+1] && value === copiedBoard[r][c+2] && value === copiedBoard[r][c+3]) {
          return true;
        }

        if (r + 3 < rows && value === copiedBoard[r+1][c] && value === copiedBoard[r+2][c] && value === copiedBoard[r+3][c]) {
          return true;
        }

        if (r + 3 < rows && c + 3 < cols && value === copiedBoard[r+1][c+1] && value === copiedBoard[r+2][c+2] && value === copiedBoard[r+3][c+3]) {
          return true;
        }

        if (r + 3 < rows && c > 2 && value === copiedBoard[r+1][c-1] && value === copiedBoard[r+2][c-2] && value === copiedBoard[r+3][c-3]) {
          return true;
        }
      }
    } return false;
  }

export default function LongfireFour() {

  const [board, setBoard] = useState(newBoard.map(row => row.slice()));
  const [playerTurn, setPlayerTurn] = useState("Player 1");
  const [playerWin, setPlayerWin] = useState(null);

  const playerMove = (columnIndex, player) => {

    const copiedBoard = board.map(row => row.slice());

    for (let i = 5; i >= 0; i--) {

      if (board[i][columnIndex] === null) {
        copiedBoard[i][columnIndex] = player;
        setBoard(copiedBoard)
       
        const didWin = winCheck(copiedBoard);

        if (didWin) {
          setPlayerWin(player);
          return;
        }

        player === "Player 1" ? setPlayerTurn("Player 2") : setPlayerTurn("Player 1");

        break;
      }
    }
    
  }

  const resetGame = () => {
    setBoard(newBoard.map(row => row.slice()));
    setPlayerTurn("Player 1");
    setPlayerWin(null);
  }


  return (
    <PageTemplate slug="longfire-four" title="Longfire Four" 
    className="longfire-four">

      <Picture 
        imagePath="https://media.cryptid.quest/the-crypt/game-backgrounds/longfire-four/longfire-four-"
        imageWidths={IMAGE_WIDTHS_BACKGROUND}
        className = "longfire-four__background" 
        imgClassName = "longfire-four__background-img"
        loading="eager"
        fetchPriority="high"
      />

      <Block label="Board">

        <div className="longfire-four__drop-zone">
          {board[0].map((__, idx) => {
          return <div key={idx} className={playerWin ? "longfire-four__drop-zone-cell no-click" : "longfire-four__drop-zone-cell"} onClick={() => playerMove(idx, playerTurn)}></div>
        })}
        </div>

        <div className="longfire-four__board">
          {board.map((row, rowIndex) => {
          return <div key={rowIndex} className={"longfire-four__row"}>{row.map((cell, columnIndex) => {
            return <div key={`${rowIndex}-${columnIndex}`} className="longfire-four__cell">{cell}</div>;
          })}</div>
        })}

        <div className="longfire-four__ui">
          <div className="longfire-four__reset">
            <button className="btn" type="button" onClick={resetGame}>Reset</button>
          </div>
          <div className="longfire-four__winner">{playerWin ? `${playerWin} wins!` : ''}</div>

        </div>
        </div>
        
      </Block>

      <PageFooter />
    </PageTemplate>
  );
}