import React, { useState, useRef, useEffect } from 'react';
import { Game } from './logic/cc-logic.js';
import { disasters } from './data/disasters.js';

import './styles/index.scss';

import PageTemplate from '../../layout/PageTemplate';
import Block from '../../layout/Block';
import PageFooter from '../../layout/PageFooter';

import { IMAGE_WIDTHS_BACKGROUND } from '../../config/imageWidths.js';
import Picture from '../../components/Picture';

const chaosMessages = [
  "CONTROLLED?",
  "OH NO...",
  "TOO LATE!",
  "STAND BACK!",
  "HERE WE GO...",
  "BAD IDEA!",
  "CHAOS!"
];

export default function ControlledChaos() {

  const [activeChoice, setActiveChoice] = useState(null);
  const [round, setRound] = useState(0);
  const [state, setState] = useState('idle');
  const [inputID, setInputID] = useState(0);
  const [startMessage, setStartMessage] = useState('');
  const [loser, setLoser] = useState('');
  const [disasterMessage, setDisasterMessage] = useState('');

  const update = () => {
    setActiveChoice(gameRef.current.activeChoice);
    setRound(gameRef.current.round);
    setState(gameRef.current.state);
    setInputID(gameRef.current.inputID);
    setLoser(gameRef.current.loser);
    
    if (gameRef.current.state === 'game-over') {
      const disasterMessage = disasters[gameRef.current.loser][Math.floor(Math.random() * disasters[gameRef.current.loser].length)];
      setDisasterMessage(disasterMessage);
    }
  }

  const handleStart = () => {
    setStartMessage(chaosMessages[Math.floor(Math.random() * chaosMessages.length)]);
    gameRef.current.start();
  }

  const handleReset = () => {
    setStartMessage(chaosMessages[Math.floor(Math.random() * chaosMessages.length)]);
    gameRef.current.reset();
  }

  const gameRef = useRef(new Game(update));
  const audioRef = useRef({
    brutus: new Audio("https://media.cryptid.quest/audio/controlled-chaos/brutus.wav"),
    burnella: new Audio("https://media.cryptid.quest/audio/controlled-chaos/burnella.wav"),
    grumbit: new Audio("https://media.cryptid.quest/audio/controlled-chaos/grumbit.wav"),
    sparkplug: new Audio("https://media.cryptid.quest/audio/controlled-chaos/sparkplug.wav"),
    disaster: new Audio("https://media.cryptid.quest/audio/controlled-chaos/disaster.wav")
  });

  useEffect(() => {
    const currentAudio = audioRef.current?.[activeChoice];
    if (!currentAudio) return;
    currentAudio.currentTime = 0;
    currentAudio.play();
  }, [activeChoice, inputID]);

  useEffect(() => {
    const currentDisaster = audioRef.current?.disaster
    if (!currentDisaster) return;
    if (state === 'game-over') {
      currentDisaster.currentTime = 0;
      currentDisaster.play();
    }
  });

  return(
    <PageTemplate slug="controlled-chaos" title="Controlled Chaos" className="cc">

      <Picture 
        imagePath="https://media.cryptid.quest/the-crypt/game-backgrounds/controlled-chaos/controlled-chaos-"
        imageWidths={IMAGE_WIDTHS_BACKGROUND}
        className = "cc__background" 
        imgClassName = "cc__background-img"
        loading="eager"
        fetchPriority="high"
      />

      <Block label="Controlled Chaos">
        <section className="cc__board">
          <div className="cc__ui">
            <button className="cc__ui-button start" disabled={state !== 'idle'} onClick={handleStart}>{state === 'idle' ? "Start" : startMessage}</button>
            <button className="cc__ui-button reset" onClick={() => gameRef.current.reset()}>Reset</button>
            <div className="cc__ui-round">{round}</div>
          </div>
          <button onClick={() => gameRef.current.handlePlayerChoice('brutus')} className={activeChoice === 'brutus' ? 'button brutus active' : 'button brutus'}></button>
          <button onClick={() => gameRef.current.handlePlayerChoice('sparkplug')} className={activeChoice === 'sparkplug' ? 'button sparkplug active' : 'button sparkplug'}></button>
          <button onClick={() => gameRef.current.handlePlayerChoice('burnella')} className={activeChoice === 'burnella' ? 'button burnella active' : 'button burnella'}></button>
          <button onClick={() => gameRef.current.handlePlayerChoice('grumbit')} className={activeChoice === 'grumbit' ? 'button grumbit active' : 'button grumbit'}></button>
        </section>
      </Block>

      {state === 'game-over' && (
        <Block label="Disaster Overlay">
          <div className="cc__overlay">
            <div className="cc__overlay-message">
              <h2>THANKS, {loser.toUpperCase()}!</h2>
              <p>{disasterMessage}</p>
            </div>
             <button className="cc__ui-button start"  onClick={handleReset}>Play Again</button>
          </div>
        </Block>
      )}

      <PageFooter />
    </PageTemplate> 
  );
}
