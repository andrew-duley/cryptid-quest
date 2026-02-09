import React from 'react';

export default function PageTemplate({
  slug = "",
  eyebrow,
  title,
  description,
  meta,
  actions,
  children,
}) {
  const pageTitleId = "page-title";

  return(
    <main className={`page ${slug ? `page--${slug}` : ""}`} aria-labelledby={pageTitleId}>
      <div id="top" />
      <header className="page__header">
        <div className="page__inner">
          {eyebrow ? <p className="page__eyebrow">{eyebrow}</p> : null}

          <h1 id={pageTitleId} className="page__title">
            {title}
          </h1>

          {description ? <p className="page__description">{description}</p> : null}
          {meta ? <div className="page__meta">{meta}</div> : null}
          {actions ? <div className="page__actions">{actions}</div> : null}
        </div>
      </header>

      <div className="page__body">
        <div className="page__inner">{children}</div>
      </div>
    </main>
  );
}