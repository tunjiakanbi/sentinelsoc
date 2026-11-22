import type { SecurityAlert } from '../../types/alert';
import { Badge } from './Badge';

interface AlertRowProps {
  alert: SecurityAlert;
  selected: boolean;
  contained: boolean;
  onSelect: (alert: SecurityAlert) => void;
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
      <td>{alert.mitreTactic}</td>
      <td>{contained ? 'Contained' : 'Open'}</td>
    </tr>
  );
}
