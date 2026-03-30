import React from 'react';

export default function PageTemplate({
  slug = "",
  eyebrow,
  title,
  description,
  meta,
  actions,
  children,
  className,
}) {

  const hasHeaderContent = eyebrow || title || description || meta || actions;
  
  const pageTitleId = "page-title";

  return(
    <main className={`page ${slug ? `page--${slug}` : ""} ${className || ""}`} aria-labelledby={title ? pageTitleId : undefined}>
      <div id="top" />
      {hasHeaderContent ? (<header className="page__header">
        <div className="page__inner">
          {eyebrow ? <p className="page__eyebrow">{eyebrow}</p> : null}

          {title ? <h1 id={pageTitleId} className="page__title">
            {title}
          </h1> : null}

          {description ? <p className="page__description">{description}</p> : null}
          {meta ? <div className="page__meta">{meta}</div> : null}
          {actions ? <div className="page__actions">{actions}</div> : null}
        </div>
      </header>) : null}

      <div className="page__body">
        <div className="page__inner">{children}</div>
      </div>
    </main>
  );
}