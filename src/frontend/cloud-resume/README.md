
# Cloud Resume Frontend

This is the frontend for the Cloud Resume Challenge, built with React, TypeScript, and Vite.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- pnpm (preferred), npm, or yarn

### Installation

1. Navigate to the project directory:

```bash
cd src/frontend/cloud-resume
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn install
```

### Development

To start the development server with hot reloading:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Building for Production

To build the app for production:

```bash
pnpm build
# or
npm run build
# or
yarn build
```

The output will be in the `build/` directory.

### Preview Production Build

To locally preview the production build:

```bash
pnpm preview
# or
npm run preview
# or
yarn preview
```

### Testing

To run tests:

```bash
pnpm test
# or
npm test
# or
yarn test
```

## Project Structure

- `src/` – Main source code (components, pages, context, styles, etc.)
- `public/` – Static assets
- `build/` – Production build output
- `vite.config.ts` – Vite configuration
- `tsconfig.json` – TypeScript configuration

## Environment Variables

You can set environment variables in `.env.development` and `.env.production` for different environments.

(Adjust the command if using pnpm or npm.)

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## Useful Tools

- [SVG Path Editor](https://yqnn.github.io/svg-path-editor/)
- [JavaScript Key Code Playground](https://www.toptal.com/developers/keycode)
