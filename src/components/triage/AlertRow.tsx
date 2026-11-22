import type { Alert } from '../../types/alert';
import { Badge } from './Badge';

interface AlertRowProps {
  alert: Alert;
  selected: boolean;
  contained: boolean;
  onSelect: (alert: Alert) => void;
}

// States: Default, Hover (CSS :hover), Selected, Contained
export function AlertRow({ alert, selected, contained, onSelect }: AlertRowProps) {
  const className = [
    'alert-row',
    selected && 'alert-row--selected',
    contained && 'alert-row--contained',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <tr className={className} onClick={() => onSelect(alert)} aria-selected={selected}>
      <td>{alert.id}</td>
      <td>
        <Badge severity={alert.severity} />
      </td>
      <td>{alert.title}</td>
      <td>{alert.mitreTechnique}</td>
      <td>{contained ? 'Contained' : alert.status}</td>
    </tr>
  );
}
