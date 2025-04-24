# IP and VLAN Planning

## VLANs

| VLAN ID | Name | Purpose | Subnet |
|---------|------|---------|---------|
| 1 | Default | Management | 192.168.1.0/24 |
| 10 | Data | User Data | 192.168.10.0/24 |
| 20 | Voice | VoIP | 192.168.20.0/24 |

## IP Address Allocation

### Management Devices
| Device | VLAN | IP Address | Subnet Mask |
|--------|------|------------|-------------|
| SW1 | 1 | 192.168.1.10 | 255.255.255.0 |
