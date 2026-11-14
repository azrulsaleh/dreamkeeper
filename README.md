# Dreamkeeper

Dreamkeeper is a browser based ambient music player. It plays seven tracks as separate audio stems, so you can adjust the piano, cello, vocals, and ambience independently. It also includes a seekable waveform, playback controls, audio filters, and optional white, pink, or brown noise.

Player settings are saved in the browser. Track stems and the song list are in `public/` and `src/data/songs.ts`.

## Getting started

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Checks

```sh
npm test          # Run unit and component tests
npm run typecheck  # Check TypeScript types
npm run lint       # Run ESLint
npm run build      # Typecheck and create a production build
npm run preview    # Preview the production build locally
```

Tests use Vitest, React Testing Library, and jsdom. Audio playback is mocked in tests, so they verify player behavior without playing audio.

## Deployment

The Vite base path and package homepage are configured for GitHub Pages. Run `npm run deploy` to build and publish the `dist/` directory to GitHub Pages.

## Design

[Open the Dreamkeeper Figma file](https://www.figma.com/design/tcd9fs0JcY3n2rh9jPEiRv/Dreamkeeper?node-id=0-1&p=f&t=aUCNyDzQZbEbaoKw-0)
