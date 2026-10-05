import React, { useState, useRef } from 'react';

import PageTemplate from '../../layout/PageTemplate';
import Block from '../../layout/Block';
import PageFooter from '../../layout/PageFooter';

import { IMAGE_WIDTHS_BACKGROUND } from '../../config/imageWidths.js';
import { IMAGE_WIDTHS_LARGE_GAME_ELEMENT } from '../../config/imageWidths.js';

import Picture from '../../components/Picture';


import '../a11y/index.scss';
import './styles/index.scss';

const tokens = {
  player1: 'https://media.cryptid.quest/the-crypt/game-elements/longfire-four/polished-green-marble-token-256',
  player2: 'https://media.cryptid.quest/the-crypt/game-elements/longfire-four/polished-black-marble-token-256'
}

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

  const audioRef = useRef({
      impact: new Audio("https://media.cryptid.quest/audio/longfire-four/longfire-four-token-impact-01.wav"),
    });

  const [board, setBoard] = useState(newBoard.map(row => row.slice()));
  const [playerTurn, setPlayerTurn] = useState("player1");
  const [playerWin, setPlayerWin] = useState(null);
  const [playerDraw, setPlayerDraw] = useState(null);
  const [coord, setCoord] = useState(null);
  const [colHover, setColHover] = useState(null);

  const playerMove = (columnIndex, player) => {

    const copiedBoard = board.map(row => row.slice());

    for (let i = 5; i >= 0; i--) {

      if (board[i][columnIndex] === null) {
        copiedBoard[i][columnIndex] = player;
        setBoard(copiedBoard);
        setCoord({ row: i, column: columnIndex});

        break;
      }
    }
    
  }

  const animationEnd = () => {
    const currentImpact = audioRef.current?.impact;
    currentImpact.volume = 1.0;
    currentImpact.play();
   
    const didWin = winCheck(board);
    if (didWin) {
      
      setPlayerWin(playerTurn);
      return;
    }
    playerTurn === "player1" ? setPlayerTurn("player2") : setPlayerTurn("player1");
    setCoord(null);
  }

  const resetGame = () => {
    setBoard(newBoard.map(row => row.slice()));
    setPlayerTurn("Player 1");
    setPlayerWin(null);
  }

  const handleMouseEnter = (idx) => {
    setColHover(idx);
  }

  const handleMouseLeave = () => {
    setColHover(null);
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
        {playerWin && <div className="longfire-four__overlay">Congratulations, {playerTurn.charAt(0).toUpperCase() + playerTurn.slice(1)} wins!</div>}
        {playerDraw && <div className="longfire-four__overlay"></div>}

        <div className="longfire-four__game">
          <div className="longfire-four__drop-zone">
            {board[0].map((__, idx) => {
            return <div key={idx} className={playerWin ? "longfire-four__drop-zone-cell no-click" : "longfire-four__drop-zone-cell longfire-four__drop-zone-cell--token"} onClick={() => playerMove(idx, playerTurn)}>
              <picture>
                <source srcSet={`${tokens[playerTurn]}.avif`}     type="image/avif" />
                  <source srcSet={`${tokens[playerTurn]}.webp`} type="image/webp" />
                  <img src={`${tokens[playerTurn]}.png`} alt="" />
              </picture>
            </div>
          })}
          </div>

          <div className="longfire-four__board-area">
            <Picture 
              imagePath="https://media.cryptid.quest/the-crypt/game-elements/longfire-four/longfire-four-board-"
              imageWidths={IMAGE_WIDTHS_LARGE_GAME_ELEMENT}
              className = "longfire-four__board" 
              imgClassName = "longfire-four__board-img"
              loading="eager"
              fetchPriority="high"
            />
            
            <div className="longfire-four__ui">
              {
                playerWin ? 
                  <div className="longfire-four__winner">
                    {
                    playerWin === 'player1' ? 'Green wins!' : 'Black wins!'
                    }
                  </div>
                :
                ""
              }
                <button className="btn" type="button" onClick={resetGame}>{playerWin ? 'Play Again' : 'New Game'}</button>
             
            </div>

            <div className="longfire-four__grid" onAnimationEnd={animationEnd}>
               {board.map((row, rowIndex) => {
                  return <div key={rowIndex} className={"longfire-four__row"}>{row.map((cell, columnIndex) => {
                    const isDropping = (coord !== null) && rowIndex === coord.row && columnIndex === coord.column;
                    return <div key={`${rowIndex}-${columnIndex}`} className="longfire-four__cell">{cell ? <picture className={ isDropping ? "longfire-four__piece longfire-four__piece--dropping" : "longfire-four__piece"} style={isDropping ? { "--drop-distance" : `-${130 + (coord.row * 94)}%`,
                    "--drop-duration" : `${.15 + (coord.row * .05)}s` } : null}>
                      <source srcSet={`${tokens[cell]}.avif`} type="image/avif" />
                      <source srcSet={`${tokens[cell]}.webp`} type="image/webp" />
                      <img src={`${tokens[cell]}.png`} alt="" />
                    </picture> : null}</div>;
                  })}</div>
                })}
            </div>
  
        </div> 
       </div>
        
        
      </Block>

      <PageFooter />
    </PageTemplate>
  );
}