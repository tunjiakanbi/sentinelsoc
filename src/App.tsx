import { useEffect, useState } from 'react';
import { Shield, Activity, Settings } from 'lucide-react';
import { INITIAL_ALERTS } from './data/mockAlerts';
import type { SecurityAlert } from './types/alert';
import { AlertQueue } from './components/triage/AlertQueue';
import { InvestigationDrawer } from './components/drawer/InvestigationDrawer';
import { Toast } from './components/ui/Toast';
import './styles/tokens.css';

export function App() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>(INITIAL_ALERTS);
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const selectedAlert = alerts.find((a) => a.id === selectedAlertId) ?? null;

  // Dynamic KPI counts synced with live containment state
  const containedCount = 39 + alerts.filter((a) => a.isContained).length;
  const criticalUnassignedCount =
    12 +
    alerts.filter(
      (a) => a.severity === 'Critical' && !a.isContained && !a.assignedTo
    ).length;

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(null), 4000);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const handleAssign = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === alertId
          ? { ...a, assignedTo: a.assignedTo ? undefined : 'T. Akanbi' }
          : a
      )
    );
  };

  const handleContain = (alertId: string) => {
    const target = alerts.find((a) => a.id === alertId);
    if (!target) return;

    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, isContained: true } : a))
    );
    setSelectedAlertId(null);
    setToastMessage(`Sessions revoked & ${target.affectedAsset} isolated`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-bg-canvas)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-sans)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Navigation Header */}
      <header
        style={{
          height: '56px',
          padding: '0 24px',
          backgroundColor: 'var(--color-bg-surface)',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, letterSpacing: '-0.01em' }}>
            Sentinel<span style={{ color: 'var(--color-accent-primary)' }}>SOC</span>
          </span>
          <span
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--color-text-secondary)',
              backgroundColor: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-sm)',
              padding: '3px 8px',
            }}
          >
            PROD-US-EAST · ENTRA + DEFENDER
          </span>
        </div>

        <div
          style={{
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            backgroundColor: 'rgba(6, 182, 212, 0.16)',
            border: '1px solid var(--color-accent-primary)',
            color: 'var(--color-accent-primary)',
            fontSize: '11px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="Tunji Akanbi · SOC Analyst"
        >
          TA
        </div>
      </header>

      {/* Main Workspace Body */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Left Icon Rail */}
        <nav
          aria-label="Primary Workspace Navigation"
          style={{
            width: '56px',
            backgroundColor: 'var(--color-bg-surface)',
            borderRight: '1px solid var(--color-border-subtle)',
            padding: '16px 0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
          }}
        >
          <button
            type="button"
            aria-label="Active Triage Queue"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(6, 182, 212, 0.35)',
              backgroundColor: 'rgba(6, 182, 212, 0.12)',
              color: 'var(--color-accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Shield size={18} />
          </button>
          <button
            type="button"
            aria-label="Threat Intelligence"
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Activity size={18} />
          </button>
          <button
            type="button"
            aria-label="Console Settings"
            style={{
              marginTop: 'auto',
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              backgroundColor: 'transparent',
              color: 'var(--color-text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Settings size={18} />
          </button>
        </nav>

        {/* Triage Canvas */}
        <main
          style={{
            flex: 1,
            padding: '24px',
            maxWidth: '1440px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          {/* Top KPI Row */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {/* KPI 1 */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                  CRITICAL UNASSIGNED
                </span>
                <span style={{ color: 'var(--color-accent-primary)' }}>Synced 4s ago</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontSize: '28px', fontWeight: 700 }}>
                  {criticalUnassignedCount}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-status-critical)' }}>
                  {criticalUnassignedCount < 14 ? '+2 in last 1h' : '+3 in last 1h'}
                </span>
              </div>
            </div>

            {/* KPI 2 */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                  MEAN TIME TO TRIAGE (MTTT)
                </span>
                <span style={{ color: 'var(--color-accent-primary)' }}>Synced 4s ago</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontSize: '28px', fontWeight: 700 }}>4m 18s</span>
                <span style={{ fontSize: '12px', color: 'var(--color-status-success)' }}>
                  -22% vs 7d avg
                </span>
              </div>
            </div>

            {/* KPI 3 */}
            <div
              style={{
                backgroundColor: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                <span style={{ color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                  CONTAINED (LAST 24H)
                </span>
                <span style={{ color: 'var(--color-accent-primary)' }}>Synced 4s ago</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                <span style={{ fontSize: '28px', fontWeight: 700 }}>{containedCount}</span>
                <span style={{ fontSize: '12px', color: 'var(--color-status-success)' }}>
                  100% SLA met
                </span>
              </div>
            </div>
          </div>

          {/* Active Triage Queue Table */}
          <AlertQueue
            alerts={alerts}
            selectedAlertId={selectedAlertId}
            onSelectAlert={(alert) => setSelectedAlertId(alert.id)}
          />
        </main>
      </div>

      {/* Slide-Over Investigation Drawer */}
      <InvestigationDrawer
        alert={selectedAlert}
        onClose={() => setSelectedAlertId(null)}
        onAssign={handleAssign}
        onContain={handleContain}
      />

      {/* Containment Confirmation Toast */}
      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
    </div>
  );
}

export default App;