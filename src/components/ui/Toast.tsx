import React from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        right: '24px',
        bottom: '24px',
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '12px 16px',
        backgroundColor: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border-subtle)',
        borderLeft: '3px solid var(--color-status-success)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 10px 28px rgba(0, 0, 0, 0.45)',
        color: 'var(--color-text-primary)',
        fontSize: '13px',
        fontWeight: 500,
      }}
    >
      <CheckCircle2 size={16} style={{ color: 'var(--color-status-success)', flexShrink: 0 }} />
      <span>{message}</span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        style={{
          marginLeft: '8px',
          background: 'transparent',
          border: 'none',
          color: 'var(--color-text-muted)',
          display: 'inline-flex',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '2px',
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
};