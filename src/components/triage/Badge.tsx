import React from 'react';
import { Severity } from '../../types/alert';

interface BadgeProps {
  severity: Severity;
}

const SEVERITY_MAP: Record<Severity, { label: string; color: string; bg: string }> = {
  Critical: { label: 'CRIT', color: 'var(--color-status-critical)', bg: 'var(--color-status-critical-bg)' },
  High:     { label: 'HIGH', color: 'var(--color-status-high)',     bg: 'var(--color-status-high-bg)' },
  Medium:   { label: 'MED',  color: 'var(--color-status-medium)',   bg: 'var(--color-status-medium-bg)' },
  Low:      { label: 'LOW',  color: 'var(--color-status-low)',      bg: 'var(--color-status-low-bg)' },
};

export const Badge: React.FC<BadgeProps> = ({ severity }) => {
  const { label, color, bg } = SEVERITY_MAP[severity];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '3px 8px',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: bg,
        color,
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.04em',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: color,
        }}
      />
      {label}
    </span>
  );
};