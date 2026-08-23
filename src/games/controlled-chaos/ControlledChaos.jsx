import React, { useState, useRef } from 'react';
import { Game } from './logic/cc-logic.js';

import './styles/index.scss';

import PageTemplate from '../../layout/PageTemplate';
import Block from '../../layout/Block';
import PageFooter from '../../layout/PageFooter';

import { IMAGE_WIDTHS_BACKGROUND } from '../../config/imageWidths.js';
import Picture from '../../components/Picture';

export default function ControlledChaos() {

  const [activeChoice, setActiveChoice] = useState(null);
  const [pattern, setPattern] = useState([]);
  const [round, setRound] = useState(0);
  // const [score, setScore] = useState(0);

  const update = () => {
    setActiveChoice(gameRef.current.activeChoice);
    setPattern(gameRef.current.sequence.pattern.slice());
    setRound(gameRef.current.round);
    // setActiveChoice(gameRef.current.activeChoice);
  }

  const gameRef = useRef(new Game(update));

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
            <div className="cc__ui-button start" onClick={() => gameRef.current.start()}>Start</div>
            <div className="cc__ui-button reset" onClick={() => gameRef.current.reset()}>Reset</div>
            <div className="cc__ui-button round">{round}</div>
          </div>
          <div className="button brutus"></div>
          <div className="button sparkplug choice"></div>
          <div className="button burnella"></div>
          <div className="button grumbit"></div>
        </section>
      </Block>
      <PageFooter />
    </PageTemplate> 
  );
}
