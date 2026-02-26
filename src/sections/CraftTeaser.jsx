import React from 'react';

import Block from '../layout/Block';

const TOOLS = [
  { key: 'react', label: 'React', runeWord: 'REACT', etched: 'React', glow: '#4cc3ff', glyph: 'ᚱ' },
  { key: 'router', label: 'React Router', runeWord: 'PATH', etched: 'React Router', glow: '#35f3b3', glyph: 'ᛉ' },
  { key: 'scss', label: 'SCSS Architecture', runeWord: 'WEAVE', etched: 'SCSS', glow: '#b48cff', glyph: 'ᚨ' },
  { key: 'images', label: 'Responsive Images', runeWord: 'LENS', etched: 'Images', glow: '#ffd45a', glyph: 'ᛟ' },
  { key: 'a11y', label: 'Accessibility', runeWord: 'CLEAR', etched: 'A11y', glow: '#6be5ff', glyph: 'ᛇ' },
  { key: 'perf', label: 'Performance', runeWord: 'SWIFT', etched: 'Performance', glow: '#ff7a5c', glyph: 'ᛋ' },
  { key: 'components', label: 'Component Design', runeWord: 'FORM', etched: 'Components', glow: '#7cff9b', glyph: 'ᚠ' },
  { key: 'git', label: 'Git + Deploy', runeWord: 'BIND', etched: 'Git + Deploy', glow: '#ff60c8', glyph: 'ᛒ' },
];

export default function CraftTeaser() {

  return(
    <Block title="Craft & Tools of Cryptid Woods" subtitle="A quick look at what powers Cryptid Quest behind the scenes">
   
      <div className="craft-teaser">
        
        <p className="craft-teaser__dev-note dev-note">
          <small><strong>Portfolio signal:</strong> This site is built to ship—responsive, accessible, and performance-minded</small>
        </p>
        <ul className="craft-teaser__grid">
          {TOOLS.map(t => (
            <li
              key={t.key}
              className="craft-teaser__item"
              style={{'--glow': t.glow}}
              aria-label={t.label}
              title={t.label}
            >
              <div className="craft-teaser__sigil" aria-hidden="true">
                <span className="craft-teaser__glyph">{t.glyph}</span>
                <span className="craft-teaser__rune-word">{t.runeWord}</span>
              </div>

              <div className="craft-teaser__etch" aria-hidden="true">
                {t.etched}
              </div>
            </li>
          ))}
        </ul>
      </div>

    </Block>
  );
}