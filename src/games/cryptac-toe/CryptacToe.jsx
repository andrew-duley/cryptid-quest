import React, { useState, useRef, useEffect } from 'react';

import '../shared/styles/index.scss';
import './styles/index.scss';

import PageTemplate from '../../layout/PageTemplate';
import Block from '../../layout/Block';
import PageFooter from '../../layout/PageFooter';

const PLACE_SFX = '/games/cryptac-toe/sounds/place.mp3';
const WIN_SAS_SFX = '/games/cryptac-toe/sounds/win-sasquatch.mp3';
const WIN_DOG_SFX = '/games/cryptac-toe/sounds/win-dogman.mp3';
const DRAW_SFX = '/games/cryptac-toe/sounds/draw.mp3';

const winConditions = [
  [0, 1, 2], // Rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonals
  [2, 4, 6]
];

export default function CryptacToe() {

  const [squares, setSquares] = useState(new Array(9).fill(null));
  const [isSasquatchTurn, setIsSasquatchTurn] = useState(true);
  const [winLine, setWinLine] = useState(null);
  const [winner, setWinner] = useState(null);
  const [hasWon, setHasWon] = useState(false);
  const [isDraw, setIsDraw] = useState(false);
  const [muted, setMuted] = useState(false);

  
  const placeRef = useRef(null);
  const winSasRef = useRef(null);
  const winDogRef = useRef(null);
  const drawRef = useRef(null);

  useEffect(() => {
    placeRef.current = new Audio(PLACE_SFX);
    winSasRef.current = new Audio(WIN_SAS_SFX);
    winDogRef.current = new Audio(WIN_DOG_SFX);
    drawRef.current = new Audio(DRAW_SFX);

    // subtle volume so it's not jarring
    [placeRef, winSasRef, winDogRef, drawRef].forEach(ref => {
      if (ref.current) ref.current.volume = .35;
    });
  }, []);

  function play(ref) {
    if (muted || !ref?.current) return;
    try {
      ref.current.currentTime = 0;
      ref.current.play();
    } catch {}
  }

  function handleSquareClick(i) {
    if (hasWon || isDraw) return; 
    if (squares[i] !== null) return;

    const next = [...squares];
    const player = isSasquatchTurn ? 'sasquatch' : 'dogman';
    next[i] = player;
    play(placeRef);

    setSquares(next);
    setIsSasquatchTurn(prev => !prev);

    const line = checkForWin(next);
    if (line) {
      setWinLine(line);
      if (player === 'sasquatch') play(winSasRef);
      else play(winDogRef);
      return;
    }

    if (isBoardFull(next)) {
      setIsDraw(true);
      play(drawRef);
      // optional: popup('It's a draw!)
    }
    
  }

  function getSquareIcon(value) {
    if (value === 'sasquatch') {
      return (
        <img
          src="/games/cryptac-toe/icons/sasquatch-token-96.webp"
          srcSet="/games/cryptac-toe/icons/sasquatch-token-96.webp 1x,
                  /games/cryptac-toe/icons/sasquatch-token-192.webp 2x"
          alt="Sasquatch"
          className="ctt__icon"
        />);
    }

    if (value === 'dogman') {
      return (
        <img 
          src="/games/cryptac-toe/icons/dogman-token-96.webp"
          srcSet="/games/cryptac-toe/icons/dogman-token-96.webp 1x,
                  /games/cryptac-toe/icons/dogman-token-192.webp 2x"
        alt="Dogman"
        className="ctt__icon"
        />);
    }
    return null;
  }

  function checkForWin(squares) {
    for (const [a, b, c] of winConditions) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setHasWon(true);
        setWinner(squares[a])
        return [a, b, c];
      }
    }
    return null
  }

  function isBoardFull(squares) {
    return squares.every(Boolean);
  }

  function handleReset() {
    setSquares(new Array(9).fill(null));
    setIsSasquatchTurn(true);
    setHasWon(false);
    setIsDraw(false);
    setWinLine(null);
    setWinner(null);

    [placeRef, winSasRef, winDogRef, drawRef].forEach(ref => {
      if (ref.current) {
        ref.current.pause();
        ref.current.currentTime = 0;
      }
    });
  }

  return(
    <PageTemplate slug="cryptac-toe" title="Cryptac-Toe">

      <Block title="How to Play">
        <p>
          Get three in a row to win. Sasquatch goes first, because they rule and Dogmen drool.
        </p>
      </Block>

      <Block label="Board">
        <div className="ctt__board">
          {squares.map((v, i) => {
            return(<button 
              key={i} 
              className={`ctt__square ${
                winLine?.includes(i)
                  ? winner === 'dogman'
                    ? 'ctt__square--win ctt__square--win-dogman'
                    : 'ctt__square--win ctt__square--win-sasquatch'
                  : ''
              }`} 
              type="button" 
              disabled={!!v || hasWon || isDraw}
              onClick={() => handleSquareClick(i)}>
              {getSquareIcon(v)}
            </button>);
          })}
        </div>
      </Block>

      <Block title="Status & Controls">
        <span className="ctt__status-text" role="status">
          {hasWon
            ? `${winner === 'sasquatch' ? 'Sasquatch' : 'Dogman'} wins!`
            : isDraw
              ? "It's a draw!"
              : (isSasquatchTurn ? "Sasquatch's turn" : "Dogman's turn")
          }
        </span>
        <button className="ctt__reset" type="button" onClick={() => { handleReset(); setMuted(false); }} aria-label="Reset the game and unmute sound effects">Reset</button>
      </Block>

      <PageFooter />
    </PageTemplate>
  );
}