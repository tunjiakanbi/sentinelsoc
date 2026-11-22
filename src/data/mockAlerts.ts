import type { SecurityAlert } from '../types/alert';

export const INITIAL_ALERTS: SecurityAlert[] = [
  {
    id: 'ALT-9482',
    severity: 'Critical',
    title: 'Suspicious Entra ID Token Replay from Anomalous ASN',
    summary:
      'Primary refresh token (PRT) replayed from AS14061 (DigitalOcean) 4 minutes after legitimate corporate VPN auth in Minneapolis, MN.',
    mitreTactic: 'TA0006 · Credential Access',
    affectedAsset: 'prod-auth-vm02',
    timestamp: '2m ago',
    entities: {
      principalUser: 'm.vance@sentinelsoc.io (Global Admin)',
      sourceIpAsn: '167.99.142.88 · AS14061 (Frankfurt, DE)',
      targetHost: 'prod-auth-vm02 (10.24.8.14)',
    },
    kqlQuery:
      'AADSignInEventsBeta | where AccountUpn == "m.vance@sentinelsoc.io" | where IPAddress == "167.99.142.88" | project Timestamp, Application, ErrorCode, RiskLevelDuringSignIn',
  },
  {
    id: 'ALT-9481',
    severity: 'Critical',
    title: 'Impossible Travel Sign-In Followed by OAuth Consent',
    summary:
      'Successful authentication from Sao Paulo, BR 11 minutes after Chicago, IL login, followed immediately by high-privilege Mail.ReadWrite app consent.',
    mitreTactic: 'TA0001 · Initial Access',
    affectedAsset: 'entra-tenant-01',
    timestamp: '8m ago',
    entities: {
      principalUser: 'd.okafor@sentinelsoc.io (Finance Dir)',
      sourceIpAsn: '177.54.148.21 · AS262589 (Sao Paulo, BR)',
      targetHost: 'entra-tenant-01 (Cloud Identity)',
    },
    kqlQuery:
      'CloudAppEvents | where ActionType == "Consent to application" | where AccountObjectId == "8f91c2a0-441b" | project Timestamp, IPAddress, RawEventData',
  },
  {
    id: 'ALT-9479',
    severity: 'High',
    title: 'Outbound Beaconing Detected to Uncategorized C2 IP',
    summary:
      'Periodic 60-second HTTPS POST callbacks with uniform jitter detected from container worker node to newly registered external ASN.',
    mitreTactic: 'TA0011 · Command & Control',
    affectedAsset: 'eks-worker-node-04',
    timestamp: '14m ago',
    entities: {
      principalUser: 'svc-deploy-runner (Service Account)',
      sourceIpAsn: '185.220.101.44 · AS205100 (Amsterdam, NL)',
      targetHost: 'eks-worker-node-04 (10.24.19.88)',
    },
    kqlQuery:
      'DeviceNetworkEvents | where DeviceName == "eks-worker-node-04" | where RemoteIP == "185.220.101.44" | summarize Count=count() by bin(Timestamp, 1m)',
  },
  {
    id: 'ALT-9476',
    severity: 'High',
    title: 'LSASS Memory Read Attempt by Unsigned PowerShell Process',
    summary:
      'Encoded PowerShell execution attempted OpenProcess with PROCESS_VM_READ handle against lsass.exe; blocked by Defender ASR rule.',
    mitreTactic: 'TA0006 · Credential Access',
    affectedAsset: 'fin-wks-019',
    timestamp: '23m ago',
    entities: {
      principalUser: 'r.chen@sentinelsoc.io (Sr. Accountant)',
      sourceIpAsn: '10.24.42.119 · Corporate LAN (US-East)',
      targetHost: 'fin-wks-019 (10.24.42.119)',
    },
    kqlQuery:
      'DeviceProcessEvents | where DeviceName == "fin-wks-019" | where ProcessCommandLine has "-EncodedCommand" | project Timestamp, FileName, ProcessCommandLine',
  },
  {
    id: 'ALT-9472',
    severity: 'Medium',
    title: 'Unusual S3 Bucket Policy Modification (Public Read Check)',
    summary:
      'PutBucketPolicy API call modified ACL permissions on staging telemetry archive; SCP guardrail prevented public exposure.',
    mitreTactic: 'TA0009 · Collection',
    affectedAsset: 'prod-logs-archive',
    timestamp: '41m ago',
    entities: {
      principalUser: 'arn:aws:iam::48291039:role/ci-pipeline',
      sourceIpAsn: '52.14.88.201 · AS16509 (AWS us-east-2)',
      targetHost: 'prod-logs-archive (S3 Bucket)',
    },
    kqlQuery:
      'AWSCloudTrail | where EventName == "PutBucketPolicy" | where RequestParameters has "prod-logs-archive" | project TimeGenerated, UserIdentityArn, SourceIpAddress',
  },
  {
    id: 'ALT-9469',
    severity: 'Low',
    title: 'Repeated Failed SSH Key Auth from Internal Jump Host',
    summary:
      '18 rejected publickey authentication attempts within 3 minutes originating from administrative bastion during scheduled Ansible run.',
    mitreTactic: 'TA0006 · Credential Access',
    affectedAsset: 'bastion-eu-01',
    timestamp: '1h ago',
    entities: {
      principalUser: 'ansible-svc (Linux Local User)',
      sourceIpAsn: '10.28.1.5 · Internal Bastion Subnet',
      targetHost: 'bastion-eu-01 (10.28.1.5)',
    },
    kqlQuery:
      'Syslog | where Computer == "bastion-eu-01" | where SyslogMessage has "Failed publickey" | summarize Attempts=count() by HostIP',
  },
];