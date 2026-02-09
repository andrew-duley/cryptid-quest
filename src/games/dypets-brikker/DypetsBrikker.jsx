import React, { useState, useRef } from 'react';

import { Game } from './logic/dypets-brikker-logic.js';

import '../shared/styles/index.scss';
import './styles/index.scss';

import PageTemplate from '../../layout/PageTemplate';
import Block from '../../layout/Block';
import PageFooter from '../../layout/PageFooter';

export default function DypetsBrikker() {

  const [boardGrid, setBoardGrid] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [currentSide, setCurrentSide] = useState('kraken');
  const [isFirstTurnMessage, setIsFirstTurnMessage] = useState(true);

  const gameRef = useRef(null);

  function handleNewGameClick() {
    // If we don't have a Game yet, create one and store it in the ref
    if (!gameRef.current) {
      gameRef.current = new Game();
    }

    gameRef.current.newGame();

    // Sync React state with the Game's current state
    setBoardGrid(gameRef.current.board.grid);
    setCurrentSide(gameRef.current.currentSide);
    setIsFirstTurnMessage(true);
    setSelectedCell(null);
  }

  function handleCellClick(rowIndex, cellIndex, cell) {
    setIsFirstTurnMessage(false);  

    const hasSelection = !!selectedCell;

    if (!hasSelection) {
      // FIRST CLICK: no piece selected yet
      if (!cell || cell.side !== currentSide) return;

      // Otherwise, select this piece
      setSelectedCell({ row: rowIndex, col: cellIndex });
      return;
      // SECOND CLICK: we already have a selectedCell...
    } else {
        if (!cell) {
          const result = gameRef.current.tryMove(selectedCell.row, selectedCell.col, rowIndex, cellIndex)
          if (result && result.success) {
            setBoardGrid(gameRef.current.board.grid);
            setCurrentSide(gameRef.current.currentSide);
            setSelectedCell(null);
          }
          return; // we're done handling this click
        } else if (cell.side === currentSide) {
          setSelectedCell({ row: rowIndex, col: cellIndex });
        }
    } 
  }

  return(
    <PageTemplate slug="dypets-brikker" title="Dypets Brikker">

      <Block title="How to Play">
        <p>NOTE: Work in progress — rules and balancing still being tuned.</p>
        <p>Wage an epic war between the mighty Lyngbakr and the dreaded Kraken in this Scandinavian-themed game of checkers.</p>
      </Block>
    
      <Block label="Board">
        {boardGrid ? (
          <div className="db__grid">
            {boardGrid.map((row, rowIndex) => (
              <div className="db__row" key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  const isLightSquare = (rowIndex + cellIndex) % 2 === 0;
                  
                  const isLyngbakr = cell?.side === 'lyngbakr';
                  const isKraken = cell?.side === 'kraken';

                  const isSelected =
                    selectedCell &&
                    selectedCell.row === rowIndex &&
                    selectedCell.col === cellIndex;

                  return(
                    <div className={`db__cell ${isLightSquare ? 'db__cell--light' : 'db__cell--dark'} ${isSelected ? 'db__cell--selected' : ''}`} key={cellIndex} onClick={() => handleCellClick(rowIndex, cellIndex, cell)}>
                      {cell && (
                        <div
                          className={[
                            'db__piece',
                            `db__piece--${cell.side}`,
                            cell.isKing ? 'db__piece--king' : '',
                          ].join(' ')}
                          aria-label={`${cell.side} ${cell.isKing ? 'king' : 'piece'}`}
                        >
                          {cell.side === 'kraken' ? (
                            <svg className="db__emblem" viewBox="0 0 100 100" aria-hidden="true">
                              {/* Tentacle spiral */}
                              <path
                                d="M50 50
                                  m -4 0
                                  a 4 4 0 1 0 8 0
                                  a 8 8 0 1 1 -16 0
                                  a 12 12 0 1 0 24 0
                                  a 16 16 0 1 1 -32 0
                                  a 20 20 0 1 0 40 0"
                                fill="none"
                              />
                            </svg>
                          ) : (
                            <svg className="db__emblem" viewBox="0 0 100 100" aria-hidden="true">
                              {/* Whale tail */}
                              <path
                                d="M20 62
                                  C28 42, 44 38, 50 52
                                  C56 38, 72 42, 80 62
                                  C70 60, 62 64, 58 72
                                  C54 80, 50 82, 50 82
                                  C50 82, 46 80, 42 72
                                  C38 64, 30 60, 20 62 Z"
                                fill="none"
                              />
                              <path d="M50 52 C50 62, 50 70, 50 82" fill="none" />
                            </svg>
                          )}

                          <span className="sr-only">
                            {cell.side} {cell.isKing ? 'king' : 'piece'}
                          </span>
                        </div>
                      )}   

                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <div className="db__board-placeholder">
            Board goes here
          </div>
        )}
      </Block>

      <Block title="Status & Controls">
        <div className="db__info-item db__info-item--winner">

        </div>
        <div className="db__info-item db__info-item--turn">
          {
            isFirstTurnMessage ? (
              <p>{`${currentSide.charAt(0).toUpperCase() + currentSide.slice(1)} gets to go first!`}</p>
            ) : (
              <p>Current Turn: {currentSide === 'kraken' ? 'Kraken' : 'Lyngbakr'}</p>
            )
          }
        </div>
        <div className="db__info-item db__info-item--new-game">
          <button className="btn btn--db" type="button" onClick={handleNewGameClick}>New Game</button>
        </div>
      </Block>

      <PageFooter />
    </PageTemplate>
  );
}