import React from 'react';
import { Link } from 'react-router-dom';

export default function PageFooter({ showBackToTop = true, showBackHome = true }) {
  return(
    <footer className="page__footer">
      { showBackToTop ? <a href="#top">&uarr; Back to top</a> : null}

      {showBackToTop && showBackHome ? (
        <span aria-hidden="true"> | </span>
      ) : null}

      { showBackHome ? <Link to="/">&larr; Back Home</Link> : null}
    </footer>
  );
}