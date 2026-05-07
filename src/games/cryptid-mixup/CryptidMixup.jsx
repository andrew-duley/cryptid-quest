import React, { useState, useEffect, useRef } from 'react';

import PageTemplate from '../../layout/PageTemplate';
import Block from '../../layout/Block';
import PageFooter from '../../layout/PageFooter';

import { buildDeck } from './logic/buildDeck';
import { sfx } from './logic/sfx';
import { cryptidList } from './logic/cryptids';

import '../a11y/index.scss';
import './styles/index.scss';

const BASE = import.meta.env.BASE_URL;
const SIZES_W = [128, 192, 256, 384, 512];





// Below is where we will continue later to work out the file size issue
const SIZES_ATTR =
  "(min-width:1400px) and (min-aspect-ratio:16/10) 12vw, " +
  "(max-width:768px) 40vw, " +
  "(max-height:768px) 20vh, " +
  "22vw"; // default 4x4 card width

function buildSrcSet(id, ext) {
    // e.g. /games/cryptid-mixup/cryptids/sasquatch/sasquatch-256.avif 256w
    return SIZES_W.map(w => `${BASE}games/cryptid-mixup/cryptids/${id}/${id}-${w}.${ext} ${w}w`).join(", ");
}

function fallbackUrl(id, w = 256, ext = "jpg") {
  return `${BASE}games/cryptid-mixup/cryptids/${id}/${id}-${w}.${ext}`;
}
// End of image issue chunk





export default function CryptidMixup() {

  const audioStartedRef = useRef(false);
  const boardRef = useRef(null);

  const [deck, setDeck] = useState(() => buildDeck(cryptidList));
  const [moves, setMoves] = useState(0);
  const [isResolving, setIsResolving] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [liveText, setLiveText] = useState('');
  const [focusIdx, setFocusIdx] = useState(0);
  const [cols, setCols] = useState(4);

//   function handleGridKeys(e) {
//   if (deck.length === 0) return;

//   const key = e.key;

//   if (!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Enter',' '].includes(key)) return;
//   e.preventDefault();

//   if (key === 'ArrowRight') {
//     setFocusIdx(i => (i % cols === cols - 1 ? i : Math.min(i + 1, deck.length - 1)));
//   }

//   if (key === 'ArrowLeft') {
//     setFocusIdx(i => (i % cols === 0 ? i : Math.max(i - 1, 0)));
//   }

//   if (key === 'ArrowDown') {
//     setFocusIdx(i => Math.min(i + cols, deck.length - 1));
//     console.log(focusIdx)
//   }

//   if (key === 'ArrowUp') {
//     setFocusIdx(i => Math.max(i - cols, 0));
//   }

//   if (key === 'Enter' || key === ' ') {
//     const card = deck[focusIdx];
//     if (card && card.state === 'faceDown' && !isResolving) handleFlip(card.instanceId);
//   }
// }

  function handleReset() {
    setDeck(() => buildDeck(cryptidList)); // fresh shuffled deck
    setMoves(0);
    setIsResolving(false);
    setTimerOn(false);
    setSeconds(0);
    setFocusIdx(0)
    sfx.ambient.stop();
    audioStartedRef.current = false;
  }

  // Function to display time
  const fmtTime = s => `${String(Math.floor(s/60)).padStart(2, '0')}:${String(s%60).padStart(2, '0')}`;
  const isWin = deck.length > 0 && deck.every(c => c.state === 'matched');

  // useEffect(() => {
  //   const board = boardRef.current;
  //   if (!board) return;

  //   const measure = () => {

  //     const computedStyle = window.getComputedStyle(board);
  //     const currentColumns = computedStyle.gridTemplateColumns.trim().split(/\s+/).length;
  //     setCols(currentColumns);
  //     console.log(computedStyle.gridTemplateColumns);
  //     console.log(currentColumns);
  //   };

  //   measure();

  //   // Re-run whenever the board changes size (responsive columns)
  //   const ro = new ResizeObserver(() => (measure()));
  //   ro.observe(board);

  //   return () => ro.disconnect();
  // }, []);

  // useEffect(() => {
  //   if (deck.length > 0) {
  //     boardRef.current?.focus();
  //   }
  // }, [deck.length]);

  useEffect(() => {
    if (!timerOn) return;
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id);
  }, [timerOn]);

  useEffect(() => {
    const anyFlipped = deck.some(c => c.state !== 'faceDown');

    // start when the first card flips
    if (anyFlipped && !isWin && !timerOn) setTimerOn(true);

    // stop when you win or when everything returns faceDown (reset)
    if ((isWin || !anyFlipped) && timerOn) setTimerOn(false);
  }, [deck, isWin, timerOn]);

  useEffect(() => {
    if (isResolving) return;

    const up = deck.filter(c => c.state === 'faceUp');
    if (up.length !== 2) return; // wait until exactly two are up

    setIsResolving(true);
    setMoves(m => m + 1);

    const [a, b] = up;
    const isMatch = a.pairId === b.pairId;
    isMatch ? sfx.match() : sfx.miss();
    setLiveText(isMatch ? `${a.label} matched!` : `No match.`)

    const t = setTimeout(() => {
      setDeck(prev =>
        prev.map(card => {
          const isOneOfTwo = card.instanceId === a.instanceId || card.instanceId === b.instanceId;
          if (!isOneOfTwo) return card;
          return isMatch 
            ? { ...card, state: 'matched' }
            : { ...card, state: 'faceDown' }
        })
      );
      setIsResolving(false);
    }, 800);

    return () => clearTimeout(t);
  }, [deck]);

  useEffect(() => {
    if (!audioStartedRef.current && deck.some(c => c.state !== 'faceDown')) {
    sfx.ambient.start();          // no-op if already playing (see sfx.js tweak below)
    audioStartedRef.current = true;
  }
  }, [deck]);

  useEffect(() => {
    if (isWin) {
      sfx.ambient.stop();
      audioStartedRef.current = false;     // so a new game can start it again
      sfx.win();
      setLiveText('You win!');
    }
  }, [isWin]);

  useEffect(() => {
    return () => {
      sfx.ambient.stop();
      audioStartedRef.current = false;
    }
  }, []);

  function handleFlip(instanceId) {
    if (isResolving) return;

    setDeck(prev => {
      // how many are up right now (from the same "prev" we're about to update)
      const openCount = prev.filter(c => c.state === 'faceUp').length;
      if (openCount >= 2) return prev; // wait until resolve

      const willFlip = prev.some(c => 
        c.instanceId === instanceId && c.state === 'faceDown'
      );

      if (willFlip) sfx.flip();

      return prev.map(card =>
        card.instanceId === instanceId && card.state === 'faceDown' ? { ...card, state: 'faceUp' } : card
      );
    });
  }

  const stateToModifier = {
    faceDown: "face-down",
    faceUp: "face-up",
    matched: "matched"
  }

  return (
    <PageTemplate slug="cryptid-mixup" title="Cryptid Mixup" className="cmx">

      <Block title="How to Play">
        <p>
          Flip two cards at a time and match the cryptids. Fewer moves and faster time wins.
        </p>

        {/* Live region for screen readers */}
        <div className="sr-only" aria-live="polite">
          {liveText}
        </div>
      </Block>

      {/* Win banner */}
        {
          isWin && (
            <Block label="Game result">
              <div className="cmx__win" role="status">
                <p className="cmx__win-text">You've found the missing cryptids!</p>
                <p className="cmx__win-subtext">The forest is quiet... for now.</p>
                <button className="cmx__btn btn" type="button" onClick={handleReset}>
                  Play again
                </button>
              </div>
            </Block>
          )
        } 

      <Block label="Board">
        <div
          ref={boardRef}
          className="cmx__board"
          role="grid"
          aria-describedby="cmx-board-help"
          tabIndex={0}
          aria-activedescendant={`cmx-card-${focusIdx}`}
          // onKeyDown={handleGridKeys}
        >
          <p id="cmx-board-help" className="sr-only">
            Memory board. Use arrow keys to move. Press Enter or Space to flip.
          </p>

          {deck.map((card, idx) => {
            const stateModifier = stateToModifier[card.state]; 
            return ( 
              <button
                key={card.instanceId}
                id={`cmx-card-${idx}`}
                role="gridcell"
                type="button"
                tabIndex={-1}
                className={`cmx__card cmx__card--${stateModifier} ${idx === focusIdx ? `is-active` : ''}`} // faceDown | faceUp | matched
                onClick={() => handleFlip(card.instanceId)}
                disabled={isResolving || card.state !== "faceDown"}
                aria-pressed={card.state !== "faceDown"}
                aria-label={card.state === "faceDown" ? "Face-down card" : card.label}  
              > 
                <span className="cmx__card-inner" aria-hidden="true">
                  <span className="cmx__card-face cmx__card-face--back" />
                  <span className="cmx__card-face cmx__card-face--front">
                    <picture>
                      <source
                        type="image/avif"
                        srcSet={buildSrcSet(card.pairId, "avif")}
                        sizes={SIZES_ATTR}
                      />
                      <source
                        type="image/webp"
                        srcSet={buildSrcSet(card.pairId, "webp")}
                        sizes={SIZES_ATTR}
                      />
                      <img
                        src={fallbackUrl(card.pairId, 256, "jpg")}
                        width="500"
                        height="700"
                        alt=""
                        loading="lazy"
                        decoding="async"
                        draggable="false"
                      />
                    </picture>
                  </span>
                </span>
              </button> 
            );
          })}
        </div>
      </Block>

      <Block title="Stats & Controls" className="cmx__stats-controls">
        <div className="cmx__controls">
          <button className="cmx__btn" type="button" onClick={handleReset}>
            Reset deck
          </button>

          <div className="cmx__hud" aria-live="polite">
            <span className="cmx__moves">Moves: {moves}</span>
            <span className="cmx__time">Time: {fmtTime(seconds)}</span>
          </div>
        </div>
      </Block>
      <PageFooter />
    </PageTemplate>
  );
}