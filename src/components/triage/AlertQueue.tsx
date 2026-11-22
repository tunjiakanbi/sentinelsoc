import React from 'react';
import type { SecurityAlert } from '../../types/alert';
import { Badge } from './Badge';

interface AlertQueueProps {
  alerts: SecurityAlert[];
  selectedAlertId: string | null;
  onSelectAlert: (alert: SecurityAlert) => void;
}

export const AlertQueue: React.FC<AlertQueueProps> = ({
  alerts,
  selectedAlertId,
  onSelectAlert,
}) => {
  return (
    <section
      aria-label="Active Triage Queue"
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}
    >
      {/* Queue Header Bar */}
      <div
        style={{
          padding: '14px 20px',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h2 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
            Active Triage Queue ({alerts.length})
          </h2>
          <span
            style={{
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            Sorted by Severity
          </span>
        </div>
        <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
          Click any row to inspect telemetry
        </span>
      </div>

      {/* Alert Rows */}
      <div role="list" style={{ display: 'flex', flexDirection: 'column' }}>
        {alerts.map((alert) => {
          const isSelected = alert.id === selectedAlertId;
          return (
            <button
              key={alert.id}
              type="button"
              onClick={() => onSelectAlert(alert)}
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '84px 88px minmax(260px, 1fr) 210px 155px 64px',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                textAlign: 'left',
                border: 'none',
                borderBottom: '1px solid var(--color-border-subtle)',
                backgroundColor: isSelected
                  ? 'var(--color-bg-selected)'
                  : 'transparent',
                color: 'var(--color-text-primary)',
                opacity: alert.isContained ? 0.55 : 1,
                cursor: 'pointer',
                transition: 'background-color var(--transition-fast), opacity var(--transition-fast)',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'var(--color-bg-elevated)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {/* Severity Badge */}
              <div>
                <Badge severity={alert.isContained ? 'Low' : alert.severity} />
              </div>

              {/* Alert ID */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {alert.id}
              </span>

              {/* Alert Title */}
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: isSelected
                    ? 'var(--color-accent-primary)'
                    : 'var(--color-text-primary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {alert.title}
              </span>

              {/* MITRE ATT&CK Tactic Pill */}
              <span
                style={{
                  justifySelf: 'start',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: 'var(--color-accent-primary)',
                  backgroundColor: 'rgba(6, 182, 212, 0.1)',
                  border: '1px solid rgba(6, 182, 212, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '3px 8px',
                  whiteSpace: 'nowrap',
                }}
              >
                {alert.mitreTactic}
              </span>

              {/* Affected Asset */}
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: 'var(--color-text-secondary)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {alert.affectedAsset}
              </span>

              {/* Timestamp */}
              <span
                style={{
                  fontSize: '12px',
                  color: 'var(--color-text-muted)',
                  textAlign: 'right',
                }}
              >
                {alert.timestamp}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};