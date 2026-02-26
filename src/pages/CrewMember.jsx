import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CREW_MEMBERS } from '../data/crew-members';
import CrewMemberImage from '../components/CrewMemberImage.jsx';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

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

  const hasFunFacts = Array.isArray(crewMember.funFacts) && crewMember.funFacts.length > 0;

  return (
    <PageTemplate slug={`the-crew/${crewMember.slug}`} title={crewMember.name}>
    
      <Block label="Back to the crew">
        <Link to="/the-crew" className="crew-member__back">
          ← Back to the crew
        </Link>
      </Block>

      <Block label={crewMember.name}>
        <div className="crew-member__hero">
          <div className="crew-member__media">
            <CrewMemberImage
              slug={crewMember.slug}
              size={800}
              alt={crewMember.name}
              className="crew-member__image"
              loading="eager"
            />
          </div>
          <div className="crew-member__text">
            <p className="crew-member__tagline">{crewMember.tagline}</p>
            <p className="crew-member__summary">{crewMember.summary}</p>
          </div>
        </div>
      </Block>
        
      <Block title="Legend">
        {crewMember.lore?.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </Block>

      {hasFunFacts && (
        <Block title="Fun Facts">
          <ul>
            {crewMember.funFacts.map((fact, i) => (
              <li key={i}>{fact}</li>
            ))}
          </ul>
        </Block>
      )}

      <PageFooter />
    </PageTemplate>
  );
}
