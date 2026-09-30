---
title: Homelab
description: The hardware and services behind my self-hosted setup.
image: /optiplex.png
model: Dell OptiPlex 3070 Micro
summary: A small, quiet and power-efficient machine that still packs enough power to run all of my self-hosted services.
specs:
  - label: CPU
    value: 6 cores
  - label: RAM
    value: 24 GB
  - label: Storage
    value: 2x 512 GB SSD
  - label: Hypervisor
    value: Proxmox VE
---

## Virtualization

The server runs **Proxmox VE** as its hypervisor. Every service lives in its own virtual machine or container, which keeps things isolated and makes it easy to spin up, snapshot or tear down environments without touching the rest of the setup.

## Services

- **Nginx Proxy Manager**: reverse proxy that routes incoming traffic to the right service and handles SSL certificates

## Network

Nothing is exposed directly to the internet: there are no open ports on my router. Services that need to be public go through a **Cloudflare Tunnel**, which sends traffic to **Nginx Proxy Manager**. From there it's forwarded to the right VM.

```
Internet → Cloudflare → Cloudflare Tunnel → Nginx Proxy Manager → VM
```
