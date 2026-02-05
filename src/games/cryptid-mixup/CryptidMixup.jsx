import React, { useState, useEffect, useRef } from 'react';

import { sfx } from './logic/sfx';
import { cryptidList } from './logic/cryptids';

import '../shared/styles/index.scss';
import './styles/index.scss';

// Function that performs a Fisher Yates shuffle and then returns the shuffled deck
function shuffleCards(array) {
  // Make a shallow copy (new array, same element references)
  const deck = array.slice();

  // Shuffle the copy in place
  let i = deck.length;

  while (i > 0) {
    const j = Math.floor(Math.random() * i);
    i --;
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
 
  // Return the shuffled copy
  return deck
}

function buildDeck(baseList, pairs = 8) {
  // 1) pick the first N cryptids (N = pairs)
  const chosen = shuffleCards(baseList).slice(0, pairs);

  // 2) duplicate each cryptid into two card instances
  const duplicated = chosen.flatMap(({ id, label }) => ([
    { pairId: id, instanceId: `${id}#1`, label, state: 'faceDown' },
    { pairId: id, instanceId: `${id}#2`, label, state: 'faceDown' },
  ]));

  // 3) shuffle the 16-card array
  return shuffleCards(duplicated)
}

const BASE = import.meta.env.BASE_URL;
const SIZES_W = [128, 192, 256, 384, 512];

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

  function handleGridKeys(e) {
  if (deck.length === 0) return;

  const cols = 4; // 4x4 board

  if (e.key === 'ArrowRight') {
    e.preventDefault();
    setFocusIdx(i => Math.min(i + 1, deck.length - 1));
  }

  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    setFocusIdx(i => Math.max(i - 1, 0)); // FIX: max, not min
  }

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    setFocusIdx(i => Math.min(i + cols, deck.length - 1)); // FIX: cols (not close)
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault();
    setFocusIdx(i => Math.max(i - cols, 0)); // FIX: max, not min
  }

  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    const card = deck[focusIdx];
    if (card && card.state === 'faceDown' && !isResolving) { // FIX: faceDown spelling
      handleFlip(card.instanceId);
    }
  }
}
  function handleReset() {
    setDeck(() => buildDeck(cryptidList)); // fresh shuffled deck
    setMoves(0);
    setIsResolving(false);
    setTimerOn(false);
    setSeconds(0);
    sfx.ambient.stop();
    audioStartedRef.current = false;
  }

  const fmtTime = s => `${String(Math.floor(s/60)).padStart(2, '0')}:${String(s%60).padStart(2, '0')}`;
  const isWin = deck.length > 0 && deck.every(c => c.state === 'matched');

  useEffect(() => {
    if (deck.length > 0) {
      boardRef.current?.focus();
    }
  }, [deck.length]);

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

  return (
    <main className="page page--bg-dark cmx" aria-labelledby="cmx-title">
      <div className="container">
        <header id="top" className="section">
          <h1 id="cmx-title" className="section__title">
            Cryptid Mix-up
          </h1>

          <p className="cmx__lede">
            Flip two cards at a time and match the cryptids. Fewer moves and faster time wins.
          </p>
        </header>

        {/* Live region for screen readers */}
        <div className="sr-only" aria-live="polite">
          {liveText}
        </div>

        {/* Win banner */}
        {isWin && (
          <section className="section" aria-label="Game result">
            <div className="cmx__win" role="status">
              <p className="cmx__win-text">You win! 🎉</p>
              <button className="cmx__btn" type="button" onClick={handleReset}>
                Play again
              </button>
            </div>
          </section>
        )}

        <section className="section" aria-labelledby="cmx-board-title">
          <h2 id="cmx-board-title" className="section__heading">
            Board
          </h2>

          <div
            ref={boardRef}
            className="cmx__board"
            role="grid"
            aria-describedby="cmx-board-help"
            tabIndex={0}
            aria-activedescendant={`cmx-card-${focusIdx}`}
            onKeyDown={handleGridKeys}
          >
            <p id="cmx-board-help" className="sr-only">
              Memory board. Use arrow keys to move. Press Enter or Space to flip.
            </p>

            {deck.map((card, idx) => (
              <button
                key={card.instanceId}
                id={`cmx-card-${idx}`}
                role="gridcell"
                type="button"
                tabindex={-1}
                className={`cmx__card ${card.state}`} // faceDown | faceUp | matched
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
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="cmx-stats-title">
          <h2 id="cmx-stats-title" className="section__heading">
            Stats & Controls
          </h2>

          <div className="cmx__controls">
            <button className="cmx__btn" type="button" onClick={handleReset}>
              Reset deck
            </button>

            <div className="cmx__hud" aria-live="polite">
              <span className="cmx__moves">Moves: {moves}</span>
              <span className="cmx__time">Time: {fmtTime(seconds)}</span>
            </div>
          </div>
        </section>

        <footer className="section">
          <a href="#top">↑ Back to top</a>
        </footer>
      </div>
    </main>
  );
}