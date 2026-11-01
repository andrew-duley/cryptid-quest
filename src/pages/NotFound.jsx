import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';

import sasquatchFootprint from '../assets/icons/sasquatch-footprint.svg';
  
const cryptid404Lines = [
  "The page you're looking for vanished like a shy cryptid.",
  "Grumbit insists this page existed five minutes ago. Nobody has been able to verify his claim.",
  "Nothing here but blurry footprints and broken links.",
  "Dredsky was here earlier. He says the page was already missing.",
  "This page was last seen heading into the woods.",
  "Brutus says you're lost. He also has several opinions about how you got here.",
  "We searched the swamp. Still no sign of this page.",
  "Stoneblood checked beneath the page. There was nothing underneath it.",
  "Even Bigfoot couldn't find what you were looking for.",
  "Jervas has declared this page missing. Brimstone is conducting an aerial search.",
  "This page exists only in rumors and campfire stories.",
  "Grimlight knows where this page went. Unfortunately, he isn't telling.",
  "The trail went cold. Must've been a cryptid.",
  "Burnella says the page isn't ready yet. Something in the kitchen just exploded.",
  "All we found were claw marks and a 404.",
  "Bif Goot has been watching this URL for some time. He doesn't trust it.",
  "This page slipped between dimensions.",
  "Maerith searched the entire lakeshore. She did find a lovely little gemstone, though.",
  "Looks like this page was never proven to exist.",
  "Sparkplug says she can fix the missing page. Everyone has been advised to stand back.",
  "Ike Deer has refused to let anyone follow this trail. We suggest you listen.",
  "Grumbit has developed a theory about this missing page. Unfortunately, it involves aliens.",
  "Brutus has demanded to speak to whoever is responsible for this URL. Nobody has volunteered.",
  "Brimstone reports no sign of the page from above. Jervas has scheduled another briefing.",
  "Stoneblood suggests building a new page. He has already begun gathering lumber."
];

function randomLine(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function NotFound() {
  const navigate = useNavigate();

  const [line] = useState(() => randomLine(cryptid404Lines));

  return(
    <PageTemplate slug="404-not-found" title="404 — Page not found" narrow={true} className="not-found">

        {/* <div className="not-found__footprints" aria-hidden="true">
          {
            Array.from({ length: 8}, (_, i) => (
              <img 
                key={i}
                src={sasquatchFootprint}
                alt=""
                className="not-found__footprint"
              />
            ))
          }
        </div> */}
      
      <Block label="Not found" className="not-found__content">
        <p className="not-found__message">{line}</p>

        <div className="not-found__actions">
          <button type="button" className="btn btn--go-back" onClick={() => navigate(-1)}>Go back</button>
          <Link className="btn btn--primary" to="/">Return to Baird</Link>
        </div>

        <div className="not-found__hint">
          <p>Tip: Check the URL or use the navigation above.</p>
        </div>

        {/* <section className="not-found__footprints">

          <div className="not-found__group">
            <img src={sasquatchFootprint} alt="Sasquatch footprint" className="not-found__footprint not-found__footprint--left"/>
            <img src={sasquatchFootprint} alt="Sasquatch footprint" className="not-found__footprint not-found__footprint--right"/>
          </div>

          <div className="not-found__group">
            <img src={sasquatchFootprint} alt="Sasquatch footprint" className="not-found__footprint not-found__footprint--left-2"/>
            <img src={sasquatchFootprint} alt="Sasquatch footprint" className="not-found__footprint not-found__footprint--right-2"/>
          </div>

          <div className="not-found__group">
            <img src={sasquatchFootprint} alt="Sasquatch footprint" className="not-found__footprint not-found__footprint--left-3"/>
            <img src={sasquatchFootprint} alt="Sasquatch footprint" className="not-found__footprint not-found__footprint--right-3"/>
          </div>

          <div className="not-found__group">
            <img src={sasquatchFootprint} alt="Sasquatch footprint" className="not-found__footprint not-found__footprint--left-4"/>
            <img src={sasquatchFootprint} alt="Sasquatch footprint" className="not-found__footprint not-found__footprint--right-4"/>
          </div>

          <div className="not-found__group">
            <img src={sasquatchFootprint} alt="Sasquatch footprint" className="not-found__footprint not-found__footprint--left-5"/>
            <img src={sasquatchFootprint} alt="Sasquatch footprint" className="not-found__footprint not-found__footprint--right-5"/>
          </div>

        </section> */}
      </Block>

    </PageTemplate>
  );
}


