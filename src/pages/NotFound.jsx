import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import PageTemplate from '../layout/PageTemplate';
import Block from '../layout/Block';
import PageFooter from '../layout/PageFooter';

const cryptid404Lines = [
  "The page you're looking for vanished like a shy cryptid.",
  "Nothing here but blurry footprints and broken links.",
  "This page was last seen heading into the woods.",
  "We searched the swamp. Still no sign of this page.",
  "Even Bigfoot couldn't find what you were looking for.",
  "This page exists only in rumors and campfire stories.",
  "The trail went cold. Must've been a cryptid.",
  "All we found were claw marks and a 404.",
  "This page slipped between dimensions.",
  "Looks like this page was never proven to exist."
];

function randomLine(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}


export default function NotFound() {
  const navigate = useNavigate();

  const [line] = useState(() => randomLine(cryptid404Lines));

  return(
    <PageTemplate slug="404-not-found" title="404 — Page not found" narrow={true} className="not-found">
      
      <Block label="Not found">
        <p className="not-found__lede">{line}</p>

        <div className="not-found__actions">
          <button type="button" className="btn btn--ghost" onClick={() => navigate(-1)}>Go back</button>
          <Link className="btn btn--primary" to="/">Go to Home</Link>
          <Link className="btn btn--warm" to="/about">About Cryptid Quest</Link>
        </div>

        <div className="not-found__hint">
          <p>Tip: Check the URL or use the navigation above.</p>
        </div>
      </Block>

      <PageFooter />
    </PageTemplate>
  );
}


