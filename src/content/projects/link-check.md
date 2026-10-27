---
slug: link-check
title: Link Check
description: Check if a link is a scam
featured: false
git: https://github.com/sanderhd/link-check
demo: https://link.sander.tf
languages: [Nuxt, Vue, TypeScript, Python, FastAPI, Docker]
thumbnail: link-check.png
date: On going
---

## About Link Check

Link Check is a tool that tells you how likely it is that a link is a scam.
Just paste a URL, and it checks the link for common scam signs.

It's built with a Nuxt frontend and a Python (FastAPI) backend, both running in Docker.

## Features
- Check any URL for scam signs
- Detects URL shorteners that hide where a link really goes
- Detects suspicious words in the domain, path & query
- Paste a link straight from your clipboard
- Report a scam URL (protected with Cloudflare Turnstile, sent by email with Resend)
- Health endpoint & monitoring with Prometheus and Grafana

## Work in progress

Link Check is still being worked on, more checks are coming!
