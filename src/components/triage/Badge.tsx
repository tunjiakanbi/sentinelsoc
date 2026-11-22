import type { Severity } from '../../types/alert';

export function Badge({ severity }: { severity: Severity }) {
  return <span className={`badge badge--${severity.toLowerCase()}`}>{severity}</span>;
}
