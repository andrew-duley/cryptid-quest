import React from 'react';
import { Link } from 'react-router-dom';
import { CREW_MEMBERS } from '../data/crew-members';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

import { IMAGE_WIDTHS_BACKGROUND, IMAGE_WIDTHS_CREW_MEMBER } from '../config/imageWidths.js';
import Picture from '../components/Picture';

const crewMembers = CREW_MEMBERS;

export default function TheCrew() {
  return (

    <PageTemplate slug="the-crew" title="Faces of the Northern Fringe" className="the-crew">

      {/* <Picture 
        imagePath="https://media.cryptid.quest/the-crew/backgrounds/spring/portrait-hall/portrait-hall-"
        imageWidths={IMAGE_WIDTHS_BACKGROUND}
        className = "the-crew__background" 
        imgClassName = "the-crew__background-img"
        loading="eager"
        fetchPriority="high"
      /> */}
   
      <Block label="The faces of Baird">
        <p>
          Every corner of the Northern Fringe has its characters. Explorers, craftsmen, musicians, wanderers, and the occasional troublemaker all have a story to tell.
        </p>
      </Block>
          
      <Block label="Crew Members">
        <div className="card-grid crew-grid">
          {crewMembers.map(crewMember => (
            <Link
              key={crewMember.slug}
              to={`/the-crew/${crewMember.slug}`}
              className="card crew-card"
            >
              <div className="crew-card__media">
                <Picture 
                  imagePath={crewMember.imagePath}
                  imageWidths={IMAGE_WIDTHS_CREW_MEMBER}
                  className = "crew-card__portrait" 
                  imgClassName = "crew-card__portrait-img"
                  loading="lazy"
                />
              </div>
              <div className="crew-card__body">
                <h3 className="crew-card__name">{crewMember.name}</h3>
                <p className="crew-card__tagline">{crewMember.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
      </Block>
    
      <PageFooter />
    </PageTemplate>
  );
}