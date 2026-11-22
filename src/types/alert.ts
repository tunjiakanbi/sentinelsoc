export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';

export interface AlertEntity {
  principalUser: string;
  sourceIpAsn: string;
  targetHost: string;
}

export interface SecurityAlert {
  id: string;
  severity: Severity;
  title: string;
  summary: string;
  mitreTactic: string;
  affectedAsset: string;
  timestamp: string;
  entities: AlertEntity;
  kqlQuery: string;
  assignedTo?: string;
  isContained?: boolean;
}