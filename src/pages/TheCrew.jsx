import React from 'react';
import { Link } from 'react-router-dom';
import { CREW_MEMBERS } from '../data/crew-members';
import CrewMemberImage from '../components/CrewMemberImage.jsx';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

export default function TheCrew() {
  return (
    <PageTemplate slug="the-crew" title="The Cryptid Quest Crew">
   
      <Block label="The faces of Cryptid Quest">
        <p>
          Meet the faces of Cryptid Quest — guardians, legends, and… oddities of the wild.
        </p>

        <p>
          Click a crew member to learn their story, role, and lore.
        </p>
      </Block>
          
      <Block label="Crew Members">
        <div className="card-grid crew-grid">
          {CREW_MEMBERS.map(crewMember => (
            <Link
              key={crewMember.slug}
              to={`/the-crew/${crewMember.slug}`}
              className="card crew-card"
            >
              <div className="crew-card__header">
                <h3 className="crew-card__name">{crewMember.name}</h3>
                <p className="crew-card__tagline">{crewMember.tagline}</p>
              </div>

              <div className="crew-card__media">
                <CrewMemberImage
                  slug={crewMember.slug}
                  size={400}
                  alt={crewMember.name}
                  className="crew-card__image"
                />
              </div>
            </Link>
          ))}
        </div>
      </Block>
    
      <PageFooter />
    </PageTemplate>
  );
}