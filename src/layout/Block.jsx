import React from 'react';

function makeIdFromTitle(title) {
  return String(title || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")   // remove weird chars
    .replace(/\s+/g, "-")          // spaces -> dashes
    .replace(/-+/g, "-");          // collapses multiple dashes
}

export default function Block({
  label,
  title, 
  devNote,
  subtitle,
  actions,
  id, 
  children
}) {
  const hasTitle = Boolean(title && String(title).trim()); 

  // Safeguard:
  // - If there's no visible title, we still need an accessible name.
   if (!hasTitle && (!label || !String(label).trim())) {
    throw new Error("Block requires either a non-empty title OR a non-empty label (for accessibility).");
  }
  const headingId = hasTitle ? ( id || `block-${makeIdFromTitle(title)}`) : undefined;

  return(
    <section className="block" {...
      (hasTitle
        ? { "aria-labelledby" : headingId}
        : { "aria-label" : String(label).trim() }
      )
    }>
      <header className="block__header">
        {hasTitle && (
          <h2 id={headingId} className="block__title">
            {title}
          </h2>
        )}

        {subtitle ? <p className="block__subtitle">{subtitle}</p> : null}

        {devNote ? <p className="block__dev-note">{devNote}</p> : null}

        {actions ? <div className="block__actions">{actions}</div> : null}
      </header>

      <div className="block__body">{children}</div>
    </section>
  );
}