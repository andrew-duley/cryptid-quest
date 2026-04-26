import react from 'react';

export default function Drafts({ drafts, onSelectDraft }) {
  return(
    <ul>
      {drafts.map(draft => {
        const formattedDate = new Date(draft.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        const formattedCategory = draft.category ?? "General";
        return <li key={draft.id} className="draft">
          <button type="button" onClick={() => onSelectDraft(draft)}>
            <div className="draft__title">
              {draft.title}
            </div>
            <div className="draft__meta">
              {formattedDate +  " • " + formattedCategory}
            </div>
          </button>
        </li>
      })}
    </ul>
  );
}