interface AssignButtonProps {
  assigned: boolean;
  onToggle: () => void;
}

export function AssignButton({ assigned, onToggle }: AssignButtonProps) {
  return (
    <button
      type="button"
      className={`btn-secondary${assigned ? ' btn-secondary--active' : ''}`}
      aria-pressed={assigned}
      onClick={onToggle}
    >
      {assigned ? 'Assigned to me' : 'Assign to me'}
    </button>
  );
}
