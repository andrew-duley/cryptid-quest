import React, { useState } from 'react';

import PageTemplate from '../../layout/PageTemplate';
import Block from '../../layout/Block';
import PageFooter from '../../layout/PageFooter';

import '../a11y/index.scss';
import './styles/index.scss';

export default function LongfireFour() {

  const newBoard = [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ]

  const dropPiece = (columnIndex, player) => {
    const copiedBoard = board.map(row => row.slice());
    for (let i = 5; i >= 0; i--) {
      if (board[i][columnIndex] === null) {
        // Drop that player's piece
        // Set that location in the array to that player's number
        copiedBoard[i][columnIndex] = player;
        setBoard(copiedBoard)
        playerTurn === "Player 1" ? setPlayerTurn("Player 2") : setPlayerTurn("Player 1");
        let horCheck = 1;
        let verCheck = 1;
        for (let j = 0; j < 6; j ++) {
          // if (copiedBoard[i][j] !== null && copiedBoard[i][j] === copiedBoard[i][j + 1]) {
          //   horCheck ++
          //   if (horCheck === 4) {
          //     // Call win func
          //     console.log('You win!')
          //   }
          // } else {
          //   horCheck = 1;
          // }
          if (copiedBoard[i][columnIndex] !== null && copiedBoard[5][columnIndex] === copiedBoard[5 - 1][columnIndex]) {
            verCheck ++
            console.log(verCheck)
            if (verCheck === 4) {
              // Call win func
              console.log('You win!')
            }
          } else {
            verCheck = 1;
          }
        }
        break;
      }
    }
    
  }

  const [board, setBoard] = useState(newBoard);
  const [playerTurn, setPlayerTurn] = useState("Player 1");


  return (
    <PageTemplate slug="longfire-four" title="Longfire Four" className="longfire-four">

      <Block label="Board">

        <div className="longfire-four__drop-zone">
          {board[0].map((__, idx) => {
          return <div key={idx} className="longfire-four__drop-zone-cell" onClick={() => dropPiece(idx, playerTurn)}></div>
        })}
        </div>

        <div className="longfire-four__board">
          {board.map((row, rowIndex) => {
          return <div key={rowIndex} className="longfire-four__row">{row.map((cell, columnIndex) => {
            return <div key={`${rowIndex}-${columnIndex}`} className="longfire-four__cell">{cell}</div>;
          })}</div>
        })}
        </div>
        
      </Block>

      {/* <Block title="" className="">
        <div className="">
          <button className="" type="" onClick={}>
            Reset game
          </button>
        </div>
      </Block> */}

      <PageFooter />
    </PageTemplate>
  );
}