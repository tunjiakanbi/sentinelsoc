export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export type AlertStatus = 'New' | 'Investigating' | 'Contained';

export type EntityType = 'host' | 'user' | 'ip' | 'process' | 'file' | 'url';

export interface Entity {
  type: EntityType;
  value: string;
}

export interface KqlQuery {
  title: string;
  query: string;
}

export interface Alert {
  id: string; // e.g. "ALT-9482"
  title: string;
  severity: Severity;
  status: AlertStatus;
  mitreTactic: string; // e.g. "Credential Access"
  mitreTechnique: string; // e.g. "T1003"
  source: string; // detection product / data source
  detectedAt: string; // ISO 8601 timestamp
  entities: Entity[];
  kql: KqlQuery;
}
