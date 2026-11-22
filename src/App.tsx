import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Alert } from './types/alert';
import { mockAlerts } from './data/mockAlerts';
import { TopNav } from './components/layout/TopNav';
import { LeftRail } from './components/layout/LeftRail';
import { KpiCard } from './components/triage/KpiCard';
import { AlertQueue } from './components/triage/AlertQueue';
import { InvestigationDrawer } from './components/drawer/InvestigationDrawer';
import { Toast } from './components/ui/Toast';

function toggle(set: Set<string>, id: string): Set<string> {
  const next = new Set(set);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

export default function App() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [assignedIds, setAssignedIds] = useState<Set<string>>(new Set());
  const [containedIds, setContainedIds] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const closeDrawer = useCallback(() => setSelectedAlert(null), []);

  const criticalUnassigned = useMemo(
    () =>
      mockAlerts.filter(
        (a) => a.severity === 'Critical' && !assignedIds.has(a.id) && !containedIds.has(a.id),
      ).length,
    [assignedIds, containedIds],
  );

  return (
    <div className="app">
      <TopNav />
      <LeftRail />
      <main className="app__main">
        <div className="app__kpis">
          <KpiCard label="Critical Unassigned" value={criticalUnassigned} />
          <KpiCard label="MTTT" value="—" />
          <KpiCard label="Contained 24h" value={containedIds.size} />
        </div>
        <AlertQueue
          alerts={mockAlerts}
          selectedId={selectedAlert?.id ?? null}
          containedIds={containedIds}
          onSelect={setSelectedAlert}
        />
      </main>
      <InvestigationDrawer
        alert={selectedAlert}
        assigned={selectedAlert ? assignedIds.has(selectedAlert.id) : false}
        contained={selectedAlert ? containedIds.has(selectedAlert.id) : false}
        onClose={closeDrawer}
        onToggleAssign={() => selectedAlert && setAssignedIds((s) => toggle(s, selectedAlert.id))}
        onContain={() => {
          if (!selectedAlert) return;
          setContainedIds((s) => new Set(s).add(selectedAlert.id));
          setToast(`${selectedAlert.id} contained successfully`);
        }}
      />
      <Toast message={toast} />
    </div>
  );
}
