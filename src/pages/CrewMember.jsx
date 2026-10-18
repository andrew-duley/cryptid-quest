import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CREW_MEMBERS } from '../data/crew-members';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

import Picture from '../components/Picture';
import { IMAGE_WIDTHS_BACKGROUND, IMAGE_WIDTHS_CREW_MEMBER } from '../config/imageWidths.js';

export default function CrewMember() {
  const { slug } = useParams();
  const crewMember = CREW_MEMBERS.find(m => m.slug === slug);

  if (!crewMember) {
    return (
      <PageTemplate title="Crew member not found">
      
        <Block label="Not found">
          <p className="crew-member__lede">That trail goes cold. Let's get you back to the crew.</p>
          <Link to="/the-crew">← Back to the crew</Link>
        </Block>

        <PageFooter />
      </PageTemplate>
    );
  }

  return (
    <PageTemplate slug={`the-crew/${crewMember.slug}`} title={crewMember.name} className={'crew-member'} narrow={true}>

      <Picture 
        imagePath="https://media.cryptid.quest/the-crew/backgrounds/summer/waterfall-pool/waterfall-pool-"
        imageWidths={IMAGE_WIDTHS_BACKGROUND}
        className = "crew-member__background" 
        imgClassName = "crew-member__background-img"
        loading="eager"
      />

      <Block label={crewMember.name}> 

        <Link to="/the-crew" className="crew-member__back">
          ← Back to the crew
        </Link>

        <div className="crew-member__page">
          <Picture 
            imagePath={crewMember.imagePath}
            imageWidths={IMAGE_WIDTHS_CREW_MEMBER}
            alt={crewMember.imageAlt}
            className = "crew-member__portrait" 
            imgClassName = "crew-member__portrait-img"
            loading="eager"
            sizes="(min-width: 1000px) 1000px, 100vw"
          />
          <div className="crew-member__bio">{
             crewMember.bio?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}</div>
          {
            crewMember.facts.length > 0 && (
              <section className="crew-member__facts">
                <h2>Character Details</h2>
                <dl>
                  {
                    crewMember.facts?.map((fact) => (
                      <div className="crew-member__fact" key={fact.label}>
                        <dt>{fact.label}</dt>
                        <dd>{fact.value}</dd>
                      </div>
                    ))
                  }
                </dl>
              </section>
            )
          }
        </div>      
      
      </Block>

      <PageFooter />
    </PageTemplate>
  );
}
