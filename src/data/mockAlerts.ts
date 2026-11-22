import type { Alert } from '../types/alert';

// TODO: replace with your 6 queue alerts (ALT-9482 through ALT-9469).
export const mockAlerts: Alert[] = [
  {
    id: 'ALT-9482',
    title: 'TODO: alert title',
    severity: 'Critical',
    status: 'New',
    mitreTactic: 'TODO',
    mitreTechnique: 'TODO',
    source: 'TODO',
    detectedAt: new Date().toISOString(),
    entities: [],
    kql: { title: 'TODO', query: '// TODO: KQL query' },
  },
];
