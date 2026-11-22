import React from 'react';

interface AssignButtonProps {
  assignedTo?: string;
  onClick: () => void;
}

export const AssignButton: React.FC<AssignButtonProps> = ({ assignedTo, onClick }) => {
  const isAssigned = Boolean(assignedTo);

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: '40px',
        padding: '0 16px',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--color-bg-elevated)',
        border: `1px solid ${isAssigned ? 'var(--color-accent-primary)' : 'var(--color-border-subtle)'}`,
        color: isAssigned ? 'var(--color-accent-primary)' : 'var(--color-text-primary)',
        fontSize: '13px',
        fontWeight: 500,
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
      }}
    >
      {isAssigned ? `Assigned to ${assignedTo} ✓` : 'Assign to Me'}
    </button>
  );
};