# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed
- CI: `actions/checkout@v5` and `actions/setup-node@v5` (GitHub is retiring the Node 20 action runtime).

## [1.0.0] - 2026-11-25

### Added
- Single-page portfolio: hero video reel, about, expertise, skills, experience, projects, leadership, certifications, contact.
- Contact form backed by a Cloudflare Worker (`/api/contact`) that relays to Web3Forms; key read from an environment secret.
- Vitest suite for the contact API and Worker routing; GitHub Actions CI (lint, test, build).
- README with architecture, setup and deploy notes; contributing, security and conduct docs.

### Changed
- Profile image converted from a 5.6 MB PNG to a 92 KB WebP; social preview image resized to 1200×627.
- Removed unused `React` default imports (React 19 automatic JSX runtime) so lint passes cleanly.
