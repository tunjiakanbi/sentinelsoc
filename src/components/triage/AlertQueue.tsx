import type { Alert } from '../../types/alert';
import { AlertRow } from './AlertRow';

interface AlertQueueProps {
  alerts: Alert[];
  selectedId: string | null;
  containedIds: Set<string>;
  onSelect: (alert: Alert) => void;
}

export function AlertQueue({ alerts, selectedId, containedIds, onSelect }: AlertQueueProps) {
  return (
    <section className="alert-queue">
      <header className="alert-queue__header">
        <h2>Active Triage Queue</h2>
        <span>{alerts.length} alerts</span>
      </header>
      <table className="alert-queue__table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Severity</th>
            <th>Title</th>
            <th>MITRE</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <AlertRow
              key={alert.id}
              alert={alert}
              selected={alert.id === selectedId}
              contained={containedIds.has(alert.id)}
              onSelect={onSelect}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
