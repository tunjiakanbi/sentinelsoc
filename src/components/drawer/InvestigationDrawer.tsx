import React, { useEffect } from 'react';
import type { SecurityAlert } from '../../types/alert';
import { Badge } from '../triage/Badge';
import { AssignButton } from '../ui/AssignButton';

interface InvestigationDrawerProps {
  alert: SecurityAlert | null;
  onClose: () => void;
  onAssign: (alertId: string) => void;
  onContain: (alertId: string) => void;
}

export const InvestigationDrawer: React.FC<InvestigationDrawerProps> = ({
  alert,
  onClose,
  onAssign,
  onContain,
}) => {
  useEffect(() => {
    if (!alert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [alert, onClose]);

  if (!alert) return null;

  return (
    <>
      {/* 55% Scrim Overlay */}
      <div
        onClick={onClose}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--color-scrim)',
          zIndex: 40,
        }}
      />

      {/* 560px Slide-Over Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-alert-title"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: 'min(560px, 100vw)',
          backgroundColor: 'var(--color-bg-surface)',
          borderLeft: '1px solid var(--color-border-subtle)',
          boxShadow: '-12px 0 32px rgba(0, 0, 0, 0.45)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          zIndex: 50,
        }}
      >
        {/* Drawer Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Badge severity={alert.isContained ? 'Low' : alert.severity} />
            <span style={{ color: 'var(--color-text-secondary)', fontSize: '13px', fontWeight: 500 }}>
              {alert.id}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-secondary)',
              fontSize: '11px',
              fontWeight: 500,
              padding: '4px 8px',
              cursor: 'pointer',
            }}
          >
            CLOSE [ESC]
          </button>
        </div>

        {/* Title & Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <h2 id="drawer-alert-title" style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>
            {alert.title}
          </h2>
          <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: 'var(--color-text-secondary)' }}>
            {alert.summary}
          </p>
        </div>

        {/* Entity Telemetry Card */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontSize: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Principal User</span>
            <span style={{ fontWeight: 500 }}>{alert.entities.principalUser}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Source IP / ASN</span>
            <span style={{ fontWeight: 500 }}>{alert.entities.sourceIpAsn}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Target Host</span>
            <span style={{ fontWeight: 500 }}>{alert.entities.targetHost}</span>
          </div>
        </div>

        {/* KQL Detection Query Block */}
        <div
          style={{
            backgroundColor: 'var(--color-bg-canvas)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-accent-primary)' }}>
            DEFENDER XDR · KQL TELEMETRY
          </span>
          <code
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              lineHeight: 1.55,
              color: 'var(--color-text-secondary)',
              wordBreak: 'break-word',
            }}
          >
            {alert.kqlQuery}
          </code>
        </div>

        {/* Flexible Spacer + Containment Action Bar */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
          <button
            type="button"
            onClick={() => onContain(alert.id)}
            disabled={alert.isContained}
            style={{
              flex: 1,
              height: '40px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: alert.isContained ? 'var(--color-bg-elevated)' : 'var(--color-accent-primary)',
              color: alert.isContained ? 'var(--color-text-muted)' : 'var(--color-accent-ink)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: alert.isContained ? 'default' : 'pointer',
            }}
          >
            {alert.isContained ? 'Host Isolated & Sessions Revoked' : 'Revoke Sessions & Isolate Host'}
          </button>

          <AssignButton
            assignedTo={alert.assignedTo}
            onClick={() => onAssign(alert.id)}
          />
        </div>
      </aside>
    </>
  );
};