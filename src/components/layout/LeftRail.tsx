const items = ['Queue', 'Threat Intel', 'Settings'] as const;

export function LeftRail() {
  return (
    <nav className="left-rail" aria-label="Primary">
      {items.map((label) => (
        <button key={label} type="button" className="left-rail__item" aria-label={label}>
          {/* TODO: icon */}
          {label[0]}
        </button>
      ))}
    </nav>
  );
}
