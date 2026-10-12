# Deeproxio Application (Monorepository)

Modernized enterprise Angular application operating completely **Zoneless** (via Angular Signals) and using standalone architecture.

## Prerequisites

- **Node.js**: `^22.0.0` (Active LTS)

## Quick Start

```bash
npm ci
```

## Development Lifecycle Tasks

Automation tasks via NPM scripts:

- `npm start` — Launches Vite dev server at `http://localhost:4200/`
- `npm run build` — Compiles the app using native `esbuild`
- `npm test` — Executes unit tests via Jest 30
- `npm run test:watch` — Runs Jest in interactive watch mode
- `npm run e2e` — Runs E2E integration tests via Playwright
- `npm run e2e:ui` — Opens Playwright UI dashboard
- `npm run lint` — Code quality analysis via ESLint v10
- `npm run format` — Auto-formatting via Prettier

## Project Monorepo Structure

The repository includes `apps/` for the main workspace, `libs/` for shared domain packages (auth, core, shared), and configuration files for Nginx, proxy, Angular, and ESLint.

## Tech Stack

- **Platform**: [Angular 22](https://angular.dev)
- **State Management**: [NgRx 22](https://ngrx.io) (`@ngrx/signals`)
- **Language**: [TypeScript ~6.0.3](https://typescriptlang.org)
- **Styles**: [Sass Dart-Sass](http://sass-lang.com)
- **Testing**: [Jest 30](https://jestjs.io) & [Playwright 1.64](https://playwright.dev)
- **Quality**: ESLint v10 & Prettier 3
