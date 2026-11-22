import { useEffect } from 'react';
import type { Alert } from '../../types/alert';
import { Badge } from '../triage/Badge';
import { AssignButton } from '../ui/AssignButton';

interface InvestigationDrawerProps {
  alert: Alert | null;
  assigned: boolean;
  contained: boolean;
  onClose: () => void;
  onToggleAssign: () => void;
  onContain: () => void;
}

export function InvestigationDrawer({
  alert,
  assigned,
  contained,
  onClose,
  onToggleAssign,
  onContain,
}: InvestigationDrawerProps) {
  useEffect(() => {
    if (!alert) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [alert, onClose]);

  if (!alert) return null;

  return (
    <aside className="drawer" role="dialog" aria-modal="true" aria-label={`Alert ${alert.id}`}>
      <header className="drawer__header">
        <span>{alert.id}</span>
        <Badge severity={alert.severity} />
        <button type="button" onClick={onClose} aria-label="Close drawer">
          ✕
        </button>
      </header>
      <h2>{alert.title}</h2>

      <section className="drawer__kql">
        <h3>{alert.kql.title}</h3>
        <pre>
          <code>{alert.kql.query}</code>
        </pre>
      </section>

      <footer className="drawer__actions">
        <AssignButton assigned={assigned} onToggle={onToggleAssign} />
        <button type="button" className="btn-primary" disabled={contained} onClick={onContain}>
          {contained ? 'Contained' : 'Contain'}
        </button>
      </footer>
    </aside>
  );
}
